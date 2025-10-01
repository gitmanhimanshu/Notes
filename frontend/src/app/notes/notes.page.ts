import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

type Note = {
  _id?: string;
  title: string;
  content?: string;
  tags?: string[];
  pinned?: boolean;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
};

@Component({
  standalone: true,
  selector: 'app-notes-page',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss']
})
export class NotesPage {
  private http = inject(HttpClient);
  notes = signal<Note[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  query: string = '';
  private searchTimer: any;

  // form state
  form = signal<Note>({ title: '', content: '', tags: [], color: '#5b8cff', pinned: false });
  editingId = signal<string | null>(null);

  ngOnInit() {
    this.fetchNotes();
  }

  async fetchNotes() {
    this.loading.set(true);
    this.error.set(null);
    try {
      let params = new HttpParams();
      if (this.query) {
        params = params.set('q', this.query);
      }
      const url = environment.apiUrl + '/notes';
      const data = await firstValueFrom(this.http.get<Note[]>(url, { params }));
      this.notes.set(data ?? []);
    } catch (e: any) {
      this.error.set(e?.message || 'Failed to load');
    } finally {
      this.loading.set(false);
    }
  }

  debouncedSearch() {
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => this.fetchNotes(), 300);
  }

  async saveNote() {
    const current = this.form();
    try {
      if (this.editingId()) {
        const url = environment.apiUrl + '/notes/' + this.editingId();
        const updated = await firstValueFrom(
          this.http.put<Note>(url, current)
        );
        this.notes.set(this.notes().map(n => (n._id === updated._id ? updated : n)));
      } else {
        const url = environment.apiUrl + '/notes';
        const created = await firstValueFrom(this.http.post<Note>(url, current));
        if (created) this.notes.set([created, ...this.notes()]);
      }
      this.resetForm();
    } catch (e: any) {
      this.error.set(e?.message || 'Save failed');
    }
  }

  editNote(note: Note) {
    this.editingId.set(note._id || null);
    this.form.set({
      title: note.title,
      content: note.content || '',
      tags: note.tags || [],
      pinned: note.pinned || false,
      color: note.color || '#5b8cff'
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async deleteNote(id?: string) {
    if (!id) return;
    const ok = confirm('Delete this note?');
    if (!ok) return;
    try {
      const url = environment.apiUrl + '/notes/' + id;
      await firstValueFrom(this.http.delete(url));
      this.notes.set(this.notes().filter(n => n._id !== id));
    } catch (e: any) {
      this.error.set(e?.message || 'Delete failed');
    }
  }

  resetForm() {
    this.form.set({ title: '', content: '', tags: [], color: '#5b8cff', pinned: false });
    this.editingId.set(null);
  }
}
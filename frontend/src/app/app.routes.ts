import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./notes/notes.page').then(m => m.NotesPage)
  }
];

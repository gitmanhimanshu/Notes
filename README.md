Notes App (Angular + Node + MongoDB)
------------------------------------

Folders
-------

- `backend` — Express API (MongoDB)
- `frontend` — Angular UI

Setup
-----

1) Backend

```
cd backend
copy .env.example .env  # or create .env with PORT, MONGODB_URI, CLIENT_ORIGIN
npm run dev
```

2) Frontend

```
cd ../frontend
npm start
```

Open `http://localhost:4200`.

Environment
-----------

- Backend: `PORT` (default 4000), `MONGODB_URI`, `CLIENT_ORIGIN`
- Frontend: `src/environments/*` controls API URL



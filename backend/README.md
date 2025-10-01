Environment setup
-----------------

Create a `.env` file in `backend/` with:

```
PORT=4000
MONGODB_URI=mongodb://localhost:27017/notes_app
CLIENT_ORIGIN=http://localhost:4200
```

Scripts
-------

- `npm run dev` — start server with nodemon
- `npm start` — start server

API
---

- `GET /api/health`
- `GET /api/notes`
- `POST /api/notes`
- `GET /api/notes/:id`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`



# Framefy

Movie discovery app (portfolio) inspired by Netflix / Letterboxd, powered by **TMDB**. Built with a cinematic UI, fast navigation, and personalization features without requiring login.

## Features

- **Home** with hero + curated carousels (Trending, Top Rated, Upcoming, Now Playing)
- **Movie details** with trailer, cast, and recommendations
- **Search** with autocomplete + **infinite scroll**
- **Explore** with genres + filters + infinite scroll
- **Mood recommendations** (`/mood`) based on curated Discover presets
- **Favorites** and **Watchlist** persisted on-device (Zustand + localStorage)
- **Light/Dark/System** theme support

## Tech stack

- Vite + React + TypeScript
- TailwindCSS + shadcn-style components
- React Router
- React Query
- Axios
- Zustand
- Framer Motion
- ESLint + Prettier

## Getting started

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```bash
cp .env.example .env
```

Then set **one** of the following:

- `VITE_TMDB_READ_TOKEN` (recommended) — TMDB v4 Read Access Token (Bearer)
- `VITE_TMDB_API_KEY` — TMDB v3 API Key

Run the app:

```bash
npm run dev
```

## Scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

- Favorites and watchlist are stored in **localStorage** (`framefy.favorites`, `framefy.watchlist`).
- Authentication (Supabase) is intentionally **not implemented yet** and can be added later to sync data across devices.

## Credits

This product uses the TMDB API but is not endorsed or certified by TMDB.

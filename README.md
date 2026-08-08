# BLUJEANSZ Website

Public marketing site and CMS for BLUJEANSZ, a global marketing communications
consultancy.

React 18 + Vite + React Router 7 + Tailwind v4, with
[Supabase](https://github.com/DeoMedia/Blujeansz-Website-backend) providing the
database, authentication and media storage.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase URL and anon key
npm run dev
```

| Script | |
|---|---|
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run optimize:images` | Regenerate WebP derivatives after adding PNGs |

## Layout

```
src/app/
  components/    Shared UI. `ui/` is shadcn/ui; `home/` and `blog/` are page sections
  pages/         Public routes
  services/      All Supabase access lives here — never query from a component
  types/         Database row types and the article content-block model
  lib/           Supabase client, slug helpers
  data/          Legacy hard-coded content, being migrated to the database
```

## Images

Artwork exported from Figma lands in `src/assets` as full-resolution PNGs.
`npm run optimize:images` generates a WebP sibling for each one, and the
`figma-asset` resolver in `vite.config.ts` prefers the WebP automatically — no
import changes needed. This is what keeps the production bundle around 5 MB
instead of 42 MB. PNGs that compress worse as WebP are detected and left alone.

Four assets referenced by the case-study pages were missing from the original
Figma export. They render a visible placeholder and log a build warning until
the real files are dropped into `src/assets` under their original hashed names:

- `0ee45d6e1bf00d5afe7f07a91d0b859c49d1ad0b.png` — GT Bank Airport
- `f3e9a04d2a86bb32f16a5d15e82fc0d0b10e8e54.png` — NGX Group
- `27ab71ace98bf4bb27a9e36bd8f07baba7ee5e07.png` — Covid Prevention
- `21f48f062d16f6bb15bc85c2fbfa1e58e17df8fe.mp4` — GT Bank Nigeria commercial

## Security note

Only `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` belong in `.env.local`.
Anything prefixed `VITE_` is inlined into the public bundle. The anon key is safe
there because every table is protected by Row Level Security; the service-role
key bypasses RLS entirely and must never appear in this repository.

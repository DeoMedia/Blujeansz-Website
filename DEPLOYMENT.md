# Deployment

Three pieces, deployed independently:

| Piece | Host | Deploys when |
|---|---|---|
| Database, Auth, Storage | Supabase | You run migrations |
| API (FastAPI) | Railway | Push to `main` in the backend repo |
| Website (React) | Bluehost | Push to `main` in this repo |

> **Never paste credentials into a chat, an issue, or a commit.** Everything
> below is stored either in GitHub repository secrets or in the host's own
> settings UI.

---

## 1. Supabase

1. Create a project at [supabase.com](https://supabase.com). Save the database
   password it generates — it appears once.
2. Apply the migrations from the backend repo, **in filename order**:

   ```bash
   supabase link --project-ref <your-project-ref>
   supabase db push
   ```

   Or paste each file in `supabase/migrations/` into the dashboard SQL editor.
3. Collect these from **Project Settings**:
   - **API** → Project URL, `anon` key, `service_role` key
   - **Database** → Connection string → URI, using the **session pooler**
     (port 5432), not the transaction pooler

Create your first admin under **Authentication → Users → Add user**. A trigger
creates the matching CMS profile automatically, but it starts as `invited` with
the `author` role. Promote it once:

```sql
update public.profiles
set role = 'super_admin', status = 'active'
where email = 'you@blujeansz.com';
```

That is deliberately a manual step — the schema does not let anyone grant
themselves privileges, including the first user.

---

## 2. Railway (API)

1. **New Project → Deploy from GitHub repo** → `DeoMedia/Blujeansz-Website-backend`.
2. Railway reads `Procfile` for the start command and `.python-version` for the
   interpreter. No build config needed.
3. Set service variables:

   | Variable | Value |
   |---|---|
   | `DATABASE_URL` | Supabase session pooler URI |
   | `SUPABASE_URL` | Project URL |
   | `SUPABASE_ANON_KEY` | anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | service_role key — server-side only |
   | `CORS_ORIGINS` | `https://blujeansz.com,https://www.blujeansz.com` |
   | `ENVIRONMENT` | `production` |

4. **Settings → Networking → Generate Domain**, and set the healthcheck path to
   `/health`.

Railway redeploys on every push to `main` once connected — no workflow file is
needed for it. The CI workflow in that repo runs the checks that should fail
*before* a bad build ships.

`CORS_ORIGINS` must list the exact scheme and host the site is served from, or
the browser blocks every API call.

---

## 3. Bluehost (website)

Deploys automatically via `.github/workflows/deploy.yml` on push to `main`.

### One-time setup

Create an FTP account in **Bluehost cPanel → FTP Accounts** — a dedicated one
scoped to the site directory, rather than reusing the main cPanel login.

Then add these under **GitHub → repo → Settings → Secrets and variables →
Actions → New repository secret**:

| Secret | Value |
|---|---|
| `FTP_SERVER` | e.g. `ftp.blujeansz.com` |
| `FTP_USERNAME` | the FTP account username |
| `FTP_PASSWORD` | its password |
| `FTP_SERVER_DIR` | `/public_html/` (include both slashes) |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_API_URL` | the Railway URL, no trailing slash |

Only the **anon** key goes here. `VITE_*` values are compiled into the public
JavaScript bundle, so anyone can read them — that is safe for the anon key
because RLS guards every table, and unsafe for anything else. The service-role
key belongs only in Railway.

`FTP_SERVER_DIR` depends on how the domain is set up: the primary domain is
usually `/public_html/`, an addon domain is typically
`/public_html/<domain>/`.

### What the workflow does

Typechecks, builds with the secrets injected, checks `dist/index.html` and
`dist/.htaccess` both exist, then uploads only changed files over FTPS.

Deploys are queued rather than cancelled, so a second push cannot interleave
with an upload already in progress.

### Why `.htaccess` matters

`public/.htaccess` ships with the build and is not optional. Bluehost is
Apache: it has no idea React Router exists, so a request for
`/insights/some-article` makes it look for a directory of that name and return
its own 404. The rewrite hands anything that is not a real file to
`index.html`. Without it the homepage works and **every deep link and every
refresh breaks**.

It also forces HTTPS, sets the WebP MIME type (which some shared-hosting Apache
builds do not know, and nearly every image here is WebP), caches fingerprinted
assets for a year, and explicitly does *not* cache `index.html` — otherwise
visitors keep loading an old build pointing at assets that no longer exist.

---

## Order of operations

Supabase first — both other pieces need its credentials. Then Railway, because
the website build needs `VITE_API_URL`. Then Bluehost.

## Verifying

```bash
curl https://<railway-url>/health
curl https://<railway-url>/health/ready      # this one touches the database
curl https://<railway-url>/api/insights      # published articles, no auth
```

Then load the site, open an article directly (not by clicking through — that
tests the rewrite), and sign in at `/admin`.

# STARDOM

Create your own K-pop universe.

✨ Create groups
🎤 Create characters
🎵 Make songs
🎬 Design music videos
🌎 Build a career
🔀 Remix other groups

Built for MIT Hacks.

**Live Demo:** [https://akuang50.github.io/Stardom/](https://akuang50.github.io/Stardom/)

Judges can open the GitHub Pages URL and play immediately. No `npm install`, API keys, database, login, or local server required.

## Features

- **Group creation** — name, concept, fandom, and color schemes (including pastels)
- **Character roster** — 14 fictional trainees with original illustrated photocards
- **Song studio** — title tracks, concept palettes, line distribution
- **Release simulation** — quality, streams, chart peak, fan and cash deltas
- **Career calendar** — week-by-week events stored in the browser
- **Demo Mode** — loads **NEONIX**, a five-member debuted unit with history and a title track
- **Offline Creative Director** — local command parser, no API key
- **Remix catalog** — borrow concepts from other fictional groups
- **Persistent save** — `localStorage` via Zustand

## Tech stack

| Layer | Choice |
| --- | --- |
| Frontend | React, TypeScript, Vite |
| Styling | Tailwind CSS |
| State | Zustand |
| Animation | Framer Motion |
| Audio | Howler.js |
| Icons | Lucide React |
| Routing | React Router hash routes (`/#/group`) |
| Storage | localStorage |
| Hosting | GitHub Pages |
| Deployment | GitHub Actions |

## Architecture

```text
                    GITHUB
                      |
                GitHub Actions
                      |
                      v
                GitHub Pages
                      |
                      v
              ┌───────────────┐
              │   STARDOM     │
              │ React + Vite  │
              └───────┬───────┘
                      |
          ┌───────────┼───────────┐
          ↓           ↓           ↓
       GAME STATE   AUDIO      AI LAYER
          |           |           |
          ↓           ↓           ↓
       Browser     Static      Optional
       Storage     Assets      Service
```

The game stays playable if the optional AI layer disappears. External model APIs are not called from the static frontend with secret keys.

## Local development

```bash
npm install
npm run dev
```

The Vite `base` is `/Stardom/` so local URLs look like:

```text
http://localhost:5173/Stardom/
```

Hash routes:

```text
/#/
/#/create
/#/group
/#/song
/#/career
/#/explore
```

## Deployment

Production is a static `dist/` folder deployed by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) on every push to `main`.

After the first push, enable GitHub Pages:

```text
Repository → Settings → Pages → Source: GitHub Actions
```

Then:

```bash
npm run build
npm run preview
```

Confirm assets and routes resolve under `/Stardom/`.

## Environment variables

Copy `.env.example` if you need local flags.

`VITE_*` values are public in the built JavaScript. Never put `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, `ELEVENLABS_API_KEY`, or any other secret in the frontend.

## Demo audio

Short original loops live in `public/music/`. They are synthesized stingers, not commercial recordings. Regenerate with:

```bash
node scripts/generate-demo-audio.mjs
```

## Credits

STARDOM is a fictional K-pop agency simulator. All trainees, groups, songs, portraits, and demo audio are original.

Color schemes borrow **public color moods** associated with well-known K-pop visual eras. They are not official palettes, logos, or partnerships.

## Copyright — what to avoid

Safe in this repo:

- Original characters, names, songs, and SVG portraits
- Original synthesized demo audio
- Color combinations inspired by a public aesthetic (pink/black, candy pastels, denim/cream)

Do **not** add later unless you have a license:

- Real idol photos, fancams, press shots, or AI images that look like a specific person
- Official logos, lightsticks, album covers, or music videos
- Commercial recordings or lyrics
- Agency marks (HYBE, SM, JYP, YG, etc.)
- Fandom names or group names used as if this were an official product

Colors themselves are not copyrighted. Likenesses, logos, photos, and recordings are.

## License

MIT. See [LICENSE](LICENSE).

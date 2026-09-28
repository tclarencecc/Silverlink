<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Rules

- Language choice is client-only state: a React context in `src/lib/language.tsx`
  persisted to `localStorage`. No auth, no database, no server functions. Why:
  the user asked for a backend-free app until they say otherwise.
- Route map is `/` (language pick) → `/home` (needs pick) → `/need/$category`
  (per-service screen). Each leaf defines its own `head()` metadata and shared
  tokens come from `src/styles.css`, never ad-hoc colour classes in components.
  Why: keeps deep links, social previews, and the senior-legibility type scale
  consistent as more screens land.
- External directory snapshots for Hobbies, Music, Connection helplines, and
  senior group programmes live in typed local JSON catalogues; only the SportSG directory is fetched live.
  Why: keeps third-party listings available and consistent across translations.

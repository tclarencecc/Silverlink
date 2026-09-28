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

- Language choice remains client-only state in React context and `localStorage`;
  no auth or database is used. SportSG data and Sports questions use server functions,
  with all AI prompts and credentials kept server-side. Why: preserves the simple flow
  while safely supporting the requested live directory and grounded answers.
- Route map is `/` (language pick) → `/home` (needs pick), with Community,
  Connection, and Support branches using typed index and detail routes. Each leaf defines its own `head()` metadata and shared
  tokens come from `src/styles.css`, never ad-hoc colour classes in components.
  Why: keeps deep links, social previews, and the senior-legibility type scale
  consistent as more screens land.
- External directory snapshots for Hobbies, Music, Connection helplines,
  senior group programmes, Money Matters schemes, and Health and Safety resources live in typed local JSON catalogues; only the SportSG directory is fetched live.
  Why: keeps third-party listings available and consistent across translations.

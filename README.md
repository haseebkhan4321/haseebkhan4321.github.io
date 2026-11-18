# Haseeb Khan · Portfolio

Live at **https://haseebkhan4321.github.io**

Static site (HTML, CSS, vanilla JS). No build step; GitHub Pages serves it directly from `main`.

## Editing content

All content lives in [`data.js`](data.js):

| Section | Key |
|---|---|
| Name, headline, links, availability | `profile` |
| About text and principles | `about`, `principles` |
| Career timeline | `experience` |
| Skills | `skills` |
| Education | `education` |
| Projects and case studies | `projects` |

Project fields set to `null` or `[]` are hidden on the site, so leave unverified details empty instead of guessing.

- **Order:** `priority` (lower first). `featured: true` puts a project on the home page; `flagship: true` gives it the large architecture card.
- **Status:** `"Live"`, `"Private"`, `"In development"`, `"Concept"` or `"Case study pending"`.
- **Screenshots:** put images in `assets/projects/` (WebP, about 1200px wide) and reference them in `image` and `screenshots`.
- **Résumé:** add the PDF to `assets/` and set `profile.resume`.

## Pages

- `index.html`: home (hero, selected work, experience, skills, about, contact)
- `projects.html`: all projects with search and filters (`?cat=AI&q=fastapi` is shareable)
- `project.html?id=<project id>`: case study page

## Run locally

Open `index.html` in a browser, or run `python -m http.server` in this folder.

## Deploy

```
git add . && git commit -m "Update portfolio" && git push
```

GitHub Pages redeploys in about a minute.

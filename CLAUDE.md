# mirzawr.com — notes for Claude

Owner: Mirza (product designer, not a developer). Talk to him in Indonesian, plain words, no jargon. He prefers clarifying questions before big changes.

## What this is
- Static portfolio site, hosted on Vercel (project `mirzawr-portfolio`), domain mirzawr.com (DNS at Niagahoster).
- `index.html` holds everything (inline CSS/JS, hash routing: #adaro #ajaib #qazwa #bni; sections #home #projects #study #experience #work).
- Study cases live in the `CASES` object inside index.html (block types: p, cards, fig, figAfter, table, list, annot, feature, imgbox, sub, ol, quote).
- Images in `assets/` (webp). Design source: Figma file H3xKcxupTBgsO9CvZwJbWf.
- `api/visits.js` = visitor counter (Upstash Redis via Vercel Storage, `VISITS_OFFSET=300`). Never commit secrets.

## How to ship a change (always)
1. Never push straight to `main` — `main` is the live site.
2. Make the change on a new branch (e.g. `edit/<short-name>`), commit, push.
3. Vercel builds a Preview for that branch automatically. Give Mirza the preview link
   (Vercel → project → Deployments, or `https://mirzawr-portfolio-git-<branch>-mirzawirashalci-9672s-projects.vercel.app`).
4. Only after Mirza says it looks good: merge the branch into `main` and push → live on mirzawr.com within ~1 minute.
5. If something goes wrong live: Vercel → Instant Rollback, or revert the merge commit.

## Design rules kept so far
- Home: soft blue gradient, top underwater light shafts + bottom caustics (WebGL), pixel clownfish follows cursor.
- Study case pages: white background, no effects, no fish, no bubbles; Back pill in bottom nav.
- Browser title always "Mirza's Portfolio"; no social preview image.

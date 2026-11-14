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
3. Vercel builds a Preview for that branch automatically. Give Mirza the preview link.
   - Do NOT guess the URL from the branch name: the full name is longer than 63 chars, so Vercel
     shortens it (e.g. `mirzawr-portfolio-git-cla-2ce283-mirzawirashalci-9672s-projects.vercel.app`)
     and a guessed link opens a Google search instead.
   - Get the real link: after pushing, read the commit status
     (`curl -sS https://api.github.com/repos/mirzawirashalci-git/mirzawr-portfolio/commits/<sha>/status`,
     context "Vercel"); its `target_url` is the Vercel deployment page. Give Mirza that page and tell him
     to click **Visit**, or use the first link under "Domains" (the branch link, it updates on every push).
4. Only after Mirza says it looks good: merge the branch into `main` and push → live on mirzawr.com within ~1 minute.
5. If something goes wrong live: Vercel → Instant Rollback, or revert the merge commit.

## Design rules kept so far
- Home: soft blue gradient, top underwater light shafts + bottom caustics (WebGL), pixel clownfish follows cursor; a baby clownfish (~60% size) trails behind its tail, slower, with small rare bubbles.
- Study case pages: white background, no effects, no fish, no bubbles; Back pill in bottom nav.
- Browser title always "Mirza's Portfolio"; no social preview image.

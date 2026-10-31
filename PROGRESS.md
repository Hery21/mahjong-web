
## Style — Desktop layout with header and instructions toggle

**Status:** Complete. Manual verification pending.
**Goal:** Add Peranakan header, center board, wrap instructions in a toggleable scrollable container with readable cream text.
**Files changed:** index.html (patch script added Google Fonts link, mahjong-header block, ensured wrapper has display:none, added toggle script), src/css/page.css (appended grid layout, header/toggle/instructions styling, short-desktop board shrink), scripts/patch-index.mjs (idempotent patch script, can be re-run safely).
**User-visible result:** Desktop shows Peranakan header at top (gold eyebrow, Playfair title, cream subtitle), board centered vertically with breathing room, footer at bottom in cream. Instructions hidden by default; clicking "How to play" reveals them in a bounded scrollable container (max 35vh) with cream text on dark background.
**Automated checks:** Two check steps verify patched index.html and appended CSS.
**Manual checks:** Pending. Desktop hard reload. Verify: header visible, board centered, footer cream, click How to play reveals readable instructions in scrollable box, Hide instructions collapses. Mobile same. No black text.
**Remaining risks:** If wrapper is present but wraps wrong sections (e.g. only #explanation), toggle will reveal only that part. Verify by clicking How to play and confirming all sections appear. If some sections remain visible, tell me — we'll adjust the wrapper boundaries.
**Decisions made:** Grid body with align-content: center keeps header+board+footer centered when instructions hidden, and shifts them up when instructions open (instructions added as natural row). Board shrinks via media query on short desktop viewports so header+footer+instructions fit without scroll. Added :root:root specificity trick to override board.css's --w: 45em on short viewports.
**Next part:** Tile spritesheet generation.

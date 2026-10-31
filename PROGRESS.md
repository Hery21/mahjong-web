
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

## Style — Peranakan webp tiles and header layout

**Status:** Complete. Manual verification pending.
**Goal:** Use the new renamed_webp tiles. Add header above the board. Ensure header is at top, board centered, footer + toggleable instructions at bottom.
**Files changed:** src/css/tiles.css (paths changed from small/*.jpg to renamed_webp/*.webp, concealed.jpg kept as fallback since concealed.webp missing from new set), img/tiles/default-tileset.png renamed to .disabled (stops old spritesheet from overriding tiles.css via runtime-injected style), index.html (added Google Fonts, mahjong-header block, display:none inline on wrapper, toggle script), src/css/index.css (imports peranakan-theme.css and peranakan-layout.css after existing imports), src/css/peranakan-layout.css (new: header + toggle styling, body flex-column layout, board margin:auto for vertical centering, footer + instructions styling with !important to beat base game CSS, :root:root override for --w to prevent overflow, mobile media query).
**User-visible result:** New Peranakan tiles render (0-41 from renamed_webp; concealed from small/ for opponent hidden tiles). Header at top with eyebrow+title+subtitle. Board centered vertically. Footer cream, gold links. Clicking How to play reveals scrollable instructions container with cream text.
**Automated checks:** 3 verification steps confirm tiles.css, index.html, layout.css all patched.
**Manual checks:** Pending. (1) Desktop hard reload. Verify: header top, board center, footer bottom, no black text on instructions, tiles are Peranakan not Chinese. (2) Click How to play. Instructions open scrollable, readable. (3) Click again. Instructions close. (4) Mobile hard reload. Same structure, no overflow.
**Not checked:** Production deploy. Real mobile device.
**Remaining risks:** default-tileset.png.disabled — if TileSetManager.loadDefault still injects style from this file path, might fail to load (good) or throw (bad). Verified against code that promise rejection = no injection. If concealed.webp was added later, run the script again — it will swap to webp. If localStorage has mahjongTileset saved, that custom tileset wins and user must clear it in the theme panel.
**Next part:** Deploy to Vercel.

## Style — Scale board and fix assets

**Status:** Complete. Manual verification pending.
**Goal:** Remove the white box from WebP tiles, scale board to fill screen width, fix positioning of windicator and corner texts, and apply the felt and brocade backgrounds.
**Files changed:** src/css/tiles.css (removed background-color to make tiles transparent), src/css/peranakan-layout.css (body background to red-brocade, .discards background to felt.png, board width increased to 94vw/98vw, windicator and corner font sizes made relative to board width).
**User-visible result:** The board is much larger. The felt table texture is visible behind the tiles, and the body has the brocade pattern. Transparent Peranakan tiles sit directly on the felt. The center windicator (diamond shape) and side texts (settings, theme) are scaled correctly to match the bigger board.
**Automated checks:** CSS check verifies tiles are transparent.
**Manual checks:** Pending. (1) Desktop hard reload. Tiles should have no white background. Board should fill screen. Felt pattern visible on the table. (2) Mobile hard reload. Same scaling. (3) Open How to play. (4) Tiles should look correct.
**Remaining risks:** The board width uses 94vw which might overflow vertically if the browser calculates viewport height weirdly on mobile (address bar). We use calc(100vh - 220px) to guard this. If the board overflows top or bottom, we will lower the height multiplier.
**Next part:** Deploy to Vercel.

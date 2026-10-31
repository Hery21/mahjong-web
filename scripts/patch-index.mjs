// Idempotent patch for index.html. Re-runnable.
// Adds: Google Fonts link, mahjong-header, wrapper display:none fix, toggle script.
// Skips anything already present. Prints what it did so user can verify.
import { readFileSync, writeFileSync } from 'node:fs'

let html = readFileSync('index.html', 'utf8')
const changes = []

// 1. Google Fonts (anchor: index.css link)
if (!html.includes('fonts.googleapis.com')) {
  const anchor = '<link rel="stylesheet" href="src/css/index.css">'
  if (!html.includes(anchor)) {
    console.error('FAIL: could not find index.css <link> to anchor fonts')
    process.exit(1)
  }
  const fonts = [
    anchor,
    '  <link rel="preconnect" href="https://fonts.googleapis.com">',
    '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
    '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">',
  ].join('\n')
  html = html.replace(anchor, fonts)
  changes.push('fonts')
}

// 2. Header (anchor: main.board opening tag)
if (!html.includes('mahjong-header')) {
  const anchor = '<main class="board" tabindex="0">'
  if (!html.includes(anchor)) {
    console.error('FAIL: could not find <main class="board"> to anchor header')
    process.exit(1)
  }
  const header = [
    '<header class="mahjong-header">',
    '    <p class="mahjong-eyebrow">The Storytelling Mirror</p>',
    '    <h1 class="mahjong-title">Mahjong</h1>',
    '    <p class="mahjong-subtitle">Traditional four-player game</p>',
    '  </header>',
    '',
    '  ' + anchor,
  ].join('\n')
  html = html.replace(anchor, header)
  changes.push('header')
}

// 3. Wrapper display:none (only if wrapper exists and lacks the style)
const wrapperMatch = html.match(/<div[^>]*\bid="how-to-play-container"[^>]*>/)
if (wrapperMatch) {
  const tag = wrapperMatch[0]
  if (/style\s*=\s*"[^"]*display\s*:\s*none/.test(tag)) {
    console.log('Wrapper already hidden — skipped')
  } else if (/style\s*=\s*"/.test(tag)) {
    const newTag = tag.replace(/style\s*=\s*"[^"]*"/, 'style="display: none"')
    html = html.replace(tag, newTag)
    changes.push('wrapper-style-fixed')
  } else {
    const newTag = tag.replace(/>$/, ' style="display: none">')
    html = html.replace(tag, newTag)
    changes.push('wrapper-style-added')
  }
  console.log('Wrapper tag was: ' + tag)
} else {
  console.log('No wrapper found — nothing to hide')
}

// 4. Toggle script (marker: container.style.display assignment)
if (!html.includes('container.style.display')) {
  const anchor = '</body>'
  if (!html.includes(anchor)) {
    console.error('FAIL: could not find </body>')
    process.exit(1)
  }
  const script = [
    '<script>',
    '    (function () {',
    '      var toggle = document.getElementById("how-to-play-toggle")',
    '      var container = document.getElementById("how-to-play-container")',
    '      if (!toggle || !container) return',
    '      toggle.addEventListener("click", function () {',
    '        var isOpen = container.style.display !== "none"',
    '        container.style.display = isOpen ? "none" : "block"',
    '        toggle.textContent = isOpen ? "How to play" : "Hide instructions"',
    '      })',
    '    })()',
    '  </script>',
    '',
    '  </body>',
  ].join('\n')
  html = html.replace(anchor, script)
  changes.push('toggle-script')
}

writeFileSync('index.html', html)
console.log('Changes applied: ' + (changes.length ? changes.join(', ') : 'none (all present)'))

const sectionCount = (html.match(/<section/g) || []).length
console.log('Total <section> elements: ' + sectionCount)

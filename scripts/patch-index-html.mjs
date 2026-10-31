import { readFileSync, writeFileSync } from 'node:fs'

let html = readFileSync('index.html', 'utf8')
let changed = false

// 1. Google Fonts
if (!html.includes('fonts.googleapis.com')) {
  const anchor = '<link rel="stylesheet" href="src/css/index.css">'
  if (html.includes(anchor)) {
    html = html.replace(anchor, [
      anchor,
      '  <link rel="preconnect" href="https://fonts.googleapis.com">',
      '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
      '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">',
    ].join('\n'))
    changed = true
    console.log('Added fonts')
  }
}

// 2. Header above board
if (!html.includes('mahjong-header')) {
  const anchor = '<main class="board" tabindex="0">'
  if (html.includes(anchor)) {
    html = html.replace(anchor, [
      '<header class="mahjong-header">',
      '    <p class="mahjong-eyebrow">The Storytelling Mirror</p>',
      '    <h1 class="mahjong-title">Mahjong</h1>',
      '    <p class="mahjong-subtitle">Traditional four-player game</p>',
      '  </header>',
      '',
      '  ' + anchor,
    ].join('\n'))
    changed = true
    console.log('Added header')
  }
}

// 3. Ensure wrapper is hidden by default
const wrapperMatch = html.match(/<div[^>]*id="how-to-play-container"[^>]*>/)
if (wrapperMatch) {
  const tag = wrapperMatch[0]
  if (!/display\s*:\s*none/.test(tag)) {
    const newTag = tag.includes('style=')
      ? tag.replace(/style="[^"]*"/, 'style="display: none"')
      : tag.replace(/>$/, ' style="display: none">')
    html = html.replace(tag, newTag)
    changed = true
    console.log('Fixed wrapper display:none')
  }
}

// 4. Toggle script
if (!html.includes('container.style.display')) {
  const anchor = '</body>'
  if (html.includes(anchor)) {
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
      '  ' + anchor,
    ].join('\n')
    html = html.replace(anchor, script)
    changed = true
    console.log('Added toggle script')
  }
}

writeFileSync('index.html', html)
console.log(changed ? 'index.html updated' : 'No changes needed')

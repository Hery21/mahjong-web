import { readFileSync, writeFileSync } from 'node:fs'

let css = readFileSync('src/css/index.css', 'utf8')
let changed = false

function addImportAtEnd(fileToImport) {
  if (css.includes(fileToImport)) return false
  const lines = css.split('\n')
  let lastIdx = -1
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().startsWith('@import')) lastIdx = i
  }
  if (lastIdx >= 0) {
    lines.splice(lastIdx + 1, 0, '@import url("' + fileToImport + '");')
    css = lines.join('\n')
    return true
  }
  return false
}

if (addImportAtEnd('./peranakan-theme.css')) {
  console.log('Added peranakan-theme.css import')
  changed = true
}

if (addImportAtEnd('./peranakan-layout.css')) {
  console.log('Added peranakan-layout.css import')
  changed = true
}

if (changed) writeFileSync('src/css/index.css', css)
else console.log('All imports already present')

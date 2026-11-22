import sharp from 'sharp'
import { fileURLToPath } from 'node:url'
import { readdir, writeFile } from 'node:fs/promises'
const folder = new URL('../public/assets/img/', import.meta.url)
const tiny = {}
for (const name of await readdir(folder)) {
  if (!name.endsWith('.webp')) continue
  const buffer = await sharp(fileURLToPath(new URL(name,folder))).resize({width:24}).webp({quality:35}).toBuffer()
  tiny[name.slice(0,-5)]='data:image/webp;base64,'+buffer.toString('base64')
}
await writeFile(new URL('../src/lib/placeholders.json',import.meta.url),JSON.stringify(tiny))

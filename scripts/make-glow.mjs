// Dithered radial gold glow PNG — banding-free by construction.
// Gaussian falloff computed in float, per-pixel dither added before
// 8-bit quantization so no quantization ring is ever visible.
import { deflateSync } from "node:zlib";
import { writeFileSync } from "node:fs";

const W = 768;
const PEAK = 0.13;        // center alpha
const DITHER = 2.5 / 255; // noise amplitude, survives CSS opacity scaling
const R = 255, G = 221, B = 0;

const raw = Buffer.alloc(W * (W * 4 + 1));
for (let y = 0; y < W; y++) {
  raw[y * (W * 4 + 1)] = 0; // filter: none
  for (let x = 0; x < W; x++) {
    const dx = (x - W / 2) / (W / 2);
    const dy = (y - W / 2) / (W / 2);
    const r2 = dx * dx + dy * dy;
    let a = PEAK * Math.exp(-5.5 * r2);
    a += (Math.random() - 0.5) * DITHER;
    const alpha = Math.max(0, Math.min(255, Math.round(a * 255)));
    const o = y * (W * 4 + 1) + 1 + x * 4;
    raw[o] = R; raw[o + 1] = G; raw[o + 2] = B; raw[o + 3] = alpha;
  }
}

const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  crcTable[n] = c >>> 0;
}
const crc32 = (buf) => {
  let c = 0xffffffff;
  for (const b of buf) c = crcTable[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
};
const chunk = (type, data) => {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
};

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(W, 0);
ihdr.writeUInt32BE(W, 4);
ihdr[8] = 8;  // bit depth
ihdr[9] = 6;  // RGBA
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk("IHDR", ihdr),
  chunk("IDAT", deflateSync(raw, { level: 9 })),
  chunk("IEND", Buffer.alloc(0)),
]);

writeFileSync(process.argv[2] || "glow-gold.png", png);
console.log(`wrote ${png.length} bytes`);

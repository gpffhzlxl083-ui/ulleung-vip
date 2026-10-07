// fonts-src/의 원본 폰트를 글자 범위별 woff2로 잘라 public/fonts/에 쓴다.
// 한자는 src/ 안에 실제로 쓰인 글자만 담으므로, 새 한자를 넣으면 `npm run fonts`를 다시 돌린다.
import { mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import subsetFont from "subset-font";

const root = path.resolve(import.meta.dirname, "..");
const srcDir = path.join(root, "fonts-src");
const outDir = path.join(root, "public/fonts");

const span = (from, to) => {
  let s = "";
  for (let c = from; c <= to; c++) s += String.fromCodePoint(c);
  return s;
};

async function sourceHanja() {
  const found = new Set();
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) await walk(p);
      else if (/\.(tsx?|css)$/.test(entry.name)) {
        for (const ch of (await readFile(p, "utf8")).match(/[\u4E00-\u9FFF\uF900-\uFAFF]/g) ?? []) found.add(ch);
      }
    }
  };
  await walk(path.join(root, "src"));
  return [...found].join("");
}

const latin = [
  span(0x20, 0x7e),
  span(0xa0, 0x24f),
  span(0x2000, 0x206f),
  span(0x20a0, 0x20cf),
  span(0x2100, 0x22ff),
  span(0x2460, 0x24ff),
  span(0x25a0, 0x27bf),
  span(0x3000, 0x303f),
  span(0xff00, 0xffef),
].join("");
const hangul = span(0x1100, 0x11ff) + span(0x3130, 0x318f) + span(0xac00, 0xd7a3);
const hanja = await sourceHanja();

const fonts = [
  { file: "NanumMyeongjo-YetHangul.ttf", name: "nanum-myeongjo-yethangul", groups: { latin, hangul, hanja } },
  { file: "NanumMyeongjo.otf", name: "nanum-myeongjo", groups: { latin, hangul, hanja } },
  { file: "NanumMyeongjoBold.otf", name: "nanum-myeongjo-bold", groups: { latin, hangul, hanja } },
  { file: "NotoSansKR-VariableFont_wght.ttf", name: "noto-sans-kr", groups: { latin, hangul, hanja } },
  { file: "Inter-Variable.ttf", name: "inter", groups: { latin } },
  { file: "NotoSansGujarati-Variable.ttf", name: "noto-sans-gujarati", groups: { latin } },
];

await mkdir(outDir, { recursive: true });
for (const { file, name, groups } of fonts) {
  const input = await readFile(path.join(srcDir, file));
  for (const [group, text] of Object.entries(groups)) {
    if (!text) continue;
    const out = await subsetFont(input, text, { targetFormat: "woff2" });
    await writeFile(path.join(outDir, `${name}-${group}.woff2`), out);
    console.log(`${name}-${group}.woff2  ${(out.length / 1024).toFixed(0)} KB`);
  }
}

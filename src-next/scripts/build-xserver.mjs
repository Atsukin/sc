// Xserver 向けの静的書き出し（out/）。Vercel 移行が済んだらこのスクリプトごと消す。
// API ルート（POST）は静的書き出しでビルドが通らないため、ビルド中だけ src/app の外へ退避する。
import { spawnSync } from "node:child_process";
import { existsSync, renameSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const apiDir = join(root, "src/app/api");
const stash = join(root, ".xserver-api-stash");

if (existsSync(stash)) {
  console.error(`${stash} が残っています。前回のビルドが途中で止まった可能性があります。中身を src/app/api に戻してから再実行してください。`);
  process.exit(1);
}

rmSync(join(root, "out"), { recursive: true, force: true });
renameSync(apiDir, stash);
let status = 1;
try {
  const result = spawnSync("npx", ["next", "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, STATIC_EXPORT: "1" },
  });
  status = result.status ?? 1;
} finally {
  renameSync(stash, apiDir);
}
process.exit(status);

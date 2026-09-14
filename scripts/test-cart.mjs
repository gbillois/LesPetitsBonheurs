import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
const out = mkdtempSync(join(tmpdir(), 'au-petit-bonheur-tests-'));
try {
  execFileSync(
    'node',
    [
      'node_modules/typescript/bin/tsc',
      'lib/cart.test.ts',
      'lib/cart.ts',
      'lib/catalog.ts',
      '--module',
      'commonjs',
      '--target',
      'es2022',
      '--moduleResolution',
      'node',
      '--outDir',
      out,
      '--esModuleInterop',
      '--skipLibCheck',
    ],
    { stdio: 'inherit' },
  );
  execFileSync('node', ['--test', join(out, 'cart.test.js')], {
    stdio: 'inherit',
  });
} finally {
  rmSync(out, { recursive: true, force: true });
}

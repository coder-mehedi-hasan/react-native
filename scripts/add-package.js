const { execSync } = require('child_process');

const args = process.argv.slice(2);

if (args.length < 2) {
  console.error("Usage: npm run addpkg <workspace-name> <package-name> [--dev]");
  process.exit(1);
}

const workspace = args[0];
const pkg = args[1];
const isDev = args.includes('--dev') ? '--save-dev' : '';

console.log(`Installing ${pkg} in workspace ${workspace}...`);

execSync(`npm install ${pkg} --workspace apps/${workspace} ${isDev}`, { stdio: 'inherit' });

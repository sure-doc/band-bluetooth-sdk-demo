const { spawn } = require('child_process');

const packageJosn = require('../package.json');

const excludePackage = [];

const args = ['--'];
packageJosn.workspaces.packages
  .filter((item) => {
    // exclude package
    if (excludePackage.some((package) => item.includes(package))) {
      return false;
    }
    return true;
  })
  .forEach((package) => {
    args.push(package);
  });

console.info('start lint');

const ls = spawn('yarn', ['run', 'eslint', ...args]);

ls.stdout.pipe(process.stdout);

ls.stderr.pipe(process.stderr);

ls.on('error', (error) => {
  console.log(`error: ${error.message}`);
});

ls.on('close', (code) => {
  console.log(`lint exited with code ${code}`);
  if (code !== 0) {
    process.exit(code);
  }
});

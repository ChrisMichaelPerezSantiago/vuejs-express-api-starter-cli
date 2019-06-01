#! /usr/bin/env node

const spawn = require('child_process');
const which = require('which');
const npm = which.sync('npm');

const exec = spawn.exec;

const name = process.argv[2];
if (!name || name.match(/[<>:"\/\\|?*\x00-\x1F]/)) {
  return console.log(`
  Invalid directory name.
  Usage: <vuejs-express-api-starter-cli> <repo-name>  
`);
}

const URL = 'https://github.com/ChrisMichaelPerezSantiago/vuejs-express-api-starter';


f('git', ['clone', URL, name])
  .then(() => {
    return f('rm', ['-rf', `${name}/.git`]);
  }).then(() => {
    console.log('Installing [BACKEND] dependencies...'); 
    return f(npm, ['install'], {
      cwd: process.cwd() + '/' + name + '/backend'
    });
  }).then(() => {
    console.log('Done! 🏁');
    console.log('cd' , name + '/backend');
    console.log('npm run dev');
    console.log('For more information check the package.json')
  }).then(() =>{
    console.log('\nInstalling [FRONTEND] dependencies...'); 
    return f(npm, ['install'], {
      cwd: process.cwd() + '/' + name + '/frontend'
    });
  }).then(() => {
    console.log('Done! 🏁');
    console.log('cd' , name + '/frontend' );
    console.log('npm run serve');
    console.log('For more information check the package.json')
  });

function f(command, args, options = undefined) {
  const spawned = spawn.spawn(command, args, options);
  return new Promise((resolve) => {
    spawned.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    spawned.stderr.on('data', (data) => {
      console.error(data.toString());
    });
    spawned.on('close', () => {
      resolve();
    });
  });
}

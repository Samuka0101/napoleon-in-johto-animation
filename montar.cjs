const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const parts = [
  'johto_story.js', 'johto_journey.js', 'johto_survival.js',
  'johto_art.js', 'johto_sets.js', 'johto_fx.js', 'johto_player.js'
];
const source = name => fs.readFileSync(path.join(__dirname, name), 'utf8').replace(/^\ufeff/, '');
const script = parts.map(source).join('\n\n');
new vm.Script(script);

const html = source('johto_shell.html').replace('/* EMBEDDED_EPISODE */', () => script);
const output = path.join(__dirname, 'napoleao_johto_animacao.html');
fs.writeFileSync(output, html);
console.log('Animação montada em ' + output);

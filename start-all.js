const concurrently = require('concurrently');

concurrently([
  { command: 'cd servicios/usuarios && npm run dev', name: 'AUTH', prefixColor: 'blue' },
  { command: 'cd servicios/catalogo && npm run dev', name: 'CATALOG', prefixColor: 'green' },
  { command: 'cd servicios/reservas && npm run dev', name: 'RESERV', prefixColor: 'yellow' },
  { command: 'cd servicios/chat && npm run dev', name: 'CHAT', prefixColor: 'magenta' },
  { command: 'cd frontend && npm run dev', name: 'FRONT', prefixColor: 'cyan' },
], {
  prefix: 'name',
  killOthers: ['failure', 'success'],
}).result.then(() => {}, () => {});

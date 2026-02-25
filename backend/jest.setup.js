import { jest } from '@jest/globals';

global.jest = jest;

global.beforeAll(() => {
  console.log('=== Inicializando Tests ===');
});

global.afterAll(() => {
  console.log('=== Tests Finalizados ===');
});

import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { anexarImagem, anexarTexto } from '../../../../Support/utils/allureUtils';

const { Given, When, Then } = createBdd();

Given('clico no menu {string}', async ({ page }, menu) => {
  await page.getByRole('link', { name: menu }).click(); // Clica no elemento

  anexarTexto('Menu clicado', `Menu: ${menu}`);
  await anexarImagem(`Screenshot - Clique no menu ${menu}`, page);
});

Given('que clico no submenu itens {string}', async ({ page }, submenu) => {
  await page.waitForTimeout(5000); // Espera 5 segundos
  await page.getByRole('heading', { name: submenu }).hover(); // Passa o mouse sobre o elemento
  anexarTexto('Submenu clicado', `Submenu: ${submenu}`);
  await anexarImagem(`Screenshot - Clique no submenu ${submenu}`, page);
  await page.getByRole('heading', { name: submenu }).click();
});

When('realizo um print da tela {string} e armazeno na pasta {string}', async ({ page }, tela, pasta) => {
  const screenshotPath = `Evidências de Teste/${pasta}/${tela}.png`;
  await page.screenshot({ path: screenshotPath }); // Realiza o print
});

Then('abro a tela de {string}', async ({ page }, tela) => {
  await page.waitForTimeout(5000);
  await expect(page.getByRole('main')).toContainText(`${tela}`);
  anexarTexto('Tela aberta', `Tela: ${tela}`);
  await anexarImagem(`Screenshot - Tela aberta ${tela}`, page);
});





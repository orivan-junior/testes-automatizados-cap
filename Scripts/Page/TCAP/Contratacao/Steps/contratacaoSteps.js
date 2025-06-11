// import { expect } from '@playwright/test';
// import { createBdd } from 'playwright-bdd';
// import { LoginActions } from '../../../../../Scripts/Page/Login/Actions/loginAction';
// import { anexarImagem, anexarTexto } from '../../../../../Support/utils/allureUtils';
// // import { setupBrowserWithBuster } from '../../../../../../e2e/Support/Before/beforeHoks';
//import { setupBrowserWithBuster } from '../../../../../../e2e/Support/Helpers/browserHelpers';


// const { Given, When, Then } = createBdd();

// Given('que estou na página {string}', async ({ page }, url) => {
//   const loginActions = new LoginActions(page); 
//   await loginActions.navigateToLoginPage(url);

//   await page.waitForTimeout(500);

//   await anexarImagem(`Screenshot - Acesso a página ${url}`, page);

//   const acceptCookiesButton = page.getByRole('button', { name: 'Aceitar cookies' });
//   if (await acceptCookiesButton.count() > 0) {
//       await acceptCookiesButton.click();
//       console.log('Botão "Aceitar cookies" encontrado e clicado.');
//   } else {
//       console.log('Botão "Aceitar cookies" não encontrado.');
//   }
// });

// Given('verifico os termos e condições', async ({ page }) => {
//   // Função auxiliar para abrir, visualizar e fechar uma nova guia
//   const openAndViewPage = async (linkName) => {
//     const pagePromise = page.waitForEvent('popup');
//     await page.getByRole('link', { name: linkName }).click();
//     const newPage = await pagePromise;
//     console.log(`Link "${linkName}" aberto em uma nova guia.`);

//     // Aguarda 3 segundos para visualizar a página
//     await newPage.waitForTimeout(3000);

//     // Scroll suave para baixo
//     await newPage.evaluate(() => {
//       return new Promise((resolve) => {
//         const distance = 100; // Distância por iteração (em pixels)
//         const interval = 50; // Intervalo entre iterações (em milissegundos)
//         const scrollInterval = setInterval(() => {
//           const scrollTopBefore = window.scrollY;
//           window.scrollBy(0, distance);
//           if (window.scrollY === scrollTopBefore || window.scrollY + window.innerHeight >= document.body.scrollHeight) {
//             clearInterval(scrollInterval);
//             resolve();
//           }
//         }, interval);
//       });
//     });

//     // Aguarda 3 segundos após o scroll para baixo
//     await newPage.waitForTimeout(3000);

//     // Scroll suave para o topo
//     await newPage.evaluate(() => {
//       return new Promise((resolve) => {
//         const distance = 100; // Distância por iteração (em pixels)
//         const interval = 50; // Intervalo entre iterações (em milissegundos)
//         const scrollInterval = setInterval(() => {
//           const scrollTopBefore = window.scrollY;
//           window.scrollBy(0, -distance);
//           if (window.scrollY === 0 || window.scrollY === scrollTopBefore) {
//             clearInterval(scrollInterval);
//             resolve();
//           }
//         }, interval);
//       });
//     });

//     // Aguarda 1 segundo após o scroll para o topo
//     await newPage.waitForTimeout(1000);

//     // Fecha a nova guia
//     await newPage.close();
//     console.log(`Guia "${linkName}" fechada.`);
//   };

//   // Abre e visualiza "Política de Privacidade"
//   await openAndViewPage('politica de privacidade');

//    // Aguarda 1 segundo antes de clicar no próximo link
//    await page.waitForTimeout(1000);

//   // Abre e visualiza "Termos de Serviço"
//   await openAndViewPage('termos de serviço');
// });

// When('clico nos links de condições gerais e termo de declaração', async ({ page }) => {
//   // Função auxiliar para clicar no link, realizar o scroll e fechar a guia
//   const clickScrollAndClose = async (linkId) => {
//     // Aguarda a abertura da nova guia (popup)
//     const pagePromise = page.waitForEvent('popup');

//     // Clica no link pelo ID
//     await page.evaluate((id) => {
//       const link = document.querySelector(`#${id}`);
//       if (link) {
//         link.click();
//       }
//     }, linkId);

//     console.log(`Link com ID "${linkId}" clicado.`);

//     // Captura a nova guia
//     const newPage = await pagePromise;

//     // Realiza scroll suave para baixo
//     await newPage.evaluate(() => {
//       return new Promise((resolve) => {
//         const distance = 100; // Distância por iteração (em pixels)
//         const interval = 50; // Intervalo entre iterações (em milissegundos)
//         const scrollInterval = setInterval(() => {
//           const scrollTopBefore = window.scrollY;
//           window.scrollBy(0, distance);
//           if (window.scrollY === scrollTopBefore || window.scrollY + window.innerHeight >= document.body.scrollHeight) {
//             clearInterval(scrollInterval);
//             resolve();
//           }
//         }, interval);
//       });
//     });

//     // Aguarda 3 segundos após o scroll para baixo
//     await newPage.waitForTimeout(3000);

//     // Realiza scroll suave para o topo
//     await newPage.evaluate(() => {
//       return new Promise((resolve) => {
//         const distance = 100; // Distância por iteração (em pixels)
//         const interval = 50; // Intervalo entre iterações (em milissegundos)
//         const scrollInterval = setInterval(() => {
//           const scrollTopBefore = window.scrollY;
//           window.scrollBy(0, -distance);
//           if (window.scrollY === 0 || window.scrollY === scrollTopBefore) {
//             clearInterval(scrollInterval);
//             resolve();
//           }
//         }, interval);
//       });
//     });

//     // Aguarda 1 segundo após o scroll para o topo
//     await newPage.waitForTimeout(1000);

//     // Fecha a nova guia
//     await newPage.close();
//     console.log(`Guia com ID "${linkId}" fechada.`);
//   };

//   // Clica, realiza scroll e fecha a guia "condições gerais"
//   await clickScrollAndClose('condicoesGerais');

//   // Clica, realiza scroll e fecha a guia "termo de declaração"
//   await clickScrollAndClose('termoDeclaracao');
// });

// When('clico em Info', async ({ page }) => {
//   // Clica no botão "tooltip"
//   await page.getByRole('button', { name: 'tooltip' }).click();
//   await page.waitForTimeout(500);
// });

// When('aguardo a tela de Atenção abrir e clico em Confirmar', async ({ page }) => {
//   // Aguarda o modal aparecer na tela
//   const modalSelector = 'app-modal-atencao .container-main';
//   await page.waitForSelector(modalSelector, { state: 'visible' });
//   console.log('Modal de atenção visível na tela.');

//   // Localiza e clica no botão "Confirmar" dentro do modal
//   const confirmButton = page.locator(`${modalSelector} button.btn-primary`);
//   await confirmButton.click();
//   console.log('Botão "Confirmar" clicado no modal.');

//   // Aguarda o modal desaparecer da tela
//   await page.waitForSelector(modalSelector, { state: 'hidden' });
//   console.log('Modal de atenção fechado.');
// });

// When('clico nos links de política de privacidade e termos de serviço', async ({ page }) => {
//   // Função auxiliar para clicar no link, realizar o scroll e fechar a guia
//   const clickScrollAndClose = async (linkName) => {
//     // Aguarda a abertura da nova guia (popup)
//     const pagePromise = page.waitForEvent('popup');

//     // Clica no link pelo nome
//     await page.getByRole('link', { name: linkName }).click();
//     console.log(`Link "${linkName}" clicado.`);

//     // Captura a nova guia
//     const newPage = await pagePromise;

//     // Realiza scroll suave para baixo
//     await newPage.evaluate(() => {
//       return new Promise((resolve) => {
//         const distance = 100; // Distância por iteração (em pixels)
//         const interval = 50; // Intervalo entre iterações (em milissegundos)
//         const scrollInterval = setInterval(() => {
//           const scrollTopBefore = window.scrollY;
//           window.scrollBy(0, distance);
//           if (window.scrollY === scrollTopBefore || window.scrollY + window.innerHeight >= document.body.scrollHeight) {
//             clearInterval(scrollInterval);
//             resolve();
//           }
//         }, interval);
//       });
//     });

//     // Aguarda 3 segundos após o scroll para baixo
//     await newPage.waitForTimeout(3000);

//     // Realiza scroll suave para o topo
//     await newPage.evaluate(() => {
//       return new Promise((resolve) => {
//         const distance = 100; // Distância por iteração (em pixels)
//         const interval = 50; // Intervalo entre iterações (em milissegundos)
//         const scrollInterval = setInterval(() => {
//           const scrollTopBefore = window.scrollY;
//           window.scrollBy(0, -distance);
//           if (window.scrollY === 0 || window.scrollY === scrollTopBefore) {
//             clearInterval(scrollInterval);
//             resolve();
//           }
//         }, interval);
//       });
//     });

//     // Aguarda 1 segundo após o scroll para o topo
//     await newPage.waitForTimeout(1000);

//     // Fecha a nova guia
//     await newPage.close();
//     console.log(`Guia "${linkName}" fechada.`);
//   };

//   // Clica, realiza scroll e fecha a guia "política de privacidade"
//   await clickScrollAndClose('política de privacidade');

//   // Clica, realiza scroll e fecha a guia "termos de serviço"
//   await clickScrollAndClose('termos de serviço');
// });

// Given('que clico no botão expandir {string} na tela inicial TCAP', async ({ page }, buttonName) => {
 
//   // Localiza o botão pelo nome e clica para expandir o painel
//   const button = page.getByRole('button', { name: buttonName });
//   await button.click();
//   console.log(`Botão '${buttonName}' clicado para expandir.`);

//   // Aguarda a expansão
//   await page.waitForTimeout(3000);

//   // Localiza o painel expandido
//   const expansionPanel = page.locator('mat-expansion-panel.mat-expanded');
//   if (await expansionPanel.count() === 0) {
//     console.log(`Nenhum painel expandido encontrado para o botão '${buttonName}'.`);
//     return;
//   }

//   console.log(`Painel expandido para o botão '${buttonName}'.`);

//   // Localiza os elementos <mat-icon> com texto "info" dentro do painel expandido
//   const matIcons = expansionPanel.locator('mat-icon.material-icons-outlined:has-text("info")');
//   const count = await matIcons.count();

//   if (count === 0) {
//     console.log(`Nenhum componente <mat-icon> com texto "info" encontrado no painel para o botão '${buttonName}'.`);
//     return;
//   }

//   console.log(`Encontrados ${count} componentes <mat-icon> com texto "info" no painel.`);

//   // Itera sobre os elementos e clica neles
//   for (let i = 0; i < count; i++) {
//     await matIcons.nth(i).click();
//     console.log(`Clicado no componente <mat-icon> ${i + 1} de ${count}.`);
//     await page.waitForTimeout(1000); // Aguarda 1 segundo entre os cliques
//   }

//   console.log(`Todos os componentes <mat-icon> foram clicados para o botão '${buttonName}'.`);

//     // Aguarda o fechamento do painel
//     await page.waitForTimeout(1000);

//     // Clica novamente no botão para minimizar o painel
//   await button.click();
//   console.log(`Botão '${buttonName}' clicado novamente para minimizar o painel.`);
// });

// When('clico no botão {string} na Jornada TCAP', async ({ page }, buttonName) => {
  
//   if (buttonName === 'Compre agora' || buttonName === 'Comprar agora via PIX') {
//     await page.evaluate(() => window.scrollTo(0, 0));
//     console.log('Rolou para o topo da página antes de clicar no botão "Compre agora".');
//   }
//   await page.waitForTimeout(5000);

//   const ClickBtn = page.getByRole('button', { name: buttonName });

//   await anexarImagem(`Screenshot - ${buttonName}`, page);

//   await ClickBtn.click();
//   console.log(`Botão '${buttonName}' clicado.`);
//   await page.waitForTimeout(5000);
// });

// When('clico no botão Avançar na tela de Pagamento', async ({ page }) => {
  
//   await page.evaluate(() => window.scrollTo(0, 0));
//   await anexarImagem('Screenshot - Confirmação dos dados da compra!', page);
  
//   await page.evaluate(() => {
//     document.querySelector('#btnAvancar').click();
//   });
// });

// When('verifico que estou na página {string}', async ({ page }, expectedUrl) => {
//   await page.waitForTimeout(5000);
//   const currentUrl = page.url();
//   expect(currentUrl).toBe(expectedUrl);
// });

// When('verifico que estou na página para {string}', async ({ page }, expectedText) => {
//   await page.waitForTimeout(3000);
//   const header = page.locator('h1');
//   await expect(header).toContainText(expectedText);
// });

// When('preencho o campo {string} com {string} no formulário', async ({ page }, field, value) => {
//   const fieldInput = page.locator(`input[placeholder="${field}"]`);
//   if (field == 'Data de nascimento') {
//       const data = value;
//       for (const char of data) {
//           await fieldInput.press(char);
//       }
//   } else {
//       await fieldInput.fill(value);
//   }
// });

// When('marco o checkbox {string} na tela TCAP', async ({ page }, field) => {
//   if(field == 'Você é ou tem relação com uma pessoa exposta politicamente?'){
//     field = 'pessoa_PEP';
//     const checkboxFieldId = page.locator(`input[id="${field}"]`);
//     checkboxFieldId.check("true");
//   } else {
//     const checkboxField = page.locator(`input[aria-label="${field}"]`);
//     await checkboxField.check("true");
//   }
// });

// When('desmarco o checkbox {string} na tela TCAP', async ({ page }, field) => {
//   if (field === 'Você é ou tem relação com uma pessoa exposta politicamente?') {
//     field = 'pessoa_PEP';
//     const checkboxFieldId = page.locator(`input[id="${field}"]`);
//     await checkboxFieldId.uncheck(); // Desmarca o checkbox
//     console.log(`Checkbox com ID "${field}" desmarcado.`);
//   } else {
//     const checkboxField = page.locator(`input[aria-label="${field}"]`);
//     await checkboxField.uncheck(); // Desmarca o checkbox
//     console.log(`Checkbox "${field}" desmarcado.`);
//   }
// });

// When('realizo uma chamada API para realizar um pagamento', async ({ page, request }) => {
//     // Salvar cookies antes da chamada da API
//     const cookies = await page.context().cookies();
//     console.log('Cookies antes da chamada da API:', cookies);

//     const dataatual = new Date().toISOString().slice(0, 10).replace(/-/g, '');
//     const dataAtualMask = new Date().toISOString().slice(0, 10);

//     // Locate the div and extract the protocol number
//     const protocolText = await page.locator('div.protocol > p').textContent();
//     const ultimosquatro = protocolText.slice(-4); // Extract the last 4 characters

//     const txid = `BSTCAP1${dataatual}0000000000${ultimosquatro}`;

//     const requestBody = {
//         "pix": [
//             {
//                 "endToEndId": "E60746948202111041451I3987l47ghj",
//                 "txid": txid,
//                 "valor": "30.00",
//                 "componentesValor": {
//                     "original": {
//                         "valor": "0.00"
//                     }
//                 },
//                 "horario": `${dataAtualMask}T11:00:18.450Z`,
//                 "infoPagador": "",
//                 "devolucoes": []
//             }
//         ]
//     };

//     const response = await request.post('https://dpsusci.hml.bradseg.com.br:443/PIXTCAP/webhook/33010851000174', {
//         headers: {
//             'Authorization': 'Bearer {{access_tokenTCAP}}',
//             'Content-Type': 'application/json'
//         },
//         data: requestBody
//     });

//     console.log('Request Body:', JSON.stringify(requestBody, null, 2));
//     expect(response.ok()).toBeTruthy();
//     console.log(await response.json());

//     // Restaurar cookies após a chamada da API
//     await page.context().addCookies(cookies);
//     console.log('Cookies restaurados após a chamada da API.');
// });

// When('rolo até o botão {string} e clico na tela de Contratação e Capitalização', async ({ page }, buttonName) => {
//     const button = page.getByRole('button', { name: buttonName });
//     await button.scrollIntoViewIfNeeded();
//     await page.waitForTimeout(5000);
//     await button.click();
// });

// Then('aguardo o pagamento ser efetuado com sucesso', async ({ page }) => {
//   console.log('Aguardando navegação para a página de pagamento confirmado...');

//   const paymentStatusLocator = page.locator('div').filter({ hasText: 'Pagamento realizado com' }).nth(2);
//   await paymentStatusLocator.waitFor({ state: 'attached' });
//   console.log('Elemento "Pagamento realizado com Sucesso" está disponível no DOM.');

//   await paymentStatusLocator.waitFor({ state: 'visible' });
//   console.log('Mensagem de status "Pagamento realizado com Sucesso" exibida na tela.');

//   await anexarImagem('Screenshot - Aguardando o Pagamento ser Finalizado!', page);

//   let currentURL = '';
//   await page.waitForFunction(() => {
//     currentURL = window.location.href;
//     return currentURL.includes('/tcap-fed-contratacao-capitalizacao/pagamento-confirmado');
//   });
//   console.log('Página de confirmação de pagamento carregada com sucesso:', currentURL);

//   await page.waitForTimeout(1000);
//   await anexarImagem('Screenshot - Página de confirmação de pagamento', page);
// });

// Then('aguardo o pagamento ser efetuado com sucesso na tela Instantâneo Raspadinha', async ({ page }) => {
//   console.log('Aguardando navegação para a página de pagamento confirmado...');

//   const paymentStatusLocator = page.locator('div').filter({ hasText: 'Pagamento realizado com' }).nth(2);
//   await paymentStatusLocator.waitFor({ state: 'attached' });
//   console.log('Elemento "Pagamento realizado com Sucesso" está disponível no DOM.');

//   await paymentStatusLocator.waitFor({ state: 'visible' });
//   console.log('Mensagem de status "Pagamento realizado com Sucesso" exibida na tela.');

//   let currentURL = '';
//   await page.waitForFunction(() => {
//     currentURL = window.location.href;
//     return currentURL.includes('/tcap-fed-instantaneo-raspadinha/pagamento-confirmado');

//   });
//   console.log('Página de confirmação de pagamento carregada com sucesso:', currentURL);
// });

// Then('encerro a Jornada TCAP', async ({ page }) => {
//   await page.waitForTimeout(3000);
//   console.log('Jornada TCAP Finalizada!');
// });

// Given ('que eu adicione a quantidade de {string} títulos', async ({ page }, numberClick) => {
// const count = numberClick; 
// for (let i = 0; i < count; i++) {
//     await page.getByRole('button', { name: 'Aumentar quantidade de títulos' }).click();
// }  
// });

// Given ('que eu tenha mais de um titulo e queira remover um deles', async ({ page }) => {
// await page.getByRole('button', { name: 'Diminuir quantidade de títulos' }).click();
// });

// When ('que teste', async ({ page }) => {
// await interceptRecaptcha(page);
// });
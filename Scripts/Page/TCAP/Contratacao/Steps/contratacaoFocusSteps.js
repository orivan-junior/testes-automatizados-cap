// validação usando highlight
import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginActions } from '../../../../../Scripts/Page/Login/Actions/loginAction';
import { anexarImagem, anexarTexto } from '../../../../../Support/utils/allureUtils';
//import { highlightElement } from '../../../../../Support/Before/beforeHoks';
import { highlightElement } from '../../../../../Support/Helpers/browserHelpers';


const { Given, When, Then } = createBdd();

Given('que estou na página {string}', async ({ page }, url) => {
  const loginActions = new LoginActions(page);

  // Navega para a URL fornecida
  await loginActions.navigateToLoginPage(url);
  console.log(`Navegado para a URL: ${url}`);

  // Aguarda brevemente após a navegação
  await page.waitForTimeout(500);

  // Captura uma imagem da página após a navegação
  await anexarImagem(`Screenshot - Acesso a página ${url}`, page);

// Localiza o botão "Aceitar cookies"
const acceptCookiesButton = page.getByRole('button', { name: 'Aceitar cookies' });

// Verifica se o botão está presente
if (await acceptCookiesButton.count() > 0) {
  // Destaca o botão antes de clicar
  await highlightElement(page, acceptCookiesButton); // Passa o locator do botão
  console.log('Botão "Aceitar cookies" destacado.');

  // Clica no botão
  await acceptCookiesButton.click();
  console.log('Botão "Aceitar cookies" encontrado e clicado.');
} else {
  console.log('Botão "Aceitar cookies" não encontrado. Continuando com o teste.');
}

});

Given('verifico os termos e condições', async ({ page }) => {
  // Função auxiliar para abrir, visualizar e fechar uma nova guia
  const openAndViewPage = async (linkName) => {
    const pagePromise = page.waitForEvent('popup');
    const link = page.getByRole('link', { name: linkName });
    
    // Destaca o link antes de clicar
    await highlightElement(page, link);
    
    // Clica no link
    await link.click();
    const newPage = await pagePromise;
    console.log(`Link "${linkName}" aberto em uma nova guia.`);

    // Aguarda 3 segundos para visualizar a página
    await newPage.waitForTimeout(3000);

    // Scroll suave para baixo
    await newPage.evaluate(() => {
      return new Promise((resolve) => {
        const distance = 100; // Distância por iteração (em pixels)
        const interval = 50; // Intervalo entre iterações (em milissegundos)
        const scrollInterval = setInterval(() => {
          const scrollTopBefore = window.scrollY;
          window.scrollBy(0, distance);
          if (window.scrollY === scrollTopBefore || window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, interval);
      });
    });

    // Aguarda 3 segundos após o scroll para baixo
    await newPage.waitForTimeout(3000);

    // Scroll suave para o topo
    await newPage.evaluate(() => {
      return new Promise((resolve) => {
        const distance = 100; // Distância por iteração (em pixels)
        const interval = 50; // Intervalo entre iterações (em milissegundos)
        const scrollInterval = setInterval(() => {
          const scrollTopBefore = window.scrollY;
          window.scrollBy(0, -distance);
          if (window.scrollY === 0 || window.scrollY === scrollTopBefore) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, interval);
      });
    });

    // Aguarda 1 segundo após o scroll para o topo
    await newPage.waitForTimeout(1000);

    // Fecha a nova guia
    await newPage.close();
    console.log(`Guia "${linkName}" fechada.`);
  };

  // Abre e visualiza "Política de Privacidade"
  await openAndViewPage('politica de privacidade');

  // Aguarda 1 segundo antes de clicar no próximo link
  await page.waitForTimeout(1000);

  // Abre e visualiza "Termos de Serviço"
  await openAndViewPage('termos de serviço');
});

When('clico nos links de condições gerais e termo de declaração', async ({ page }) => {
  // Função auxiliar para clicar no link, realizar o scroll e fechar a guia
  const clickScrollAndClose = async (linkId) => {
    // Aguarda a abertura da nova guia (popup)
    const pagePromise = page.waitForEvent('popup');

    // Destaca o link antes de clicar
    await highlightElement(page, { elementHandle: await page.$(`#${linkId}`) });

    // Clica no link pelo ID
    await page.evaluate((id) => {
      const link = document.querySelector(`#${id}`);
      if (link) {
        link.click();
      }
    }, linkId);

    console.log(`Link com ID "${linkId}" clicado.`);

    // Captura a nova guia
    const newPage = await pagePromise;

    // Realiza scroll suave para baixo
    await newPage.evaluate(() => {
      return new Promise((resolve) => {
        const distance = 100; // Distância por iteração (em pixels)
        const interval = 50; // Intervalo entre iterações (em milissegundos)
        const scrollInterval = setInterval(() => {
          const scrollTopBefore = window.scrollY;
          window.scrollBy(0, distance);
          if (window.scrollY === scrollTopBefore || window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, interval);
      });
    });

    // Aguarda 3 segundos após o scroll para baixo
    await newPage.waitForTimeout(3000);

    // Realiza scroll suave para o topo
    await newPage.evaluate(() => {
      return new Promise((resolve) => {
        const distance = 100; // Distância por iteração (em pixels)
        const interval = 50; // Intervalo entre iterações (em milissegundos)
        const scrollInterval = setInterval(() => {
          const scrollTopBefore = window.scrollY;
          window.scrollBy(0, -distance);
          if (window.scrollY === 0 || window.scrollY === scrollTopBefore) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, interval);
      });
    });

    // Aguarda 1 segundo após o scroll para o topo
    await newPage.waitForTimeout(1000);

    // Fecha a nova guia
    await newPage.close();
    console.log(`Guia com ID "${linkId}" fechada.`);
  };

  // Clica, realiza scroll e fecha a guia "condições gerais"
  await clickScrollAndClose('condicoesGerais');

  // Clica, realiza scroll e fecha a guia "termo de declaração"
  await clickScrollAndClose('termoDeclaracao');
});

When('clico em Info', async ({ page }) => {
  // Obtém o botão "tooltip"
  const tooltipButton = page.getByRole('button', { name: 'tooltip' });

  // Destaca o botão antes de clicar
  await highlightElement(page, tooltipButton);

  // Clica no botão "tooltip"
  await tooltipButton.click();
  await page.waitForTimeout(500);
});

When('clico nos links de política de privacidade e termos de serviço', async ({ page }) => {
  // Função auxiliar para clicar no link, realizar o scroll e fechar a guia
  const clickScrollAndClose = async (linkName) => {
    // Aguarda a abertura da nova guia (popup)
    const pagePromise = page.waitForEvent('popup');

    // Obtém o link pelo nome e destaca-o
    const link = page.getByRole('link', { name: linkName });
    await highlightElement(page, link);

    // Clica no link
    await link.click();
    console.log(`Link "${linkName}" clicado.`);

    // Captura a nova guia
    const newPage = await pagePromise;

    // Realiza scroll suave para baixo
    await newPage.evaluate(() => {
      return new Promise((resolve) => {
        const distance = 100; // Distância por iteração (em pixels)
        const interval = 50; // Intervalo entre iterações (em milissegundos)
        const scrollInterval = setInterval(() => {
          const scrollTopBefore = window.scrollY;
          window.scrollBy(0, distance);
          if (window.scrollY === scrollTopBefore || window.scrollY + window.innerHeight >= document.body.scrollHeight) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, interval);
      });
    });

    // Aguarda 3 segundos após o scroll para baixo
    await newPage.waitForTimeout(3000);

    // Realiza scroll suave para o topo
    await newPage.evaluate(() => {
      return new Promise((resolve) => {
        const distance = 100; // Distância por iteração (em pixels)
        const interval = 50; // Intervalo entre iterações (em milissegundos)
        const scrollInterval = setInterval(() => {
          const scrollTopBefore = window.scrollY;
          window.scrollBy(0, -distance);
          if (window.scrollY === 0 || window.scrollY === scrollTopBefore) {
            clearInterval(scrollInterval);
            resolve();
          }
        }, interval);
      });
    });

    // Aguarda 1 segundo após o scroll para o topo
    await newPage.waitForTimeout(1000);

    // Fecha a nova guia
    await newPage.close();
    console.log(`Guia "${linkName}" fechada.`);
  };

  // Clica, realiza scroll e fecha a guia "política de privacidade"
  await clickScrollAndClose('política de privacidade');

  // Clica, realiza scroll e fecha a guia "termos de serviço"
  await clickScrollAndClose('termos de serviço');
});

Given('que clico no botão expandir {string} na tela inicial TCAP', async ({ page }, buttonName) => {
  // Localiza o botão pelo nome e aplica o highlight antes de clicar para expandir
  const button = page.getByRole('button', { name: buttonName });
  await highlightElement(page, button); // Aplica o highlight no botão
  await button.click(); // Clica no botão
  console.log(`Botão '${buttonName}' clicado para expandir.`);

  // Aguarda a expansão
  await page.waitForTimeout(3000);

  // Localiza o painel expandido
  const expansionPanel = page.locator('mat-expansion-panel.mat-expanded');
  if (await expansionPanel.count() === 0) {
    console.log(`Nenhum painel expandido encontrado para o botão '${buttonName}'.`);
    return;
  }

  console.log(`Painel expandido para o botão '${buttonName}'.`);

  // Localiza os elementos <mat-icon> com texto "info" dentro do painel expandido
  const matIcons = expansionPanel.locator('mat-icon.material-icons-outlined:has-text("info")');
  const count = await matIcons.count();

  if (count === 0) {
    console.log(`Nenhum componente <mat-icon> com texto "info" encontrado no painel para o botão '${buttonName}'.`);
    return;
  }

  console.log(`Encontrados ${count} componentes <mat-icon> com texto "info" no painel.`);

  // Itera sobre os elementos e aplica o highlight antes de clicar
  for (let i = 0; i < count; i++) {
    const matIcon = matIcons.nth(i);
    await highlightElement(page, matIcon); // Aplica o highlight no componente
    await matIcon.click(); // Clica no componente
    console.log(`Clicado no componente <mat-icon> ${i + 1} de ${count}.`);
    await page.waitForTimeout(1000); // Aguarda 1 segundo entre os cliques
  }

  console.log(`Todos os componentes <mat-icon> foram clicados para o botão '${buttonName}'.`);

  // Aguarda o fechamento do painel
  await page.waitForTimeout(1000);

  // Aplica o highlight no botão antes de minimizar o painel
  await highlightElement(page, button);
  await button.click(); // Clica novamente no botão para minimizar o painel
  console.log(`Botão '${buttonName}' clicado novamente para minimizar o painel.`);
});

When('clico no botão {string} na Jornada TCAP', async ({ page }, buttonName) => {
  if (buttonName === 'Compre agora') {
    await page.evaluate(() => window.scrollTo(0, 0));
    console.log('Rolou para o topo da página antes de clicar no botão "Compre agora".');
  }

  const ClickBtn = page.getByRole('button', { name: buttonName });
  await highlightElement(page, ClickBtn); // Aplica o highlight
  await anexarImagem(`Screenshot - ${buttonName}`, page);
  await ClickBtn.click();
  console.log(`Botão '${buttonName}' clicado.`);
});

When('clico no botão Avançar na tela de Pagamento', async ({ page }) => {
  // Rola a página para o topo
  await page.evaluate(() => window.scrollTo(0, 0));
  
  // Anexa uma imagem (presumivelmente uma função que você já tem)
  await anexarImagem('Screenshot - Confirmação dos dados da compra!', page);

  // Localiza o botão "Avançar" e aplica o highlight antes de clicar
  const avancarButton = page.locator('#btnAvancar');
  await highlightElement(page, avancarButton); // Aplica o highlight no botão

  // Aguarda um pequeno tempo para o destaque ser visível
  await page.waitForTimeout(1000);

  // Clica no botão usando document.querySelector
  await page.evaluate(() => {
    document.querySelector('#btnAvancar').click();
  });
});

When('verifico que estou na página para {string}', async ({ page }, expectedText) => {
  await page.waitForTimeout(3500);
  const header = page.locator('h1');
  await highlightElement(page, header); // Aplica o highlight no cabeçalho
  await expect(header).toContainText(expectedText);
});

When('realizo uma chamada API para realizar um pagamento', async ({ page, request }) => {
  // Salvar cookies antes da chamada da API
  const cookies = await page.context().cookies();
  console.log('Cookies antes da chamada da API:', cookies);

  const dataatual = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const dataAtualMask = new Date().toISOString().slice(0, 10);

  // Locate the div and extract the protocol number
  const protocolText = await page.locator('div.protocol > p').textContent();
  const ultimosquatro = protocolText.slice(-4); // Extract the last 4 characters

  const txid = `BSTCAP1${dataatual}0000000000${ultimosquatro}`;

  const requestBody = {
      "pix": [
          {
              "endToEndId": "E60746948202111041451I3987l47ghj",
              "txid": txid,
              "valor": "30.00",
              "componentesValor": {
                  "original": {
                      "valor": "0.00"
                  }
              },
              "horario": `${dataAtualMask}T11:00:18.450Z`,
              "infoPagador": "",
              "devolucoes": []
          }
      ]
  };

  const response = await request.post('https://dpsusci.hml.bradseg.com.br:443/PIXTCAP/webhook/33010851000174', {
      headers: {
          'Authorization': 'Bearer {{access_tokenTCAP}}',
          'Content-Type': 'application/json'
      },
      data: requestBody
  });

  console.log('Request Body:', JSON.stringify(requestBody, null, 2));
  expect(response.ok()).toBeTruthy();
  console.log(await response.json());

  // Restaurar cookies após a chamada da API
  await page.context().addCookies(cookies);
  console.log('Cookies restaurados após a chamada da API.');
});

When('rolo até o botão {string} e clico na tela de Contratação e Capitalização', async ({ page }, buttonName) => {
  const button = page.getByRole('button', { name: buttonName });
  await button.scrollIntoViewIfNeeded();
  await highlightElement(page, button); // Aplica o highlight no botão
  await page.waitForTimeout(5000);
  await button.click();
});

Then('aguardo o pagamento ser efetuado com sucesso', async ({ page }) => {
console.log('Aguardando navegação para a página de pagamento confirmado...');

const paymentStatusLocator = page.locator('div').filter({ hasText: 'Pagamento realizado com' }).nth(2);
await paymentStatusLocator.waitFor({ state: 'attached' });
console.log('Elemento "Pagamento realizado com Sucesso" está disponível no DOM.');

await paymentStatusLocator.waitFor({ state: 'visible' });
console.log('Mensagem de status "Pagamento realizado com Sucesso" exibida na tela.');

await anexarImagem('Screenshot - Aguardando o Pagamento ser Finalizado!', page);

let currentURL = '';
await page.waitForFunction(() => {
  currentURL = window.location.href;
  return currentURL.includes('/tcap-fed-contratacao-capitalizacao/pagamento-confirmado');
});
console.log('Página de confirmação de pagamento carregada com sucesso:', currentURL);

await page.waitForTimeout(1000);
await anexarImagem('Screenshot - Página de confirmação de pagamento', page);
});

Then('aguardo o pagamento ser efetuado com sucesso na tela Instantâneo Raspadinha', async ({ page }) => {
console.log('Aguardando navegação para a página de pagamento confirmado...');

const paymentStatusLocator = page.locator('div').filter({ hasText: 'Pagamento realizado com' }).nth(2);
await paymentStatusLocator.waitFor({ state: 'attached' });
console.log('Elemento "Pagamento realizado com Sucesso" está disponível no DOM.');

await paymentStatusLocator.waitFor({ state: 'visible' });
console.log('Mensagem de status "Pagamento realizado com Sucesso" exibida na tela.');

let currentURL = '';
await page.waitForFunction(() => {
  currentURL = window.location.href;
  return currentURL.includes('/tcap-fed-instantaneo-raspadinha/pagamento-confirmado');

});
console.log('Página de confirmação de pagamento carregada com sucesso:', currentURL);
});

Then('encerro a Jornada TCAP', async ({ page }) => {
await page.waitForTimeout(2000);
console.log('Jornada TCAP Finalizada!');
});

When('preencho o campo {string} com {string} no formulário', async ({ page }, field, value) => {
  const fieldInput = page.locator(`input[placeholder="${field}"]`);
  
  // Aplica o highlight no campo antes de preenchê-lo
  await highlightElement(page, fieldInput); // Destaca o campo

  if (field === 'Data de nascimento') {
      const data = value;
      for (const char of data) {
          await fieldInput.press(char);
      }
  } else {
      await fieldInput.fill(value);
  }
});

When('marco o checkbox {string} na tela TCAP', async ({ page }, field) => {
  let checkboxFieldId;

  if (field === 'Você é ou tem relação com uma pessoa exposta politicamente?') {
    field = 'pessoa_PEP';
    checkboxFieldId = page.locator(`input[id="${field}"]`);
  } else {
    checkboxFieldId = page.locator(`input[aria-label="${field}"]`);
  }

  // Aplica o highlight no checkbox antes de marcá-lo
  await highlightElement(page, checkboxFieldId); // Destaca o checkbox

  // Marca o checkbox
  await checkboxFieldId.check();
});

When('desmarco o checkbox {string} na tela TCAP', async ({ page }, field) => {
  let checkboxFieldId;

  if (field === 'Você é ou tem relação com uma pessoa exposta politicamente?') {
    field = 'pessoa_PEP';
    checkboxFieldId = page.locator(`input[id="${field}"]`);
  } else {
    checkboxFieldId = page.locator(`input[aria-label="${field}"]`);
  }

  // Aplica o highlight no checkbox antes de desmarcá-lo
  await highlightElement(page, checkboxFieldId); // Destaca o checkbox

  // Desmarca o checkbox
  await checkboxFieldId.uncheck();
  console.log(`Checkbox "${field}" desmarcado.`);
});

Given('que eu adicione a quantidade de {string} títulos', async ({ page }, numberClick) => {
  const count = parseInt(numberClick, 10); // Converte o número de cliques para um inteiro
  for (let i = 0; i < count; i++) {
    const increaseButton = page.getByRole('button', { name: 'Aumentar quantidade de títulos' });
    
    // Aplica o highlight no botão antes de clicar
    await highlightElement(page, increaseButton); // Destaca o botão

    await increaseButton.click(); // Clica no botão
  }  
});

Given('que eu tenha mais de um titulo e queira remover um deles', async ({ page }) => {
  const decreaseButton = page.getByRole('button', { name: 'Diminuir quantidade de títulos' });
  
  // Aplica o highlight no botão antes de clicar
  await highlightElement(page, decreaseButton); // Destaca o botão

  await decreaseButton.click(); // Clica no botão
});

When('aguardo a tela de Atenção abrir e clico em Confirmar', async ({ page }) => {
  // Aguarda o modal aparecer na tela
  const modalSelector = 'app-modal-atencao .container-main';
  await page.waitForSelector(modalSelector, { state: 'visible' });
  console.log('Modal de atenção visível na tela.');

  await page.waitForTimeout(2000); // Aguarda 2 segundos para garantir que o modal esteja totalmente carregado

  // Localiza o botão "Confirmar" dentro do modal
  const confirmButton = page.locator(`${modalSelector} button.btn-primary`);

  // Aplica o highlight no botão "Confirmar" antes de clicar
  await highlightElement(page, confirmButton); // Destaca o botão

  await confirmButton.click(); // Clica no botão
  console.log('Botão "Confirmar" clicado no modal.');

  // Aguarda o modal desaparecer da tela
  await page.waitForSelector(modalSelector, { state: 'hidden' });
  console.log('Modal de atenção fechado.');
});

import { defineConfig } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  features: 'Scenarios/**/**/*.feature', // Caminho para os arquivos .feature
  steps: '{Scripts,Support}/**/**/*.js', // Caminho para os arquivos .steps
});

export default defineConfig({
  testDir,
  timeout: 900000, // Tempo limite de 15 minutos
  reporter: [
    ['html'], // Relatório HTML integrado
    ['allure-playwright'], // Relatório Allure
    ['list'], // Relatório Inline (exibe no console)
    ['./pdfReporter.js', { outputPath: 'reports/relatorio-testes.pdf', customTitle: 'Relatório TCAP - Testes Automatizados' }], // Relatório PDF automático
    // ['./wordReporter.js'], // Relatório em Word
  ],
  use: {
    //viewport: { width: 1920, height: 1080 }, // Define viewport para full hd
    video: 'retain-on-failure', // Captura vídeo apenas em caso de falha
    ignoreHTTPSErrors: true, // Ignora erros de HTTPS // Tempo limite de navegação de 3 minutos
    headless: true, // Executa no modo headless
    // baseURL: 'https://wwwn.dsv.bradescoseguros.com.br/pnegocios2/wps/portal/portaldenegociosnovo/!ut/p/z1/hU7LCsIwEPwWDz2aXWuR6i0IFqUVRNC6F0lr-oA2KUlU_HsDXtXObZ4MEORASjzaWrhWK9F5fqHFNU3SLS7jcI_rTYgHfjpGSRbOoiyC81iAvI0_wNH3aSyyA6o7XXzecFXM4xrIyEoaadjdeLlxbrCrAAO0zj8vLXNS9JaVN8V0VbWlZEq6AL8NNNo6yP_1YOhznFLxevLJ5A0FAdjh/dz/d5/L2dBISEvZ0FBIS9nQSEh/',
    trace: 'retain-on-failure', // Captura traces apenas em caso de falha
    screenshot: 'only-on-failure', // Captura screenshots apenas em caso de falha
    //screenshot: 'on', // Captura screenshots para todos os testes
    //video: 'on-first-retry', // Captura vídeo apenas na primeira tentativa

  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        launchOptions: {
          args: [
            '--ignore-certificate-errors', // Ignora erros de certificado
            '--disable-blink-features=AutomationControlled', // Evita detecção de automação
            '--disable-infobars', // Remove a barra de informações "Automated testing"
            '--no-sandbox', // Desativa o sandbox (se necessário)
            '--window-size=1920,1080', // Define o tamanho da janela
            '--kiosk-printing',
            '--disable-features=site-per-process', // Desativa o recurso de site por processo
          ],
        },
      },
    },
    // Outros navegadores podem ser adicionados aqui, se necessário
    // {
    //   name: 'Firefox',
    //   use: { browserName: 'firefox' },
    // },
    // {
    //   name: 'WebKit',
    //   use: { browserName: 'webkit' },
    // },
  ],
});
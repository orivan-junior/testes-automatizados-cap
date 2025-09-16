// Script para gerar relatórios completos (Allure + PDF)
const { exec } = require('child_process');
const { promisify } = require('util');
const { chromium } = require('playwright');
const { promises: fs } = require('fs');
const path = require('path');

const execAsync = promisify(exec);

async function gerarRelatorioCompleto() {
  console.log('🚀 Iniciando geração de relatórios completos...');
  
  try {
    // 1. Gerar relatório Allure
    console.log('📊 Gerando relatório Allure...');
    await execAsync('npx allure generate ./allure-results --clean -o allure-report');
    console.log('✅ Relatório Allure gerado em: allure-report/');
    
    // 2. Gerar PDF do Playwright
    console.log('📄 Gerando PDF do Playwright...');
    await gerarPDFPlaywright();
    
    // 3. Gerar PDF do Allure
    console.log('📄 Gerando PDF do Allure...');
    await gerarPDFAllure();
    
    console.log('\n🎉 Relatórios gerados com sucesso!');
    console.log('📂 Arquivos disponíveis:');
    console.log('   • reports/playwright-relatorio.pdf');
    console.log('   • reports/allure-relatorio.pdf');
    console.log('   • allure-report/index.html');
    console.log('   • playwright-report/index.html');
    
  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

async function gerarPDFPlaywright() {
  const reportPath = path.resolve('playwright-report/index.html');
  const outputPath = 'reports/playwright-relatorio.pdf';
  
  await fs.access(reportPath);
  await fs.mkdir('reports', { recursive: true });
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(`file://${reportPath}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    await page.pdf({
      path: outputPath,
      format: 'A4',
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 12px; color: #333; text-align: center; width: 100%;">
          <h3 style="margin: 0;">📊 Relatório Playwright - TCAP</h3>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; color: #666; text-align: center; width: 100%;">
          <span>Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
          <span style="float: right;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
        </div>
      `,
      printBackground: true
    });
  } finally {
    await browser.close();
  }
}

async function gerarPDFAllure() {
  const reportPath = path.resolve('allure-report/index.html');
  const outputPath = 'reports/allure-relatorio.pdf';
  
  try {
    await fs.access(reportPath);
  } catch {
    console.log('⚠️  Relatório Allure não encontrado, pulando...');
    return;
  }
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto(`file://${reportPath}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(3000);
    
    await page.pdf({
      path: outputPath,
      format: 'A4',
      margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="font-size: 12px; color: #333; text-align: center; width: 100%;">
          <h3 style="margin: 0;">📊 Relatório Allure - TCAP</h3>
        </div>
      `,
      footerTemplate: `
        <div style="font-size: 10px; color: #666; text-align: center; width: 100%;">
          <span>Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
          <span style="float: right;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
        </div>
      `,
      printBackground: true
    });
  } finally {
    await browser.close();
  }
}

// Executa quando chamado diretamente
if (require.main === module) {
  gerarRelatorioCompleto();
}

module.exports = gerarRelatorioCompleto;
// Script para gerar PDF manualmente do relatório existente
const { chromium } = require('playwright');
const { promises: fs } = require('fs');
const path = require('path');

async function gerarPDFManual() {
  const reportPath = path.resolve('playwright-report/index.html');
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const outputPath = `reports/relatorio-manual-${timestamp}.pdf`;
  
  console.log('🔄 Gerando PDF do relatório existente...');
  console.log(`📂 Relatório fonte: ${reportPath}`);
  console.log(`📄 PDF destino: ${outputPath}`);
  
  try {
    // Verifica se o relatório existe
    await fs.access(reportPath);
    
    // Cria diretório de saída
    await fs.mkdir('reports', { recursive: true });
    
    // Gera o PDF
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    
    try {
      await page.goto(`file://${reportPath}`, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Aguarda carregamento
      await page.waitForTimeout(3000);
      
      // CSS para melhorar impressão
      await page.addStyleTag({
        content: `
          @media print {
            .toolbar, .sidebar, nav { display: none !important; }
            body { margin: 0; padding: 15px; font-family: Arial, sans-serif; }
            .test-case { break-inside: avoid; margin-bottom: 8px; }
            table { width: 100% !important; border-collapse: collapse; }
            h1, h2, h3 { color: #333; page-break-after: avoid; }
          }
        `
      });
      
      await page.pdf({
        path: outputPath,
        format: 'A4',
        margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' },
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size: 12px; color: #333; text-align: center; width: 100%;">
            <h3 style="margin: 0;">📊 Relatório TCAP - Testes Automatizados</h3>
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 10px; color: #666; text-align: center; width: 100%;">
            <span>Gerado manualmente em: ${new Date().toLocaleString('pt-BR')}</span>
            <span style="float: right;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
          </div>
        `,
        printBackground: true
      });
      
      console.log('✅ PDF gerado com sucesso!');
      console.log(`📂 Arquivo salvo em: ${path.resolve(outputPath)}`);
      
    } finally {
      await browser.close();
    }
    
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('❌ Erro: Relatório HTML não encontrado!');
      console.log('💡 Execute primeiro os testes para gerar o relatório:');
      console.log('   npm run run_playwright');
      console.log('   ou');
      console.log('   npm run run_bdd_playwright');
    } else {
      console.error('❌ Erro ao gerar PDF:', error.message);
    }
    process.exit(1);
  }
}

// Executa quando chamado diretamente
if (require.main === module) {
  gerarPDFManual();
}

module.exports = gerarPDFManual;
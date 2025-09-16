// Reporter customizado para gerar PDF automaticamente após os testes
const { chromium } = require('playwright');
const { promises: fs } = require('fs');
const path = require('path');

class PDFReporter {
  constructor(options = {}) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    this.outputPath = options.outputPath || `reports/relatorio-testes-${timestamp}.pdf`;
    this.reportUrl = options.reportUrl || 'playwright-report/index.html';
    this.customTitle = options.customTitle || 'Relatório de Testes Automatizados';
  }

  async onEnd(result) {
    console.log('🔄 Iniciando geração do relatório PDF...');
    
    try {
      await this.generatePDF();
      console.log(`✅ PDF gerado com sucesso: ${this.outputPath}`);
    } catch (error) {
      console.error('❌ Erro ao gerar PDF:', error.message);
    }
  }

  async generatePDF() {
    // Verifica se o relatório HTML existe
    const reportPath = path.resolve(this.reportUrl);
    const reportExists = await fs.access(reportPath).then(() => true).catch(() => false);
    
    if (!reportExists) {
      throw new Error(`Relatório HTML não encontrado em: ${reportPath}`);
    }

    // Cria o diretório de saída se não existir
    const outputDir = path.dirname(this.outputPath);
    await fs.mkdir(outputDir, { recursive: true });

    // Lança o navegador e gera o PDF
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    try {
      // Carrega o relatório HTML local
      await page.goto(`file://${reportPath}`, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });

      // Aguarda o carregamento completo do React
      await page.waitForSelector('[data-testid="report"]', { timeout: 10000 })
        .catch(() => {
          console.log('⚠️  Seletor específico não encontrado, continuando...');
        });

      // Aguarda um pouco mais para garantir que tudo carregou
      await page.waitForTimeout(2000);

      // Adiciona CSS customizado para melhorar a impressão
      await page.addStyleTag({
        content: `
          @media print {
            /* Remove elementos desnecessários */
            .toolbar, .sidebar, nav, .navigation {
              display: none !important;
            }
            
            /* Ajusta o layout para impressão */
            body {
              margin: 0;
              padding: 20px;
              font-family: 'Segoe UI', Arial, sans-serif;
            }
            
            /* Melhora a quebra de página */
            .test-case, .test-file {
              break-inside: avoid;
              margin-bottom: 10px;
            }
            
            /* Ajusta tabelas */
            table {
              width: 100% !important;
              border-collapse: collapse;
            }
            
            /* Headers personalizados */
            h1, h2, h3 {
              color: #333;
              page-break-after: avoid;
            }
          }
        `
      });

      // Configura e gera o PDF
      await page.pdf({
        path: this.outputPath,
        format: 'A4',
        margin: {
          top: '20mm',
          bottom: '20mm',
          left: '15mm',
          right: '15mm'
        },
        displayHeaderFooter: true,
        headerTemplate: `
          <div style="font-size: 10px; color: #666; text-align: center; width: 100%; margin: 0 20px;">
            <h3 style="margin: 0; color: #333;">${this.customTitle}</h3>
          </div>
        `,
        footerTemplate: `
          <div style="font-size: 10px; color: #666; text-align: center; width: 100%; margin: 0 20px;">
            <span>Gerado em: ${new Date().toLocaleString('pt-BR')}</span>
            <span style="float: right;">Página <span class="pageNumber"></span> de <span class="totalPages"></span></span>
          </div>
        `,
        printBackground: true,
        preferCSSPageSize: false
      });

    } finally {
      await browser.close();
    }
  }

  // Indica que este reporter não imprime no terminal
  printsToStdio() {
    return false;
  }
}

module.exports = PDFReporter;
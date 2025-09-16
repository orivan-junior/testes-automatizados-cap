# 📄 Geração Automática de Relatórios PDF

Este projeto agora inclui funcionalidade para gerar automaticamente relatórios em PDF a partir dos relatórios HTML gerados pelo Playwright e Allure.

## 🚀 Como Usar

### 1. **Automático**: PDF gerado após cada execução de testes

Quando você executar os testes normalmente, o PDF será gerado automaticamente:

```bash
# Executa testes BDD + gera PDF automaticamente
npm run run_bdd_playwright

# Executa testes normais + gera PDF automaticamente  
npm run run_playwright

# Executa testes específicos + gera PDF automaticamente
npm run contratacao
npm run livelo
npm run raspadinha
```

O PDF será salvo em: `reports/relatorio-testes.pdf`

### 2. **Manual**: Gerar PDF do relatório existente

Se você já tem um relatório HTML e quer apenas gerar o PDF:

```bash
# Gera PDF do relatório Playwright existente
npm run gerar-pdf-manual
```

### 3. **Completo**: Gerar todos os relatórios (Allure + Playwright)

Para gerar relatórios completos em HTML e PDF:

```bash
# Gera relatórios Allure + PDFs de ambos
npm run gerar-relatorio-completo
```

Isso irá gerar:
- `allure-report/index.html` (Allure HTML)
- `reports/playwright-relatorio.pdf` (Playwright PDF)
- `reports/allure-relatorio.pdf` (Allure PDF)

## 📁 Estrutura de Arquivos

```
projeto/
├── reports/                          # 📁 PDFs gerados
│   ├── relatorio-testes.pdf         # PDF automático após testes
│   ├── relatorio-manual.pdf         # PDF gerado manualmente
│   ├── playwright-relatorio.pdf     # PDF do Playwright (completo)
│   └── allure-relatorio.pdf         # PDF do Allure (completo)
├── playwright-report/                # 📁 Relatório HTML nativo
│   └── index.html                   # Relatório original do Playwright
├── allure-report/                    # 📁 Relatório HTML do Allure
│   └── index.html                   # Relatório do Allure
├── pdfReporter.js                    # 🔧 Reporter customizado
├── gerarPDFManual.js                # 🔧 Script para PDF manual
└── gerarRelatorioCompleto.js        # 🔧 Script para relatórios completos
```

## ⚙️ Configuração Personalizada

### Alterar caminho do PDF

Edite o arquivo `playwright.config.js`:

```javascript
['./pdfReporter.js', { 
  outputPath: 'meu-diretorio/meu-relatorio.pdf',
  customTitle: 'Meu Título Personalizado' 
}]
```

### Personalizar layout do PDF

Os arquivos de geração incluem CSS customizado para impressão. Você pode modificar:

- **Margens**: `margin: { top: '20mm', bottom: '20mm', left: '15mm', right: '15mm' }`
- **Formato**: `format: 'A4'` (ou 'Letter', 'A3', etc.)
- **Cabeçalho/Rodapé**: `headerTemplate` e `footerTemplate`

## 🎯 Vantagens da Solução

✅ **Automático**: PDF gerado após cada execução  
✅ **Flexível**: Opções manuais e completas  
✅ **Profissional**: Layout otimizado para impressão  
✅ **Integrado**: Usa a mesma infraestrutura do Playwright  
✅ **Configurável**: Títulos, caminhos e layouts personalizáveis  

## 🔧 Troubleshooting

### Erro: "Relatório HTML não encontrado"
Execute os testes primeiro para gerar o relatório:
```bash
npm run run_playwright
```

### Erro: "Cannot resolve module"
Certifique-se de que está usando Node.js 14+ e que as dependências estão instaladas:
```bash
npm install
```

### PDF em branco ou incompleto
Aumente o tempo de espera no script modificando:
```javascript
await page.waitForTimeout(3000); // Aumentar para 5000 se necessário
```

## 📧 Integração com Email/Envio

Para enviar os PDFs por email ou upload, você pode:

1. **Adicionar ao final dos scripts**: Upload para AWS S3, Google Drive, etc.
2. **Integrar com nodemailer**: Envio automático por email
3. **Webhook/API**: Notificar sistemas externos quando PDF estiver pronto

Exemplo de integração com email (adicionar ao `pdfReporter.js`):

```javascript
// No final do método onEnd()
if (this.emailConfig?.enabled) {
  await this.enviarPorEmail(this.outputPath);
}
```

## 🆕 Próximos Passos

- [ ] Integração com sistema de notificações
- [ ] Upload automático para cloud storage
- [ ] Histórico de relatórios com versionamento
- [ ] Dashboard web para visualizar PDFs antigos
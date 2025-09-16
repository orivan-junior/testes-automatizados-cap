// Script de teste para verificar se a geração de PDF está funcionando
const { promises: fs } = require('fs');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

async function testarPDF() {
  console.log('🧪 Testando funcionalidade de geração de PDF...\n');
  
  try {
    // 1. Verificar se existe relatório HTML
    console.log('1️⃣ Verificando relatório HTML existente...');
    try {
      await fs.access('playwright-report/index.html');
      console.log('✅ Relatório HTML encontrado!');
      
      // Testar geração manual
      console.log('\n2️⃣ Testando geração manual de PDF...');
      await execAsync('npm run gerar-pdf-manual');
      console.log('✅ PDF manual gerado com sucesso!');
      
    } catch {
      console.log('⚠️  Relatório HTML não encontrado.');
      console.log('📝 Executando testes para gerar relatório...');
      
      // Executar um teste simples para gerar relatório
      await execAsync('npx playwright test --project="Sistran" --headed=false || true');
      console.log('✅ Teste executado!');
    }
    
    // 3. Verificar se o diretório reports existe
    console.log('\n3️⃣ Verificando estrutura de diretórios...');
    await fs.mkdir('reports', { recursive: true });
    console.log('✅ Diretório reports criado/verificado!');
    
    // 4. Listar arquivos gerados
    console.log('\n4️⃣ Verificando arquivos gerados...');
    try {
      const files = await fs.readdir('reports');
      if (files.length > 0) {
        console.log('✅ Arquivos PDF encontrados:');
        files.forEach(file => {
          if (file.endsWith('.pdf')) {
            console.log(`   📄 ${file}`);
          }
        });
      } else {
        console.log('⚠️  Nenhum PDF encontrado ainda.');
      }
    } catch {
      console.log('⚠️  Diretório reports não existe ainda.');
    }
    
    console.log('\n🎉 Teste de configuração concluído!');
    console.log('\n📋 Próximos passos:');
    console.log('   1. Execute: npm run run_playwright');
    console.log('   2. O PDF será gerado automaticamente em reports/');
    console.log('   3. Ou use: npm run gerar-pdf-manual para gerar sob demanda');
    
  } catch (error) {
    console.error('❌ Erro durante o teste:', error.message);
    console.log('\n🔧 Possíveis soluções:');
    console.log('   • Verifique se o Node.js 14+ está instalado');
    console.log('   • Execute: npm install');
    console.log('   • Execute: npx playwright install');
  }
}

// Executa quando chamado diretamente
if (require.main === module) {
  testarPDF();
}
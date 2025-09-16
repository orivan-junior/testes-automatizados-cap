const fs = require('fs');
const path = require('path');

/**
 * Script para limpar arquivos de teste antigos e liberar espaço em disco
 */

function limparDiretorio(diretorio, padraoExclusao = null) {
  if (!fs.existsSync(diretorio)) {
    console.log(`Diretório ${diretorio} não existe`);
    return;
  }

  const arquivos = fs.readdirSync(diretorio);
  let arquivosRemovidos = 0;

  arquivos.forEach(arquivo => {
    const caminhoCompleto = path.join(diretorio, arquivo);

    try {
      const stats = fs.statSync(caminhoCompleto);

      if (stats.isDirectory()) {
        // Remove diretórios inteiros
        fs.rmSync(caminhoCompleto, { recursive: true, force: true });
        console.log(`✅ Diretório removido: ${caminhoCompleto}`);
        arquivosRemovidos++;
      } else if (stats.isFile()) {
        // Remove arquivos baseado no padrão ou se for attachment
        if (!padraoExclusao || arquivo.includes(padraoExclusao)) {
          fs.unlinkSync(caminhoCompleto);
          console.log(`✅ Arquivo removido: ${arquivo}`);
          arquivosRemovidos++;
        }
      }
    } catch (error) {
      console.log(`❌ Erro ao remover ${caminhoCompleto}: ${error.message}`);
    }
  });

  console.log(`\n📊 Total de itens removidos em ${diretorio}: ${arquivosRemovidos}`);
}

console.log('🧹 Iniciando limpeza dos arquivos de teste...\n');

// Limpa diretórios de teste-results
console.log('📁 Limpando test-results...');
limparDiretorio('./test-results');

// Limpa anexos do Allure (mantém apenas os arquivos .json)
console.log('\n📁 Limpando allure-results (apenas anexos)...');
limparDiretorio('./allure-results', 'attachment');

console.log('\n✅ Limpeza concluída!');
console.log('\n💡 Dicas para economizar espaço:');
console.log('   - Execute este script antes de cada bateria de testes');
console.log('   - Configure video: "retain-on-failure" no playwright.config.js');
console.log('   - Configure trace: "retain-on-failure" no playwright.config.js');
console.log('   - Configure screenshot: "only-on-failure" no playwright.config.js');

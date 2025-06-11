#language: pt
Funcionalidade: Jornada Contratacao e Capitalização Livelo
  
  @livelo @tcap
  Cenário: CT002 - Adquirir um Título de Capitalização - tcap-bff-contratacao-capitalizacao-livelo | Responsável: Orivan Junior
    Dado que estou na página 'https://tcap.appsti.bradseg.com.br/tcap-fed-contratacao-capitalizacao/livelo'
    E que eu adicione a quantidade de '3' títulos 
    E que eu tenha mais de um titulo e queira remover um deles
    E que clico no botão expandir 'Mais Informações' na tela inicial TCAP
    E que clico no botão expandir 'Informações de Resgate' na tela inicial TCAP
    E que clico no botão expandir 'Cotas de Capitalização' na tela inicial TCAP
    E que clico no botão expandir 'Probabilidade e tipo de' na tela inicial TCAP
    E que clico no botão expandir 'Percentual a Receber' na tela inicial TCAP
    Quando clico no botão 'Compre agora' na Jornada TCAP
    E verifico que estou na página para 'seguir com a compra'
    E preencho o campo 'Nome completo' com 'João da Silva' no formulário
    E preencho o campo 'CPF' com '13577011874' no formulário
    E preencho o campo 'Data de nascimento' com '17031957' no formulário
    E preencho o campo 'Celular' com '41991526177' no formulário
    E marco o checkbox 'Você é ou tem relação com uma pessoa exposta politicamente?' na tela TCAP
    E aguardo a tela de Atenção abrir e clico em Confirmar
    E desmarco o checkbox 'Você é ou tem relação com uma pessoa exposta politicamente?' na tela TCAP
    E clico em Info
    E verifico os termos e condições
    E clico no botão 'Avançar' na Jornada TCAP
    E verifico que estou na página para 'confirmar os dados da compra'
    E que clico no botão expandir 'Mais Informações' na tela inicial TCAP
    E marco o checkbox 'Aceitar termos de declaração e condições gerais' na tela TCAP
    E verifico os termos e condições
    E clico no botão Avançar na tela de Pagamento
    E verifico que estou na página para 'o pagamento'
    E realizo uma chamada API para realizar um pagamento
    Então aguardo o pagamento ser efetuado com sucesso
    E clico no botão 'Baixar comprovante' na Jornada TCAP
    E encerro a Jornada TCAP
#language: pt
Funcionalidade: Jornada Instantâneo Raspadinha
  
  @instantaneoRaspadinha @tcap
  Cenário: Realizar compra de um produto - Instantâneo Raspadinha
    Dado que estou na página 'https://tcap.appsti.bradseg.com.br/tcap-fed-instantaneo-raspadinha/'
    E que eu adicione a quantidade de '3' títulos
    E que eu tenha mais de um titulo e queira remover um deles
    E que clico no botão expandir 'Mais Informações' na tela inicial TCAP
    E que clico no botão expandir 'Informações de Resgate' na tela inicial TCAP
    E que clico no botão expandir 'Cotas de Capitalização' na tela inicial TCAP
    E que clico no botão expandir 'Tipo de sorteio e probabilidade' na tela inicial TCAP
    E que clico no botão expandir 'Percentual a Receber' na tela inicial TCAP
    Quando clico no botão 'Compre agora via PIX' na Jornada TCAP
    E verifico que estou na página para 'seguir com a compra'
    E clico em Info
    E verifico os termos e condições
    E preencho o campo 'Nome completo' com 'João da Silva' no formulário
    E preencho o campo 'CPF' com '13577011874' no formulário
    E preencho o campo 'Data de nascimento' com '17031957' no formulário
    E preencho o campo 'Celular' com '41991526177' no formulário
    E clico no botão 'Avançar' na Jornada TCAP
    # E verifico que estou na página para 'confirmar'
    # E que clico no botão expandir 'Mais Informações' na tela inicial TCAP
    # E marco o checkbox 'Aceitar termos de declaração e condições gerais' na tela TCAP
    # E verifico os termos e condições
    # E clico no botão Avançar na tela de Pagamento
    # E verifico que estou na página para 'o pagamento'
    # E realizo uma chamada API para realizar um pagamento
    # Então aguardo o pagamento ser efetuado com sucesso
    # E clico no botão 'Raspar agora' na Jornada TCAP
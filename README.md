# IMPULSO — Manual completo do usuário

**Motor de Produtividade Pessoal · PWA offline-first · Manual revisado para a atualização v11 (10/11/2026)**

**Aplicativo:** https://magpe-stack.github.io/Impulso/  
**Código-fonte:** https://github.com/magpe-stack/Impulso  
**Manual:** https://github.com/magpe-stack/Impulso/blob/main/README.md

> Este manual foi revisado com base nos arquivos locais da atualização v11 (`app.js`, `index.html`, `styles.css`, `sw.js` e `manifest.json`). Descreve o comportamento previsto pelo código, não uma certificação de testes em todos os dispositivos. Recursos não implementados não são apresentados como disponíveis. O software não substitui um sistema oficial de controle de jornada trabalhista.


<p align="center">
  <img src="ImpulsoCover.png" alt="Impulso — Motor de Produtividade Pessoal" width="100%">
</p>

## Sumário

1. [Apresentação e conceito](#1-apresentação-e-conceito)
2. [Requisitos e instalação](#2-requisitos-e-instalação)
3. [Primeiro acesso e navegação](#3-primeiro-acesso-e-navegação)
4. [Projetos](#4-projetos)
5. [Meu Dia e registro de ponto](#5-meu-dia-e-registro-de-ponto)
6. [Entrada manual retroativa](#6-entrada-manual-retroativa)
7. [Hábitos](#7-hábitos)
8. [Histórico e exclusões](#8-histórico-e-exclusões)
9. [Radar do Tempo e maestria](#9-radar-do-tempo-e-maestria)
10. [Arena de 50 Chefões](#10-arena-de-50-chefões)
11. [Backup e restauração](#11-backup-e-restauração)
12. [Impressão e relatórios](#12-impressão-e-relatórios)
13. [Tema, tela cheia e rodapé](#13-tema-tela-cheia-e-rodapé)
14. [Como o tempo é calculado](#14-como-o-tempo-é-calculado)
15. [Armazenamento, privacidade e funcionamento offline](#15-armazenamento-privacidade-e-funcionamento-offline)
16. [Solução de problemas](#16-solução-de-problemas)
17. [Perguntas frequentes](#17-perguntas-frequentes)
18. [Limitações e cuidados](#18-limitações-e-cuidados)
19. [Estrutura técnica do projeto](#19-estrutura-técnica-do-projeto)
20. [Glossário e roteiro de verificação](#20-glossário-e-roteiro-de-verificação)

---

## 1. Apresentação e conceito

O **Impulso** é um aplicativo pessoal para registrar períodos de atividade, organizar hábitos e visualizar o avanço de projetos. Seu nome representa o movimento inicial que transforma uma intenção em ação, seguido da constância necessária para construir resultados.

O sistema reúne sete áreas: **Início**, **Meus Projetos**, **Meu Dia**, **Hábitos**, **Histórico**, **Arena de Chefões** e **Radar do Tempo**. Cada projeto possui registros, hábitos e progresso próprios. O painel de maestria usa a meta simbólica de **10.000 horas**; essa quantidade não é garantia científica de domínio de qualquer habilidade.

A gamificação da Arena transforma minutos e conclusões registrados em dano contra adversários. Ela é um recurso motivacional, não uma medida de qualidade do trabalho.

## 2. Requisitos e instalação

### 2.1 Abrir no navegador

1. Acesse https://magpe-stack.github.io/Impulso/.
2. Aguarde o carregamento inicial com conexão à internet.
3. Verifique se a página inicial e os comandos estão disponíveis.
4. Faça um registro de teste e exporte um backup para conhecer o funcionamento.

O aplicativo foi construído com HTML, CSS e JavaScript nativos. Não exige conta, senha, servidor de dados nem assinatura.

### 2.2 Instalar como PWA

Em navegadores compatíveis, procure a opção **Instalar aplicativo**, **Adicionar à tela inicial** ou equivalente no menu do navegador. A disponibilidade varia conforme navegador, sistema e critérios de instalação. A instalação não é obrigatória para usar o Impulso.

No computador, um navegador compatível pode oferecer um ícone de instalação na barra de endereço. No Android, o menu do Chrome pode oferecer a instalação ou um atalho para a tela inicial.

### 2.3 Utilização offline

Depois de um carregamento bem-sucedido, o Service Worker tenta armazenar os arquivos essenciais para acessos sem conexão. A disponibilidade offline depende de o cache ter sido instalado corretamente e de o navegador não o ter removido. **Teste o acesso em modo avião antes de depender dele.**


### 2.4 Identidade visual e splash de quatro segundos

A identidade atual usa o **foguete vermelho**. O splash apresenta o foguete imóvel sobre fundo branco, um **anel circular de progresso** que avança durante aproximadamente **4 segundos** e a **revelação gradual** do nome **IMPULSO** e do subtítulo **Motor de Produtividade Pessoal**. O preenchimento do anel e a revelação são controlados pelo JavaScript, e não apenas por animações CSS.

<p align="center">
  <img src="logo.svg" alt="Impulso Logo" width="200">
</p>

Os ícones de instalação atuais são `rocket-192-v11.png` e `rocket-512-v11.png`, referenciados em `manifest.json`. O ícone da tela inicial do Android pode continuar antigo após uma atualização, porque o sistema operacional mantém recursos da instalação anterior. **Faça backup antes de desinstalar**; se necessário, reinstale o PWA após publicar e confirmar os novos arquivos. Não confunda o ícone instalado com o logotipo exibido dentro do aplicativo.

## 3. Primeiro acesso e navegação

Na primeira utilização, a página **Início** oferece o botão **+ Novo Projeto**. Sem projeto ativo, os módulos dependentes de projeto não exibem dados operacionais.

No celular e no computador, o botão **☰ (menu hambúrguer)** no canto superior esquerdo abre o painel de navegação e ferramentas. O logotipo do foguete no cabeçalho leva ao início. No menu estão também **Novo Projeto**, **Registrar Ponto**, **Entrada Manual**, **Backup**, **Importar / Restaurar**, **Imprimir**, **Alternar tema**, **Tela cheia**, **Sobre** e os links do projeto.

A navegação principal apresenta:

| Área | Finalidade |
|---|---|
| Início | Resumo do projeto ativo e atalhos |
| Meus Projetos | Criar, abrir, renomear, excluir e imprimir projetos |
| Meu Dia | Registrar ponto e consultar cartões diários |
| Hábitos | Criar hábitos e confirmar execuções |
| Histórico | Consultar os registros do projeto |
| Arena de Chefões | Acompanhar os 50 adversários e o dano acumulado |
| Radar do Tempo | Visualizar o ciclo angular e a meta de 10.000 horas |

O projeto ativo é aquele aberto mais recentemente ou criado por último. A seleção é mantida no armazenamento local.

## 4. Projetos

### 4.1 Criar um projeto

1. Clique em **+ Novo Projeto**.
2. Digite o nome, com no máximo **50 caracteres**.
3. Selecione **Criar projeto**.

O sistema registra automaticamente a data e a hora da criação. O novo projeto passa a ser o ativo, com lista de registros e hábitos inicialmente vazia.

### 4.2 Abrir outro projeto

Acesse **Meus Projetos** e clique em **Abrir** no projeto desejado. As informações de Meu Dia, Hábitos, Histórico, Arena e Radar passam a corresponder ao projeto selecionado.

### 4.3 Renomear

Em **Meus Projetos**, selecione **Renomear**, informe o novo nome (até 50 caracteres) e confirme em **Salvar**. Os registros permanecem associados ao mesmo projeto.

### 4.4 Excluir

Clique na **lixeira** do projeto e confirme. A exclusão elimina o projeto inteiro, inclusive seus registros, hábitos e progresso. **Não há lixeira de recuperação nem desfazer**; um backup anterior pode permitir restaurar dados, mas a restauração substitui o conjunto atual.

### 4.5 Imprimir lista

O botão **Imprimir lista** gera uma apresentação imprimível com nome, data de criação e tempo acumulado de cada projeto.

## 5. Meu Dia e registro de ponto

**Meu Dia** organiza os registros em cartões por data, com títulos no formato `Meu Dia DD-MM-AAAA`, por exemplo `Meu Dia 09-11-2026`. Cada cartão apresenta o total trabalhado naquela data.

A tabela mostra **Tipo**, **Horário**, **Observação** e uma **lixeira**. Os tipos são **▶ Início**, **■ Término**, **✓ Hábito** e **✎ Atividade**. A observação é opcional e limitada a 50 caracteres.

### 5.1 Registrar ponto imediatamente

1. Abra **Meu Dia** e clique em **Ponto**; também é possível usar **Registrar Ponto** no menu hambúrguer ou na página inicial.
2. Na janela **Registrar ponto**, confira a data e a hora apresentadas.
3. Verifique o tipo pré-selecionado.
4. Digite uma observação, se desejar.
5. Clique em **Registrar agora**.

O horário efetivamente salvo é capturado no momento da confirmação. A data/hora exibida ao abrir a janela é uma referência inicial e **não é atualizada continuamente** enquanto a janela permanece aberta.

### 5.2 Alternância automática

O sistema consulta o último registro de ponto do projeto, em ordem cronológica:

- Sem registros de ponto, sugere **Início**.
- Se o último registro é **Início**, sugere **Término**.
- Se o último registro é **Término**, sugere **Início**.

É possível alterar manualmente a opção. Quando a escolha diverge da sequência esperada, o aplicativo pede confirmação. Entradas manuais também participam da sequência, e os registros de hábitos não a alteram.

**Atenção:** a alternância não é reiniciada automaticamente à meia-noite. Ela considera o último ponto cronológico do projeto, inclusive em dias anteriores. Registros duplicados ou fora de ordem podem prejudicar o cálculo de períodos; revise o histórico após correções retroativas.

### 5.3 Observações e contador

O campo aceita até 50 caracteres e mostra a contagem, como `0/50`. Clique em **Cancelar** para fechar sem registrar. O texto da observação não altera a duração contabilizada.

### 5.4 Ordem dos cartões

O filtro permite escolher **Mais antigos primeiro** ou **Mais recentes primeiro**. A ordenação afeta a apresentação, não as datas nem o cálculo do tempo.

### 5.5 Lixeira de registro

Cada linha possui um botão de exclusão. Ao clicar, confirme a operação. O registro é removido do projeto e os indicadores são recalculados. Excluir um Início ou Término pode modificar o pareamento dos demais pontos.

## 6. Entrada manual retroativa

Use **Entrada Manual** para acrescentar uma **atividade completa**, com horário de início e término, inclusive retroativamente. Este comando não abre o formulário de Novo Projeto.

1. Abra **Entrada Manual** no menu hambúrguer ou na área **Meu Dia**.
2. Informe **Dia**, **Mês** e **Ano**.
3. Digite o **título da atividade** (até 50 caracteres).
4. Escolha a **hora e o minuto de início** e a **hora e o minuto de término**, no formato de 24 horas.
5. Adicione uma **observação opcional** (até 50 caracteres), quando disponível.
6. Confirme o lançamento e confira a atividade em **Meu Dia** e no **Histórico**.

A atividade é salva como um intervalo único, do tipo **Atividade**, e entra no cálculo de tempo sem duplicar minutos sobrepostos. O formulário usa precisão de minutos. Não há edição direta de registros: para corrigir um lançamento, exclua o incorreto e crie outro.

**Exemplo:** para registrar trabalho em 10/09/2027, das 14h00 às 15h30, crie **uma atividade** com essa data, título e horários. Não é necessário criar dois pontos separados.

**Sem projeto ativo:** o botão abre uma mensagem específica de **Entrada manual (retroativa)**, solicitando que você selecione um projeto; não deve abrir **Novo Projeto**.

## 7. Hábitos

A lista de hábitos começa vazia em cada projeto.

### 7.1 Criar

1. Abra **Hábitos**.
2. Clique em **+ Criar hábito**.
3. Informe o nome, com até **50 caracteres**.
4. Defina a duração estipulada em minutos, de **1 a 1.440**.
5. Confirme em **Criar hábito**.

### 7.2 Concluir

Cada hábito possui um **Pomodoro** com contador regressivo e barra de progresso. Os controles permitem **Iniciar**, **Pausar**, **Retomar**, **Concluir** e **Reiniciar**, conforme o estado do cronômetro.

1. Clique em **Iniciar** para começar a contar o tempo.
2. Use **Pausar** e **Retomar** quando necessário.
3. Clique em **Concluir** e confirme para registrar o tempo efetivamente executado. O sistema guarda os segmentos de execução, excluindo os períodos de pausa.
4. Use **Reiniciar** para descartar a sessão de Pomodoro em andamento, após confirmação.

A execução concluída aparece em **Meu Dia** e no **Histórico**. A contagem de tempo combina intervalos sobrepostos para evitar dupla contabilização com os registros de ponto. O contador depende do relógio do dispositivo e da execução do aplicativo; não é um cronômetro de precisão metrológica.

**Observação técnica:** o código também mantém uma rotina interna de conclusão retroativa de hábitos, mas a interface principal atual apresenta os controles do Pomodoro.

### 7.3 Excluir um hábito

Clique na lixeira ao lado do hábito. A definição do hábito é excluída, mas **as execuções já registradas permanecem** no histórico e nas métricas até serem excluídas individualmente. Não há comando para editar um hábito já criado; exclua-o e crie outro com a configuração desejada.

## 8. Histórico e exclusões

O **Histórico** reúne pontos, execuções de hábitos e atividades manuais entre os registros do projeto ativo em ordem decrescente de data/hora. Exibe o tipo, a data e hora do registro, um campo de término e a observação.

Para os eventos de ponto, cada linha é um evento isolado: **Início** ou **Término**. O Histórico não apresenta automaticamente os dois eventos como uma única linha de sessão. Para hábitos e atividades manuais, a linha contém início e término da execução.

Todos os registros exibidos têm lixeira individual. Excluir um registro altera, conforme o caso, o total trabalhado, o progresso da meta, o radar e o dano na Arena.

Não existe recuperação automática de exclusões, controle de versões nem auditoria imutável. Faça backup antes de operações importantes.

## 9. Radar do Tempo e maestria

O **Radar Espacial do Tempo** representa o tempo contabilizado do projeto em ciclos de uma hora:

| Tempo no ciclo | Ângulo |
|---|---:|
| 15 minutos | 90° |
| 30 minutos | 180° |
| 45 minutos | 270° |
| 60 minutos | 360° — ciclo completo |

No **anel externo**, a fórmula atual é **1 grau a cada 10 segundos** (6 graus por minuto). No **anel interno**, o ponteiro percorre **60 segundos** por volta. Ao completar uma hora o indicador angular externo retorna a **0°** para iniciar o próximo ciclo, enquanto o contador de horas completas aumenta. Portanto, 60 minutos aparecem como **0° no novo ciclo**, não como um arco permanente de 360°.

O módulo também exibe o tempo total, a meta de **10.000 horas**, as horas restantes e o percentual de maestria. A meta é calculada por projeto, sem somar outros projetos.

## 10. Arena de 50 Chefões

A **Arena** possui 50 adversários nomeados, do **Sentinela das Cinzas** ao **Arquichefão do Impulso**. Cada projeto tem progressão independente.

O dano total é calculado a partir de:

- **1 ponto de dano por minuto inteiro** de tempo contabilizado no projeto;
- **5 pontos adicionais** por registro do tipo **Término**, execução de **Hábito** ou **Atividade** manual concluída.

A vida máxima de cada adversário aumenta conforme a fórmula `HP = 100 + 75 × n + 12 × n²`, em que `n` começa em zero para o primeiro chefão. O dano acumulado é aplicado sequencialmente: ao esgotar a vida de um adversário, o restante passa ao seguinte.

A Arena apresenta o adversário atual, sua barra de vida, os chefões derrotados e a lista dos 50 níveis. O tamanho do símbolo visual aumenta progressivamente até o limite definido no layout. Os chefões são representados por emojis, não por animações de combate.

Não existe botão separado de ataque: o progresso deriva dos registros. Excluir registros pode reduzir o dano total e até fazer o projeto voltar a um chefão anterior.

## 11. Backup e restauração

### 11.1 Criar backup

Clique em **Backup**. O navegador inicia o download de um arquivo JSON com nome semelhante a:

`impulso-backup-09-11-2026.json`

O backup reúne **todos os projetos**, seus nomes, datas de criação, registros, hábitos e a identificação do projeto ativo. O arquivo contém datas e horários dos registros, mas **não cria documentos individuais de Meu Dia**. O tema visual não faz parte desse JSON, pois é armazenado em outra chave local. Os registros de **Atividade**, incluindo título, início, término e observação, também são preservados no JSON.

### 11.2 Restaurar

1. Clique em **Importar / Restaurar**.
2. Escolha um arquivo JSON previamente exportado pelo Impulso.
3. Leia a confirmação.
4. Confirme somente se deseja substituir os dados atuais.

**A restauração substitui todos os projetos existentes; não mescla dados.** O arquivo é submetido a verificações básicas de estrutura e tamanho (limite de 40 MB). Arquivos de outros aplicativos ou formatos incompatíveis são recusados.

### 11.3 Política recomendada de cópias

Faça backup ao final de sessões importantes e antes de limpar dados do navegador, trocar de aparelho, restaurar arquivos ou atualizar o software. Guarde cópias fora do próprio navegador, preferencialmente em dois locais independentes. Verifique periodicamente se o arquivo foi baixado corretamente.

**O JSON não é criptografado.** Quem tiver acesso ao arquivo poderá ler os nomes, datas e observações registrados.

## 12. Impressão e relatórios

No módulo **Meu Dia**, clique em **Imprimir** para gerar o relatório do projeto ativo. Ele inclui:

- nome do projeto e data/hora de emissão;
- resumo de tempo, hábitos, chefões e progresso de maestria;
- cartões `Meu Dia DD-MM-AAAA` com total trabalhado;
- tabela com tipo de registro, horário, término quando aplicável e observação.

A impressão é aberta pelo mecanismo do navegador. Você pode escolher impressora física ou **Salvar como PDF**, se o sistema oferecer essa opção. O aplicativo não possui um gerador independente de PDF.

A opção **Imprimir lista**, em **Meus Projetos**, produz um relatório simplificado de todos os projetos. **Nota de revisão:** o código atual da impressão possui uma condição que pode rotular incorretamente uma **Atividade** manual como **Término**; a documentação não deve tratar essa identificação como corrigida antes de uma atualização do `app.js`.

**Atenção à apresentação:** nos registros de ponto, o relatório lista Início e Término separadamente; a coluna de término não constitui um pareamento automático de sessões. Para uma execução de hábito, há início e término na mesma linha. A qualidade final da paginação depende também do navegador e das configurações de impressão.

## 13. Tema, tela cheia e rodapé

### 13.1 Tema claro e escuro

Abra o menu hambúrguer e use **◐ Alternar tema** para alternar entre os modos. O tema claro é o padrão na primeira utilização; a escolha fica guardada no navegador.

A identidade cromática usa cores vermelhas, rosas e alaranjadas derivadas do estudo Itten. A aparência efetiva depende das regras do `styles.css` e da renderização do navegador.

### 13.2 Tela cheia

O botão **⛶ Tela cheia**, no menu hambúrguer, solicita o modo de tela cheia. O navegador pode bloquear a operação ou não disponibilizá-la, especialmente em alguns dispositivos móveis. Use o mesmo botão ou o comando do sistema para sair.

### 13.3 Rodapé

O menu hambúrguer apresenta os links para o **PWA oficial**, o **repositório GitHub**, o **Manual** e o botão **Sobre**, que explica o significado do nome Impulso e alerta sobre a necessidade de backups.

## 14. Como o tempo é calculado

### 14.1 Pares de ponto

Os registros de ponto são ordenados cronologicamente. Um **Início** abre um intervalo; um **Término** posterior fecha esse intervalo. Intervalos sem término não são adicionados ao total acumulado.

Se houver um novo Início antes do Término do intervalo aberto, a implementação mantém o primeiro início. Um Término sem Início aberto não produz duração. Isso reforça a importância de corrigir duplicações e lançamentos incorretos.

### 14.2 Hábitos e sobreposição

Cada hábito concluído cria um intervalo com início e término. O aplicativo une os intervalos que se sobrepõem para não contar o mesmo período duas vezes na soma de tempo.

Exemplo: ponto das 10h às 11h e hábito das 10h30 às 11h geram **1 hora**, não 1h30, no tempo total. A conclusão do hábito ainda conta como evento adicional para o bônus de dano da Arena.

### 14.3 Virada de dia

Se um intervalo vai de 23h30 até 00h30 do dia seguinte, o tempo é dividido por dia civil: **30 minutos para cada dia**. Entretanto, os eventos individuais aparecem nos cartões correspondentes às suas próprias datas de registro. Um dia pode apresentar tempo contabilizado mesmo sem ter uma linha de Início ou Término própria.

### 14.4 Precisão e arredondamento

Os registros imediatos guardam data/hora com precisão de milissegundos internamente e são exibidos com segundos. As entradas manuais usam minutos. A apresentação `0h 04min` trunca os segundos restantes; o dano por tempo também considera apenas minutos inteiros no total acumulado.

## 15. Armazenamento, privacidade e funcionamento offline

A atualização v11 continua guardando o estado dos projetos em **localStorage**, na chave `impulso-data-v1`. A preferência visual fica na chave `impulso-theme`. **Não há IndexedDB implementado nesta versão.**

Os dados não são enviados pelo código do aplicativo a uma API de sincronização. O site é hospedado no GitHub Pages, e o navegador realiza requisições normais para obter seus arquivos. Links externos do rodapé abrem seus respectivos destinos.

Na atualização v11, o Service Worker usa o cache `impulso-v11-rocket-form-splash`. Para navegação, tenta a rede e recorre ao HTML em cache quando necessário; para outros recursos locais, prioriza a cópia em cache quando existente. O cache de arquivos **não é o mesmo que o armazenamento dos projetos**.

**Riscos:** limpar os dados do site, usar navegação privada, trocar de navegador/aparelho, desinstalar com remoção dos dados, atingir limites de armazenamento ou sofrer falha do dispositivo pode provocar perda de informações. Não existe sincronização automática entre dispositivos.

## 16. Solução de problemas

| Sintoma | Causa possível | O que fazer |
|---|---|---|
| Página 404 | Arquivo ou caminho incorreto no GitHub Pages | Confira a URL, a publicação e a presença de `index.html` na raiz |
| Tela presa no splash | Erro de JavaScript ou versão antiga em cache | Recarregue, abra o console do navegador e confira se `app.js` foi publicado corretamente; faça backup antes de limpar dados |
| Registrar Ponto ou Entrada Manual abre Novo Projeto | Pode haver arquivos antigos misturados ou cache desatualizado | Publique `index.html`, `app.js`, `manifest.json`, `sw.js` e os ícones da mesma versão; confira os comandos em janela atualizada e preserve o backup antes de limpar dados |
| Ícone antigo no Android | O atalho instalado conserva o ícone anterior | Confira o manifesto v11 e os novos PNG; faça backup antes de reinstalar o PWA |
| Splash sem anel ou sem revelação | HTML, CSS e JS de versões diferentes ou erro de script | Confira o anel SVG no `index.html`, o `startSplash()` no `app.js` e as requisições de recursos |
| Novo Projeto não responde | Falha de script ou elemento de interface ausente | Verifique o console, `index.html` e `app.js`; teste em aba normal atualizada |
| Dados sumiram | Limpeza ou troca de armazenamento/perfil | Procure backup JSON; não há recuperação automática |
| Total de horas menor que o esperado | Início sem Término ou intervalos sobrepostos | Revise o Histórico e os pares de ponto |
| Total inesperado após entrada retroativa | Registro duplicado ou sequência cronológica inconsistente | Revise datas, horas e tipos; exclua e recrie o lançamento incorreto |
| Botão Ponto sugere tipo inesperado | Último evento cronológico do projeto determina a sugestão | Confira registros manuais e eventos de dias anteriores |
| Pomodoro não avança em segundo plano | Restrições de execução do navegador ou aplicativo suspenso | Mantenha o aplicativo aberto durante o uso e confira o registro ao concluir |
| Instalação PWA não aparece | Critérios do navegador ou configuração da publicação | Abra via HTTPS, verifique manifest e Service Worker, e use o navegador compatível |
| Não abre offline | Cache inicial incompleto ou removido | Conecte à internet, carregue novamente e teste antes de desconectar |
| Importação recusada | JSON incompatível, inválido ou acima de 40 MB | Selecione um backup exportado pela versão compatível do Impulso |
| Impressão com aparência diferente | Motor de impressão ou opções de papel/margem | Ajuste escala, orientação e margens na visualização de impressão |
| Tela cheia indisponível | Restrição do navegador | Use o aplicativo na janela normal ou instalado como PWA |

### Diagnóstico sem apagar os dados

1. Exporte um backup, se o aplicativo ainda permitir.
2. Verifique se os arquivos `index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.json` e os ícones foram publicados corretamente.
3. Abra as ferramentas do desenvolvedor e consulte **Console** para erros de JavaScript e **Network/Rede** para falhas de carregamento.
4. Teste a atualização da página com conexão ativa.
5. Só considere limpar armazenamento/cache após confirmar que possui backup recuperável.

## 17. Perguntas frequentes

**Preciso de internet para registrar ponto?**  
Não, desde que os arquivos necessários estejam disponíveis no navegador e o aplicativo abra corretamente offline.

**Os projetos compartilham horas?**  
Não. Cada projeto tem registros e progresso independentes.

**O tempo continua aumentando enquanto um Início está aberto?**  
Sim, no contador ao vivo da página inicial e no Radar. O total consolidado dos relatórios considera os intervalos encerrados.

**Posso lançar registros de meses anteriores?**  
Sim, pela Entrada manual, respeitando a validação de datas e horários.

**Posso editar um registro?**  
Não diretamente nesta versão. Exclua e lance novamente.

**O botão de lixeira existe em todos os registros?**  
Há lixeira para projetos, definições de hábitos e registros de ponto/hábitos exibidos em Meu Dia e Histórico. A exclusão não é reversível no aplicativo.

**Apagar a definição de um hábito apaga suas execuções?**  
Não. As execuções anteriores permanecem até serem removidas individualmente.

**O backup contém todos os projetos?**  
Sim. A restauração substitui o conjunto completo existente.

**O backup contém as preferências de tema?**  
Não. O tema é armazenado separadamente.

**Posso compartilhar dados entre celular e computador automaticamente?**  
Não. Para transferir, exporte um backup em um dispositivo e restaure no outro, lembrando que a restauração substitui os dados de destino.

**10.000 horas garantem maestria?**  
Não. É uma referência motivacional, não uma certificação de competência.

## 18. Limitações e cuidados

A versão descrita neste manual possui limitações relevantes:

1. **Sem sincronização em nuvem** ou conta de usuário.
2. **Sem edição direta** de registros ou hábitos já cadastrados.
3. **Pomodoro local**: existe cronômetro com pausa e retomada, mas não há garantia de execução ininterrupta em segundo plano ou de precisão absoluta.
4. **Sem pareamento visual automático de sessões de ponto** no Histórico ou no relatório de impressão (atividades manuais e hábitos já são intervalos únicos).
5. **Sem validação rigorosa de todas as sequências de ponto**: o usuário pode confirmar uma sequência atípica.
6. **Sem desfazer exclusões** nem mesclagem de backups.
7. **Sem garantia de armazenamento permanente** pelo navegador.
8. **Sem PDF nativo**: a exportação em PDF depende da impressão do navegador.
9. **Sem comprovação de conformidade WCAG** por auditoria automatizada e manual; a paleta e os estilos devem ser testados em dispositivos reais.
10. **Sem garantia de execução ou homologação em todos os navegadores**; a publicação exige testes funcionais.

Para registros de jornada com finalidade jurídica, trabalhista ou contratual, verifique as exigências legais aplicáveis e use um sistema apropriado. O Impulso foi concebido como ferramenta pessoal de organização.

## 19. Estrutura técnica do projeto

```text
Impulso/
├── index.html       # Estrutura, navegação e elementos-base
├── styles.css       # Aparência, responsividade e impressão
├── app.js           # Estado, registros, hábitos, Arena e relatórios
├── sw.js            # Cache offline de recursos
├── manifest.json    # Metadados de instalação do PWA
├── rocket-192-v11.png  # Ícone do foguete, 192 × 192
├── rocket-512-v11.png  # Ícone do foguete, 512 × 512
├── logo.png            # Foguete do splash
├── logo.svg            # Foguete do cabeçalho
└── README.md        # Este manual
```

A aplicação é executada inteiramente no navegador. O código usa `localStorage`, `crypto.randomUUID` quando disponível, `<dialog>`, `Blob`, `FileReader`, SVG, a API de impressão e a API de Service Worker. Algumas funcionalidades dependem do suporte do navegador.

O armazenamento JSON usa o campo `version: 1`. Alterações futuras no formato dos dados devem considerar migrações e compatibilidade de backups.

## 20. Glossário e roteiro de verificação

**Projeto ativo:** projeto cujos dados aparecem nos módulos operacionais.  
**Ponto:** evento de início ou término de uma atividade.  
**Intervalo:** duração entre um início e um término válidos.  
**Entrada retroativa:** evento criado com data/hora anterior.  
**Hábito:** atividade recorrente definida com duração estipulada.  
**HP:** pontos de vida de um chefão.  
**Dano:** pontos de progresso derivados dos registros.  
**Radar:** representação angular do tempo dentro de um ciclo de 60 minutos.  
**PWA:** aplicação web que pode oferecer instalação e funcionamento offline.  
**Backup:** cópia exportada dos dados em JSON.

### Roteiro de teste recomendado após publicar

- [ ] Abrir o site sem erro e concluir a tela inicial.
- [ ] Criar um projeto com nome válido.
- [ ] Criar outro projeto e confirmar que os dados ficam separados.
- [ ] Registrar Início e conferir se o próximo Ponto sugere Término.
- [ ] Registrar Término e conferir se o próximo Ponto sugere Início.
- [ ] Criar um par de entradas retroativas e conferir o total do dia.
- [ ] Criar e concluir um hábito e verificar Meu Dia e Histórico.
- [ ] Conferir o radar, a Arena e o progresso do projeto.
- [ ] Excluir um registro de teste e verificar o recálculo.
- [ ] Exportar um backup e confirmar o arquivo no dispositivo.
- [ ] Restaurar um backup de teste, sabendo que substituirá os dados atuais.
- [ ] Abrir a impressão do projeto e da lista de projetos.
- [ ] Confirmar que **Ponto** abre **Registrar ponto** e **Entrada Manual** abre **Entrada manual**, nunca **Novo Projeto**.
- [ ] Verificar o anel de progresso e a revelação do nome no splash de 4 segundos.
- [ ] Conferir o foguete como ícone de instalação no Android, com backup prévio se for reinstalar.
- [ ] Testar o Pomodoro (iniciar, pausar, retomar, concluir e reiniciar).
- [ ] Testar o tema claro/escuro e a tela cheia.
- [ ] Verificar a abertura offline após o primeiro carregamento completo.
- [ ] Verificar o comportamento em celular e computador.

---

**Impulso — Motor de Produtividade Pessoal**  
*O progresso nasce da ação, ganha força na constância e se revela no tempo.*

**Manual revisado para a atualização v11.** Antes de atualizar ou reinstalar o aplicativo, preserve uma cópia de seus dados.

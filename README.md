# IMPULSO — Manual completo do usuário

**Motor de Produtividade Pessoal · PWA offline-first · Manual atualizado para a versão v16 (10/11/2026)**

**Aplicativo:** https://magpe-stack.github.io/Impulso/  
**Código-fonte:** https://github.com/magpe-stack/Impulso  
**Manual:** https://github.com/magpe-stack/Impulso/blob/main/README.md

> Este manual foi atualizado a partir do README fornecido e confrontado com os arquivos locais da versão v16 (`app.js`, `index.html`, `styles.css`, `sw.js` e `manifest.json`). As funcionalidades descritas refletem o código disponível, não testes certificados em todos os dispositivos. O Impulso não substitui um sistema oficial de controle de jornada trabalhista.

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
8. [Registros e exclusões em Meu Dia](#8-registros-e-exclusões-em-meu-dia)
9. [Radar do Tempo e maestria](#9-radar-do-tempo-e-maestria)
10. [Arena de 200 Chefões](#10-arena-de-100-chefões)
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

O sistema reúne sete áreas: **Início**, **Ponto**, **Meus Projetos**, **Meu Dia**, **Hábitos**, **Arena de Chefões** e **Radar do Tempo**. Cada projeto possui registros, hábitos e progresso próprios. O painel de maestria usa a meta simbólica de **10.000 horas**; essa quantidade não é garantia científica de domínio de qualquer habilidade.

A gamificação da Arena transforma minutos e conclusões registrados em dano contra adversários. Ela é um recurso motivacional, não uma medida de qualidade do trabalho.

## 2. Requisitos e instalação

### 2.1 Abrir no navegador

1. Acesse https://magpe-stack.github.io/Impulso/.
2. Aguarde o carregamento inicial com conexão à internet.
3. Verifique se a página inicial e os comandos estão disponíveis.
4. Faça um registro de teste, use **Exportar** para salvar o projeto individual e **Backup Geral** para salvar todos os projetos.

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

No celular e no computador, o botão **☰ (menu hambúrguer)** no canto superior esquerdo abre o painel de navegação e ferramentas. O logotipo do foguete no cabeçalho leva ao início. No menu estão também **Novo Projeto**, **Registrar Ponto**, **Entrada Manual**, **Backup Geral**, **Restaurar Backup**, **Imprimir**, **Alternar tema**, **Tela cheia**, **Sobre** e os links do projeto.

A navegação principal apresenta:

| Área | Finalidade |
|---|---|
| Início | Resumo do projeto ativo e atalhos |
| Ponto | Iniciar, acompanhar e terminar trabalhos cronometrados |
| Meus Projetos | Criar, abrir, renomear, excluir e imprimir projetos |
| Meu Dia | Consultar registros organizados por dia e seus totais |
| Hábitos | Criar hábitos e confirmar execuções |

| Arena de Chefões | Acompanhar os 100 adversários e o dano acumulado |
| Radar do Tempo | Visualizar o ciclo angular e a meta de 10.000 horas |

O projeto ativo é aquele selecionado mais recentemente ou criado por último. A seleção é mantida no armazenamento local.

## 4. Projetos

### 4.1 Criar um projeto

1. Clique em **+ Novo Projeto**.
2. Digite o nome, com no máximo **50 caracteres**.
3. Selecione **Criar projeto**.

O sistema registra automaticamente a data e a hora da criação. O novo projeto passa a ser o ativo, com lista de registros e hábitos inicialmente vazia.

### 4.2 Abrir outro projeto

Acesse **Meus Projetos** e clique em **Abrir** no projeto desejado. As informações de Meu Dia, Hábitos, Arena e Radar passam a corresponder ao projeto selecionado.

### 4.3 Renomear

Em **Meus Projetos**, selecione **Renomear**, informe o novo nome (até 50 caracteres) e confirme em **Salvar**. Os registros permanecem associados ao mesmo projeto.

### 4.4 Excluir

Clique na **lixeira** do projeto e confirme. A exclusão elimina o projeto inteiro, inclusive seus registros, hábitos e progresso. **Não há lixeira de recuperação nem desfazer**; um backup anterior pode permitir restaurar dados, mas a restauração substitui o conjunto atual.

### 4.5 Imprimir lista

O botão **Imprimir lista** gera uma apresentação imprimível com nome, data de criação e tempo acumulado de cada projeto.

## 5. Meu Dia e registro de ponto

### 5.1 Ponto: registrar um trabalho em tempo real

A página **Ponto** possui um painel próprio, integrado à navegação, **sem janela modal bloqueante**.

1. Abra **Ponto** pelo menu ou pelo botão de atalho.
2. No campo **Nome do trabalho**, informe o que será realizado (até **50 caracteres**).
3. Clique em **Iniciar**. O aplicativo grava automaticamente a **data e a hora de início**.
4. Continue trabalhando. Você pode visitar outras páginas do Impulso ou fechar e reabrir o aplicativo no mesmo navegador: o início fica salvo no armazenamento local.
5. Retorne à página **Ponto** e clique em **Terminar e salvar**. Confirme a ação.
6. O aplicativo registra a **data e a hora de término** e lança automaticamente a atividade no **Meu Dia**.

Enquanto o trabalho está aberto, o painel mostra o nome, o horário inicial e um contador de duração. A contagem é calculada pela diferença entre horários, e não pela quantidade de atualizações visuais; por isso, a duração pode ser recuperada quando o aplicativo volta a ser aberto. **O trabalho não é encerrado automaticamente** quando a página é fechada.

Não é necessário clicar em um terceiro botão **Concluir**: na versão atual, **Terminar e salvar** encerra e grava a atividade. Um botão adicional de gravação só aparece para recuperar sessões encerradas em versões anteriores.

### 5.2 Trabalhos que atravessam a meia-noite

O Ponto suporta naturalmente trabalhos que começam em um dia e terminam no seguinte. Exemplo:

| Campo | Valor |
|---|---|
| Nome | Desenvolvimento do aplicativo |
| Início | 10/11/2026 — 23:00 |
| Término | 11/11/2026 — 01:00 |
| Duração | 2 horas |

A atividade permanece **em um único registro original**, mas é exibida nos cartões de todos os dias envolvidos. O cálculo dos totais diários divide o tempo pelo calendário: nesse exemplo, **1 hora no dia 10** e **1 hora no dia 11**.

### 5.3 Meu Dia

**Meu Dia** organiza as atividades do projeto em cartões intitulados `Meu Dia DD-MM-AAAA`. Cada atividade aparece em todos os cartões dos dias em que houve trabalho, sem duplicar o registro original. Os cartões podem ser ordenados dos mais antigos aos mais recentes ou vice-versa.

As colunas são exatamente **Atividade | Nome | Início | Término | 🗑**, nessa ordem. Os tipos de atividade são **Ponto**, **Hábito** e **Entrada Manual**. O campo **Nome** exibe o nome do trabalho ou do hábito, e os horários apresentam data e hora completas.

O **total trabalhado** de cada dia considera a parte de todos os intervalos que realmente ocorreu naquela data, inclusive quando uma atividade começou no dia anterior. Uma atividade iniciada no dia anterior também aparece no cartão do dia seguinte, com a duração correspondente àquele dia.

A lixeira exclui o registro, após confirmação, e recalcula os totais e a Arena. Não há desfazer.

## 6. Entrada manual retroativa

A **Entrada Manual** serve para registrar um trabalho que já aconteceu, sem usar o cronômetro do Ponto. Seu formulário é independente.

1. Abra **Entrada Manual** pelo menu ou pelos atalhos.
2. Informe a **data de início** (dia, mês e ano).
3. Digite o **nome da atividade**, com até **50 caracteres**.
4. Selecione a **hora de início**, a **data de término** e a **hora de término**.
5. Clique em **Lançar entrada**.

O formulário atual **não possui campo Observação**. O nome informado aparece na coluna **Nome**, e a coluna **Atividade** exibe **Entrada Manual**.

**Na versão 24**, o formulário manual permite selecionar separadamente a data de início e a data de término, inclusive quando a atividade atravessa a meia-noite. Os horários manuais têm precisão de minutos; o término precisa ser posterior ao início e não pode estar no futuro.

O aplicativo impede um intervalo manual cujo término não seja posterior ao início. Não há edição direta: para corrigir, exclua o registro incorreto e crie outro.

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

A execução concluída aparece em **Meu Dia**, com **Hábito** na coluna Atividade e o nome cadastrado na coluna Nome. A contagem de tempo combina intervalos sobrepostos para evitar dupla contabilização com os registros de ponto. O contador depende do relógio do dispositivo e da execução do aplicativo; não é um cronômetro de precisão metrológica.

**Observação técnica:** o código também mantém uma rotina interna de conclusão retroativa de hábitos, mas a interface principal atual apresenta os controles do Pomodoro.

### 7.3 Excluir um hábito

Clique na lixeira ao lado do hábito. A definição do hábito é excluída, mas **as execuções já registradas permanecem** no histórico e nas métricas até serem excluídas individualmente. Não há comando para editar um hábito já criado; exclua-o e crie outro com a configuração desejada.

## 8. Registros e exclusões em Meu Dia

O **Meu Dia** reúne **todos os registros do projeto ativo desde sua criação**, separados em cartões por dia efetivamente trabalhado. É possível alterar a ordem dos dias.

Meu Dia utiliza as seguintes colunas:

| Atividade | Nome | Início | Término | 🗑 |
|---|---|---|---|---|
| Ponto | Desenvolvimento | 10/11/2026 23:00 | 11/11/2026 01:00 | 🗑 |
| Hábito | Leitura | 11/11/2026 09:00 | 11/11/2026 09:30 | 🗑 |
| Entrada Manual | Revisão | 11/11/2026 10:00 | 11/11/2026 11:00 | 🗑 |

*Os dados acima são exemplos ilustrativos.*

- **Atividade:** apenas **Ponto**, **Hábito** ou **Entrada Manual**.
- **Nome:** o nome cadastrado no respectivo formulário, limitado a 50 caracteres.
- **Início e Término:** datas e horários completos; registros antigos incompletos podem exibir um traço.
- **Lixeira:** remove a atividade, após confirmação, e recalcula as métricas.

**Compatibilidade histórica:** pares antigos de eventos **Início/Término** são apresentados juntos quando o aplicativo encontra um par correspondente. Um evento antigo sem par permanece visível, sem inventar o horário ausente. A exclusão de um par antigo remove os dois eventos associados.

Cada cartão possui seu próprio botão **Imprimir**, que imprime apenas os registros e o total trabalhado daquela data.

## 9. Radar do Tempo e maestria

O **Radar Espacial do Tempo** representa o tempo contabilizado do projeto em ciclos de uma hora:

| Tempo no ciclo | Ângulo |
|---|---:|
| 15 minutos | 90° |
| 30 minutos | 180° |
| 45 minutos | 270° |
| 60 minutos | 360° — ciclo completo |

No **anel externo**, a fórmula atual é **1 grau a cada 10 segundos** (6 graus por minuto). No **anel interno**, o ponteiro percorre **60 segundos** por volta. Ao completar uma hora o indicador angular externo retorna a **0°** para iniciar o próximo ciclo, enquanto o tempo acumulado continua aumentando no indicador **Tempo total**. Portanto, 60 minutos aparecem como **0° no novo ciclo**, não como um arco permanente de 360°.

O módulo também exibe o tempo total, a meta de **10.000 horas**, as horas restantes e o percentual de maestria. A meta é calculada por projeto, sem somar outros projetos.

## 10. Arena de 200 Chefões

A Arena possui **100 adversários**, começando pela **Sentinela das Cinzas** e terminando no **Arquichefão do Impulso**. Os 50 adversários originais foram mantidos; outros 50 foram adicionados. Cada projeto possui sua própria Arena.

A progressão está distribuída ao longo de **10.000 horas de trabalho efetivamente acumuladas**. Cada minuto equivale a **1 HP** de dano. Os chefões têm resistências progressivamente maiores, e o último é derrotado ao alcançar 600.000 minutos (10.000 horas). Não há bônus de dano por simplesmente encerrar uma atividade, pois isso anteciparia a meta.

Os tempos sobrepostos são contabilizados uma única vez, conforme a regra de tempo acumulado do projeto. A Arena mostra o adversário atual, sua barra de resistência, o total de chefões derrotados e os 100 níveis com os respectivos limites em horas.

**Atualização de versões anteriores:** os registros não são modificados. Como a distribuição dos níveis mudou, o número de chefões derrotados pode ser recalculado de acordo com o tempo total do projeto. A meta de 10.000 horas permanece inalterada.

## 11. Backup e restauração

### 11.1 Backup Geral e Exportar são operações diferentes

**Backup Geral (menu hambúrguer):** baixa um arquivo JSON com **todos os projetos** e seus registros, hábitos, sessões e identificação do projeto ativo. Exemplo: `impulso-backup-10-11-2026.json`. Use esta opção para proteger ou transferir o conjunto completo de dados.

**Exportar (página inicial e páginas do projeto):** baixa um JSON contendo **somente o projeto ativo**, incluindo seus registros, hábitos e sessões. Exemplo: `impulso-projeto-meu-livro-10-11-2026.json`. Antes de exportar, abra o projeto desejado. Se não houver projeto ativo, o aplicativo solicitará que você abra um.

Os arquivos individuais usam a identificação `kind: "project"` e guardam o projeto em `project`. **Não são backups gerais:** para recuperá-los, use **Importar**, ao lado de Exportar. O comando Restaurar Backup aceita apenas backups gerais.

As exportações contêm datas e horários dos registros, mas não criam documentos separados de Meu Dia. O tema visual não é incluído, pois fica em outra chave de armazenamento local.

### 11.2 Importar um projeto individual

1. Na página inicial, clique em **⬆ Importar**, ao lado de **⬇ Exportar**.
2. Selecione um arquivo `.json` produzido por **Exportar**.
3. Confirme a importação. O projeto será acrescentado aos projetos existentes e se tornará o projeto ativo.
4. Caso o arquivo já tenha sido importado, uma nova cópia independente será criada, sem sobrescrever o projeto existente.

**Importar** não apaga outros projetos e não aceita arquivos de Backup Geral. A importação conserva os registros, hábitos e sessões presentes no arquivo. Verifique a integridade do arquivo antes de importar; o limite é de 40 MB.

### 11.3 Restaurar

1. Abra o **menu Hambúrguer (☰)** e clique em **Restaurar Backup**. Esse comando fica disponível exclusivamente no menu, não nas páginas do aplicativo.
2. Escolha um arquivo JSON criado por **Backup Geral** (não por **Exportar**).
3. Leia a confirmação.
4. Confirme somente se deseja substituir os dados atuais.

**A restauração substitui todos os projetos existentes; não mescla dados.** Apenas arquivos produzidos por **Backup Geral** podem ser restaurados. Arquivos de **Exportar** contêm somente um projeto e são rejeitados por este comando. O arquivo é submetido a verificações básicas de estrutura e tamanho (limite de 40 MB). Arquivos de outros aplicativos ou formatos incompatíveis são recusados.

### 11.3 Política recomendada de cópias

Faça backup ao final de sessões importantes e antes de limpar dados do navegador, trocar de aparelho, restaurar arquivos ou atualizar o software. Guarde cópias fora do próprio navegador, preferencialmente em dois locais independentes. Verifique periodicamente se o arquivo foi baixado corretamente.

**O JSON não é criptografado.** Quem tiver acesso ao arquivo poderá ler os nomes, datas e observações registrados.

## 12. Impressão e relatórios

Em **Meu Dia**, o botão **Imprimir** da barra superior (ou o comando **Imprimir** do menu) abre o relatório completo do projeto ativo. O relatório contém o nome do projeto, a data de emissão, indicadores de tempo, hábitos, chefões e progresso, além de cartões `Meu Dia DD-MM-AAAA`.

Cada cartão **Meu Dia DD-MM-AAAA** também oferece um botão **Imprimir** próprio, que gera um relatório exclusivamente daquele dia, incluindo nome do projeto, data de emissão, total diário e registros correspondentes. As tabelas impressas usam **Atividade | Nome | Início | Término**, sem lixeira; na tela, Meu Dia inclui a lixeira como quinta coluna.

A impressão é realizada pelo próprio navegador. É possível selecionar uma impressora ou **Salvar como PDF**, quando essa opção estiver disponível. O Impulso não gera PDF nativamente.

Em **Meus Projetos**, o comando **Imprimir lista** apresenta nomes, datas de criação e tempo acumulado dos projetos. A paginação final depende do navegador e das configurações de papel, escala e margens.

## 13. Tema, tela cheia e rodapé

### 13.1 Tema claro e escuro

Abra o menu hambúrguer e use **◐ Alternar tema** para alternar entre os modos. O tema claro é o padrão na primeira utilização; a escolha fica guardada no navegador.

A identidade cromática usa cores vermelhas, rosas e alaranjadas derivadas do estudo Itten. A aparência efetiva depende das regras do `styles.css` e da renderização do navegador.

### 13.2 Tela cheia

O botão **⛶ Tela cheia**, no menu hambúrguer, solicita o modo de tela cheia. O navegador pode bloquear a operação ou não disponibilizá-la, especialmente em alguns dispositivos móveis. Use o mesmo botão ou o comando do sistema para sair.

### 13.3 Rodapé

O menu hambúrguer apresenta os links para o **PWA oficial**, o **repositório GitHub**, o **Manual** e o botão **Sobre**, que explica o significado do nome Impulso e alerta sobre a necessidade de backups.

## 14. Como o tempo é calculado

### 14.1 Intervalos de trabalho

Cada novo registro de **Ponto** salvo contém início e término automáticos. Uma **Entrada Manual** contém o intervalo informado pelo usuário. Uma execução de **Hábito** registra os intervalos de execução do Pomodoro.

Para compatibilidade, o código também interpreta pares antigos de eventos de ponto (`start`/`end`). Um início antigo sem término não entra no total consolidado; a duração de um **Ponto atual em andamento** pode aparecer nos indicadores ao vivo.

### 14.2 Sobreposição

Os intervalos válidos são combinados antes de calcular o total, evitando contar duas vezes o mesmo período.

Exemplo: Ponto das 10h às 11h e Hábito das 10h30 às 11h representam **1 hora total**, não 1h30. Pausas do Pomodoro não são incluídas nos segmentos efetivamente trabalhados.

### 14.3 Virada da meia-noite

Um trabalho iniciado às 23h30 e terminado às 00h30 dura **1 hora**, mas contribui com **30 minutos para cada dia civil**. A atividade aparece nos cartões de **Meu Dia** de ambas as datas, com os dois horários completos e a parcela diária correspondente.

### 14.4 Precisão

O Ponto usa os horários do relógio do dispositivo, com precisão interna em milissegundos; o cronômetro apresenta segundos. A Entrada Manual seleciona horas e minutos. Os totais exibidos em horas/minutos descartam os segundos residuais na apresentação. O dano da Arena considera **minutos inteiros efetivamente acumulados**.

## 15. Armazenamento, privacidade e funcionamento offline

A versão v16 continua guardando o estado dos projetos em **localStorage**, na chave `impulso-data-v1`. A preferência visual fica na chave `impulso-theme`. **Não há IndexedDB implementado nesta versão.**

Os dados não são enviados pelo código do aplicativo a uma API de sincronização. O site é hospedado no GitHub Pages, e o navegador realiza requisições normais para obter seus arquivos. Links externos do rodapé abrem seus respectivos destinos.

Na versão v16, o Service Worker usa o cache `impulso-v16-arena-100`. Para navegação, tenta a rede e recorre ao HTML em cache quando necessário; para outros recursos locais, prioriza a cópia em cache quando existente. O cache de arquivos **não é o mesmo que o armazenamento dos projetos**.

**Riscos:** limpar os dados do site, usar navegação privada, trocar de navegador/aparelho, desinstalar com remoção dos dados, atingir limites de armazenamento ou sofrer falha do dispositivo pode provocar perda de informações. Não existe sincronização automática entre dispositivos.

## 16. Solução de problemas

| Sintoma | Causa possível | O que fazer |
|---|---|---|
| Página 404 | Arquivo ou caminho incorreto no GitHub Pages | Confira a URL, a publicação e a presença de `index.html` na raiz |
| Tela presa no splash | Erro de JavaScript ou versão antiga em cache | Recarregue, abra o console do navegador e confira se `app.js` foi publicado corretamente; faça backup antes de limpar dados |
| Registrar Ponto ou Entrada Manual abre Novo Projeto | Pode haver arquivos antigos misturados ou cache desatualizado | Publique `index.html`, `app.js`, `styles.css`, `manifest.json`, `sw.js` e os ícones compatíveis; confira os comandos em janela atualizada e preserve o backup antes de limpar dados |
| Ícone antigo no Android | O atalho instalado conserva o ícone anterior | Confira o manifesto e os PNG do foguete; faça backup antes de reinstalar o PWA |
| Splash sem anel ou sem revelação | HTML, CSS e JS de versões diferentes ou erro de script | Confira o anel SVG no `index.html`, a rotina `startSplash()` no `app.js` e as requisições de recursos |
| Novo Projeto não responde | Falha de script ou elemento de interface ausente | Verifique o console, `index.html` e `app.js`; teste em aba normal atualizada |
| Dados sumiram | Limpeza ou troca de armazenamento/perfil | Procure backup JSON; não há recuperação automática |
| Total de horas menor que o esperado | Ponto ainda em andamento, intervalos sobrepostos ou dados antigos incompletos | Revise o Ponto e Meu Dia |
| Total inesperado após entrada retroativa | Registro duplicado ou sequência cronológica inconsistente | Revise datas, horas e tipos; exclua e recrie o lançamento incorreto |
| Ponto parece não estar contando | Projeto ativo diferente ou sessão não iniciada | Abra a página Ponto do projeto correto e confira o horário inicial |
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

**O tempo continua aumentando enquanto um Ponto está aberto?**  
Sim, o painel de Ponto e os indicadores ao vivo usam o horário de início salvo. O total consolidado dos relatórios considera os intervalos encerrados e salvos.

**Posso lançar registros de meses anteriores?**  
Sim, pela Entrada Manual, respeitando a validação de datas e horários. Para atravessar a meia-noite em um único registro, use o Ponto.

**Posso editar um registro?**  
Não diretamente nesta versão. Exclua e lance novamente.

**O botão de lixeira existe em todos os registros?**  
Há lixeira para projetos, definições de hábitos e registros de ponto/hábitos exibidos em Meu Dia. A exclusão não é reversível no aplicativo.

**Apagar a definição de um hábito apaga suas execuções?**  
Não. As execuções anteriores permanecem até serem removidas individualmente.

**O backup contém todos os projetos?**  
**Backup Geral**, sim. **Exportar** contém apenas o projeto ativo. Importar aceita o arquivo individual e adiciona um projeto sem apagar os demais. Restaurar Backup aceita apenas o Backup Geral e substitui o conjunto completo existente.

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
4. **Compatibilidade com pontos antigos:** pares de eventos antigos são agrupados quando possível; registros sem par podem aparecer incompletos.
5. **Entrada Manual em um único dia:** o formulário atual não permite informar uma data de término diferente da data de início.
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
**Ponto:** atividade cronometrada com início automático e término automático ao salvar.  
**Intervalo:** duração entre um início e um término válidos.  
**Entrada Manual:** atividade cadastrada posteriormente com data e horários informados pelo usuário.  
**Hábito:** atividade recorrente definida com duração estipulada.  
**HP:** pontos de vida de um chefão.  
**Dano:** pontos de progresso derivados dos registros.  
**Radar:** representação angular do tempo dentro de um ciclo de 60 minutos.  
**PWA:** aplicação web que pode oferecer instalação e funcionamento offline.  
**Backup Geral:** cópia JSON de todos os projetos, compatível com Restaurar Backup.

**Exportar:** cópia JSON somente do projeto ativo, recuperável pelo botão Importar.

**Importar:** acrescenta um projeto individual aos projetos existentes, sem substituí-los.

### Roteiro de teste recomendado após publicar

- [ ] Abrir o site sem erro e concluir a tela inicial.
- [ ] Criar um projeto com nome válido.
- [ ] Criar outro projeto e confirmar que os dados ficam separados.
- [ ] Abrir Ponto, informar o nome do trabalho e clicar em Iniciar.
- [ ] Navegar por outras páginas e retornar ao Ponto sem perder a sessão.
- [ ] Clicar em Terminar e salvar e conferir início e término no Meu Dia.
- [ ] Testar um Ponto atravessando a meia-noite, conferindo a divisão dos totais diários.
- [ ] Criar uma Entrada Manual com nome e intervalo no mesmo dia e conferir o total.
- [ ] Criar e concluir um hábito e verificar Meu Dia.
- [ ] Conferir o radar, a Arena e o progresso do projeto.
- [ ] Excluir um registro de teste e verificar o recálculo.
- [ ] Exportar um projeto individual e confirmar que o JSON contém somente o projeto ativo.
- [ ] Importar o JSON individual e confirmar que o projeto é acrescentado sem apagar os demais.
- [ ] Criar um Backup Geral e confirmar que o JSON contém todos os projetos.
- [ ] Restaurar um backup de teste, sabendo que substituirá os dados atuais.
- [ ] Abrir a impressão do projeto e da lista de projetos.
- [ ] Confirmar que **Ponto** abre sua página própria e **Entrada Manual** abre o formulário correspondente, nunca **Novo Projeto**.
- [ ] Verificar o anel de progresso e a revelação do nome no splash de 4 segundos.
- [ ] Conferir o foguete como ícone de instalação no Android, com backup prévio se for reinstalar.
- [ ] Testar o Pomodoro (iniciar, pausar, retomar, concluir e reiniciar).
- [ ] Testar o tema claro/escuro e a tela cheia.
- [ ] Verificar a abertura offline após o primeiro carregamento completo.
- [ ] Verificar o comportamento em celular e computador.

---

**Impulso — Motor de Produtividade Pessoal**  
*O progresso nasce da ação, ganha força na constância e se revela no tempo.*

**Manual revisado para a atualização v16.** Antes de atualizar ou reinstalar o aplicativo, preserve uma cópia de seus dados.


## Navegação compacta (v22)

O menu lateral apresenta, nesta ordem: **Início**, **Novo**, **Projetos**, **Arena**, **Radar**, **Meu Dia**; **Ponto**, **Hábitos**, **Entrada**; **Guardar**, **Restaurar**, **Imprimir**.

- **Novo** cria um projeto; **Projetos** permite selecionar os projetos existentes.
- **Ponto** inicia ou conclui sessões de trabalho; **Hábitos** abre a gestão de hábitos; **Entrada** abre o formulário de entrada manual.
- **Guardar** produz um **Backup Geral** de todos os projetos; **Restaurar** restaura esse backup geral, substituindo os dados atuais após confirmação.
- **Imprimir** gera o relatório completo do projeto ativo. Na página **Meu Dia**, cada data continua com seu botão de impressão individual.
- Os botões **Exportar** e **Importar**, disponíveis nas páginas do projeto, continuam servindo aos arquivos de **projeto individual**; não se confundem com Guardar/Restaurar.
- No canto superior direito, os ícones de **Tema** e **Tela cheia** não possuem texto visível, mas têm nomes acessíveis.
- No rodapé, quatro ícones dão acesso ao **site oficial**, **GitHub**, **Ajuda/Manual** e **Sobre**. A opção Sobre apresenta uma breve descrição do aplicativo.

As referências HTML originais às imagens `ImpulsoCover.png` e `logo.svg` permanecem preservadas neste Manual.


## Atualização v23 — Entrada manual com datas independentes

A Entrada Manual permite escolher separadamente dia, mês, ano, hora e minuto do início e do término. É possível registrar atividades que começam e terminam no mesmo dia ou atravessam a meia-noite. O término deve ser posterior ao início e não pode estar no futuro. O título permanece limitado a 50 caracteres. Os registros conservam timestamps completos no Histórico, nos backups e nas exportações. O total diário é distribuído conforme o tempo efetivamente trabalhado em cada data; o registro é listado em Meu Dia correspondente à data de início.


## Atualização v24 — Distribuição diária e Sobre o app

Atividades iniciadas e concluídas no mesmo dia mantêm o comportamento anterior. Atividades que atravessam datas aparecem em cada cartão **Meu Dia** envolvido, com a duração daquele dia e a duração total; o Histórico, o armazenamento, os backups e a progressão preservam um único registro original. O botão **i** no rodapé abre a janela **Sobre o Impulso**, com informações do aplicativo, armazenamento local e links para o manual e repositório.


### Arena v25 — 200 chefões em 10 fases

A Arena foi substituída pelos 200 adversários do catálogo fornecido para o projeto. Cada fase apresenta seu título, descrição temática, 20 chefões e as observações originais de cada adversário quando disponíveis. Os nomes foram preservados conforme o catálogo, inclusive peculiaridades de redação.

A dificuldade cresce ao longo das 10.000 horas: cada minuto de trabalho registrado corresponde a 1 HP. Os chefões são distribuídos por uma curva crescente, e o último é concluído ao atingir 10.000 horas. A Arena calcula o progresso a partir do tempo acumulado do projeto; nenhum registro existente é apagado. Com a mudança de 100 para 200 adversários, a posição atual na Arena será recalculada automaticamente, sem alterar as horas registradas.

As dez fases são:

- **Fase 1 — Os Hábitos Menores**: Monstros que representam as micro-hesitações do dia a dia, fáceis de ignorar, mas que drenam os primeiros minutos.
- **Fase 2 — As Distrações Cotidianas**: Criaturas que se alimentam de pequenos desvios de atenção e rituais de adiamento.
- **Fase 3 — Os Bloqueios Mentais Leves**: Inimigos que começam a atacar a autoconfiança e a clareza mental do jogador.
- **Fase 4 — A Erosão do Tempo**: Chefes que aceleram a percepção de perda temporal e geram os primeiros sinais de pânico leve.
- **Fase 5 — O Labirinto da Fuga**: Entidades que constroem labirintos psicológicos onde o jogador se perde em rationalizações.
- **Fase 6 — A Ansiedade Antecipatória**: O peso emocional começa a esmagar. O medo do fracasso e o medo do esforço se materializam.
- **Fase 7 — A Saturação Digital e Mental**: Inimigos colossais alimentados pelo excesso de informação, dopamina barata e colapso de atenção.
- **Fase 8 — O Abismo da Inércia Crônica**: O jogador enfrenta a paralisia profunda, onde o corpo e a mente parecem de pedra, incapazes de iniciar qualquer movimento.
- **Fase 9 — A Véspera do Colapso**: A fase final de crise. O prazo final estourou ou está prestes a estourar de forma catastrófica. O pânico produtivo supremo.
- **Fase 10 — Os Chefes Supremos do Domínio da Procrastinação**: As divindades primordiais da inércia, do tempo perdido e da auto-sabotagem em escala cósmica.


### Arena v26 — Efeitos dos 200 chefões

Os 200 chefões mantêm a ordem, as dez fases e seus resumos, as notas descritivas e a distribuição de resistência da versão 25. Cada nome exibe agora, após um travessão, o efeito temático correspondente à lista fornecida. Esses efeitos são descrições narrativas e não alteram o cálculo de HP, tempo, dados ou progressão.


## Codex de Monstros Desbloqueáveis (v27)

Na Arena, use **Abrir Codex de Monstros**, ou escolha **Codex** no menu principal. A enciclopédia reúne os 200 chefões em 10 fases, preservando os títulos e resumos. Cada chefão derrotado revela seu nome e uma ficha com o carimbo **VENCIDO**, o efeito de dano mental e a descrição integral da lista JSON fornecida. Os chefões não derrotados ficam ocultos.

O **XP de Foco** é uma representação dos minutos de trabalho registrados: 1 minuto = 1 XP. Não há pontuação artificial ou moeda independente. A derrota de cada chefão utiliza exatamente os limites de HP da Arena, de modo que a progressão total continua em 10.000 horas. O Codex é individual por projeto e recalculado a partir dos registros locais; excluir registros pode reverter desbloqueios. As descrições dos efeitos são ficcionais e não representam diagnóstico ou dano real.

Os arquivos de imagem existentes, inclusive `ImpulsoCover.png` e `logo.svg`, foram mantidos.

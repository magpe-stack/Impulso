# IMPULSO — Manual completo do usuário

**Motor de Produtividade Pessoal | Versão 31 | Atualizado em 12 de novembro de 2026**

**Aplicativo:** https://magpe-stack.github.io/Impulso/  
**Repositório:** https://github.com/magpe-stack/Impulso  
**Manual online:** https://github.com/magpe-stack/Impulso/blob/main/README.md

<p align="center"><img src="ImpulsoCover.png" alt="Capa do Impulso — Motor de Produtividade Pessoal" width="100%"></p>

> Este manual descreve as funcionalidades presentes no código da versão 31. O Impulso é uma ferramenta pessoal de produtividade, não um sistema homologado de ponto, nem uma garantia de domínio profissional. As funções dependentes de recursos do navegador podem variar conforme o dispositivo.

## Sumário

1. [O que é o Impulso](#1-o-que-é-o-impulso)
2. [Instalação e uso offline](#2-instalação-e-uso-offline)
3. [Navegação e projetos](#3-navegação-e-projetos)
4. [Ponto](#4-ponto)
5. [Entrada Manual](#5-entrada-manual)
6. [Meu Dia e Histórico](#6-meu-dia-e-histórico)
7. [Hábitos](#7-hábitos)
8. [Radar e meta de 10000 horas](#8-radar-e-meta-de-10000-horas)
9. [Arena e 200 chefões](#9-arena-e-200-chefões)
10. [Codex de Monstros](#10-codex-de-monstros)
11. [Altar dos Elixires](#11-altar-dos-elixires)
12. [Exportação, backup e restauração](#12-exportação-backup-e-restauração)
13. [Impressão e relatórios](#13-impressão-e-relatórios)
14. [Personalização e Sobre](#14-personalização-e-sobre)
15. [Privacidade e segurança dos dados](#15-privacidade-e-segurança-dos-dados)
16. [Solução de problemas](#16-solução-de-problemas)
17. [Perguntas frequentes](#17-perguntas-frequentes)
18. [Testes de aceitação](#18-testes-de-aceitação)
19. [Arquivos do projeto](#19-arquivos-do-projeto)
20. [Histórico da versão](#20-histórico-da-versão)

---

## 1. O que é o Impulso

O **Impulso** transforma o registro de trabalho e a prática de hábitos em uma jornada de progresso. Cada projeto mantém seus próprios dados; a Arena representa desafios contra a procrastinação, o Codex registra as vitórias e o Altar dos Elixires oferece frases colecionáveis quando o usuário combina trabalho com hábitos concluídos.

A meta de **10.000 horas** é uma referência simbólica de constância. Não equivale a certificação de competência, qualidade ou experiência profissional. O tempo trabalhado é registrado em milissegundos e apresentado em horas, minutos e segundos.

## 2. Instalação e uso offline

1. Acesse **https://magpe-stack.github.io/Impulso/** com internet.
2. Aguarde o carregamento inicial e verifique se a tela Início aparece.
3. No Chrome Android ou em outro navegador compatível, use **Instalar aplicativo** ou **Adicionar à tela inicial**; no desktop, procure a opção de instalação do navegador.
4. Após carregar os arquivos essenciais, teste a abertura sem internet. O cache pode ser removido pelo navegador; por isso o funcionamento offline deve ser confirmado no próprio dispositivo.

O aplicativo utiliza HTML, CSS e JavaScript nativos. Não exige cadastro ou servidor para armazenar os registros. A tela de abertura apresenta a identidade visual do foguete e um anel de progresso.

<p align="center"><img src="logo.svg" alt="Logotipo do Impulso" width="180"></p>

## 3. Navegação e projetos

O botão de menu no cabeçalho abre um **painel lateral compacto**. Selecione uma opção para navegar; clique fora do painel ou pressione **Esc** para fechá-lo. O menu contém **Início, Novo, Projetos, Arena, Codex, Elixires, Radar, Meu Dia, Ponto, Hábitos, Entrada, Guardar, Restaurar e Imprimir**.

Para começar, selecione **Novo** e dê ao projeto um nome de até **50 caracteres**. Em **Projetos**, é possível abrir, renomear, excluir e consultar projetos. Cada projeto tem registros, hábitos, progresso da Arena e coleção de Elixires independentes. **Excluir um projeto é uma ação destrutiva**: exporte um backup antes.

A página **Início** apresenta o projeto ativo, tempo acumulado, quantidade de hábitos executados, chefões derrotados e percentual da meta de 10.000 horas.

## 4. Ponto

A seção **Ponto** permite cronometrar um trabalho real sem bloquear a navegação. Informe o nome da atividade (até 50 caracteres), inicie a sessão, continue utilizando outras telas e volte para terminar e concluir o registro. O tempo e as datas de início e término são preservados. Uma sessão pode atravessar a meia-noite.

O ponto em andamento pode continuar ativo enquanto você navega pelo aplicativo. Evite limpar os dados do navegador ou fechar a sessão sem concluir o trabalho. Se uma sessão for interrompida inesperadamente, confira o estado exibido antes de iniciar outra.

## 5. Entrada Manual

Use **Entrada** para registrar trabalho já realizado. Informe o nome e os campos independentes de **data e horário de início** e **data e horário de término**. O término deve ser posterior ao início. Assim, são aceitas tanto atividades realizadas no mesmo dia quanto trabalhos que atravessem uma ou várias datas.

A Entrada Manual e o Ponto contribuem para o tempo real do projeto e, consequentemente, para a Arena. Não cadastre o mesmo intervalo duas vezes: o sistema reúne intervalos sobrepostos para calcular o total de tempo, mas registros duplicados ainda podem confundir o Histórico.

## 6. Meu Dia e Histórico

**Meu Dia** agrupa as atividades por data e mostra o tempo correspondente a cada dia. Os registros exibem tipo de atividade (**Ponto**, **Entrada Manual** ou **Hábito**), nome, início e término, com opção de exclusão.

**Exemplo:** uma atividade iniciada em 11/11 às 23h46 e encerrada em 12/11 às 00h59 dura **1h13min**. O dia 11 recebe **14 minutos** e o dia 12 recebe **59 minutos**. A atividade pode aparecer em ambos os dias, mas permanece **um único registro** e contribui **uma única vez** para o total do projeto.

Atividades inteiramente contidas em um dia continuam sendo atribuídas integralmente a esse dia. A divisão entre dias afeta a apresentação e o cálculo diário, não duplica a duração da atividade.

A exclusão de um registro altera os totais e pode modificar o número de chefões derrotados. Se o registro excluído for o hábito que concedeu um Elixir, a recompensa correspondente deixa de ser válida.

## 7. Hábitos

Em **Hábitos**, cadastre um hábito com nome e duração em minutos. O aplicativo apresenta um temporizador no estilo Pomodoro, com controles para iniciar, pausar, retomar e concluir. Uma conclusão gera um registro com datas e horários, que também aparece em Meu Dia.

A conclusão de um hábito pode liberar **no máximo um Elixir** de um chefão já derrotado. O hábito não substitui a etapa de trabalho: primeiro é necessário vencer o chefão na Arena. A duração configurada é uma meta do temporizador; confirme a conclusão no aplicativo para gerar o registro.

## 8. Radar e meta de 10000 horas

O **Radar** apresenta o avanço temporal do projeto por meio de anéis concêntricos: **360 marcações externas** e **60 marcações internas**, com indicação visual do tempo. A meta de **10.000 horas** corresponde a 600.000 minutos acumulados. O Radar usa o mesmo tempo consolidado do projeto e não deve somar duas vezes intervalos coincidentes.

## 9. Arena e 200 chefões

A **Arena** contém **200 chefões** distribuídos em **10 fases de 20 adversários**, em ordem crescente de resistência. Cada fase preserva título e resumo temático. Os chefões têm nome, efeito narrativo (como “Sono leve”, “Dispersão” ou “Não-ser”), pontos de resistência (**HP**) e um marco de conclusão acumulada.

Cada minuto contabilizado equivale a um ponto de dano para a progressão da Arena. Os limiares dos chefões estão distribuídos até a meta final de **600.000 minutos / 10.000 horas**. A derrota de um chefão é calculada pelo tempo total do projeto, não pelo número de cliques ou registros.

Os efeitos são descrições temáticas dos hábitos de procrastinação: **não retiram horas, não causam punições reais e não alteram os dados do usuário**.

## 10. Codex de Monstros

O **Codex** é uma enciclopédia interativa dos 200 adversários. Ele permite consultar a progressão por fase e abrir fichas de chefões derrotados, incluindo seu nome, descrição narrativa e efeito. As fichas vencidas recebem o destaque **VENCIDO**. Os adversários ainda não derrotados permanecem bloqueados.

O desbloqueio depende do tempo acumulado no projeto. O Codex não mantém um contador de progresso paralelo à Arena: ambos usam os mesmos marcos de vitória.

## 11. Altar dos Elixires

O **Altar dos Elixires** conecta o trabalho registrado ao uso real de Hábitos e adiciona **200 frases motivacionais exclusivas**, uma para cada chefão.

### Etapas da recompensa

1. **Combate:** trabalhe e registre o período pelo **Ponto** ou pela **Entrada Manual**.
2. **Vitória:** quando o tempo acumulado ultrapassa o limiar de um chefão, ele é considerado derrotado.
3. **Cofre aguardando Elixir:** o chefão vencido passa a ter um cofre que ainda precisa ser aberto.
4. **Hábito:** conclua um hábito cadastrado. Uma conclusão pode abrir **somente um** cofre de chefão já derrotado, respeitando a ordem dos chefões.
5. **Coleção:** a frase exclusiva é liberada na seção **Elixires**, com recursos para **copiar** e **compartilhar**.

### Regras importantes

- A recompensa é vinculada ao **projeto** e ao **registro de hábito** que a concedeu.
- Um único hábito concluído **não abre vários cofres**.
- Um hábito concluído antes da derrota não libera automaticamente um cofre conquistado depois.
- Registros de hábitos antigos não geram recompensas retroativas automaticamente.
- Excluir o registro de hábito que liberou o Elixir **revoga** a recompensa correspondente.
- Se a progressão da Arena retroceder após exclusões, apenas Elixires de chefões ainda considerados derrotados continuam válidos.
- As frases e os vínculos de recompensa são incluídos nos dados exportados/restaurados quando presentes no projeto.

**Compartilhamento:** em dispositivos compatíveis, o botão pode utilizar o compartilhamento nativo. Se o recurso não estiver disponível, o aplicativo pode oferecer cópia do texto. O compartilhamento é uma ação voluntária do usuário.

## 12. Exportação, backup e restauração

O Impulso oferece duas operações distintas:

- **Exportar projeto:** salva um arquivo JSON com os dados do projeto ativo. **Importar projeto** recupera um projeto individual.
- **Guardar:** produz um **backup geral** dos projetos. **Restaurar** lê um backup geral e pode **substituir todos os projetos atuais**, após confirmação.

Os backups são arquivos JSON, não imagens do aplicativo. Faça cópias regulares e guarde-as fora do navegador. **Antes de restaurar, exporte o estado atual** para evitar perda de informações. Não confunda um arquivo de projeto individual com um backup geral: os formatos têm finalidades diferentes.

A coleção de Elixires é armazenada junto dos dados de cada projeto; por isso, para preservar conquistas, mantenha também os registros de hábitos associados.

## 13. Impressão e relatórios

Use **Imprimir** para produzir relatórios do projeto. Os relatórios incluem identificação do projeto, registros com início e término, totais e agrupamentos por dia. Para atividades que atravessam datas, o relatório apresenta o tempo correspondente ao dia e a duração total da atividade.

A aparência final depende das configurações de impressão do navegador. Para guardar em PDF, selecione **Salvar como PDF** na janela de impressão, quando disponível.

## 14. Personalização e Sobre

O cabeçalho oferece alternância entre **tema claro/escuro** e **tela cheia** quando suportada pelo navegador. O rodapé disponibiliza acesso ao aplicativo, repositório, manual e ao botão **i — Sobre o Impulso**.

A janela **Sobre** informa **versão 31**, **data de atualização: 12/11/2026**, resumo das funcionalidades, funcionamento local, cuidados com backup e links úteis.

## 15. Privacidade e segurança dos dados

O Impulso mantém os dados no armazenamento local do navegador. Em condições normais, os registros não precisam ser enviados a um servidor para que o aplicativo funcione. Isso também significa que os dados podem ser perdidos se você limpar o armazenamento do site, trocar de navegador/dispositivo sem restaurar backup, utilizar navegação privada ou sofrer uma falha de armazenamento.

**Boas práticas:** exporte backups periodicamente; confira o arquivo baixado; evite armazenar informações sensíveis nos nomes das atividades; não presuma sincronização automática entre dispositivos.

## 16. Solução de problemas

| Problema | O que verificar |
|---|---|
| Tela antiga após atualizar | Recarregue a página com internet e aguarde o Service Worker atualizar; feche e abra o PWA novamente. |
| Menu não fecha | Clique fora do painel ou pressione Esc. |
| Radar não aparece | Confirme se todos os arquivos publicados pertencem à mesma versão e se o JavaScript foi atualizado. |
| Registro não aparece no dia esperado | Verifique as datas completas; trabalhos que atravessam a meia-noite aparecem nos dias envolvidos. |
| Total diário menor que a duração do trabalho | Confira se parte do intervalo pertence ao dia seguinte. |
| Chefão não foi derrotado | Verifique o tempo total consolidado do projeto e o limiar de HP. |
| Cofre continua trancado | É necessário derrotar o chefão **e depois concluir** um hábito cadastrado. |
| Elixir desapareceu | Verifique se o registro de hábito que o concedeu foi excluído ou se o tempo acumulado diminuiu. |
| Não consigo compartilhar | Use a opção de copiar, quando disponível; o compartilhamento nativo depende do navegador. |
| Não consigo restaurar | Confirme se escolheu o JSON correto: projeto individual ou backup geral. |
| App offline não abre | Abra online primeiro, aguarde o cache e teste novamente; não apague os dados antes de fazer backup. |

Para investigar problemas no desktop, abra as ferramentas de desenvolvedor do navegador e examine o **Console**. Anote a mensagem exata de erro. **Não limpe armazenamento ou cache indiscriminadamente antes de guardar seus dados.**

## 17. Perguntas frequentes

**Posso ter vários projetos?** Sim. Cada projeto mantém sua própria progressão e registros.

**Os chefões são derrotados por tarefas ou por horas?** Pela soma de tempo válido registrado; a quantidade de tarefas não determina diretamente a vitória.

**Um hábito sozinho derrota um chefão?** Não. Hábitos podem contribuir para o tempo contabilizado, mas o cofre exige que o chefão já esteja derrotado antes da conclusão que libera o Elixir.

**Uma atividade de duas datas vira dois registros?** Não. É um registro original exibido em todos os dias envolvidos.

**Posso recuperar dados apagados?** Apenas se houver uma cópia de segurança compatível.

**O aplicativo funciona sem internet?** Pode funcionar após a instalação correta do cache, sujeito às limitações do navegador.

**O que significa HP?** *Hit Points*, ou pontos de resistência do chefão.

**O que é XP de Foco?** Uma representação gamificada do tempo acumulado; não é moeda, nem substitui os registros reais.

## 18. Testes de aceitação

Depois de publicar uma nova versão, confira:

- [ ] Abrir o aplicativo sem erros e criar um projeto.
- [ ] Criar outro projeto e confirmar que os dados são independentes.
- [ ] Iniciar Ponto, navegar pelo menu, retornar e concluir a atividade.
- [ ] Registrar Entrada Manual no mesmo dia.
- [ ] Registrar Entrada Manual atravessando a meia-noite e conferir os dois totais diários.
- [ ] Confirmar que o tempo do projeto não foi duplicado.
- [ ] Criar, iniciar, pausar, retomar e concluir um Hábito.
- [ ] Abrir Radar e conferir as marcações e o tempo acumulado.
- [ ] Consultar Arena, as 10 fases e os 200 chefões.
- [ ] Abrir Codex e visualizar uma ficha VENCIDO.
- [ ] Derrotar um chefão, confirmar cofre pendente, concluir hábito e receber a frase.
- [ ] Copiar e, se disponível, compartilhar um Elixir.
- [ ] Excluir o registro que concedeu o Elixir e verificar a revogação.
- [ ] Exportar projeto e realizar backup geral; conferir os arquivos baixados.
- [ ] Testar importação/restauração em ambiente seguro, sem arriscar dados reais.
- [ ] Imprimir um relatório e verificar os horários e totais.
- [ ] Abrir **Sobre**, conferir versão, data e links.
- [ ] Testar menu compacto, tema claro/escuro, mobile e uso offline.

## 19. Arquivos do projeto

| Arquivo | Finalidade |
|---|---|
| `index.html` | Estrutura da interface, cabeçalho, menu, rodapé e splash. |
| `styles.css` | Layout responsivo, temas, Arena, Codex e Altar. |
| `app.js` | Regras de negócio, registros, cálculo de tempo, progressão, armazenamento e navegação. |
| `manifest.json` | Metadados para instalação do PWA. |
| `sw.js` | Cache de arquivos essenciais para uso offline. |
| `README.md` | Este manual. |
| `LICENSE` | Licença do projeto. |
| `logo.svg` e `logo.png` | Identidade visual do aplicativo. |
| `ImpulsoCover.png` e `ImpulsoApp.png` | Imagens de apresentação/documentação. |
| `icon-192.png`, `icon-512.png`, `rocket-192-v11.png`, `rocket-512-v11.png` | Ícones distribuídos com o projeto. |

## 20. Histórico da versão

**Versão 31 — 12/11/2026:** Altar dos Elixires, com 200 frases exclusivas, cofres vinculados à derrota de chefões e desbloqueio por conclusão de hábito. Preserva a Arena com 200 chefões, os 10 tiers, o Codex, o Radar, o Ponto, a Entrada Manual com datas independentes, Meu Dia, relatórios, backups e menu lateral compacto.

**Revisão documental — 12/11/2026:** manual reescrito e janela Sobre ampliada com versão, data e resumo de recursos. A revisão não altera a mecânica de progressão nem os dados dos projetos.

---

**Impulso — Motor de Produtividade Pessoal.** A constância começa com um pequeno impulso.


## Alertas! — lembrete de backup (versão 34)

No menu lateral, abaixo de **Imprimir**, há um separador e o botão **Alertas!**. Ele abre uma página de configurações com uma chave para **Alerta de backup**. Por padrão, o alerta fica desligado.

Ao ativar, o aplicativo apresenta uma caixa a cada 15 minutos de uso com a recomendação de guardar uma cópia dos projetos. A caixa oferece **Guardar backup** (exportação JSON) e **Entendi** (dispensar aviso). A preferência é salva neste navegador e pode ser desligada a qualquer momento.

**Limitações:** o lembrete é local, não é notificação push e só aparece enquanto a página está aberta e visível. Se o navegador suspender a página, o lembrete poderá atrasar e aparecer quando o usuário voltar. O alerta não executa backups automaticamente. O armazenamento local não substitui backups externos.


### Texto do alerta de backup (versão 34)

> Este PWA armazena os dados dos seus projetos no navegador. Entretanto, esse armazenamento não é permanente nem garantido: as informações podem ser apagadas ao limpar os dados do site, trocar de aparelho ou por políticas de armazenamento do navegador. Por isso, faça backups regularmente para evitar a perda dos seus projetos e registros.


### Alerta de hábitos e Elixires (versão 35)

Na página **Alertas!**, ative ou desative independentemente o **Alerta de hábitos e Elixires**. Quando ligado, o aplicativo mostra um lembrete a cada 15 minutos enquanto estiver aberto e visível, com o botão **Ir para Hábitos**. Registrar trabalho por Ponto ou Entrada Manual derrota chefões; para abrir cada cofre, é necessário concluir um hábito cadastrado. Cada conclusão libera no máximo um Elixir de chefão já derrotado. A configuração é salva localmente e os avisos não são notificações do sistema.


### Atualização 36 — Painel de Alertas!

A página **Alertas!** é dedicada exclusivamente à configuração de lembretes. O botão **Guardar backup agora** foi retirado dessa página, pois ela reúne alertas de diferentes categorias. Para realizar um backup, use **Guardar** no menu lateral. Os alertas de backup e de hábitos/Elixires permanecem independentes e opcionais.


### Atualização 37 — controles de alertas

Os controles da página **Alertas!** agora usam caixas de seleção nativas, com posição fixa e rótulos Ligado/Desligado. A configuração e o intervalo de 15 minutos permanecem inalterados.


## Inventário de Elixires — versão 38 (12/11/2026)

A página **Hábitos** apresenta um catálogo offline com **200 sugestões em 25 categorias**, conforme `habitos_elixires_v2.json`. Use a pesquisa global e as categorias horizontais para localizar hábitos. Clique em **Equipar** para adicioná-los à rotina do projeto; o limite é de **6 hábitos ativos**. Os hábitos já existentes são preservados, mesmo que um projeto antigo ultrapasse esse limite; nesse caso, desequipe hábitos antes de adicionar novos.

O botão **+ Novo Hábito** permanece disponível para criar hábitos personalizados, com título (até 50 caracteres), categoria e duração. Os hábitos são salvos com os dados do projeto em `localStorage`, participam do backup geral e do backup individual e funcionam offline. A execução continua sendo feita pelo Pomodoro; concluir um hábito pode desbloquear um Elixir de um chefão já derrotado, respeitando as regras do Altar.

**Observação:** equipar um hábito não equivale a concluí-lo. É necessário executar e finalizar o Pomodoro para registrar a conclusão.


### Versão 40 — Seis Elixires Ativos e cartões alinhados

Na página Hábitos, os Elixires Ativos aparecem antes do catálogo, em cartões compactos e responsivos. O Inventário de Elixires permanece abaixo, com busca, categorias e equipagem. O Pomodoro e as recompensas funcionam como antes.


### Ajustes da versão 40

A rotina aceita até **6 Elixires Ativos** por projeto. No desktop, os cartões são distribuídos em três colunas, com alturas e controles alinhados; em telas menores, a grade se adapta.

# IMPULSO — Manual completo do usuário

**Motor de Produtividade Pessoal**  
**Aplicativo:** https://magpe-stack.github.io/Impulso/  
**Repositório:** https://github.com/magpe-stack/Impulso  
**Manual online:** https://github.com/magpe-stack/Impulso/blob/main/README.md

<p align="center"><img src="ImpulsoCover.png" alt="Capa do Impulso — Motor de Produtividade Pessoal" width="100%"></p>

> **Antes de começar:** o Impulso é uma ferramenta pessoal de organização, registro de trabalho e hábitos. Não é um sistema de ponto homologado, não mede a qualidade do trabalho e não sincroniza automaticamente os dados entre aparelhos. **Faça backups JSON regularmente e guarde-os fora do navegador.**

## Sumário

1. [O que é o Impulso](#1-o-que-e-o-impulso)
2. [Primeiro acesso e instalação](#2-primeiro-acesso-e-instalacao)
3. [Navegação e organização da interface](#3-navegacao-e-organizacao-da-interface)
4. [Projetos independentes](#4-projetos-independentes)
5. [Dashboard — Central de Comando](#5-dashboard--central-de-comando)
6. [Ponto — registro de trabalho](#6-ponto--registro-de-trabalho)
7. [Foco — sessões planejadas](#7-foco--sessoes-planejadas)
8. [Hábitos e temporizadores](#8-habitos-e-temporizadores)
9. [Entradas retroativas](#9-entradas-retroativas)
10. [Meu Dia e Histórico](#10-meu-dia-e-historico)
11. [Calendário e sequências](#11-calendario-e-sequencias)
12. [Como o tempo é calculado](#12-como-o-tempo-e-calculado)
13. [Motor de Propulsão](#13-motor-de-propulsao)
14. [Metas e Cerimônias](#14-metas-e-cerimonias)
15. [Arena e Codex](#15-arena-e-codex)
16. [Elixires e cofres](#16-elixires-e-cofres)
17. [Visão — revelação do foguete](#17-visao--revelacao-do-foguete)
18. [Estatísticas](#18-estatisticas)
19. [Armazenamento local](#19-armazenamento-local)
20. [Temas, aparência e alertas](#20-temas-aparencia-e-alertas)
21. [Backups, exportação e restauração](#21-backups-exportacao-e-restauracao)
22. [Impressão e relatórios](#22-impressao-e-relatorios)
23. [Acessibilidade e uso em dispositivos](#23-acessibilidade-e-uso-em-dispositivos)
24. [Privacidade e limites técnicos](#24-privacidade-e-limites-tecnicos)
25. [Solução de problemas](#25-solucao-de-problemas)
26. [Perguntas frequentes](#26-perguntas-frequentes)
27. [Roteiro de verificação](#27-roteiro-de-verificacao)
28. [Arquivos do projeto](#28-arquivos-do-projeto)
29. [Glossário](#29-glossario)

---

## 1. O que é o Impulso

O **Impulso — Motor de Produtividade Pessoal** reúne cronometragem de trabalho, sessões de concentração, hábitos, registros retroativos, análise de produtividade e uma jornada simbólica de conquistas. Em vez de depender de uma pontuação arbitrária, o aplicativo parte dos **intervalos de tempo efetivamente registrados**.

A jornada de longo prazo tem **100 metas progressivas até 10.000 horas**, acompanhadas por uma campanha de **200 chefões**, cerimônias e recompensas chamadas Elixires. O Motor de Propulsão utiliza uma escala própria de graus, Pulsos, Giros, Turnos, Fases e Propulsões. Essas representações servem para visualizar a constância; não certificam competência, não garantem resultados e não substituem a avaliação do trabalho realizado.

O Impulso é um **PWA (Progressive Web App)**: funciona no navegador, pode oferecer instalação na tela inicial e mantém recursos essenciais em cache para uso offline. A aplicação é voltada ao uso pessoal, sem necessidade de conta para os recursos locais.

<p align="center"><img src="ImpulsoApp.png" alt="Apresentação visual do aplicativo Impulso" width="100%"></p>

## 2. Primeiro acesso e instalação

### Abrir o aplicativo

1. Acesse **https://magpe-stack.github.io/Impulso/** em um navegador atualizado.
2. Aguarde a apresentação de abertura, denominada **Ignição**.
3. Use **Novo** para criar um projeto ou **Projetos** para abrir um projeto existente.
4. Confira o nome do projeto ativo antes de começar a registrar atividades.

### Instalar como aplicativo

No Android, abra o site no Chrome e procure a opção **Instalar aplicativo** ou **Adicionar à tela inicial** no menu. No desktop, o navegador pode oferecer um ícone de instalação na barra de endereço. A disponibilidade depende do navegador e das condições de instalação do PWA.

<p align="center"><img src="logo.svg" alt="Logotipo do Impulso" width="180"></p>

### Usar sem internet

O `sw.js` utiliza o mecanismo de **service worker** para armazenar os recursos essenciais do aplicativo. Acesse o site conectado ao menos uma vez e aguarde a preparação do cache. Depois, teste a abertura sem conexão. O funcionamento offline depende de o navegador manter os arquivos em cache e os dados locais.

**Instalação não é backup.** Projetos e registros não são transferidos automaticamente para outro dispositivo. Não limpe os dados do site antes de exportar seus arquivos.

### Abertura Ignição

A abertura cinematográfica apresenta o foguete, iluminação, anel energético, partículas e revelação do nome Impulso. A sequência é visual; sua barra de progresso **não mede a velocidade real de carregamento**. O visual acompanha a identidade cromática selecionada. Com a preferência do sistema por **movimento reduzido**, os efeitos podem ser simplificados.

## 3. Navegação e organização da interface

O menu lateral organiza as funções em grupos expansíveis:

| Grupo | Páginas e comandos |
|---|---|
| **Início** | Novo, Projetos, Guardar, Restaurar, Imprimir |
| **Ações** | Ponto, Foco, Hábitos, Entradas |
| **Vitórias** | Arena, Codex, Elixires, Cerimônias, Visão |
| **Dados** | Dashboard, Meu Dia, Calendário, Motor, Estatísticas, Armazenamento |
| **Configurações** | Temas, modo claro/escuro e Alertas |
| **Sair** | Encerramento da interface mediante confirmação |

Selecione um grupo para abrir seu submenu. A página **Dashboard** é a central de comando inicial: ao abrir ou recarregar o aplicativo, a navegação retorna a ela. Quando não houver projeto ativo, utilize as opções para criar ou abrir um projeto.

No cabeçalho, os controles de **tema** e **tela cheia** aparecem conforme a interface e o suporte do navegador. O indicador global de atividade mostra **Ponto**, **Foco** ou **Hábitos** quando existe uma sessão ativa; quando aplicável, informa **Pausado**. Selecionar o indicador leva à página correspondente, sem encerrar a atividade.

**Navegar entre páginas não conclui uma sessão automaticamente.** O usuário deve utilizar os controles de término ou conclusão próprios de cada modalidade.

### Sair

A opção **Sair** solicita confirmação e apresenta uma tela de despedida. O navegador pode impedir que uma aba comum seja fechada por código. Sair não é o mesmo que excluir um projeto, apagar dados ou concluir uma sessão em andamento.

## 4. Projetos independentes

Cada projeto é um espaço de trabalho isolado: possui seus registros, hábitos, sessões, estatísticas, chefões, Elixires e progresso próprios.

### Criar

1. Abra **Início → Novo**.
2. Informe um nome com até **50 caracteres**.
3. Confirme e verifique que o projeto aparece como ativo.

### Abrir ou alternar

Em **Início → Projetos**, escolha o projeto desejado. Os indicadores e registros exibidos passam a refletir o projeto selecionado. Antes de iniciar qualquer sessão, confira o nome mostrado no Dashboard.

### Renomear e excluir

A área Projetos permite gerenciar nomes e excluir projetos mediante os controles disponíveis. **Excluir é uma operação destrutiva**; faça um backup individual ou geral antes. Alterar o nome não deve ser confundido com criar outro projeto.

As preferências de aparência são do aplicativo naquele navegador, enquanto os dados de produtividade pertencem a cada projeto.

## 5. Dashboard — Central de Comando

O **Dashboard** é a página inicial e reúne informações essenciais sem reproduzir o desenho do rotor do Motor. Seu desenho procura manter os elementos dentro de **uma única área visível, sem barras de rolagem**, em desktop e celular. Em situações extremas de zoom, fontes ampliadas ou janelas muito pequenas, a legibilidade e a acessibilidade podem impor limitações físicas ao espaço disponível.

### Seis indicadores

| Indicador | Significado |
|---|---|
| **Tempo total** | Tempo produtivo consolidado do projeto. |
| **Hoje** | Tempo atribuído à data atual do dispositivo. |
| **Sequência** | Quantidade de dias consecutivos com atividade, segundo a regra de sequência do projeto. |
| **Giros** | Giros completos, equivalentes a horas inteiras de trabalho. |
| **Propulsão** | Percentual de avanço em relação a uma Propulsão de 10.080 horas. |
| **Metas** | Quantidade das 100 metas progressivas de 10.000 horas já alcançadas. |

### Mapa de atividade anual

O mapa inspirado no calendário de contribuições do GitHub mostra **os últimos 365 dias**, organizados em **53 colunas semanais** e sete linhas correspondentes aos dias da semana. Cada quadradinho representa um dia; a cor indica quanto tempo produtivo foi registrado nessa data:

| Intensidade | Tempo registrado no dia |
|---|---|
| Sem preenchimento de atividade | Nenhum intervalo produtivo. |
| Nível 1 | Até 30 minutos. |
| Nível 2 | Mais de 30 minutos até 2 horas. |
| Nível 3 | Mais de 2 até 4 horas. |
| Nível 4 | Mais de 4 horas. |

As cores são adaptadas ao tema ativo. No desktop, posicionar o ponteiro sobre uma célula apresenta a data e a duração; as células também possuem rótulos acessíveis. O mapa utiliza os mesmos registros de **Ponto, Foco, Hábitos e Entradas**, sem criar uma segunda base de dados. Registros simultâneos não duplicam o tempo e sessões que atravessam a meia-noite são distribuídas entre as datas correspondentes.

**Como interpretar:** uma célula mais intensa significa mais tempo registrado, não necessariamente maior qualidade, rendimento ou concentração.

### Controles de operação e meta seguinte

Os quatro botões **Ponto**, **Foco**, **Hábitos** e **Entradas** abrem diretamente as páginas existentes; não iniciam uma atividade por conta própria. O painel também identifica a atividade em andamento ou pausada e oferece o acompanhamento da **próxima meta**, com progresso e tempo restante.

## 6. Ponto — registro de trabalho

Use **Ações → Ponto** para cronometrar um trabalho que está acontecendo.

1. Abra o projeto correto e entre em **Ponto**.
2. Informe o **nome do trabalho**, com até 50 caracteres.
3. Selecione **Iniciar**. O aplicativo registra a data e a hora de início.
4. Trabalhe normalmente. É possível consultar outras páginas e voltar depois.
5. Selecione **Terminar** para marcar o fim.
6. Quando o fluxo apresentar **Concluir**, confirme o lançamento.
7. Consulte o resultado em **Meu Dia** e no **Histórico**.

O formulário permanece na própria página, sem diálogo modal que bloqueie a navegação. Uma atividade pode começar em um dia e terminar no seguinte. Os horários reais são preservados; os totais diários são calculados separadamente.

**Atenção:** não inicie Ponto e Foco ao mesmo tempo. Evite usar duas abas para controlar a mesma sessão. Se o aparelho suspender o navegador, confira o estado e os horários antes de concluir. Fechar o aplicativo não equivale a apertar **Terminar**.

## 7. Foco — sessões planejadas

**Ações → Foco** permite organizar períodos de concentração com um objetivo explícito, duração planejada e avaliação posterior. Diferentemente do Ponto, o Foco registra tanto **tempo** quanto **intenção e resultado**.

### Planejar uma sessão

1. Informe o **nome da atividade** (até 50 caracteres).
2. Descreva o **objetivo** (até 200 caracteres).
3. Escolha o compromisso: **Entrega** (resultado a produzir) ou **Dedicação** (tempo a dedicar).
4. Defina a **duração planejada**, de **1 a 1.440 minutos**.
5. Inicie a sessão.

### Executar e concluir

Durante o trabalho, use **Pausar** quando interromper a atividade e **Retomar** ao voltar. A contagem efetiva exclui os intervalos de pausa. Ao concluir, avalie o objetivo como **integralmente alcançado**, **parcialmente alcançado** ou **não alcançado**. Uma observação opcional, de até **200 caracteres**, pode registrar o aprendizado.

O aplicativo diferencia a duração **planejada** da **efetiva**. Ultrapassar o tempo previsto não significa vitória automática; o desvio de tempo e a avaliação do objetivo são informações distintas. O histórico próprio do Foco apresenta as **50 sessões mais recentes**, incluindo planejamento, execução e avaliação.

A sessão pode continuar registrada ao navegar ou reabrir o PWA, conforme o estado salvo no projeto. Seus intervalos efetivos entram no cálculo de produtividade, no Meu Dia, no Calendário e no Histórico, sem duplicação de períodos sobrepostos. **Ponto e Foco não devem ser iniciados simultaneamente.**

## 8. Hábitos e temporizadores

A página **Ações → Hábitos** reúne o **Inventário de Elixires** (catálogo de hábitos) e os **Elixires Ativos** (hábitos equipados para execução). Os nomes se referem a hábitos; os **Elixires colecionáveis**, descritos adiante, são recompensas diferentes.

### Escolher e criar hábitos

O catálogo offline oferece **200 sugestões em 25 categorias**. É possível selecionar sugestões e cadastrar hábitos personalizados. Cada projeto pode manter **até seis hábitos ativos**. O limite diz respeito aos hábitos equipados, não ao número de registros históricos.

### Executar um hábito

1. Abra **Hábitos** e localize o cartão do hábito ativo.
2. Configure a duração disponível no temporizador.
3. Inicie a atividade.
4. Use **Pausar** e **Retomar** quando necessário.
5. Ao terminar, utilize o comando de **conclusão** e confirme quando solicitado.
6. Confira o registro em **Meu Dia** e no Histórico.

O temporizador ajuda a conduzir a atividade; **a passagem do tempo, por si só, não deve ser confundida com a confirmação de um hábito concluído**. A conclusão pode oferecer observação opcional. O registro resultante participa do tempo produtivo do projeto e, quando elegível, das regras de recompensas.

Uma conclusão de hábito pode liberar **no máximo um Elixir colecionável** associado a um cofre disponível. Equipar um hábito não concede automaticamente um Elixir.

## 9. Entradas retroativas

Use **Ações → Entradas** para registrar atividades **já realizadas**, sem iniciar cronômetro. A página oferece duas modalidades:

### Entrada de Ponto

Informe o nome da atividade, a data e o horário de início e a data e o horário de término. Confirme em **Lançar entrada**. O registro aparece identificado como **Entrada Manual**.

### Entrada de Hábito

Selecione um hábito existente, informe os horários reais e confirme em **Lançar hábito**. O registro fica vinculado ao hábito escolhido. Se ainda não existir um hábito adequado, cadastre-o antes em **Hábitos**.

O sistema verifica a coerência das datas e exige término posterior ao início. Atividades que atravessam a meia-noite são permitidas. **Não lance novamente uma atividade já registrada** por Ponto, Foco ou Hábitos: a união de intervalos evita inflar o tempo produtivo, mas a duplicidade pode confundir históricos e recompensas.

## 10. Meu Dia e Histórico

**Meu Dia** mostra os registros relacionados à data selecionada ou corrente, com título no formato **Meu Dia dd-mm-aaaa**. Os dados incluem tipo de atividade, nome, início, término e opção de exclusão. Hábitos concluídos também aparecem nessa visualização.

O **Histórico** permite consultar atividades ao longo do projeto. As categorias de registro incluem **Ponto**, **Entrada Manual**, **Hábito** e, quando aplicável, sessões de **Foco**. O nome apresentado identifica o trabalho ou hábito realizado.

### Excluir um registro

Use a lixeira correspondente somente quando tiver certeza. A exclusão altera o tempo consolidado e pode modificar sequências, metas, chefões e a validade de recompensas relacionadas. **Faça backup antes de remover registros importantes.**

## 11. Calendário e sequências

Em **Dados → Calendário**, consulte a produtividade mês a mês. Os controles **Anterior** e **Próximo** mudam o período. Cada dia apresenta o tempo atribuído àquela data; selecionar um dia permite examinar suas atividades e, conforme o fluxo, acessar Meu Dia ou imprimir um relatório diário.

O calendário acompanha três indicadores de regularidade:

- **Sequência atual:** dias consecutivos com trabalho registrado. Se o último dia ativo foi ontem, a sequência ainda pode estar em aberto, pois o dia atual não terminou.
- **Recorde pessoal:** maior sequência de dias produtivos do projeto.
- **Última sequência encerrada:** duração da sequência anterior que já foi interrompida.

Um dia conta como ativo quando há pelo menos um intervalo de duração positiva. Várias atividades no mesmo dia não criam vários dias de sequência. Alterações retroativas, exclusões e restaurações fazem os indicadores serem recalculados.

## 12. Como o tempo é calculado

O Impulso calcula o tempo produtivo a partir dos **intervalos reais** dos registros. Três regras são fundamentais:

1. **Pausas não são trabalho:** no Foco, apenas os períodos efetivos entram na contagem.
2. **Sobreposições não duplicam horas:** se duas atividades ocorreram simultaneamente no mesmo projeto, o tempo consolidado corresponde à união dos intervalos, não à soma simples de ambos.
3. **A meia-noite divide os totais diários:** um registro pode aparecer em dois dias para consulta, mas continua sendo uma única atividade.

**Exemplo:** um trabalho começa às **23h46** e termina às **00h59** do dia seguinte. Sua duração é **1h13min**: o primeiro dia recebe **14 minutos** e o segundo **59 minutos**.

Na visão de **todos os projetos** das Estatísticas, tempos pertencentes a projetos diferentes podem ser somados mesmo que ocorram simultaneamente; esse total representa a soma de horas **por projeto**, não necessariamente tempo cronológico exclusivo da pessoa.

Os cálculos dependem do relógio e do fuso horário configurados no dispositivo. Ajustes incorretos podem afetar datas, durações e sequências.

## 13. Motor de Propulsão

A página **Dados → Motor**, intitulada **Motor de Propulsão**, representa o tempo consolidado por meio de uma escala simbólica. A equivalência básica é **10 segundos = 1 grau**.

| Unidade | Equivalência | Graus | Horas |
|---|---|---:|---:|
| **Pulso** | 30 minutos | 180 | 0,5 |
| **Giro** | 2 Pulsos | 360 | 1 |
| **Turno** | 8 Giros | 2.880 | 8 |
| **Fase** | 30 Turnos | 86.400 | 240 |
| **Propulsão** | 42 Fases | 3.628.800 | 10.080 |

Os contadores mostram equivalências do **mesmo tempo**, não quantidades a somar entre si. Por exemplo, 8 horas correspondem a 16 Pulsos, 8 Giros e 1 Turno.

### Rotor e Ignição

O rotor é uma visualização, não um motor físico. Suas pás ficam paradas até que o usuário selecione **Ignição**. A reprodução percorre os Giros acumulados do projeto à velocidade de **uma volta de 360 graus a cada 0,3 segundo**. O contador indica as voltas reproduzidas; **Parar** interrompe a apresentação. Selecionar Ignição novamente permite reiniciá-la.

**Exemplo:** 7 Giros correspondem a cerca de **2,1 segundos** de reprodução; 288 Giros, a cerca de **1 minuto e 26,4 segundos**, sem contar eventuais limitações de desempenho do navegador.

A reprodução **não acrescenta tempo, graus, metas ou recompensas**. Com movimento reduzido, a apresentação pode ser estática, mantendo o resultado textual. As cores acompanham o tema ativo.

A primeira **Propulsão** exige **10.080 horas**. Esse marco é distinto da jornada de **10.000 horas** usada para metas, Arena e Cerimônias: a diferença é de 80 horas.

## 14. Metas e Cerimônias

### As 100 metas

A jornada simbólica de 10.000 horas está dividida em **100 metas progressivas**. A meta de número **n** é atingida quando o total acumulado alcança **n² horas**. A quantidade adicional exigida entre duas metas consecutivas é **2n − 1 horas**.

| Meta | Total acumulado necessário |
|---|---:|
| 1 | 1 hora |
| 2 | 4 horas |
| 3 | 9 horas |
| 10 | 100 horas |
| 50 | 2.500 horas |
| 99 | 9.801 horas |
| 100 | 10.000 horas |

A faixa de **próxima meta** no Dashboard informa a etapa seguinte e o tempo restante. Excluir registros pode reduzir o número de metas alcançadas.

### Galeria de Cerimônias

Em **Vitórias → Cerimônias**, cada meta possui uma apresentação própria. Cerimônias bloqueadas indicam o marco necessário; as liberadas podem ser abertas e revistas. As metas 10, 20, 30 e assim sucessivamente possuem apresentações especiais, culminando na **Consagração**.

Ao abrir uma cerimônia, a animação começa no próprio diálogo, com efeitos visuais, emblema, título e texto. O botão **Reproduzir novamente** reinicia a sequência **sem fechar e reabrir a janela**, preservando suas dimensões. **Fechar cerimônia** encerra a apresentação; a tecla **Esc** também pode estar disponível conforme o diálogo.

Se o sistema solicitar **reduzir movimento**, os efeitos são suprimidos e a conquista permanece legível. Nesse caso, a opção **Ativar animação nesta cerimônia** permite autorizar voluntariamente a animação apenas naquela visualização. O diálogo procura caber na área visível, sem barras de rolagem internas; em telas muito pequenas, o conteúdo pode ser reduzido para permanecer visível.

**Rever uma cerimônia não registra horas, não concede Elixires e não altera o progresso.** A disponibilidade das cerimônias depende do tempo produtivo consolidado do projeto.

## 15. Arena e Codex

### Arena

Em **Vitórias → Arena**, a jornada é representada por **200 chefões**, distribuídos em **10 fases de 20 adversários**. Os marcos de dificuldade aumentam ao longo das 10.000 horas. Cada chefão possui identidade narrativa, descrição, resistência (**HP**) e condição de avanço associada ao tempo.

A campanha usa a equivalência simbólica de **um minuto produtivo para um ponto de dano**. Os obstáculos narrativos — distração, adiamento, cansaço e outros — não retiram horas nem aplicam penalidades reais. A vitória resulta do progresso registrado, não de cliques repetitivos.

### Codex

O **Codex** funciona como uma coleção de fichas e histórias dos adversários, permitindo acompanhar o universo narrativo e as conquistas da Arena.

Se registros forem excluídos e o tempo acumulado diminuir, a situação de chefões e conquistas relacionadas pode ser recalculada.

## 16. Elixires e cofres

Os **Elixires colecionáveis** são recompensas narrativas associadas aos cofres dos chefões. Eles não devem ser confundidos com os **Elixires Ativos** da página Hábitos, que são hábitos equipados.

### Como obter um Elixir

1. Registre tempo suficiente para derrotar um chefão na **Arena**.
2. Verifique se existe um **cofre disponível** ligado à conquista.
3. Conclua um hábito elegível no projeto.
4. Consulte **Vitórias → Elixires** para acompanhar o cofre e a recompensa.

A derrota do chefão **não abre automaticamente** seu cofre. Uma conclusão de hábito libera **no máximo um Elixir**, e conclusões anteriores à vitória não são reaproveitadas automaticamente para cofres futuros. A relação entre cofre, conclusão e recompensa é registrada no projeto.

Excluir o hábito que sustentava a recompensa, ou reduzir o tempo a ponto de invalidar a vitória correspondente, pode revogar a validade do Elixir. As ações de compartilhar ou copiar frases dependem das capacidades do navegador e do dispositivo.

## 17. Visão — revelação do foguete

A página **Vitórias → Visão** apresenta o foguete ilustrado em `ImpulsoVision.svg`, inicialmente coberto por **200 quadradinhos**, organizados em **20 colunas e 10 linhas**.

Cada Elixir colecionável **válido** oferece um crédito de revelação. O usuário decide quando utilizá-lo:

1. Abra **Visão**.
2. Consulte o saldo de revelações disponíveis.
3. Selecione um quadradinho ainda oculto.
4. Confirme a revelação.
5. Acompanhe a porcentagem da imagem descoberta.

A aba **Histórico** da própria Visão apresenta a sequência de revelações, com data, horário, posição e vínculo do crédito quando esses dados estão disponíveis. Revelações antigas sem esses metadados continuam preservadas, sem datas inventadas.

Uma parte já revelada permanece visível mesmo que o Elixir associado perca a validade; porém, o saldo para **novas revelações** é recalculado. Cada projeto possui sua própria Visão, incluída nos backups JSON.

## 18. Estatísticas

Em **Dados → Estatísticas**, acompanhe os resultados do projeto atual ou uma visão consolidada de **todos os projetos**. Escolha o período de análise: **Hoje**, **Últimos 7 dias**, **Mês atual**, **Ano atual** ou **Todo o histórico**.

Os grupos de análise abrangem:

| Grupo | Conteúdo |
|---|---|
| **Produtividade** | Tempo, sessões, frequência e médias. |
| **Hábitos** | Conclusões, duração, frequência e hábitos ativos. |
| **Desempenho temporal** | Distribuição por dias, horários e tipos de atividade. |
| **Evolução** | Progresso até 10.000 horas, comparações e estimativas. |
| **Arena e RPG** | Chefões, Codex, cofres e Elixires. |
| **Concentração** | Durações e distribuição das sessões registradas. |
| **Armazenamento e integridade** | Estimativas de dados e indicadores de consistência. |
| **Tendências** | Evolução histórica e comparações de períodos. |

Use **Atualizar** para recalcular. Quando disponíveis, **Exportar JSON** e **Imprimir** permitem consultar os resultados fora da tela. Esses comandos não alteram os registros.

**Interpretação responsável:** projeções são estimativas; tempo não mede qualidade ou atenção psicológica. Quando não houver dados suficientes, um indicador não deve ser interpretado como prova de desempenho.

## 19. Armazenamento local

A página **Dados → Armazenamento** apresenta um monitor do armazenamento usado pelo aplicativo. Ela pode informar:

- Uso estimado da origem e cota informada pelo navegador.
- Volume aproximado dos dados do Impulso e do `localStorage`.
- Tamanho aproximado do cache offline.
- Estimativa do tamanho do Backup Geral.
- Distribuição por projeto, persistência e data da última solicitação de backup, quando disponíveis.

As estimativas podem se sobrepor; **não some todos os números** como se representassem espaços independentes. A cota não corresponde necessariamente ao espaço livre físico do aparelho. O navegador pode omitir informações ou negar a solicitação de armazenamento persistente.

Persistência reduz alguns riscos de remoção automática, mas **não impede exclusão manual, limpeza de dados, desinstalação ou perda do dispositivo**. A data de um backup indica que o download foi solicitado, não que o arquivo foi guardado com sucesso.

## 20. Temas, aparência e alertas

O Impulso oferece **sete identidades cromáticas**, combináveis com aparência **clara** ou **escura**:

| Identidade | Característica |
|---|---|
| **Original** | Identidade clássica do Impulso. |
| **Vinho** | Magenta, roxo e rosa. |
| **Blue Sky** | Turquesa e azul. |
| **Trinity** | Harmonia triádica laranja, verde e roxo. |
| **Granfino** | Grafite, prata e tons neutros. |
| **Ecológico** | Verdes profundos e acentos luminosos. |
| **Místico** | Roxos e magentas de atmosfera profunda. |

Abra **Configurações**, selecione a identidade e escolha o modo claro ou escuro. O tema afeta superfícies, botões, mapa de atividade, rotor e outros elementos visuais. A preferência é armazenada no navegador, independentemente dos projetos.

A mesma página reúne os **Alertas**, incluindo lembretes relacionados a backups e atividades/hábitos quando disponíveis. Alertas são auxiliares: **não criam backups automaticamente** e não substituem a confirmação de um registro. A disponibilidade de avisos pode depender do navegador, das permissões e do estado da aplicação.

## 21. Backups, exportação e restauração

O Impulso utiliza arquivos **JSON** para transportar ou preservar os dados. Há uma diferença essencial entre guardar todos os projetos e exportar somente um.

| Operação | Abrangência | Resultado |
|---|---|---|
| **Guardar / Backup Geral** | Todos os projetos | Solicita download de um JSON geral. |
| **Exportar projeto** | Projeto selecionado | Solicita download de um JSON individual. |
| **Importar projeto** | Um projeto | Incorpora os dados do arquivo individual conforme o fluxo de importação. |
| **Restaurar** | Todos os projetos | Substitui os dados atuais pelo Backup Geral, após confirmação. |

### Fazer um Backup Geral

1. Abra **Início → Guardar**.
2. Solicite o arquivo JSON.
3. Verifique se o download terminou e se o arquivo existe.
4. Copie-o para outro local seguro, de preferência fora do aparelho.
5. Mantenha cópias datadas, sem substituir imediatamente a anterior.

### Restaurar todos os projetos

1. Faça um backup **dos dados atuais** antes de qualquer restauração.
2. Abra **Início → Restaurar**.
3. Escolha um **Backup Geral compatível**.
4. Leia a confirmação de substituição dos dados.
5. Confirme somente se desejar restaurar o conjunto de projetos do arquivo.
6. Confira projetos, registros, hábitos e conquistas após a operação.

**Não utilize Restaurar para importar um projeto isolado.** Um backup individual deve ser tratado pelo fluxo de importação de projeto. A restauração geral pode substituir informações recentes que não estejam no arquivo escolhido.

### Frequência recomendada

Faça backups após sessões importantes, conquistas, alterações de projeto e antes de atualizar o PWA, limpar dados, trocar de aparelho, excluir registros ou restaurar outro arquivo. Os downloads são controlados pelo navegador; o aplicativo não garante armazenamento em nuvem.

## 22. Impressão e relatórios

O comando **Início → Imprimir** abre o fluxo de impressão do navegador para o conteúdo oferecido pelo aplicativo. As páginas de **Meu Dia**, **Calendário** e **Estatísticas** também podem oferecer relatórios específicos.

Para gerar PDF, selecione **Imprimir** e escolha **Salvar como PDF** como destino, quando o navegador disponibilizar essa opção. Confira título, projeto, datas, horários e quebra de páginas na pré-visualização antes de salvar.

O título diário segue o padrão **Meu Dia dd-mm-aaaa**. A impressão não substitui um backup JSON: relatórios servem para leitura e arquivamento, enquanto o JSON preserva dados estruturados para restauração.

## 23. Acessibilidade e uso em dispositivos

- **Teclado:** utilize Tab e Enter/Espaço nos controles compatíveis; menus expansíveis e diálogos devem permitir navegação por teclado.
- **Movimento reduzido:** o Impulso respeita `prefers-reduced-motion` em apresentações e cerimônias; a reprodução voluntária de uma cerimônia pode ser habilitada naquela visualização.
- **Cores e rótulos:** conquistas, estados e ações devem ser identificados também por texto ou símbolos, não apenas pela cor.
- **Celular e desktop:** o layout adapta grades e cartões à largura disponível. O Dashboard e o diálogo de Cerimônias procuram caber na área visível sem rolagem.
- **Zoom e texto ampliado:** em condições extremas, o espaço disponível pode ser insuficiente para manter simultaneamente todos os elementos grandes e visíveis. Priorize acesso aos controles e leitura dos dados.
- **Tela cheia:** depende das permissões e do suporte do navegador; não é requisito para registrar atividades.

## 24. Privacidade e limites técnicos

O Impulso mantém seus registros principalmente no **armazenamento local do navegador**. Não há sincronização automática entre dispositivos, perfis ou navegadores. Arquivos JSON exportados podem conter nomes de projetos, atividades, horários e observações: trate-os como dados pessoais e armazene-os com cuidado.

O navegador pode remover dados por limpeza manual, políticas de armazenamento, modo privado ou falhas. A disponibilidade offline também depende da permanência do cache. Alterações no relógio do dispositivo podem afetar os registros. A aplicação não é um serviço de controle de jornada trabalhista homologado, um sistema de comprovação legal de horas ou uma ferramenta de diagnóstico de saúde.

A progressão de 10.000 horas e os elementos de RPG são **representações motivacionais**, não garantias de domínio profissional. O tempo registrado não informa, por si só, a qualidade da execução.

## 25. Solução de problemas

| Situação | O que verificar e fazer |
|---|---|
| **O aplicativo não passa da abertura** | Feche e reabra. Atualize com conexão, aguarde o cache e tente novamente. Não apague os dados do site sem backup. |
| **O Dashboard mostra outro projeto** | Abra **Projetos** e selecione o projeto correto. |
| **O botão Foco não abre a página** | Atualize os arquivos do PWA, feche instâncias antigas e teste novamente; o atalho deve abrir **Ações → Foco**. |
| **Ponto ou Foco continua ativo** | Use o indicador global no cabeçalho para voltar à atividade e concluí-la. |
| **Os tempos parecem maiores que o esperado** | Confira Entradas duplicadas, horários e fuso. Lembre-se de que as Estatísticas globais somam projetos distintos. |
| **Os tempos parecem menores que a soma das atividades** | Verifique se houve intervalos simultâneos: o tempo consolidado não os conta duas vezes. |
| **O dia ou a sequência está incorreto** | Confira o relógio local, os horários dos registros e as atividades que atravessaram a meia-noite. |
| **O mapa anual tem quadrados vazios** | Verifique se há registros produtivos nas datas e no projeto selecionado. Dias sem atividade ficam vazios. |
| **A Ignição não anima** | Verifique a preferência por movimento reduzido e se o projeto possui Giros acumulados. A apresentação não altera os dados. |
| **A cerimônia aparece estática** | O sistema pode estar em movimento reduzido. Se disponível, use **Ativar animação nesta cerimônia**. |
| **Não consigo reproduzir ou fechar a cerimônia** | Teste os botões dentro do diálogo; se persistir, atualize o PWA com conexão e reabra. |
| **Um Elixir deixou de ser válido** | Confira se o chefão continua derrotado e se o hábito associado ainda existe no histórico. |
| **O backup não aparece** | Verifique a pasta Downloads e as permissões do navegador; solicitar download não comprova que o arquivo foi salvo. |
| **O aplicativo não abre offline** | Abra conectado, aguarde o cache, feche e teste novamente. Verifique se os dados do site foram limpos. |
| **O tema antigo continua aparecendo** | Reabra com conexão para permitir a atualização do cache e confira a seleção em Configurações. |

**Regra de segurança:** antes de limpar cache, redefinir armazenamento, reinstalar o PWA ou testar restaurações, exporte e verifique um Backup Geral.

## 26. Perguntas frequentes

**Posso usar vários projetos?** Sim. Cada projeto mantém registros e progressão próprios.

**Posso trabalhar sem internet?** Sim, após o cache offline ter sido preparado e enquanto o navegador mantiver os recursos necessários.

**Instalar o aplicativo cria uma cópia de segurança?** Não. Instalação e backup são processos diferentes.

**Ponto continua contando enquanto navego?** O estado da sessão é preservado no projeto; volte a Ponto para terminar e concluir. A continuidade após suspensão do navegador deve ser conferida.

**Qual a diferença entre Ponto e Foco?** Ponto registra um trabalho; Foco acrescenta duração planejada, objetivo, pausas e avaliação de resultado.

**Posso registrar um trabalho de ontem?** Sim, em **Entradas**, usando as datas e horários reais.

**Por que duas atividades de uma hora podem representar apenas uma hora produtiva?** Porque intervalos simultâneos do mesmo projeto não são somados em duplicidade.

**O mapa do Dashboard mede produtividade ou qualidade?** Ele representa **tempo registrado por dia**, não qualidade do resultado.

**O que acontece se eu apagar um registro?** O tempo, as metas, a Arena e algumas recompensas podem ser recalculados.

**Qual é a diferença entre 10.000 e 10.080 horas?** As **10.000 horas** encerram a jornada das 100 metas; **10.080 horas** completam uma Propulsão do Motor.

**Reproduzir uma cerimônia concede uma recompensa?** Não. É uma apresentação visual de uma conquista já disponível.

**Por que não recebi um Elixir ao derrotar um chefão?** O cofre depende também de uma conclusão de hábito elegível.

**Posso transferir dados para outro celular?** Sim, por meio dos arquivos JSON e dos fluxos de importação/restauração correspondentes. Não existe sincronização automática.

**Posso imprimir em PDF?** Sim, se o navegador oferecer **Salvar como PDF** no diálogo de impressão.

## 27. Roteiro de verificação

Após instalar, atualizar ou restaurar o aplicativo, utilize este roteiro:

- [ ] Abrir o aplicativo e verificar se o **Dashboard** é exibido.
- [ ] Criar dois projetos e confirmar que seus registros ficam separados.
- [ ] Abrir e fechar o menu; testar os submenus e os sete temas em claro/escuro.
- [ ] Iniciar **Ponto**, navegar para outra página, retornar e concluir.
- [ ] Criar uma sessão **Foco**, pausar, retomar, concluir e avaliar o objetivo.
- [ ] Confirmar que os atalhos do Dashboard abrem Ponto, Foco, Hábitos e Entradas.
- [ ] Criar/equipar um hábito, executar o temporizador e concluir.
- [ ] Lançar uma Entrada retroativa e conferir em Meu Dia e no Histórico.
- [ ] Conferir um registro que atravesse a meia-noite.
- [ ] Verificar que períodos sobrepostos não duplicam o tempo produtivo.
- [ ] Consultar Calendário, sequências e mapa anual de atividade.
- [ ] Acionar **Ignição** e **Parar** sem modificar os registros.
- [ ] Abrir uma Cerimônia liberada, reproduzir novamente e fechar.
- [ ] Conferir Arena, Codex, Elixires e Visão.
- [ ] Exportar um projeto e realizar **Backup Geral**.
- [ ] Conferir a existência e a integridade dos arquivos baixados.
- [ ] Testar restauração **somente após criar um backup dos dados atuais**.
- [ ] Testar impressão/PDF e funcionamento offline.

## 28. Arquivos do projeto

| Arquivo | Finalidade |
|---|---|
| `index.html` | Estrutura principal da interface e abertura. |
| `app.js` | Lógica de navegação, projetos, registros, cronômetros, conquistas e backups. |
| `styles.css` | Estilos gerais e layout responsivo. |
| `theme-impulso.css` | Identidade Vinho. |
| `theme-impulso-analogo.css` | Identidade Blue Sky. |
| `theme-impulso-triadico.css` | Identidade Trinity. |
| `theme-impulso-granfino.css` | Identidade Granfino. |
| `theme-impulso-ecologico.css` | Identidade Ecológico. |
| `theme-impulso-mistico.css` | Identidade Místico. |
| `habitos_elixires_v2.json` | Catálogo offline de sugestões de hábitos. |
| `manifest.json` | Informações de instalação do PWA. |
| `sw.js` | Cache de recursos para uso offline. |
| `README.md` | Manual do usuário. |
| `LICENSE` | Licença do projeto. |
| `logo.svg`, `logo.png` | Logotipos e identidade visual. |
| `ImpulsoCover.png`, `ImpulsoApp.png` | Imagens de apresentação e documentação. |
| `ImpulsoVision.svg` | Ilustração da página Visão. |
| `icon-192.png`, `icon-512.png` | Ícones de instalação. |
| `rocket-192-v11.png`, `rocket-512-v11.png` | Imagens do foguete utilizadas pelo aplicativo. |

**Observação para quem publica no GitHub:** mantenha os nomes dos arquivos e os caminhos relativos das imagens do manual. As referências a `ImpulsoCover.png`, `ImpulsoApp.png` e `logo.svg` pressupõem que esses arquivos estejam disponíveis nos caminhos indicados.

## 29. Glossário

**Arena:** campanha de 200 chefões associada ao tempo registrado.  
**Backup Geral:** arquivo JSON que reúne os projetos.  
**Calendário:** visão mensal dos registros e das sequências.  
**Cerimônia:** apresentação visual de uma meta alcançada.  
**Codex:** coleção de fichas narrativas dos chefões.  
**Cofre:** recompensa de chefão derrotado, dependente de hábito elegível.  
**Dashboard:** central de comando com indicadores, mapa anual e atalhos.  
**Elixir Ativo:** hábito equipado para execução.  
**Elixir colecionável:** recompensa narrativa obtida ao abrir um cofre.  
**Entradas:** registro retroativo de trabalho ou hábito.  
**Fase:** unidade do Motor equivalente a 240 horas.  
**Foco:** sessão com objetivo, tempo planejado, pausas e avaliação.  
**Giro:** unidade do Motor equivalente a uma hora.  
**Graus:** escala simbólica na qual dez segundos equivalem a um grau.  
**Hábitos:** atividades recorrentes executadas com temporizador.  
**Histórico:** conjunto de registros de um projeto.  
**Ignição:** nome da abertura visual e do comando de reprodução do rotor, conforme o contexto.  
**JSON:** formato de arquivo usado em backups e exportações.  
**Mapa de atividade:** calendário anual de intensidade do tempo produtivo.  
**Meu Dia:** registros relacionados a uma data específica.  
**Motor:** visualização do tempo em graus e unidades de propulsão.  
**Ponto:** cronometragem de trabalho em andamento.  
**Propulsão:** unidade do Motor equivalente a 10.080 horas.  
**Pulso:** unidade do Motor equivalente a 30 minutos.  
**PWA:** aplicativo web com recursos de instalação e cache offline.  
**Sequência:** contagem de dias consecutivos com atividade produtiva.  
**Service worker:** componente do navegador responsável por recursos de cache offline.  
**Turno:** unidade do Motor equivalente a oito horas.  
**Visão:** imagem do foguete revelada com créditos de Elixires válidos.

---

**Impulso — Motor de Produtividade Pessoal**  
*A constância começa com um pequeno impulso.*

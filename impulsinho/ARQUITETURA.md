# Impulsinho — Arquitetura e auditoria inicial (v107)

## Escopo implementado

- Auditoria da estrutura de `app.js`, `index.html`, `styles.css`, `sw.js`, dados e preferências.
- 109 imagens WebP originais, identificadas por Unicode e checksum SHA-256, sem alterações de conteúdo.
- Catálogo `catalogo.json` com caminhos relativos e integridade.
- Ponte somente leitura `window.Impulsinho.consultar()` criada no mesmo escopo do aplicativo.
- Eventos `impulsinho:dados-alterados` (após salvamento local) e `impulsinho:navegacao` (após renderização).
- Cache offline atualizado para incluir todas as facetas e catálogo.

## Mapeamento do aplicativo

| Subsistema | Origem atual | Regra de integração futura |
| --- | --- | --- |
| Projetos | `state.projects`, `state.active`, `project()` | Somente leitura; respeitar projeto ativo |
| Tempo | `intervals()`, `total()`, `dayTotal()` | Reutilizar união de intervalos e divisão por dia |
| Arena | `bossStatus()` | Consultar derrotas, não recalcular dano por conta própria |
| Hábitos | `p.records` e `p.habits` | Distinguir execuções e hábitos equipados |
| Novidades | `badgeData`, `updateBadges()` | Integrar sem marcar conquistas como lidas automaticamente |
| Backup | `fileNeedsUpdate()`, `refreshFileNotice()` | Apenas indicar pendência; não sobrescrever arquivos |
| Configurações | `renderConfiguracao()`, `localStorage` | Adicionar controles em etapa posterior |
| Navegação | `page`, `render()` | Usar evento de navegação sem alterar roteamento |
| PWA | `sw.js` e `manifest.json` | Cache versionado, todos os assets offline |

## Contrato da ponte de leitura

`window.Impulsinho.consultar()` devolve um objeto congelado contendo `projetos`, `pagina`, `backupPendente` e, se houver projeto ativo, `projeto` com `id`, `nome`, `tempoMs`, `hojeMs`, `horasRestantesMs`, `habitosConcluidos`, `chefoesDerrotados` e `chefoesTotais`. Não retorna referências editáveis do estado original.

Os valores são calculados **quando consultados**. `tempoMs` usa registros consolidados, sem tempo em andamento; a atualização ao vivo será especificada na etapa de estatísticas. O número de hábitos concluídos é histórico total do projeto, não apenas de hoje.

## Não implementado nesta etapa

Avatar flutuante, balões, arrastar, silenciar, ocultar, 1.200 falas, motor emocional, sons, personalidades, perguntas e respostas, integração visual de avisos e evolução. Não alegar que esses recursos estão disponíveis na v107.

## Invariantes e riscos

1. Não mudar a chave `impulso-data-v1`, o esquema de projetos nem o formato de backup.
2. Não alterar os cálculos atuais do Motor ou da Arena.
3. O evento de salvamento é emitido depois da gravação local bem-sucedida; não significa backup externo atualizado.
4. Cache de todas as 109 facetas aumenta o download inicial; verificar armazenamento em dispositivos móveis.
5. Não inferir desempenho ou qualidade de trabalho a partir do tempo registrado.
6. Manter `prefers-reduced-motion`, foco de teclado, acessibilidade e os sete temas quando a interface for adicionada.

## Próxima etapa

Etapa 2: personagem flutuante, balões e controles básicos, sem migrar ainda o sistema de avisos.

## Versão 108 — Etapa 2 (interface visual)

- `avatar.js` e `avatar.css`: personagem flutuante e arrastável, balão com abertura/fechamento, controles Silenciar, Ocultar, Configurar, retorno após ocultação e persistência local de preferências e posição.
- A expressão inicial usa uma das imagens originais (`emoji_u1f9d0_3d.webp`). A catalogação das 109 facetas permanece intacta; a alternância emocional pertence à etapa 3.
- Silenciar prepara a preferência para a futura síntese de áudio; **não existe reprodução sonora na v108**.
- Não há análise espontânea de estatísticas nem migração de avisos nesta versão.
- O avatar não escreve na base de projetos, não modifica backups e respeita redução de movimento.

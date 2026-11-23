# Impulsinho 110 — Etapa 4: Motor de eventos e prioridades

O assistente observa os eventos `impulsinho:dados-alterados` e `impulsinho:navegacao` já publicados pelo aplicativo. A ponte `window.Impulsinho.consultar()` fornece um resumo somente leitura.

As mensagens são deduplicadas por projeto e marco, priorizadas, e limitadas por intervalo mínimo de 90 segundos para eventos não críticos. Eventos durante Ponto, Foco, digitação, diálogos ou enquanto a página está oculta aguardam na fila. O botão **Ver avisos** mostra um resumo do estado atual.

Alertas de backup e Elixires só entram na fila quando suas preferências globais estão ativadas. O assistente não marca conquistas como lidas nem substitui os alertas existentes.

Ajuste de contraste dos balões em modo escuro incluído antecipadamente. A biblioteca extensa de falas, as dicas periódicas de atalhos e a migração da Central de Novidades permanecem para as etapas seguintes.

**Limites:** a ponte atual apresenta totais consolidados, não cronômetros ao vivo. O aviso de Elixires é um lembrete geral, não uma afirmação de que exista um Elixir específico pendente.

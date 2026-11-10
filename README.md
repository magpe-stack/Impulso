# Impulso — Motor de Produtividade Pessoal

PWA offline-first em HTML, CSS e JavaScript nativos. Publique todos os arquivos na raiz do repositório e habilite GitHub Pages na branch principal.

## Módulos

- **Meus Projetos:** criar, abrir, renomear e excluir projetos independentes.
- **Meu Dia:** marcar início/término, lançar registros retroativos, consultar o total de tempo por dia, excluir registros e imprimir.
- **Hábitos:** definir hábitos com duração estipulada, concluir e registrar automaticamente o período.
- **Histórico:** consultar todos os registros do projeto.
- **Arena:** 50 chefões, com dano calculado pelos minutos de trabalho e conclusões.
- **Radar:** cada minuto equivale a 6 graus, com ciclo de 360 graus por hora; meta de 10.000 horas.

## Funcionamento do tempo

Registros de ponto são pareados cronologicamente entre um início aberto e um término posterior. Inícios duplicados não criam intervalos extras; términos sem início correspondente não acrescentam tempo. Hábitos concluídos são intervalos com início e término reais calculados a partir da duração declarada, encerrados no momento da confirmação. Intervalos sobrepostos são unidos antes da soma para evitar contagem dupla. Dias recebem apenas o tempo que pertence a cada data, inclusive quando o intervalo cruza a meia-noite. Registros manuais preservam minutos e têm segundos definidos como zero.

## Backup e restauração

O botão Backup exporta um arquivo JSON com todos os projetos. Importar / Restaurar **substitui todos os dados atuais** após confirmação. Guarde backups fora do navegador. O armazenamento local pode ser apagado pelo usuário, pelo sistema ou por configurações do navegador.

## Instalação e uso offline

Acesse o site uma vez com conexão HTTPS, aguarde o Service Worker instalar e então use o comando Instalar do navegador quando disponível. Atualizações dependem de nova visita online. A interface funciona sem frameworks e sem APIs externas.

## Limitações

O navegador não mede automaticamente se um hábito foi realmente executado: a conclusão depende da confirmação do usuário. A aplicação não continua cronômetros em segundo plano; usa timestamps persistidos. O sistema de chefões é gamificação, não uma medida objetiva de produtividade. A meta de 10.000 horas é simbólica e não garante maestria. A impressão utiliza a função nativa do navegador.

## Links

- Aplicativo: https://magpe-stack.github.io/Impulso/
- Código: https://github.com/magpe-stack/Impulso

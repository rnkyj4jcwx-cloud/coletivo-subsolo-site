# Modelo de ameaças — Coletivo Subsolo

Última revisão: 14 de julho de 2026.

## Escopo atual

O site é uma aplicação estática de divulgação. Não possui conta de usuário, formulário, banco de dados, cookies próprios, analytics, pagamentos ou área administrativa.

## Ativos protegidos

- integridade do conteúdo e da identidade visual;
- controle do repositório, da hospedagem e do futuro domínio;
- manifesto e arquivos visuais do coletivo;
- confiança das pessoas que acessam os links oficiais;
- credenciais usadas em GitHub, DNS e hospedagem.

## Fronteiras de confiança

1. Navegador da pessoa visitante e o site público.
2. Repositório GitHub e automações do GitHub Actions.
3. Cadeia de dependências do npm.
4. Plataforma de hospedagem e configuração de DNS.
5. Links externos, atualmente limitados principalmente ao Instagram oficial.

## Ameaças principais e controles

| Ameaça | Impacto | Controles atuais |
| --- | --- | --- |
| Alteração não autorizada do site | Conteúdo malicioso ou dano à reputação | 2FA recomendada, CODEOWNERS, revisão por PR e proteção da branch |
| Segredo enviado ao Git | Acesso indevido ao GitHub, DNS ou hospedagem | `.gitignore`, política de revogação e proibição em `SECURITY.md` |
| Dependência comprometida | Código malicioso no build | `package-lock.json`, Dependabot, `npm audit` e CI |
| Workflow malicioso | Roubo de segredos ou alteração do código | `permissions: contents: read`, revisão de `.github/workflows` e ausência de segredos no CI atual |
| Injeção de conteúdo | Execução de script no navegador | Sem entrada de usuário e sem HTML dinâmico |
| Sequestro ou erro de domínio | Redirecionamento de visitantes | Registro em conta protegida por 2FA, renovação automática e alterações DNS revisadas |
| Vazamento de dados pessoais | Risco às pessoas do coletivo e visitantes | Coleta mínima; o site atual não coleta dados pessoais |

## Riscos residuais

- Dependências de terceiros ainda exigem acompanhamento contínuo.
- A configuração da branch e os recursos de segurança dependem das opções disponíveis no plano do GitHub.
- Links externos estão fora do controle do repositório depois que a pessoa visitante sai do site.

## Mudanças que exigem nova análise

Reavaliar este documento antes de adicionar:

- formulário de contato ou inscrição;
- analytics, pixels, cookies ou publicidade;
- CMS ou painel administrativo;
- login, permissões ou banco de dados;
- venda de ingressos, produtos ou pagamentos;
- integrações com APIs externas;
- upload de fotos, vídeos ou documentos;
- coleta de informações de menores de idade.

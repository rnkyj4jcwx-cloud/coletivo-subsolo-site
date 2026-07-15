# Coletivo Subsolo

Site teaser do Coletivo Subsolo, coletivo cultural dark e alternativo nascido em Itapevi.

Versão atual: **v8**, validada em celulares Android e iOS, tablet e computadores.

## O que o site apresenta

- eventos musicais;
- expositores independentes;
- oficinas criativas;
- manifesto e identidade do coletivo;
- teaser para futuras convocações.

## Tecnologia

- React;
- Vite;
- CSS responsivo;
- Vitest e Testing Library.

## Desenvolvimento local

Requisito: Node.js 22 ou superior.

```bash
npm ci
npm run dev
```

Comandos de verificação:

```bash
npm test
npm run build
npm run audit:security
npm run check
```

## Estrutura principal

- `src/`: interface, estilos e testes;
- `public/`: manifesto e recursos estáticos;
- `.github/`: automações, responsáveis e regras de colaboração;
- `AGENTS.md`: orientações permanentes para agentes e revisões;
- `docs/THREAT_MODEL.md`: ativos, ameaças, controles e gatilhos de reavaliação;
- `SECURITY.md`: política de segurança do projeto.

## Regras de colaboração

1. Não enviar senhas, tokens, chaves, documentos pessoais ou arquivos `.env` ao repositório.
2. Alterações devem passar por branch e pull request.
3. O fluxo de CI precisa concluir testes, build e auditoria antes da aprovação.
4. Dependências só devem ser atualizadas com o arquivo `package-lock.json` correspondente.
5. Vulnerabilidades não devem ser relatadas em issues públicas; consulte `SECURITY.md`.

## Licenciamento

O código, os textos e os elementos visuais permanecem reservados ao Coletivo Subsolo. Nenhuma licença aberta foi concedida neste momento.

## Publicação

O site é compilado e publicado pelo GitHub Pages depois que a verificação da branch `main` termina com sucesso. O domínio oficial será conectado somente após a validação do endereço temporário.

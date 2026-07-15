# Orientações para agentes e revisões

## Comandos obrigatórios

Antes de propor ou publicar alterações:

```bash
npm run check
```

## Diretrizes de revisão

- Trate credenciais, tokens, arquivos `.env` e dados pessoais expostos como prioridade crítica.
- Não adicione formulários, analytics, cookies, CMS, autenticação, pagamentos ou persistência sem atualizar `docs/THREAT_MODEL.md`.
- Revise cuidadosamente alterações em `.github/workflows`, dependências, URLs externas, política CSP e scripts de build.
- Preserve as permissões mínimas dos workflows; não use `write-all`.
- Não remova o `package-lock.json` e não aceite atualizações de dependências sem testes e auditoria.
- Preserve acessibilidade, abertura do elevador e ausência de overflow horizontal entre 320 px e 430 px.
- Não registre dados de visitantes no console ou em serviços externos.
- Elementos visuais e textos pertencem ao Coletivo Subsolo e não devem ser substituídos sem autorização.

## Publicação

- A branch principal deve receber mudanças por pull request depois da importação inicial.
- Não publique segredos no repositório, mesmo que ele esteja privado.
- Mudanças de domínio, DNS, headers ou hospedagem precisam de validação independente antes de entrar em produção.

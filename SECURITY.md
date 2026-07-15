# Política de segurança

## Versão mantida

A branch principal e a versão atualmente publicada recebem correções de segurança.

## Como relatar uma vulnerabilidade

Não abra uma issue pública e não publique provas de conceito com dados sensíveis.

Use o recurso **Private vulnerability reporting** do GitHub quando ele estiver habilitado. Se ele ainda não estiver disponível, contate a pessoa administradora do repositório por um canal privado conhecido pelo coletivo.

Inclua, quando possível:

- descrição e impacto esperado;
- caminho mínimo para reprodução;
- navegador, dispositivo ou ambiente afetado;
- evidências sem dados pessoais ou credenciais;
- sugestão de correção, se houver.

## Segredos e credenciais

Tokens, senhas, chaves privadas e arquivos `.env` não pertencem ao repositório. Segredos de hospedagem devem ser armazenados apenas no gerenciador de segredos da plataforma utilizada.

Se um segredo for enviado ao Git por engano:

1. revogue ou rotacione a credencial imediatamente;
2. interrompa qualquer implantação que a utilize;
3. remova o valor do histórico do Git;
4. verifique logs e atividades suspeitas;
5. só então gere uma nova credencial.

Apagar apenas o arquivo no commit mais recente não torna um segredo exposto seguro novamente.

## Princípios do projeto

- menor privilégio para pessoas e automações;
- autenticação em dois fatores para administradores;
- revisão antes de alterações na branch principal;
- dependências fixadas pelo `package-lock.json`;
- testes, build e auditoria automatizados;
- coleta mínima de dados — o site atual não possui login, formulário ou banco de dados.

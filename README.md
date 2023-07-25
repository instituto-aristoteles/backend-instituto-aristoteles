# Instituto Aristóteles - Backend

## Sobre

O Instituto Aristóteles é uma organização sem fins lucrativos que, através de campanhas, eventos e workshops, busca aumentar a conscientização sobre saúde mental e apoiar jovens em regiões periféricas, criando campanhas de conscientização e desenvolvendo projetos em locais públicos. A missão do projeto é ajudar cada vez mais jovens que estão sendo esquecidos pelo governo e sociedade, propondo ações em diversos setores para que o tema seja discutido e tratado com seriedade.

## Rodando o projeto

> Antes de mais nada, se certifique que tenha o Node.js instalado na sua máquina. 
> Você pode verificar isso, rodando `node --version` no terminal. Caso retorne algo parecido com: `v18.16.0`, tudo certo.
> Se em vez disso, algum erro for retornado, você provavelmente não possui o Node.js instalado.

1. Clone o projeto:
    ```bash
    git clone git@github.com:instituto-aristoteles/backend-instituto-aristoteles.git
    ```

2. Instale as dependências:
   ```bash
   cd backend-instituto-aristoteles
   npm install
   ```
3. Rode a aplicação localmente, utilizando:
    ```bash
    npm run start:dev
    ```
   
Agora você pode acessar o site rodando localmente através do endereço: http://localhost:3333.


## Configurando o ESLint no VSCode

ESLint é uma ferramenta para automatizar o padrão de código adotado para a aplicação. Ele aponta que estão fora do padrão, como ponto e virgula desnecessários, excesso de espaços em branco, variáveis não utilizadas e etc.

Para que o VSCode avise quando o código não estiver de acordo com as regras do ESLint, você pode instalar uma extensão no VSCode chamada ESLint:
https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint

Para que alguns desses avisos sejam corrigidos automaticamente ao salvar o arquivo, vá em Files > Preferences > Settings. Utilizando o modo de configuração em JSON (que pode ser alterado na barra superior direita do VSCode), adicione esta configuração:

```json
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true,
        "source.organizeImports": true
    }
}
```

## Colaborando

Para desenvolver uma nova tarefa:

1. Clone o projeto, como descrito em [Rodando o projeto]()
2. Crie uma nova branch, utilizando:
   ```bash
   git checkout -b <nome-da-nova-branch>   
   ```
   
   É preferível que o nome da nova branch identifique do que se trata essa tarefa. Por exemplo: desenvolve-cabecalho, implementa-area-de-contato e etc.
3. Desenvolve a sua tarefa normalmente.
4. Após a conclusão da tarefa, faça o commit das suas alterações, caso não tenha feito ainda.
   ```bash
   git add .
   git commit -m "<descrição do que foi feito>"
   git push
   ```
   
   Caso seja a primeira vez que você faça o push na nova branch, você precisará executar, para que a nova branch seja criada também no Github e você possa fazer push nela:
   ```bash
   git push -u origin <nome-da-nova-branch>
   ```
5. Crie uma PR (Pull Request) da sua nova branch para a branch principal (main).

## Criando PR (Pull Request)

1. Na página do projeto no Github, abra a aba **Pull Requests**.
2. Clique em **New pull request**
3. Em base, selecione a branch **main**
4. Em compare, selecione a branch que você utilizou para desenvolver a nova tarefa
5. Clique em **Create pull request**
6. Preencha as informações como Título e descrição (O Github irá sugerir um título pra você com base no nome da branch)
7. Confirme clicando em **Create pull request**.
8. Peça a algum colega pra aprovar seu pull request.
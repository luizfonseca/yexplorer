# YExplorer

## Instruções

Este app foi construído utilizando Electron (http://electron.atom.io) com CSS3/HTML5 e JavaScript/NodeJs.

Para rodá-lo, só seguir as instruções de instalação do próprio electron, depois entrar no diretório e executar
`path-to-your-project electron .` ou `path-to-your-project path-to-electron-exe .` se estiver utilizandow windows.

Este projeto detecta se existe algum outro monitor externo e posiciona cada tela em cada monitor; 
para sair é só utilizar alt+f4 ou cmd+q.


Para construir o pacote de cada distribuição, será necessário instalar o pacote `npm install electron-packager -g` e 
rodar o comando para cada plataforma. Ex.: `electron-packager DIRETORIO_DO_PROJETO YExplorer --platform=win32 --arch=x64` 

Uma pasta será gerada com os devidos executáveis.



## Configuração

Existe um arquivo de configuração das cidades, preparado para possíveis novos idiomas. Ele está em
`./resources/screens/data/cities.json` assim como os arquivos dos respectivos itens.




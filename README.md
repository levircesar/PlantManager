iniciamos uma aplicacao expo com 
```
expo init plantmanager
```
Depois adicionamos o typescript ao projeto, adicionamos a pasta src , assets 
e criamos a página de welcome.

O componente SafeAreaView de dentro do react-native, serve para ajeitar
a view para nao pegar nos icones do celular. (obs: safeAreaView nao aceita padding)

para trabalhar com imagens no style, usamos  Dimensions do react-native
```
image:{
    height: Dimensions.get('window').width * 0.7
  }
```

icones no expo
```
expo install @expo/vector-icons
```

Para usar font externa da google no expo, usamos
```
expo install expo-font @expo-google-fonts/jost
```
Depois importamos na raiz do nosso app, no arquivo <i>App.tsx</i> e depois
criamos um arquivo fonts para usar em toda a aplicacao.

para segurar a tela de splash até a font ser carregada, instalamos
```
expo install expo-app-loading
```

Para o teclado subir no input, envolvemos a view com o KeyboardAvoidingView

Para a parte de navegacao, utilizmos o react navigation
```
yarn add @react-navigation/native
expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view
yarn add @react-navigation/stack
```

para a navegacao iniciamos as configuracoes na pasta routes, depois
no arquivo welcome chamamos useNavigation

Dica: Para ajustar a parte do header em iphone, usamos uma lib para ajudar no view:
```
yarn add react-native-iphone-x-helper
```

biblioteca de requisicoes:
```
yarn add axios
```

biblioteca para simular api fake
```
yarn add -g json-server
```

executar o comando
```
json-server ./src/services/server.json --host 192.168.100.57 --port 3333
```

Para usar svg no expo, instalamos:
```
expo install react-native-svg
```
Entao usamos do proprio react-native-uri
```
<SvgFromUri uri={data.photo} />
```

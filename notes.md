yarn start —reset-cache

yarn ios:dev

yarn

yarn splash

eg:
git commit -m "test(mobile): change ruby version"

commitlint: [build, chore, ci, docs, feat, fix, perf, refactor, revert, style, test]

<!-- fix rn-fetch-blob: Require cycle issue -->

Modify these files can avoid require cycle:
IN DIR rn-fetch-blob/polyfill
all thease 4 files: Blob.js, Fetch.js, XMLHttpRequest.js

// import RNFetchBlob from '../index.js'
import {NativeModules} from 'react-native';
const RNFetchBlob = NativeModules.RNFetchBlob

https://github.com/joltup/rn-fetch-blob/issues/183

<!-- redux listenerr vs redux saga -->
https://blog.logrocket.com/redux-toolkits-new-listener-middleware-vs-redux-saga/

<!-- listener api -->
https://redux-toolkit.js.org/api/createListenerMiddleware

<!-- animated header -->
https://blog.jscrambler.com/how-to-animate-a-header-view-on-scroll-with-react-native-animated

<!-- navigation -->
https://www.youtube.com/watch?v=MVKkMr7FSPA&t=268s

https://reactnavigation.org/docs/use-navigation

<!-- advance feat -->
remove this line when use

<!-- pod -->
cd ios
pod install --repo-update

<!-- live stream -->
https://docs.agora.io/en/Video/API%20Reference/react_native/index.html

<!-- live stream rtmp -->
https://github.com/sieuhuflit/react-native-live-stream-rtmp-example
https://github.com/sieuhuflit/live-tream-rtmp-server

<!-- spring rtmp -->
http://www.selokljuc.com/16201229.html
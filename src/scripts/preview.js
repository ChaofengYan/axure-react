require('../css/index.less');
require('antd/style/index.less');

//重设DropTarget组件，去除拖动功能
import CommonDropTarget from './preview/CommonDropTarget'
window.CommonDropTarget = CommonDropTarget;

import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './preview/App'
import Reducers from './preview/reducer'
import ReactDOMServer from 'react-dom/server';


let store = createStore(Reducers);


console.dir(ReactDOMServer.renderToString(<Provider store={store}>
        <App />
    </Provider>));


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container')
)
require('../css/test.less');
import React, { Component, PropTypes } from 'react';
import { DropTarget,DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './dblPlayGround/app';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
//ReactDOM.render(<Container />, document.getElementById('container'));
//import ComponentsCollection from "../components" //引入可用的子组件

import { createStore } from 'redux'
import { Provider } from 'react-redux'
import Reducers from './dblPlayGround/reducers'

let store = createStore(Reducers);

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('container')
)
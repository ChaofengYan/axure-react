require('../css/dev.less'); //开发模式下独有
require('../css/index.less');
require('antd/lib/index.css');
import React, { Component, PropTypes } from 'react';
import { DropTarget,DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './dblPlayGround/index';
import ReactDOM from 'react-dom';


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
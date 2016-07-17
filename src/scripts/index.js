require('../css/dev.less'); //开发模式下独有
require('../css/index.less');
require('antd/lib/index.css');
import React, { Component, PropTypes } from 'react';
import { DropTarget,DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from './dblPlayGround';
import {render} from 'react-dom';
import CommonDropTarget from './dblPlayGround/CommonDropTarget'
window.CommonDropTarget = CommonDropTarget;

import {changePropsById} from './utils';
window.changePropsById = changePropsById;
import { Provider } from 'react-redux'
import configureStore from './store'

const store = configureStore();

render(
  <Provider store={store}>
    <Container />
  </Provider>,
  document.getElementById('container')
)
import React, { Component, PropTypes } from 'react';
import ToolBox from './ToolBox';
import { DragSource,DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Playground from './Playground';
import Action from './Action'
import { connect } from 'react-redux'

import Container from './index'

class App extends Component {

  constructor(props,context) {
    super(props,context);
  }

  render() {
    return(
      <div>
       <Container />
      </div>
    )
  
}
}
App.contextTypes = {
  store:React.PropTypes.any
 } ;
 export default App

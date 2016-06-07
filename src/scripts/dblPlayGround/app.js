import React, { Component, PropTypes } from 'react';
import ToolBox from './ToolBox';
import { DragSource,DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Playground from './Playground'
import { connect } from 'react-redux'
import Container from './container'

function getStyle(bgcolor) {
  return {
    backgroundColor: bgcolor,
    minHeight: 600,
    border: '1px solid black',
    position: 'relative'
  }

};

const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem(); //源组件的坐标，源组件beginDrag()方法返回的值
    const delta = monitor.getDifferenceFromInitialOffset(); //指针的偏移量
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    component.moveBox(item.id, left, top);
  }
};

 class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      box: {
       top: 20, 
       left: 80,
       activeKey:1
      }
    };
  }
  handleClick(){
    //Action.contentMenuHide(); //隐藏右键菜单
  }
  moveBox(id, left, top) {
    this.setState(
      Object.assign(this.state.box,{top:top,left:left})
      );
  }

  render() {
    //这里已经可以通过this.props读取state了
    const { hideSourceOnDrag, connectDropTarget,isOver, isOverCurrent } = this.props;
    
    let backgroundColor = 'rgba(0, 0, 0, .5)';
    if (isOverCurrent || isOver) {
      backgroundColor = 'darkgreen';
    }
 
    return (
      <div style={getStyle(backgroundColor)}>
         <Container childsStructor={this.props.childsStructor} />
      </div>
    );
  }
}

function select(state) {
  return state
}

export default connect(select)(App)
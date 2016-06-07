import React, { Component, PropTypes } from 'react';
import ToolBox from './ToolBox';
import { DragSource,DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Playground from './Playground'
import { connect } from 'react-redux'


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

 class Container extends Component {

  constructor(props) {
    super(props);
    this.state = {
      box: {
       top: 120, 
       left: 180,
       activeKey:1
      }
    };
  }
  handleClick(){
    //Action.contentMenuHide(); //隐藏右键菜单
  }
  //折叠面板展开位置
  handleChangeKey(key){
    this.setState(
      Object.assign(this.state.box,{activeKey:key})
    );
  }
  moveBox(id, left, top) {
    this.setState(
      Object.assign(this.state.box,{top:top,left:left})
      );
  }

  render() {
    const { hideSourceOnDrag, connectDropTarget,isOver, isOverCurrent } = this.props;
    
    let backgroundColor = 'rgba(0, 0, 0, .5)';
    if (isOverCurrent || isOver) {
      backgroundColor = 'darkgreen';
    }

    const { left,top,activeKey} = this.state.box;
    return connectDropTarget(
      <div style={getStyle(backgroundColor)} onClick={this.handleClick.bind(this)}>
              <div className="playground">
                <Playground />
              </div>
              <div className="tool-box">
                <ToolBox 
                     left={left}
                     top={top}
                     activeKey = {activeKey}
                     handleChangeKey = {this.handleChangeKey.bind(this)}
                     hideSourceOnDrag={hideSourceOnDrag} />
              </div>
      </div>
    );
  }
}
const _Container= DragDropContext(HTML5Backend)(DropTarget('tool-box', boxTarget, (connect,monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true })
}))(Container));

function select(state) {
  return state
}

export default connect(select)(_Container)
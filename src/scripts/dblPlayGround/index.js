import React, { Component, PropTypes } from 'react';
import ToolBox from './Library';
import { DragSource,DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Playground from './Playground'
import Inspector from './Inspector'
import Outline from './Outline'
import { connect } from 'react-redux'
import { Row, Col } from 'antd';

 class Container extends Component {

  constructor(props) {
    super(props);
  }
  handleDoubleClickEdit(e){
    console.dir(e.target.getAttribute('data-dblid'));

    this.context.store.dispatch({
      type: 'CONFIG_MODAL',
      show:true,
      childID:e.target.getAttribute('data-dblid') 
    });
  }
  handleContentMenu(e){
    //e.preventDefault();
    console.dir(e.target.getAttribute('data-dblid'));
    this.context.store.dispatch({
      type: 'CONTENT_MENU',
      left:e.pageX,
      top:e.pageY,
      childID:e.target.getAttribute('data-dblid') 
    });
  }
  handleClick(){
    //Action.contentMenuHide(); //隐藏右键菜单
  }
  //折叠面板展开位置
  handleChangeKey(key){
    // this.setState(
    //   //Object.assign(this.state.box,{activeKey:key})
    // );
  }

  render() {
    return (
      <div>
        <div id="J-head">
          <Row className="head-1">
            <Col span={'20'} className="sdf">
              导入  导出   左侧隐藏  右侧隐藏
            </Col>
            <Col span={'4'} className="sdf">
              预览
            </Col>
          </Row>
          <Row className="head-2">
            <Col span={'20'} className="sdf">
              导入  导出   左侧隐藏  右侧隐藏
            </Col>
            <Col span={'4'} className="sdf">
              预览
            </Col>
          </Row>
        </div>
        <Row id="J-root" onClick={this.handleClick.bind(this)}>
          <Col span={'4'} id="J-library">
            <ToolBox {...this.props} handleChangeKey = {this.handleChangeKey.bind(this)} />
          </Col>
          <Col span={'16'} id="J-playground" id="J-playground">
            <Playground childsStructor={this.props.childsStructor} 
              handleEdit={this.handleDoubleClickEdit.bind(this)}
              handleContentMenu={this.handleContentMenu.bind(this)}
              />
          </Col>
          <Col span={'4'} id="J-tools">
            <Inspector currentChild={this.props.childsStructor.currentChild}  />
            <Outline root={this.props.childsStructor.root} />
          </Col>
        </Row>
      </div>
    );
  }
}

Container.contextTypes = {
  store:React.PropTypes.any
 } ;

function select(state) {
  return state
}

export default connect(select)(DragDropContext(HTML5Backend)(Container))
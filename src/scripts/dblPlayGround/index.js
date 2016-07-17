import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import ToolBox from './Library';
import { DragSource,DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Playground from './Playground';
import Inspector from './Inspector';
import Outline from './Outline';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';
import * as actionCreators from '../actions';

 class Container extends Component {

  constructor(props) {
    super(props);
    $(window).load(function(){
      props.actions.load();
    });
    $(window).unload(function(){
      props.actions.beforeunload();
    });

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
    console.dir(this.props);

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
              {...this.props}
              />
          </Col>
          <Col span={'4'} id="J-tools">
            <Inspector currentChild={this.props.childsStructor.currentChild} {...this.props} />
            <Outline root={this.props.childsStructor.root} {...this.props} />
          </Col>
        </Row>
      </div>
    );
  }
}

Container.contextTypes = {
  store:React.PropTypes.any
 } ;

function parseEvents(_event){
  let events={};
  for(let eventType in _event){
    if(!_event.hasOwnProperty(eventType)||!Array.isArray(_event[eventType])) continue;
    const evalString = _event[eventType].map(function(item){
      const {condition,targetId,targetPropKey,targetPropValue} = item;
      const needChangeProps = JSON.stringify({[targetPropKey]:targetPropValue});
      return (` console.dir("click");
        if(${condition}){
        this.props.actions.changeProps('${targetId}',${needChangeProps});
      }`);
    }).join(' ');
    events[eventType] = new Function(evalString);

  }
  return events;
}

function mapStateToProps(state){
  let _state = $.extend(true,{},state),{root} = _state.childsStructor;

  function reduceProps(node){
    const {props} = node;
    if(!props) return;
    const {_EVENTS_}= props;
    if(_EVENTS_&&!isEmptyObject(_EVENTS_)) node.props._EVENTS_ = parseEvents(_EVENTS_);
    const {childs} = node.props;
    if(!Array.isArray(childs)) return;
    childs.forEach((item)=>reduceProps(item))
  }

  function isEmptyObject(e) {  
    var t;  
    for (t in e)  
        return !1;  
    return !0  
  }  
  reduceProps(root);
  return _state;
}

function mapDispatchToProps(dispatch){
  return { 
    actions: bindActionCreators(actionCreators, dispatch) 
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(DragDropContext(HTML5Backend)(Container))
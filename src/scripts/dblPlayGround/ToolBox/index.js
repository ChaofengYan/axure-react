/**
* 工具集
*    ——包含所有子组件识别码ID
*    ——公共功能：拖入排版、导入、导出、预览、最小化等
*/
import React, { Component, PropTypes } from 'react';
import {Collapse,Button} from 'antd';
import { DragSource } from 'react-dnd';
import ToolDragSource from './ToolboxAgent'

const Panel = Collapse.Panel;
const style = {
  position: 'absolute',
  border: '1px solid gray',
  borderRadius:'4px',
  backgroundColor: '#ddd',
  padding: '1rem 0.5rem',
  cursor: 'move',
  width:"200px"
};

const boxSource = {
  /*beginDrag:必须，开始时*/
  beginDrag(props) {
    const { id, left, top } = props;
    return { id, left, top };// 目标组件通过monitor.getItem()可获取此值
  },
  endDrag(){
    //console.log('Drag end!');
  },
  canDrag(){
    return true
    //return false; //返回false即不可拖动
  }
  // ,
  // isDragging(){
  //   console.log('Draging!');
  // }
};

 class Box extends Component {
  handleChangeKey(key){
    this.props.handleChangeKey(key);
  }
  //预览功能
  handleClickPreview(e){
    const store = JSON.stringify({childs:this.props.childsStructor.childs});
    window.localStorage.setItem('childs',store);
  }
  //导出功能
  handleClickExport(){
    this.props.handleClickExport();
  }
  //导入功能
  handleClickImport(e){
    const store = JSON.stringify({childs:this.props.childsStructor.childs});
    window.localStorage.setItem('childs',store);
  }
  render() {   
    const { left, top, activeKey,connectDragSource, isDragging } = this.props;
    if (isDragging) {
      return null;
    }
    return connectDragSource(
      <div style={{ ...style, left, top }}>
          <Collapse accordion activeKey={String(activeKey)} onChange={this.handleChangeKey.bind(this)}>
            <Panel header="布局设置" key="1">
              {
                ToolDragSource(<p>H1测试</p>,'H1')
              }
              {
                ToolDragSource(<p>H2测试</p>,'H2')
              }
              {
                ToolDragSource(<p>Row测试</p>,'Row')
              }
              {
                ToolDragSource(<p>Image测试</p>,'Image')
              }
              {
                ToolDragSource(<p>Div测试</p>,'Div')
              }
            </Panel>
            <Panel header="基本CSS" key="2">
              <p>234</p>
            </Panel>
            <Panel header="组件" key="3">
              <p>456</p>
            </Panel>
            <Panel header="交互组件" key="4">
              <p>456</p>
            </Panel>
          </Collapse>
          <a onClick={this.handleClickPreview.bind(this)} className="ant-btn ant-btn-primary" target="_blank" href="/preview.html">预览</a>
          <Button type="primary">导入</Button>
          <Button type="primary" onClick={this.handleClickExport.bind(this)}>导出</Button>
      </div>
    );
  }
}
Box.propTypes = {
  connectDragSource: PropTypes.func.isRequired
}
export default DragSource('tool-box', boxSource, (connect,monitor) => ({
  connectDragSource: connect.dragSource(), // receive connectDragSource as a prop
  isDragging: monitor.isDragging()
}))(Box)
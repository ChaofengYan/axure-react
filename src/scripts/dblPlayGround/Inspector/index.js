/**
* 工具集
*    ——包含所有子组件识别码ID
*    ——公共功能：拖入排版、导入、导出、预览、最小化等
*/
import React, { Component, PropTypes } from 'react';
import {Collapse,Button,Tabs,Input,Tree} from 'antd';
import CustomProps from './CustomProps';
import Interactions from './Interactions';
import getChildById from '../../utils/index'
import StyleEdit from './StyleEdit'

const TreeNode = Tree.TreeNode;

const TabPane = Tabs.TabPane;

const Panel = Collapse.Panel;

 class Box extends Component {
  handleChangeKey(key){
    this.props.handleChangeKey(key);
  }
  test(){
    this.context.store.dispatch({
      type: 'CHILD_REMOVE',
      childID:e.target.getAttribute('data-dblid') 
    });
  }
  handleChangeAlias(e){
    this.context.store.dispatch({
      type: 'CHILD_CHANGE',
      key:'alias',
      value:e.target.value,
      childID:this.props.currentChild.props.dblid
    });
  }
  render() {
    const _target_el = this.props.currentChild;
    console.dir(JSON.stringify(_target_el));
    //getChildById(this.props.currentChild)   
    return(
      <div id="J-inspector">
       <h3 className="dbl-item-title">检查工具：{_target_el.childName}</h3>
       <Input placeholder={_target_el.alias||_target_el.props.dblid} 
        onChange={this.handleChangeAlias.bind(this)} />
       <Tabs type="card">
        <TabPane tab="属性" key="1">
          <Collapse accordion defaultActiveKey={'1'}>
            <Panel header="Custom" key="1">
              <CustomProps allProps = {_target_el.props} />
            </Panel>
            <Panel header="Interactions" key="2">
              <Interactions />
            </Panel>
          </Collapse>
        </TabPane>
        <TabPane tab="样式" key="2">
          <StyleEdit allProps = {_target_el.props} />
        </TabPane>
       </Tabs>
      </div>
    );
  }
}

Box.contextTypes = {
  store:React.PropTypes.any
 } ;

export default Box
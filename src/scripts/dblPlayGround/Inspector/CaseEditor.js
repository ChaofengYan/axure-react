/**
* 工具集
*    ——包含所有子组件识别码ID
*    ——公共功能：拖入排版、导入、导出、预览、最小化等
*/
import React, { Component, PropTypes } from 'react';
import {Modal,Button,Input,Row,Col,Select,Tree} from 'antd';
const TreeNode = Tree.TreeNode;

 class Box extends Component {
  constructor(props){
    super(props);
    this.state = {
      conditions:[]
    }
  }
  onSelect(){

  }
  addCondition(){

  }
  editCondition(){

  }
  clearCondition(){

  }
  render() {  
    const {conditions} = this.state;
    let condition_opr_el;
    if(conditions.length>0){
      condition_opr_el = (
        <span>
          <a className="dbl-btn" onClick={this.editCondition.bind(this)}>编辑条件</a>
          <a className="dbl-btn" onClick={this.clearCondition.bind(this)}>清空条件</a>
        </span>
      );
    }else{
      condition_opr_el = <a className="dbl-btn add-condition" onClick={this.addCondition.bind(this)}>增加条件</a>;
    }
    
    return(
      <Modal title="Case Editor(OnClick)" {...this.props}>
        <div className="case-editor-top">
          Case名称：<Input defaultValue="Case 1" />
          {condition_opr_el}
        </div>
        <Row className="case-editor-body">
          <Col span={'7'}>
            <p>增设动作</p>
            <div className="choose-area">
              <Tree showLine multiple  
                defaultExpandAll = {true}
                onSelect={this.onSelect.bind(this)}>
                <TreeNode title="Links" key="0-0"></TreeNode>
                <TreeNode title="Widgets" key="0-1">
                  <TreeNode title="Set Props" key="0-1-0"></TreeNode>
                  <TreeNode title="Set Style" key="0-1-1"></TreeNode>
                </TreeNode>
                <TreeNode title="Variables" key="0-2"></TreeNode>
                <TreeNode title="Ajax" key="0-3"></TreeNode>
                <TreeNode title="Expression" key="0-4"></TreeNode>
              </Tree>
            </div>
          </Col>
          <Col span={'8'}>
            <p>已选动作</p>
            <div className="choose-area">
              <Tree showLine multiple  
                defaultExpandAll = {true}
                onSelect={this.onSelect.bind(this)}>
                <TreeNode title="parent 1" key="0-0">
                  <TreeNode title="parent 1-0" key="0-0-0" >
                    <TreeNode title="leaf" key="0-0-0-0" />
                    <TreeNode title="leaf" key="0-0-0-1" />
                  </TreeNode>
                  <TreeNode title="parent 1-1" key="0-0-1">
                    <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
                  </TreeNode>
                </TreeNode>
              </Tree>
            </div>
          </Col>
          <Col span={'9'}>
            <p>配置</p>
            <div className="choose-area">
              <Tree showLine multiple checkable
                defaultExpandAll = {true}
                onSelect={this.onSelect.bind(this)}>
                <TreeNode title="parent 1" key="0-0">
                  
                </TreeNode>
              </Tree>
              设置
              <Select defaultValue="lucy">
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="yiminghe">yiminghe</Option>
              </Select>为
              <Input defaultValue="New Value" />
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default Box
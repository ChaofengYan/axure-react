/**
* 工具集
*    ——包含所有子组件识别码ID
*    ——公共功能：拖入排版、导入、导出、预览、最小化等
*/
import React, { Component, PropTypes } from 'react';
import {Collapse,Button,Tabs,Tree} from 'antd';
import CaseEditor from './CaseEditor'

const Interactions = ['OnClick','OnFocus','OnSelected','OnLoad'];

const TreeNode = Tree.TreeNode;

 class Box extends Component {
  constructor(props){
    super(props);
    this.state={
      showCaseEditor:false,
      interactions:{

      },
      currentaction:''
    }
  }
  onSelect(info) {
    console.log('selected', info);
    this.setState({
      currentaction:info
    })
  }
  addCase(){
    this.setState({
      showCaseEditor:true
    })
  }
  finishCaseEdit(shouldChange){
    //if(shouldChange)
    this.setState({
      showCaseEditor:false
    })
  }
  render() {   
    return(
      <div id="J-interactions">
        <a onClick={this.addCase.bind(this)}>Add Case</a>
        <Tree showLine multiple onSelect={this.onSelect.bind(this)}>
        <TreeNode title="OnClick" key="0-0">
          <TreeNode title="parent 1-0" key="0-0-0" >
            <TreeNode title="leaf" key="0-0-0-0" />
            <TreeNode title="leaf" key="0-0-0-1" />
          </TreeNode>
          <TreeNode title="parent 1-1" key="0-0-1">
            <TreeNode title={<span style={{ color: '#08c' }}>sss</span>} key="0-0-1-0" />
          </TreeNode>
        </TreeNode>
        </Tree>
        <CaseEditor className="case-editor" visible={this.state.showCaseEditor} 
          onOk={this.finishCaseEdit.bind(this)} onCancel={this.finishCaseEdit.bind(this)} />
      </div>
    );
  }
}

export default Box
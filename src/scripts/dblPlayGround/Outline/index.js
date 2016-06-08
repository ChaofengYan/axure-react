/**
* 工具集
*    ——包含所有子组件识别码ID
*    ——公共功能：拖入排版、导入、导出、预览、最小化等
*/
import React, { Component, PropTypes } from 'react';
import {Collapse,Button,Tabs,Tree} from 'antd';
import { connect } from 'react-redux'

const TreeNode = Tree.TreeNode;

 class Box extends Component {
  onSelect(info) {
    console.log('selected', info);
  }
  onCheck(info) {
    console.log('onCheck', info);
  }
  onDragEnter(info) {
    //console.log(info);
    // expandedKeys 需要受控时设置
    // this.setState({
    //   expandedKeys: info.expandedKeys,
    // });
  }
  onDrop(info) { //只有在有结构变化时才会触发
    //console.log(info);

    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    console.dir('dropKey'+dropKey);
    console.dir('dragKey'+dragKey);
    // const dragNodesKeys = info.dragNodesKeys;
    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.childs) {
          return loop(item.childs, key, callback);
        }
      });
    };
    const data = this.props.childs;
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });
    if (info.dropToGap) {
      let ar;
      let i;
      loop(data, dropKey, (item, index, arr) => {
        ar = arr;
        i = index;
      });
      ar.splice(i, 0, dragObj);
    } else {
      loop(data, dropKey, (item) => {
        item.childs = item.childs || [];
        // where to insert 示例添加到尾部，可以是随意位置
        item.childs.push(dragObj);
      });
    }

    this.setState({
      gData: data,
    });
  }
  handleDelete(e){
    this.context.store.dispatch({
      type: 'CHILD_REMOVE',
      childID:e.target.getAttribute('data-dblid') 
    });
  }
  render() {   
    const _CHILDS = this.props.childs,self = this;
    //console.dir(JSON.stringify(this.props));
    const loop = data => data.map((item) => {
      const {dblid,childs} = item.props;
      const _title = <span>{(item.alias?item.alias:"")+"("+dblid+")"}<span data-dblid={dblid} onClick={self.handleDelete.bind(self)}>Del</span></span>;
      if (childs&&childs.length>0) {
        return <TreeNode title={_title} key={dblid}>{loop(childs)}</TreeNode>;
      }
      return <TreeNode title={_title} key={dblid} isLeaf={true}/>;
    });

    return(
      <div id="J-outline">
        <h3 className="dbl-item-title">结构概览</h3>
        <Tree showLine multiple={false} checkable draggable
        defaultExpandAll = {true}
        onDragEnter={this.onDragEnter.bind(this)}
        onDrop={this.onDrop.bind(this)}
        onSelect={this.onSelect.bind(this)} onCheck={this.onCheck.bind(this)}>
        <TreeNode title="root" key=".">
          {loop(_CHILDS)}
        </TreeNode>
      </Tree>
      </div>
    );
  }
}

Box.contextTypes = {
  store:React.PropTypes.any
 } ;

// function select(state) {
//   return state.childsStructor
// }
export default Box
//export default connect(select)(Box)
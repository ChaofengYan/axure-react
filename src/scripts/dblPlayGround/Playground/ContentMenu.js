/**
* 右键菜单配置
*    ——所有组件的可配置信息
*    ——公共功能：编辑等
*/

import React, { Component, PropTypes } from 'react';
import { Table, Icon } from 'antd';

class ContentMenu extends Component{

  handleEdit(e){
    function FindNearestChildID(node){
      const _childID = node.getAttribute('data-dblid')
      if(_childID) return _childID;
      const father_node = _childID.parentNode;
      if(!father_node||(father_node.nodeName=='BODY')) return;
      FindNearestChildID(father_node);
    }
    const childID = FindNearestChildID(e.target);
    if(!childID) return;
    this.context.store.dispatch({
      type: 'CONFIG_MODAL',
      show:true,
      childID:childID
    });
  }

  handleHighlight(direction,e){
    this.context.store.dispatch({
      type: 'FOCUS_HIGH_LIGHT',
      direction:direction,
      childID:e.target.getAttribute('data-dblid') 
    });
  }
  handleClick(e){
    this.context.store.dispatch({
      type: 'CONTENT_MENU',
      childID:e.target.getAttribute('data-dblid') 
    });
    e.stopPropagation();
  }
  handleDelete(e){
    this.context.store.dispatch({
      type: 'CHILD_REMOVE',
      childID:e.target.getAttribute('data-dblid') 
    });
  }
  render() {
    let propsComps = [],props = this.props.contentMenuProps,self = this;
    let item = (typeof props=='string')&&props.split('.').slice(1),
        id='';
    let LIs = Array.isArray(item)&&item.map(function(i,index,arr){
          id= id+'.'+i; //自行构建关联父级ID
          return(
            <li key={index} data-dblid={id} onMouseEnter={self.handleHighlight.bind(self,'enter')} onMouseLeave={self.handleHighlight.bind(self,'leave')} >
              <span>{id}</span>
              <a className="edit" data-dblid={id} onClick={self.handleEdit.bind(self)}>编辑</a>
              <a className="add-action" data-dblid={id} onClick={self.handleAddAction.bind(self)}>交互</a>
              <a className="delete" data-dblid={id} onClick={self.handleDelete.bind(self)}>删除</a>
            </li>
          )
        });
    return (      
      <ul className="content-menu" style={{
        top:this.props.show.top,
        left:this.props.show.left,
        display:this.props.show.top?"block":"none"
      }} onClick={this.handleClick.bind(this)}>
      {
        Array.isArray(LIs)&&LIs.reverse()
      }
      <li></li>
      </ul>
    );
  }
}

ContentMenu.defaultProps={
  show:{
    top:0,
    left:"auto"
  }
}
ContentMenu.contextTypes = {
  store:React.PropTypes.any
 } ;

export default ContentMenu
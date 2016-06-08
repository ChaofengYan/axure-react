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
  childEdit(e){
    let key = e.target.getAttribute('data-dblkey'),
    value = e.target.value;
    //const tragetID = this.props.actionType?".1":this.props.cfgDialogProps.dblid;
    this.context.store.dispatch({
      type: 'CHILD_CHANGE',
      key:key,
      value:value,
      childID:this.props.allProps.dblid
    });
  }
  render() {   
    let propsComps = [],props = this.props.allProps,self = this,
    _ignoreProps = ['childs','dblid','_STYLE_','_EVENTS_','key'];
    for(let item in props){
      if(props.hasOwnProperty(item)&&_ignoreProps.indexOf(item)<0){
        let _item = item;

        //if(item=='dblid') _item='唯一码';

        //常规样式编辑，筛选出尚未列出的属性
        // if(item=='_STYLE_'){
        //   _item='样式',
        //   propsComps.push(<CommonStyle onChange={self.childEdit} />)
        // }

        //交互事件编辑
        // if(item=='_EVENTS_'){
        //   _item='';
        //   propsComps.push(<CommonEvent events={props[item]}/>)
        // }

        propsComps.push({key:_item,value:props[item]}); 

      }
    }

    return(
      <div id="J-custom-props">
        {
            propsComps.map(function(item,index,arr){
              if(React.isValidElement(item)){ //当数组元素为React元素时，直接渲染出来
                return(
                  <div key={index}>{item}</div>
                )
              }
              return(
                  <p key={index}>
                    {item.key}:
                    <input type="text" data-dblkey={item.key} defaultValue={item.value} 
                      onChange={self.childEdit.bind(self)}
                      />
                  </p>
              )
            })
          }
      </div>
    );
  }
}

Box.contextTypes = {
  store:React.PropTypes.any
 } ;

export default Box
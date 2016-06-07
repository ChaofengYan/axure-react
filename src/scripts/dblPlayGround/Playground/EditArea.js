/**
* 弹窗配置
*    ——所有组件的可配置信息
*    ——公共功能：编辑等
*/

import React, { Component, PropTypes } from 'react';
import CommonStyle from './commonStyle'
import CommonEvent from './CommonEvent'

class ConfigDialog extends Component{
  constructor(props){
    super(props);
    this.childEdit = this.childEdit.bind(this);
  }
  childEdit(e){
    let key = e.target.getAttribute('data-dblkey'),
    value = e.target.value;
    const tragetID = this.props.actionType?".1":this.props.cfgDialogProps.dblid;
    this.context.store.dispatch({
      type: 'CHILD_CHANGE',
      key:key,
      value:value,
      childID:this.props.cfgDialogProps.dblid
    });
  }
  configDialogHide(e){
    this.context.store.dispatch({
      type: 'CONFIG_MODAL',
      show:false
    });
  }
  render() {
    let propsComps = [],props = this.props.cfgDialogProps,self = this;
    for(let item in props){
      if(item!='childs'&&props.hasOwnProperty(item)){
        let _item = item;

        if(typeof item=='object'){
          //_item=
        }

        // let _arr_item;
        // switch(item){
        //   case 'dblid':
        //     _arr_item={
        //       key:item,
        //       value:props[item]
        //     };
        //     break;
        //   case 'dblid':
        //     _arr_item={
        //       key:item,
        //       value:props[item]
        //     };
        //     break;
        //   default:

        // }

        if(item=='dblid') _item='唯一码';

        //常规样式编辑，筛选出尚未列出的属性
        if(item=='_STYLE_'){
          _item='样式',
          propsComps.push(<CommonStyle onChange={self.childEdit} />)
        }

        //交互事件编辑
        if(item=='_EVENTS_'){
          _item='';
          propsComps.push(<CommonEvent events={props[item]}/>)
        }

        if(_item){
          propsComps.push({key:_item,value:props[item]});
        }  

      }
    }
    return (     
          <div>
          {
            propsComps.map(function(item,index,arr){
              if(React.isValidElement(item)){ //当数组元素为React元素时，直接渲染出来
                return(
                  <div key={index}>{item}</div>
                )
              }
              return(
                  <p key={index}>{item.key}:<input type="text" data-dblkey={item.key} defaultValue={item.value} onChange={self.childEdit}/></p>
              )
            })
          }
          </div>
    );
  }
}

ConfigDialog.contextTypes = {
  store:React.PropTypes.any
 } ;

export default ConfigDialog 
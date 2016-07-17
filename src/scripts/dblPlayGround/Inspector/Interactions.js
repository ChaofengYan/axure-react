/**
* 工具集
*    ——包含所有子组件识别码ID
*    ——公共功能：拖入排版、导入、导出、预览、最小化等
*/
import React, { Component, PropTypes } from 'react';
import {Collapse,Button,Tabs,Tree,Select} from 'antd';

import CaseEditor from './CaseEditor'

const Option = Select.Option;
const TreeNode = Tree.TreeNode;

const Interactions = ['onClick','onFocus','onSelected','onLoad'];

 class Box extends Component {
  constructor(props){
    super(props);
    this.state={
      showCaseEditor:false,
      interactions:{

      },
      currentEventName:'onClick',
      currentCase:''
    }
  }

  /**
   * 修改Store中对应组件的_EVENTS_属性
   * 
   * @param  {Object} events [description]
   * @return {[type]}        [description]
   */
  changeStoreEvents(events){
    let {dblid,actions} = this.props;
    actions.childChange(dblid, '_EVENTS_', events);
  }

  onSelect(info,e) {
    console.log('selected', info);
    console.log('e',e);
    if(!Array.isArray(info)||info.length==0) return;

    this.setState({
      currentEventName:info[0]
    });
  }
  showCaseModal(){
    this.setState({
      showCaseEditor:true
    })
  }

  /**
   * 增加事件
   * 
   * @param {[type]} key [description]
   */
  addEvent(key){
    let {_EVENTS_} = this.props;
    if(_EVENTS_[key]) return;
    _EVENTS_[key] = []; //空数组
     this.changeStoreEvents(_EVENTS_);
  }

  /**
   * 移除事件
   * 
   * @return {[type]} [description]
   */
  removeEvent(event){
    let {dblid,_EVENTS_,actions} = this.props;
  }

  /**
   * 确认case变动
   * 
   * @return {[type]} [description]
   */
  confirmCaseEdit(events){
    let {_EVENTS_} = $.extend(true,{},this.props);
    const {currentEventName} = this.state;
    _EVENTS_[currentEventName] = events;
    this.changeStoreEvents(_EVENTS_);
    this.setState({
      showCaseEditor:false
    });
  }

  /**
   * 取消case编辑
   * 
   * @param  {[type]} shouldChange [description]
   * @return {[type]}              [description]
   */
  cancelCaseEdit(shouldChange){
    //if(shouldChange)
    this.setState({
      showCaseEditor:false
    });
  }

  render() {   
    const {dblid,_EVENTS_} = this.props;
    const {currentEventName} = this.state;
    let events=[],interactions;

    for(let key in _EVENTS_){
      if(!_EVENTS_.hasOwnProperty(key)) return;
      const event = _EVENTS_[key];   
      if(!Array.isArray(event)) continue;  
      events.push({
        key:key,
        value:event.map((item,index)=>{
          return {key:item.name||'case *'}
        })
      })
    }

    interactions = Interactions.map((item,index)=>{
      return{
        value:item,
        disabled:!!_EVENTS_[item]
      }
    });

    return(
      <div id="J-interactions">
        <a onClick={this.showCaseModal.bind(this)}>Add Case</a>
        <Tree showLine multiple onSelect={this.onSelect.bind(this)}>
          {
            Array.isArray(events)&&events.map((item,index)=>{
              const {key,value} = item;
              return (
                 <TreeNode title={key} key={key}>
                  {
                    Array.isArray(value)&&value.map((_it,_in)=>{
                      return <TreeNode title={_it.key} key={_in} />
                    })
                  }
                 </TreeNode>
              )
            })
          }
        </Tree>
         <Select onChange={this.addEvent.bind(this)}>
          {
            interactions.map((item,index)=>{            
              return <Option {...item} key={index}>{item.value}</Option>
            })
          }
        </Select>
        <CaseEditor className="case-editor" visible={this.state.showCaseEditor}  {...this.props}
          currentEventName = {currentEventName} currentEventValue={_EVENTS_[currentEventName]}
          onConfirm={this.confirmCaseEdit.bind(this)} onCancel={this.cancelCaseEdit.bind(this)} />
      </div>
    );
  }
}

export default Box
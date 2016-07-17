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
      currentEventValue:$.extend(true,{},props).currentEventValue,
      currentActionIndex:0,
      currentCase:''
      //conditions:
    };
    this.ACTIONS=[{
      name:'Links',
      value:'Links'
    },{
      name:'Expression',
      value:'Expression'
    },{
      name:'Variables',
      value:'Variables'
    },{
      name:'Ajax',
      value:'Ajax'
    }];
    //this.currentCase='';
    //this.currentEventValue = $.extend(true,{},props).currentEventValue;
    this.currentCaseName = 'case *';
  }

  componentWillReceiveProps(nextProps){
    this.state.currentEventValue = $.extend(true,{},nextProps).currentEventValue;
  }

  /**
   * 改变当前选中Action的顺序
   * 
   * @param  {[type]} index [description]
   * @return {[type]}       [description]
   */
  changeActionIndex(index){
    if(!index||index.length==0) return;
    this.setState({
      currentActionIndex:index[0]
    })
  }

  /**
   * 更改Case名称
   * 
   * @param  {[type]} value [description]
   * @return {[type]}       [description]
   */
  changeCaseName(value){
    if(!value) return;
    this.currentCaseName = value;
  }

  /**
   * 选择目标组件
   * 
   * @return {[type]} [description]
   */
  selectTargetComponent(currentActionIndex,id){
    if(!id||id.lenght==0) return;
    if(!this.state.currentCase) return;
    let {currentEventValue} = $.extend(true,{},this.props);
    $.extend(currentEventValue[currentActionIndex],{
      targetId:id
    });
    this.setState({currentEventValue});
    console.dir('targetid',id);
  }

  changeTargetKey(key){
    console.dir('changeTargetKey',key);
  }

  changeTargetValue(value){
    console.dir('changeTargetValue',value);
  }

  /**
   * 增加Case的执行条件
   * 
   */
  addCondition(){

  }

  /**
   * 编辑Case的执行条件
   * 
   */
  editCondition(){

  }

  /**
   * 清空Case的执行条件
   * 
   * @return {[type]} [description]
   */
  clearCondition(){

  }

  /**
   * 增加Action
   * 
   * @param {[type]} action [description]
   */
  addAction(action){
    if(!action||action.length==0) return;
    let newCase = {
      name:this.currentCaseName,
      condition:'true'
    };
    switch(action[0]){
      case "Links":
        newCase.linkTo = "#";
        break;
      case "Expression":
        $.extend(newCase,{         
          targetId:"",
          targetPropKey:"",
          targetPropValue:""
        });
        break;
    }
    let currentEventValue = this.state.currentEventValue.slice(0);
    currentEventValue.push(newCase);
    this.setState({currentEventValue});
  }

  /**
   * 移除Action
   * 
   * @return {[type]} [description]
   */
  removeAction(){

  }

  handleOk(){
    const {currentEventName,onConfirm} = this.props;
    onConfirm(this.state.currentEventValue);
  }

  render() {  
    // [{
    //     name:'case 1',
    //     linkTo:'http://test.com'
    //   },{
    //     name:'case 1',
    //     condition:'true',
    //     targetId:".1",
    //     targetPropKey:"name",
    //     targetPropValue:"test"
    //   }]
    const {currentEventName,onCancle,root} = this.props;
    const  _ROOT = this.props.childsStructor.root;
    const {currentEventValue,currentActionIndex,currentCase} = this.state;
    let condition_opr_el;
    if(Array.isArray(currentEventValue)&&currentEventValue.length>0){
      condition_opr_el = (
        <span>
          <a className="dbl-btn" onClick={this.editCondition.bind(this)}>编辑条件</a>
          <a className="dbl-btn" onClick={this.clearCondition.bind(this)}>清空条件</a>
        </span>
      );
    }else{
      condition_opr_el = <a className="dbl-btn add-condition" onClick={this.addCondition.bind(this)}>增加条件</a>;
    }
    

    const loop = data => data.map((item) => {
      const {dblid,childs} = item.props;
      //expandedKeys.push(dblid);
      const _title = <span>{(item.alias?item.alias:"")+"("+dblid+")"}</span>;
      if (childs&&childs.length>0) {
        return <TreeNode title={_title} key={dblid}>{loop(childs)}</TreeNode>;
      }
      //if(childs.props.childs.length>0)  //当前子组件包含非空的子孙组件
      return <TreeNode title={_title} key={dblid} isLeaf={true}/>;
    });


    return(
      <Modal title={"Case Editor ("+(currentEventName||'undefined')+')'} {...this.props} 
        onOk = {this.handleOk.bind(this)}
      >
        <div className="case-editor-top">
          Case名称：<Input defaultValue="Case 1" onChange={this.changeCaseName.bind(this)} />
          {condition_opr_el}
        </div>
        <Row className="case-editor-body">
          <Col span={'7'}>
            <p>增设动作</p>
            <div className="choose-area">
              <Tree showLine multiple  
                defaultExpandAll = {true}
                onSelect={this.addAction.bind(this)}>
                {
                  this.ACTIONS.map((item,index)=>{
                    return <TreeNode title={item.name} key={item.value} />
                  })
                }
              </Tree>
            </div>
          </Col>
          <Col span={'8'}>
            <p>已选动作</p>
            <div className="choose-area">
              <Tree showLine   
                defaultExpandAll = {true} 
                onSelect={this.changeActionIndex.bind(this)}
                >
                <TreeNode title={this.currentCaseName} key="">
                 {
                  Array.isArray(currentEventValue)&&currentEventValue.map((item,index)=>{
                    const title = <span>{item.name}</span>;
                    return <TreeNode title={title} key={index} />
                  })
                 }
                </TreeNode>
              </Tree>
            </div>
          </Col>
          <Col span={'9'}>
            <p>配置</p>
            <div className="choose-area">
              <Tree showLine multiple checkable
                defaultExpandAll = {true}
                onSelect={this.selectTargetComponent.bind(this,currentActionIndex)}>
                <TreeNode title="parent 1" key=".">
                  {loop(_ROOT.props.childs)}
                </TreeNode>
              </Tree>
              设置
              <Select defaultValue="lucy" onChange={this.changeTargetKey.bind(this)}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>Disabled</Option>
                <Option value="yiminghe">yiminghe</Option>
              </Select>为
              <Input defaultValue="New Value" onChange={this.changeTargetValue.bind(this)}/>
            </div>
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default Box
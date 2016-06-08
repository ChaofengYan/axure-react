/**
* 工具集
*    ——包含所有子组件识别码ID
*    ——公共功能：拖入排版、导入、导出、预览、最小化等
*/
import React, { Component, PropTypes } from 'react';
import {Collapse,Button,Tabs,Tree,Checkbox,Input,Select} from 'antd';
import CaseEditor from './CaseEditor'
import { SketchPicker } from 'react-color';

const Interactions = ['OnClick','OnFocus','OnSelected','OnLoad'];
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

class Box extends Component {
  constructor(props){
    super(props);
    this.state={
      background:[] //0:颜色，1：图，2：位置X,3:位置Y,4:重复
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
  //常规属性编辑
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
  //样式编辑
  handleStyleChange(e){
    const _key = e.target.getAttribute('data-dblkey'),_value = e.target.value;
    let _STYLE_ = Object.assign({},this.props.allProps._STYLE_);
    _STYLE_[_key] = _value;
    this.context.store.dispatch({
      type: 'CHILD_CHANGE',
      key:'_STYLE_',
      value:_STYLE_,
      childID:this.props.allProps.dblid
    });
  }
  handleBackgroundChange(e){

  }
  render() {   
    let propsComps = [],_style = this.props.allProps._STYLE_,self = this;
    return(
      <div id="J-custom-style">
        <div className="loc-size">
          <p>Location+Size<i>Hidden<Checkbox /></i></p>
          <ul className="input-area">
            <li>
              <Input />
              <p>X</p>
            </li>
            <li>
              <Input />
              <p>Y</p>
            </li>
            <li>
              <Input />
              <p>W</p>
            </li>
            <li>
              <Input />
              <p>H</p>
            </li>
            <li>
              <Input />
            </li>
            <li>
              <Input />
            </li>
          </ul>        
        </div>
        <div className="pre-set">
          <Select tags
            style={{ width: '100%' }}
            searchPlaceholder="标签模式"
            >
            <Option value="jack">杰克</Option>
            <Option value="lucy">露西</Option>
            <Option value="tom">汤姆</Option>
          </Select>
        </div>
        <ul className="self-set">
          <li className="bg">
            <span className="name">背景</span>
            Color:<Input data-dblkey='background' onChange={this.handleStyleChange.bind(this)}/>
            Image:<Input data-dblkey='background' onChange={this.handleStyleChange.bind(this)}/>
            Position:<Input data-dblkey='background' onChange={this.handleStyleChange.bind(this)}/>
            Repeat:<Select defaultValue="lucy" style={{ width: 120 }} allowClear disabled>
                    <Option value="lucy">Lucy</Option>
                  </Select>
          </li>
          <li>
            <span className="name">边框</span>
            <Input />
          </li>
          <li>
            <span className="name">边框圆角</span>
            <Input />
          </li>
          <li>
            <span className="name">透明度</span>
            <Input />
          </li>
          <li>
            <span className="name">字体</span>
            <Input />
          </li>
          <li>
            <span className="name">边框</span>
            <Input />
          </li>
          <li>
            <span className="name">对齐方式</span>
            <Input />
          </li>
          <li>
            <span className="name">外边距</span>
            <Input />
          </li>
          <li>
            <span className="name">内边距</span>
            <Input />
          </li>
        </ul>
      </div>
    );
  }
}

Box.contextTypes = {
  store:React.PropTypes.any
 } ;

export default Box
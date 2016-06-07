/**
* 弹窗配置
*    ——所有组件的可配置信息
*    ——公共功能：编辑等
*/

import React, { Component, PropTypes } from 'react';
import { Collapse } from 'antd';
import CommonStyle from './commonStyle'
import CommonEvent from './CommonEvent'

const Panel = Collapse.Panel;

class SingleComponentEdit extends Component{
  constructor(props){
    super(props);
  }

  render() {
    return (     
      <Collapse defaultActiveKey={['1']} onChange={callback}>
        <Panel header="预设属性" key="1">
          <p>{text}</p>
        </Panel>
        <Panel header="可选样式属性" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="可选事件系统" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    );
  }
}

SingleComponentEdit.contextTypes = {
  store:React.PropTypes.any
 } ;

export default SingleComponentEdit 
/**
* 弹窗配置
*    ——所有组件的可配置信息
*    ——公共功能：编辑等
*/

import React, { Component, PropTypes } from 'react';
import {Modal,Button} from 'antd';

class ModalDlg extends Component{
  constructor(props){
    super(props);
  }

  configDialogHide(e){
    this.context.store.dispatch({
      type: 'CONFIG_MODAL',
      show:false
    });
  }
  render() {
    return (
      <div className={this.props.actionType}>
        <Modal ref="modal"
          visible={this.props.dialogShow}
          title="组件配置" onOk={this.configDialogHide.bind(this)} onCancel={this.configDialogHide.bind(this)}
          footer={[
            <Button key="back" type="ghost" size="large" onClick={this.configDialogHide.bind(this)}>返 回</Button>,
            <Button key="submit" type="primary" size="large" loading={false} onClick={this.configDialogHide.bind(this)}>
              提 交
            </Button> 
          ]}>
         {this.props.children}
        </Modal>
      </div>
    );
  }
}


ModalDlg.contextTypes = {
  store:React.PropTypes.any
 } ;

export default  ModalDlg

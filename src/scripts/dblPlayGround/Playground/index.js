/**
* 组件广场
*    ——收集子组件信息
*    ——公共功能：双击\右键编辑(删除)、拖放（排序、嵌套、删除）
*/
import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import EditArea from './EditArea'
import ContentMenu from './ContentMenu'
import HTML5Backend from 'react-dnd-html5-backend';
import ComponentsCollection from '../../components/index'
import ModalDlg from './modal'

const boxTarget = {
  drop(props, monitor, component) {
    const childName = monitor.getItem().name;
    const hasDroppedOnChild = monitor.didDrop();
    if (hasDroppedOnChild) {
      return;
    }
    component.context.store.dispatch({
      type: 'CHILD_CREATE',
      childName:childName
    });

  }
};

 class Container extends Component {

  constructor(props) {
    super(props);
    this.state={
      childs:[]
    }
  }
  handleEdit(e){
    this.props.handleEdit(e);
  }
  handleContentMenu(e){
    e.preventDefault();
    this.props.handleContentMenu(e);
  }
  render() {
    const { hideSourceOnDrag, connectDropTarget,isOver, isOverCurrent } = this.props;

    console.dir('playground index render!');

    const _childs = this.context.store;
    const {root,dlgShow,dlgContent,contentMenuShow,contentMenuProps} =this.props.childsStructor;
    const {childs,_STYLE_,_EVENTS_} = root.props;
    let backgroundColor = 'rgba(0, 0, 0, .5)';
    if (isOverCurrent || isOver ) {
      //backgroundColor = 'red';
    }
    return connectDropTarget(
      <div className="body" data-dblid="."
        style={_STYLE_} {..._EVENTS_}
        onDoubleClick={this.handleEdit.bind(this)} 
        onContextMenu={this.handleContentMenu.bind(this)}
        >
        {
          !childs?"":childs.map(function(item,index,arr){
              return React.createElement(ComponentsCollection[item.childName],Object.assign(item.props,{key:index}));
            })
        }
        <ModalDlg dialogShow={dlgShow} children={dlgContent} />
        <ContentMenu show={contentMenuShow} contentMenuProps={contentMenuProps}/>
      </div>
    );
  }
}

Container.contextTypes = {
  store:React.PropTypes.any
 } ;


export default DropTarget('box', boxTarget, (connect,monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  isOverCurrent: monitor.isOver({ shallow: true })
}))(Container)

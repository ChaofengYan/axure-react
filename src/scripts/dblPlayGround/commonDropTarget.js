import React,{Component} from 'react'
import { DropTarget } from 'react-dnd';
import ComponentsCollection from '../components/index'

function getStyle(bgcolor,childs) {
  return {
    backgroundColor: bgcolor,
    position: 'relative',
    color: 'white',
    border:'1px solid gray',
    paddingBottom:10,
    borderBottom:"10px dashed gray"
  }

};

  const boxTarget = {
    drop(props, monitor, component) {
      const childName = monitor.getItem().name;
      const hasDroppedOnChild = monitor.didDrop();
      if (hasDroppedOnChild) {
        return;
      }
      component.context.store.dispatch({
        type: 'CHILD_CREATE',
        childName:childName,
        childID:props.dblid
      });
      //Action.addChild(childName,props.dblid);
    }
  };

 class CommonChild extends Component{

    render(){
      const { isOver, isOverCurrent,connectDropTarget,isFocus } = this.props;

      let backgroundColor = 'rgba(0, 0, 0, .5)',
          outline = isFocus?'3px solid green':'1px solid gray';
      if (isOverCurrent) {
        backgroundColor = 'red';
      }
      return connectDropTarget(
        <div className="common-child" 
            style={{
              borderBottom:"10px dashed gray",
              backgroundColor: backgroundColor,
              position: 'relative',
              color: 'white',
              outline:outline,
              paddingBottom:10
            }} 
            key={this.props.key} data-dblid={this.props.dblid}
        >
          {
            !this.props.childs?"":this.props.childs.map(function(item,index,arr){
                return React.createElement(ComponentsCollection[item.childName],Object.assign(item.props,{key:index}));
              })
          }
        </div>
      )
    }
  }

CommonChild.contextTypes = {
  store:React.PropTypes.any
 } ;

 export default DropTarget('box', boxTarget, (connect,monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({ shallow: true })
  }))(CommonChild);
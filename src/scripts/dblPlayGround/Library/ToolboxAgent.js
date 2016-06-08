import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';

export default (ele,name) => {
  if(typeof ele!="object"){
    console.dir(ele+"should be a React element!!");
    return;
  }

  const boxSource = {
  /*beginDrag:必须，开始时*/
    beginDrag(props) {
      // console.dir({name});
      // console.dir("ele"+ele);
     
      return {name,};
    }
  };

 class Box extends Component {
  render() {
    const { connectDragSource } = this.props;
    return connectDragSource(
      <div className="dbl-lib-item">
        <img src="" />
      {ele}
      </div>
    );
    }
  }
  Box.propTypes = {
    connectDragSource: PropTypes.func.isRequired
  }
  const Source = DragSource('box', boxSource, (connect,monitor) => ({
    connectDragSource: connect.dragSource(), // receive connectDragSource as a prop
    isDragging: monitor.isDragging()
  }))(Box);
  return <Source />;
}
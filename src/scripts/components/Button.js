import React, { Component, PropTypes } from 'react';
import {Button} from 'antd';
import ToolDragSource from './ToolboxAgent'

 class Box extends Component {
  render() {
    return (
      <div>
      <Button type="primary" size="large">大号按钮</Button>
      </div>
    );
  }
}

var Box2 =ToolDragSource(<Box />,'button');

export default Box2;
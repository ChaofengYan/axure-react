import {Component} from 'react'
import { DropTarget } from 'react-dnd';


class Image extends Component{
  constructor(props){
    super(props)
  }
   
  render(){
    const {src,width,height} = this.props;
    return (
      <img src={src} width={width} height={height} data-dblid={this.props.dblid} />
    )
  }
}

Image.defaultProps={
  src:"https://img.alicdn.com/tps/TB1BSBSLVXXXXbiXXXXXXXXXXXX-158-145.png",
  width:'50px',
  height:'50px'
}
export default Image
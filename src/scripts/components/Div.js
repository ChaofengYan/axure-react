import React,{Component} from 'react'
import { DropTarget } from 'react-dnd';

class Div extends Component{
  constructor(props){
    super(props)
  }
   
  render(){
    const {childs,...style} = this.props;
    return (
      <div data-dblid={this.props.dblid} style={{
        ...style
      }}>
        <CommonDropTarget childs={childs[0].props.childs} dblid={childs[0].props.dblid}/>
      </div>
    )
  }
}

Div.defaultProps={
  backgroundColor:'#fff',
  _STYLE_:{},
  backgroundImage:'',
  width:'100%',
  height:'',
  // width:{
  //   name:"宽度(单位：px)",  //编辑时的展示名
  //   type:"dev",  //用于开发时的属性，上线后木有
  //   value:""
  // },
  childs:[{}]
}
export default Div
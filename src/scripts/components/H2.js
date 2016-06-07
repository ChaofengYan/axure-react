import React,{Component} from 'react'
import { DropTarget } from 'react-dnd';

class H2 extends Component{
  constructor(props){
    super(props)
  }
   
  render(){
    const {childs} = this.props;
    return (
      <div className="h2" key={this.props.key} data-dblid={this.props.dblid}>
        我是H2， {this.props.name} ,{this.props.age}
        <ul>
        <li>
          <CommonDropTarget childs={childs[0].props.childs} isFocus={childs[0]&&childs[0].props.isfocus} dblid={childs[0].props.dblid}/>
        </li>
        <li>
          <CommonDropTarget childs={childs[1].props.childs} isFocus={childs[1]&&childs[1].props.isfocus} dblid={childs[1].props.dblid}/>
        </li>
        </ul>
      </div>
    )
  }
}

H2.defaultProps={
  age:12,
  childs:[{},{}]
}
export default H2
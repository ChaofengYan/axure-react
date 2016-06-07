import {Component} from 'react'
import { DropTarget } from 'react-dnd';
import {Row,Col} from 'antd'


class Div extends Component{
  constructor(props){
    super(props)
  }
   
  render(){
    const {childs,spans,offsets} = this.props;
    return (
      <div className="y-row" key={this.props.key} data-dblid={this.props.dblid}>
        <Row>
        {
          Array.isArray(spans.value)&&spans.value.map(function(item,index){
            return(
              <Col span={String(item)} offset={String(offsets[index])} key={index}>
                <CommonDropTarget childs={childs[index].props.childs} isFocus={childs[0]&&childs[0].props.isfocus} dblid={childs[index].props.dblid}/>
              </Col>
            )
          })
        }      
        </Row>        
      </div>
    )
  }
}

Div.defaultProps={
  spans:{
    name:"列个数，总和为24，多个列用','分割。如：6，6，6，6或12，12",
    value:[8,8,8]
  },
  offsets:[0,0,0],
  childs:[{},{},{}]
}
export default Div
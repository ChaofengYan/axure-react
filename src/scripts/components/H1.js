import React,{Component} from 'react'
import { DropTarget } from 'react-dnd';
import {Button} from 'antd';


class H1 extends Component{
  constructor(props){
    super(props)

  }
  handleEVENTS(eventType){
    console.dir('click');
    const _event = this.props._EVENTS_[eventType];
    _event.map((item,index)=> {
      const {condition,targetId,targetPropKey,targetPropValue} = item;
      if(eval(condition)){
        this.context.store.dispatch({
          type: 'CHILD_CHANGE',
          key:targetPropKey,
          value:targetPropValue,
          childID:targetId
        });
      }  
    })
    
  }
  render(){
    const {childs} = this.props;

    return (
      <div className="h1" key={this.props.key} style={this.props._STYLE_} data-dblid={this.props.dblid}>
        我是H1， {this.props.name} ,{this.props.age}
        <Button type="primary" size="large" onClick={this.handleEVENTS.bind(this,'click')} >大号按钮</Button>
        <CommonDropTarget isFocus={childs[0]&&childs[0].props.isfocus} childs={childs[0]&&childs[0].props.childs} dblid={childs[0]&&childs[0].props.dblid}/>
      </div>
    )
  }
}

H1.defaultProps={
  age:12,
  name:"闫朝峰",
  _STYLE_:{},  //可为isFocus放置outline
  _EVENTS_:{
    click:[{
      condition:'true',
      targetId:".1",
      targetPropKey:"name",
      targetPropValue:"test"
    },{
      condition:'true',
      targetId:".2",
      targetPropKey:"name",
      targetPropValue:"test2"
    }]
  },
  childs:[{}]
}

H1.contextTypes = {
  store:React.PropTypes.any
 } ;


export default H1
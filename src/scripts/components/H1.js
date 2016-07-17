import React,{Component} from 'react'
import { DropTarget } from 'react-dnd';
import {Button} from 'antd';


class H1 extends Component{
  constructor(props){
    super(props)

  }
  handleEVENTS(eventType){
    console.dir('click');
    //const _event = this.props._EVENTS_[eventType];
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

  componentWillReceiveProps(nextProps){
    const {_EVENTS_} = nextProps;
    for(let key in _EVENTS_){
      const  event = _EVENTS_[key];
      if(typeof event=='function') event.bind(null,this);
    }
  }

  handleClick(e){
    const {_EVENTS_:{onClick}} = this.props;
    if(typeof onClick == 'function') onClick.call(this);
  }

  render(){
    const {childs,dblid,_EVENTS_,_STYLE_,key,actions} = this.props;

    for(let key in _EVENTS_){
      const  event = _EVENTS_[key];
      if(typeof event=='function') _EVENTS_[key] = event.bind(this);
    } 

    return (
      <div className="h1" key={key} {..._STYLE_} data-dblid={dblid} {..._EVENTS_}>
        我是H1， {this.props.name} ,{this.props.age}
        <Button type="primary" size="large" >大号按钮</Button>
        <CommonDropTarget actions={actions} isFocus={childs[0]&&childs[0].props.isfocus} childs={childs[0]&&childs[0].props.childs} dblid={childs[0]&&childs[0].props.dblid}/>
      </div>
    )
  }
}

H1.defaultProps={
  age:12,
  name:"闫朝峰",
  _STYLE_:{},  //可为isFocus放置outline
  _EVENTS_:{
    onClick:[{
      name:'case 1',
      condition:'true',
      targetId:".1",
      targetPropKey:"name",
      targetPropValue:"test"
    },{
      name:'case 2',
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
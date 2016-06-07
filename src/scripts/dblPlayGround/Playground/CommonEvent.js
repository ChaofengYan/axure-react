/**
* 样式
*/

import React, { Component, PropTypes } from 'react';
import { Button, Icon ,Select } from 'antd';
import PropsNames from './commonPropsNames'

let PropsNamesArr=[];
for(var i in PropsNames){
	if(PropsNames.hasOwnProperty(i)){
		PropsNamesArr.push({key:i,name:PropsNames[i]})
	}
}

class CommonEvent extends Component{
  constructor(props){
    super(props);
    this.state={
      events:props.events
    };

    this.childEdit = this.childEdit.bind(this);
  }

  handleAdd(e){
  	this.setState({
  		newSelect:true
  	})
  }
  childEdit(e){
  	this.props.onChange(e);
  }
  handleAddCondition(eventName){
    const _events = Object.assign({},this.state.events);  
    _events[eventName].push({
      condition:'',
      targetId:"",
      targetPropKey:"",
      targetPropValue:""
    });
    this.setState({
      events:_events
    })
  }
  render() {
  	const {newSelect,styles,events} = this.state,self=this;
    //const {events} = this.props;
    let layout=[]; 
    for(let _event in events){
      if(events.hasOwnProperty(_event)){
        layout.push(
          <div className="event-item">
            <h3>{_event}</h3>
            {
              events[_event].map(function(){
                return(
                  <p>
                    <input data-dblkey='condition' placeholder="1" />
                    <input data-dblkey='targetId' placeholder="2" />
                    <input data-dblkey='targetPropKey' placeholder="3" />
                    <input data-dblkey='targetPropValue' placeholder="4" />
                  </p>
                )
              })
            }          
            <Button type="primary" onClick={this.handleAddCondition.bind(_event,this)}>
                <Icon type="plus-circle-o" />
            </Button>
          </div>
          )
      }
    }

    // click:[{
    //   condition:'true',
    //   targetId:".1",
    //   targetPropKey:"name",
    //   targetPropValue:"test"
    // },{
    //   condition:'true',
    //   targetId:".2",
    //   targetPropKey:"name",
    //   targetPropValue:"test2"
    // }]

    return (     
          <div>
          	<h1>交互事件编辑</h1>
          	<div>
              {layout}
          	</div>
          </div>
    );
  }
}

CommonEvent.contextTypes = {
  store:React.PropTypes.any
 } ;

export default CommonEvent 
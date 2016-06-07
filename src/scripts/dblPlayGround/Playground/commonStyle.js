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

class CommonStyle extends Component{
  constructor(props){
    super(props);
    this.state={
    	newSelect:false,
    	styles:[]
    };

    this.childEdit = this.childEdit.bind(this);
  }
  handleChangeStyleName(keyvalue){
  	let _styles = this.state.styles.slice(0);
  	_styles.push({key:keyvalue});
  	this.setState({
  		styles:_styles
  	})
  }
  handleAdd(e){
  	this.setState({
  		newSelect:true
  	})
  }
  childEdit(e){
  	this.props.onChange(e);
  }
  render() {
  	const {newSelect,styles} = this.state,self=this;
    return (     
          <div>
          	<h1>基础样式</h1>
          	<div>
          	{
          		styles.map(function(item,index){
          			return(
          				<p key={index}>{item.key}:<input type="text" data-dblkey={item.key}  onChange={self.childEdit}/></p>
          			)
          		})
          	}
          	</div>
          	<Select style={{ 
          			width: 200,
          			display:newSelect?'block':'none' 
          		}} onChange={this.handleChangeStyleName.bind(this)}>
          		{
          			PropsNamesArr.map(function(item,index) {
          				return(
          					<Option value={item.key}>{item.name}</Option>
          				)
          			})
          		}
	          </Select>
	            <Button type="primary" onClick={this.handleAdd.bind(this)}>
						    <Icon type="plus-circle-o" />
						  </Button>
          </div>
    );
  }
}

CommonStyle.contextTypes = {
  store:React.PropTypes.any
 } ;

export default CommonStyle 
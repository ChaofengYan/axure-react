import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import ComponentsCollection from '../components/index'

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {childs} =this.props.childsStructor;
    return (
      <div>
       {
        !childs?"":childs.map(function(item,index,arr){
          return React.createElement(ComponentsCollection[item.childName],Object.assign(item.props,{key:index}));
        })
        }
      </div>
    );
  }
}

function select(state) {
  return state
}

export default connect(select)(App)
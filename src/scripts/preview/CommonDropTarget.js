import React,{Component} from 'react'
import ComponentsCollection from '../components/index'

 class CommonChild extends Component{
    render(){
      return (
        <div className="common-child" key={this.props.key} data-dblid={this.props.dblid}>
          {
            !this.props.childs?"":this.props.childs.map(function(item,index,arr){
              console.dir(item.childName);
                return React.createElement(ComponentsCollection[item.childName],Object.assign(item.props,{key:index}));
              })
          }
        </div>
      )
    }
  }

CommonChild.contextTypes = {
  store:React.PropTypes.any
 } ;

export default CommonChild
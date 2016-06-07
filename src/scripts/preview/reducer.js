import { combineReducers } from 'redux'
import ComponentsCollection from '../components/index'

//const _childs = JSON.parse(window.sessionStorage.getItem('childs'));
//debugger;
//返回一个引用
/*
 * rootChilds: store中childsStructor，每次需函数调用者传递进来，数组
 child: 当前id的组件对象，否则为空
 father:当前id的父级组件对象，否则为根数组

 */
function getChildById(rootChilds,_childID){
  if(!_childID) return {
    child:"", //根级子元素组成的数组？
    father:rootChilds
  }
	//根据ID选择
	let level = _childID.split('.').slice(1);
	let parents = [];
	let _child = level.reduce(function(prev, next) { //每次都从最顶级开始        
		var item = Array.isArray(prev) ? prev[next] : prev.props.childs[next];
		parents.push(item);
		return item;
	}, rootChilds);
	return {
    child:Array.isArray(_child) ? _child[0] : _child, //返回当前组件对象，包含props
    father:parents.length>1?parents[parents.length-2]:rootChilds //父级组件，用于删除一个child
  }
}

//操作childs结构
function childsStructor(state=_childs, action) {
  if(!state.childs) {
    console.dir('state should have a key named "childs"!');
    return state;
  }
	const _childID = action.childID||'';
	const childName = action.childName;
  let cloneState =  Object.assign({},state); //每次操作克隆组件
	const {child:_child,father} = getChildById(cloneState.childs,_childID);
  const _childhasChilds = _child?_child.props.childs:father;

	switch (action.type) {
		case 'CHILD_CHANGE':   //必须指定childID
      if(!_childID) return state;
      let propsNeedUpdate = _child.props; //取出指定ID组件的属性的引用！引用！
      propsNeedUpdate[action.key] = action.value;  //直接修改引用的信息，自动同步到Store中
			return cloneState;
    case 'CONFIG_MODAL':
      cloneState.cfgDialogShow=action.show;
      cloneState.cfgDialogProps = action.show?_child.props:{};
      if(cloneState.cfgDialogProps.hasOwnProperty('style')){ //有独立样式
          console.dir('special style!');
      }
      return cloneState;
		default:
			return state;
	}
}

export default combineReducers({
	childsStructor
})
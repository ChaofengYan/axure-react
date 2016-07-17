//返回一个引用
/*
 * rootChilds: store中childsStructor，每次需函数调用者传递进来，数组
 child: 当前id的组件对象，否则为空
 father:当前id的父级组件对象，否则为根数组

 */
export function getChildById(rootChilds,_childID){
  if(_childID=='.') return {
  	child:rootChilds,
    //child:"", //根级子元素组成的数组？
    father:null
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

/**
 * 根据ID修改组件给定属性
 * 
 * @param  {[type]} _childID [description]
 * @param  {[type]} props    [description]
 * @return {[type]}          [description]
 */
export function changePropsById(_childID,props){
	console.dir('changePropsById');
	getChildById(window.ROOT,_childID);
}

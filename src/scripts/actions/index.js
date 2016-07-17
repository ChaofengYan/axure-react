import * as Types from './actionTypes';

/**
 * 增加组件
 * 
 * @param  {String} childName [description]
 * @param  {String} childID   [description]
 */
export function childCreate(childName, childID) {
	return {
		type: Types.CHILD_CREATE,
		childName,
		childID
	}
}

export function childRemove(childID) {
	return {
		type: Types.CHILD_REMOVE,
		childID
	}
}

/**
 * 改变指定ID组件的属性
 * 
 * @param  {String} childID [description]
 * @param  {Object} props   [description]
 * @return {[type]}         [description]
 */
export function childChange(childID, key, value) {
	return {
		type: Types.CHILD_CHANGE,
		key,
		value
	}
}

/**
 * 页面初始化
 * 
 * @return {[type]} [description]
 */
export function load() {
	return {
		type: Types.LOAD
	}
}

export function beforeunload() {
	return {
		type: Types.BEFORE_UNLOAD
	}
}

export function resetStore(){
	return {
		type: Types.RESET_STORE
	}
}

/**
 * 用户操作改变指定ID组件的属性(们)
 * 	开发模式下,有回滚功能,默认3秒
 * @param  {String} childID [description]
 * @param  {Object} props   [description]
 * @return {[type]}         [description]
 */
export function changeProps(childID,nextProps,timeout=3000) {
	return (dispath) => {
		dispath(createChangePropsAction(childID, nextProps));
		setTimeout(()=>dispath(createChangePropsAction(childID, nextProps,true)),timeout)
	}
}

function createChangePropsAction(childID, props,backOpt){
	return {
		type: Types.CHANGE_PROPS,
			childID,
			props,backOpt
	}
}
import { combineReducers } from 'redux'
import ComponentsCollection from '../components/index'
import EditArea from './Playground/EditArea'
import getChildById from '../utils/index'

const _childs2={
  _STYLE_:{

  },
  _EVENTS_:{

  },
	childs:[{
      childName: 'H1',

      props: {
        dblid:'.0',
        childs:[{
        	childName:'',                   	
        	props:{
        		dblid:'.0.0',
            name:"test",
        		childs:[]
        	}
        }]
      }
    },{
      childName: 'H1',
      props: {
        dblid:'.1',
        childs:[{
        	childName:'',                   	
        	props:{
        		dblid:'.1.0',
        		childs:[]
        	}
        }]
      }
    }],
    dlgShow:false,
    dlgContent:'',
    contentMenuShow:{},
    contentMenuProps:""
  };

const _childs={
    // "childName": "",
    // "alias":"root",
    // "props":{
    //   "dblid": ".",
    //   "isfocus":true,

    // }
    "childs": [{
        "childName": "H1",
        "props": {
            "dblid": ".0",
            "name":"test",
            "isfocus":true,
            "childs": [{
                "childName": "",
                "props": {
                    "dblid": ".0.0",
                    "name": "test",
                    "isfocus":false,
                    "childs": []
                }
            }],
            "key": 0
        }
    }, {
        "childName": "H1",
        "props": {
            "dblid": ".1",
            "isfocus":true,
            "childs": [{
                "childName": "",
                "props": {
                    "dblid": ".1.0",
                    "isfocus":false,
                    "childs": []
                }
            }],
            "key": 1
        }
    }, {
        "childName": "Row",
        "props": {
            "row": 5,
            "spans": {
                "name": "列个数，总和为24，多个列用','分割。如：6，6，6，6或12，12",
                "value": [
                    8,
                    8,
                    8
                ]
            },
            "offsets": [
                0,
                0,
                0
            ],
            "isfocus":false,
            "childs": [{
                "childName": "",
                "props": {
                    "dblid": ".2.0",
                    "isfocus":false,
                    "childs": [{
                      "childName": "H1",
                      "props": {
                          "dblid": ".1",
                          "isfocus":false,
                          "childs": [{
                              "childName": "",
                              "props": {
                                  "dblid": ".2.0.0",
                                  "isfocus":false,
                                  "childs": []
                              }
                          }],
                          "key": 1
                      }
                  }]
                }
            }, {
                "childName": "",
                "props": {
                    "dblid": ".2.1",
                    "isfocus":false,
                    "childs": []
                }
            }, {
                "childName": "",
                "props": {
                    "dblid": ".2.2",
                    "isfocus":false,
                    "childs": []
                }
            }],
            "dblid": ".2",
            "isfocus":false,
            "key": 2
        }
    }],
    currentChild:{
        "childName": "H1",
        "props": {
            "dblid": ".0",
            "name":"test",
            "isfocus":true,
            "childs": [{
                "childName": "",
                "props": {
                    "dblid": ".0.0",
                    "name": "test",
                    "isfocus":false,
                    "childs": []
                }
            }],
            "key": 0
        }
    },
    "dlgShow": false,
    "dlgContent": "",
    "contentMenuShow": {},
    "contentMenuProps": ""
}

const _childs4={childs:[]};


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
		case 'CHILD_CREATE':
        var father_dblid = "";
        let _currentComponet = ComponentsCollection[childName];
        const {defaultProps:_currentComponetPrpops} = _currentComponet;    
        if(!_currentComponetPrpops.childs||_currentComponetPrpops.childs.length<1){
            //当前添加的组件中没有预设子组件
            _childhasChilds.push({
                childName: childName,
                props: Object.assign({},_currentComponetPrpops,{
                  dblid:_childID+"."+_childhasChilds.length
                })
            });
        }else{
          //当前添加的组件中有预设子组件
            const childNumberNeedAdd = _currentComponetPrpops.childs.length;
            let _childs=[];
            for(let i=0;i<childNumberNeedAdd;i++){ //处理待装载模块的child属性
                _childs.push({
                  childName: "",
                  props: {
                    dblid:_childID+"."+_childhasChilds.length+"."+i,
                    childs:[]  //是否可以不要？
                  }
                });
            }
            _childhasChilds.push({ //增加到指定ID的对象内部（后面）
                childName: childName,
                forbidden:true,
                props: Object.assign({},_currentComponetPrpops,{
                  dblid:_childID+"."+_childhasChilds.length,
                  childs:_childs
                })
            });
        };
			return cloneState;
		case 'CHILD_REMOVE':
        let num = 0;
        let brothers = Array.isArray(father)?father:father.props.childs;
        const father_id = Array.isArray(father)?"":father.props.dblid;
        //查看父元素是否forbidden
        const new_childs = brothers.filter(function(item,index,arr){
            if(item!=_child){
                if(!father.forbidden){
                  item.props.dblid=father_id+"."+num; //重构dblid
                  num++;
                }                
            }else{
              if(!father.forbidden) return;
              item.props.childs=[];
            }
            return item;
        });
        if(!Array.isArray(father)){
            father.props.childs = new_childs;
        }else{
            cloneState.childs = new_childs;
        }
			return cloneState;
		case 'CHILD_CHANGE':   //必须指定childID
      if(!_childID) return state;
      
      if(action.key=='alias'){
        _child.alias = action.value
      }else{
        let propsNeedUpdate = _child.props; //取出指定ID组件的属性的引用！引用！
        propsNeedUpdate[action.key] = action.value;  //直接修改引用的信息，自动同步到Store中
      }      
			return cloneState;
    case 'CONFIG_MODAL':
      cloneState.dlgShow=action.show;
      cloneState.cfgDialogProps = action.show?_child.props:{};
      let _cfgDialogProps=cloneState.cfgDialogProps;

      cloneState.dlgContent = <EditArea cfgDialogProps={action.show?_child.props:{}} />;
      if(cloneState.cfgDialogProps.hasOwnProperty('style')){ //有独立样式
          console.dir('special style!');
      }
      return cloneState;
    case 'CONTENT_MENU': 
      cloneState.contentMenuShow=(!!action.left)&&{
            left:action.left,
            top:action.top
        };
      cloneState.contentMenuProps =_childID;
      return cloneState;
    case 'FOCUS_HIGH_LIGHT':
      console.dir(_child.props);
      if(_child.props) {
        if(_child.props._style){
          _child.props._style.outline=(action.direction=="enter")?'3px solid green':null;
        }else{
          _child.props.isfocus = (action.direction=="enter"); 
        }   
      }   
      return cloneState;
    case 'EXPORT':
      cloneState.dlgShow=true;
      const _item = JSON.stringify(state);
      cloneState.dlgContent = <textarea defaultValue={_item}></textarea>;
      return cloneState;
    case 'IMPORT':
      cloneState.dlgShow=true;
      cloneState.dlgContent = <textarea onChange={this.handleImport.bind(this)}></textarea>;
      return cloneState;
		default:
			return state;
	}
}

//编辑对话框
function playGroundModal(state=[], action) {

	switch (action.type) {
		// case 'DOUBLE_CLICK':
		// 	return state;
		// case 'CONTENT_MENU':
		// 	return;
		default:
			return state;
	}
}

export default combineReducers({
	childsStructor,
	playGroundModal
})

// export default (state = {}, action)=>{
//   return {
//     childsStructor:childsStructor(state.childsStructor,action),
// 	 	playGroundModal:playGroundModal(state,action)
//   };
// }
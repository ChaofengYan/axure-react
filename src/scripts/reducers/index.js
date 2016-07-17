import {
  combineReducers
} from 'redux';
import * as Types from '../actions/actionTypes';
import ComponentsCollection from '../components/index'
import {getChildById} from '../utils'

let _childs = {
  root: {
    alias: "Page",
    props: {
      dblid: '',
      _STYLE_: {},
      _EVENTS_:{},
      childs: []
    }
  },
  currentChild: {
    alias:"Page",
    props: {
      dblid: '',
      _STYLE_: {},
      _EVENTS_:{},
      childs: []
    }
  }
};

const handleSessionStorage ={
  read(){
    return JSON.parse(sessionStorage.getItem('state'));
  },
  write(value){
    window.ROOT = value.root;
    sessionStorage.setItem('state',JSON.stringify(value));
  }
};

let lastTime;

//操作childs结构
function childsStructor(state = _childs, action) {

  // if (!state.childs) {
  //   console.dir('state should have a key named "childs"!');
  //   return state;
  // }
  const _childID = action.childID || '.';
  const childName = action.childName;
  let cloneState = $.extend(true,{}, state); //每次操作克隆组件
  //let _child,father;
  const {
    child: _child,
    father
  } = getChildById(cloneState.root, _childID);

  const _childhasChilds = _child ? _child.props.childs : father;

  switch (action.type) {
    case Types.CHILD_CREATE:
      var father_dblid = "";
      let _currentComponet = ComponentsCollection[childName];
      const {
        defaultProps: _currentComponetPrpops
      } = _currentComponet;
      if (!_currentComponetPrpops.childs || _currentComponetPrpops.childs.length < 1) {
        //当前添加的组件中没有预设子组件
        _childhasChilds.push({
          childName: childName,
          props: Object.assign({}, _currentComponetPrpops, {
            dblid: (_childID!='.'?_childID:'') + "." + _childhasChilds.length
          })
        });
      } else {
        //当前添加的组件中有预设子组件
        const childNumberNeedAdd = _currentComponetPrpops.childs.length;
        let _childs = [];
        for (let i = 0; i < childNumberNeedAdd; i++) { //处理待装载模块的child属性
          _childs.push({
            childName: "",
            props: {
              dblid: (_childID!='.'?_childID:'') + "." + _childhasChilds.length + "." + i,
              childs: [] //是否可以不要？
            }
          });
        }
        _childhasChilds.push({ //增加到指定ID的对象内部（后面）
          childName: childName,
          forbidden: true,
          props: Object.assign({}, _currentComponetPrpops, {
            dblid: (_childID!='.'?_childID:'') + "." + _childhasChilds.length,
            childs: _childs
          })
        });
      };
      handleSessionStorage.write(cloneState);
      return cloneState;
    case Types.CHANGE_PROPS: //不写入Session，无侵入改写
      console.dir('here');
      if(action.backOpt){
        cloneState.root = handleSessionStorage.read().root;
      }else if(_child&&action.props){
        $.extend(true,_child.props,action.props);
      }
      return cloneState;
    case Types.CHILD_CHANGE: //必须指定childID
      if (!_childID) return state;

      if (action.key == 'alias') {
        _child.alias = action.value
      } else {
        let propsNeedUpdate = _child.props; //取出指定ID组件的属性的引用！引用！
        propsNeedUpdate[action.key] = action.value; //直接修改引用的信息，自动同步到Store中
      }
      cloneState.currentChild = _child; //当前选中组件
      handleSessionStorage.write(cloneState);
      return cloneState;
    case Types.CHILD_REMOVE:
      let num = 0;
      let brothers = Array.isArray(father) ? father : father.props.childs;
      const father_id = Array.isArray(father) ? "" : father.props.dblid;
      //查看父元素是否forbidden
      const new_childs = brothers.filter(function(item, index, arr) {
        if (item != _child) {
          if (!father.forbidden) {
            item.props.dblid = father_id + "." + num; //重构dblid
            num++;
          }
        } else {
          if (!father.forbidden) return;
          item.props.childs = [];
        }
        return item;
      });
      if (!Array.isArray(father)) {
        father.props.childs = new_childs;
      } else {
        cloneState.childs = new_childs;
      }
      handleSessionStorage.write(cloneState);
      return cloneState;

    case 'CONFIG_MODAL':
      cloneState.currentChild = _child;
      // cloneState.dlgShow = action.show;
      // cloneState.cfgDialogProps = action.show ? _child.props : {};
      // let _cfgDialogProps = cloneState.cfgDialogProps;

      // cloneState.dlgContent = <EditArea cfgDialogProps={action.show?_child.props:{}} />;
      // if (cloneState.cfgDialogProps.hasOwnProperty('style')) { //有独立样式
      //   console.dir('special style!');
      // }
      return cloneState;
    case 'CONTENT_MENU':
      cloneState.contentMenuShow = (!!action.left) && {
        left: action.left,
        top: action.top
      };
      cloneState.contentMenuProps = _childID;
      return cloneState;
    case 'FOCUS_HIGH_LIGHT':
      console.dir(_child.props);
      if (_child.props) {
        if (_child.props._style) {
          _child.props._style.outline = (action.direction == "enter") ? '3px solid green' : null;
        } else {
          _child.props.isfocus = (action.direction == "enter");
        }
      }
      return cloneState;
    case Types.LOAD:   
      return $.extend(true,cloneState,handleSessionStorage.read());
    case Types.RESET_STORE:
      return _childs;
    case Types.BEFORE_UNLOAD:
      handleSessionStorage.write(cloneState);
      return cloneState;
    case 'EXPORT':
      cloneState.dlgShow = true;
      const _item = JSON.stringify(state);
      cloneState.dlgContent = <textarea defaultValue={_item}></textarea>;
      return cloneState;
    case 'IMPORT':
      cloneState.dlgShow = true;
      cloneState.dlgContent = <textarea onChange={this.handleImport.bind(this)}></textarea>;
      return cloneState;
    default:
      return state;
  }
}

//编辑对话框
function playGroundModal(state = [], action) {

  switch (action.type) {
    // case 'DOUBLE_CLICK':
    //  return state;
    // case 'CONTENT_MENU':
    //  return;
    default: return state;
  }
}

export default combineReducers({
  childsStructor,
  playGroundModal
})

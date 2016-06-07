import Action from './Action'
import H1 from '../components/H1'
import H2 from '../components/H2'


export default Reflux.createStore({
    listenables: [Action],
        //公用方法
    updateStatus(dblState){
        //这里执行本地或远程数据更新
        if(!dblState) dblState = this.dblState;
        this.trigger(dblState);
    },

    //在Action定义的动作
    onConfigDialogShow(childId){
        this.dblState.cfgDialogShow=true;
        this.dblState.cfgDialogProps = this.findParent(childId).father.props;
        if(this.dblState.cfgDialogProps.hasOwnProperty('style')){
            console.dir('123');
        }
        this.updateStatus();
    },
    onConfigDialogHide(item){
        this.dblState.cfgDialogShow=false;
        this.dblState.cfgDialogProps={};
        this.updateStatus();
    },
    onContentMenuShow(childId,position){
        this.dblState.contentMenuShow=position&&{
            left:position.left,
            top:position.top
        };
        this.dblState.contentMenuProps =childId;
        this.updateStatus();
    },
    onContentMenuHide(childIdd){
        this.dblState.contentMenuShow=false;
        this.dblState.contentMenuProps ="";
        this.updateStatus();
    },
    onChildEdit(childId,key,value){
        console.dir('new value:'+key+":"+value);
        this.propsNeedUpdate = this.findParent(childId).father.props; //取出指定ID组件的属性的引用！引用！
        this.propsNeedUpdate[key] = value;  //直接修改引用的信息，自动同步到Store中
        this.updateStatus();
    },
    onAddChild(childName,parentId){
        //根据parentId放到指定父级下面，并自动分配dblid。    
        if(!parentId){
            var childs =this.dblState.childs;
        }else{
            var father = this.findParent(parentId).father;
            var childs = father.props.childs=father.props.childs||[];
        }
        var father_dblid = father?father.props.dblid:"";
        console.dir('ele'+this.componentsCollection[childName]);
        let _currentComponet = this.componentsCollection[childName];
        const {defaultProps:_currentComponetPrpops} = _currentComponet;
        
        if(!_currentComponetPrpops.childs||_currentComponetPrpops.childs.length<1){
            childs.push({
                childName: this.componentsCollection[childName],
                props: {
                  dblid:father_dblid+"."+childs.length,
                  name: 123,
                  color:'red'
                }
            });
        }else{
            const childNumber = _currentComponetPrpops.childs.length;
            let _childs=[];
            for(let i=0;i<childNumber;i++){ //处理待装载模块的child属性
                _childs.push({
                  childName: "",
                  props: {
                    dblid:father_dblid+"."+childs.length+"."+i,
                    childs:[]  //是否可以不要？
                  }
                });
            }
            childs.push({ //增加到指定ID的对象内部（后面）
                childName: this.componentsCollection[childName],
                props: Object.assign({},_currentComponetPrpops,{
                  dblid:father_dblid+"."+childs.length,
                  childs:_childs
                })
            });
        }
        this.updateStatus();
    },
    onAddAction(childId){
        this.dblState.cfgDialogShow=true;
        this.dblState.actionType=true;
        this.dblState.cfgDialogProps={
            '源组件ID':childId,
            '事件类型':'onClick',
            "targetID":".1",
            "目标组件-属性名":"name",
            "目标组件-值":""
        };
        this.updateStatus();
    },
    onDeleteChild(parentId){
        var father = this.findParent(parentId).father;
        var parents = this.findParent(parentId).parents;
        var currentGroup = (parents.length>1)?parents[parents.length-2].props.childs:this.dblState.childs;
        var father_dblid = (parents.length>1)?parents[parents.length-2].props.dblid:"";
        var num = 0;
        var new_childs = currentGroup.filter(function(item,index,arr){
            if(item!=father){
                item.props.dblid=father_dblid+"."+num; //重构dblid
                num++;
                return item;
            }
            return;
        });
        if(parents.length>1){
            parents[parents.length-2].props.childs = new_childs;
        }else{
            this.dblState.childs = new_childs;
        }
        
        this.updateStatus();
    },
    findParent(id){
        var self = this;
        if(!id){
            return {
                parents:null, //father以上的祖先
                father:self.dblState
            };
        }
        var level = id.split('.').slice(1); 
        var parents = []; 
        var father = level.reduce(function(prev,next){  //每次都从最顶级开始        
            var item = Array.isArray(prev)?prev[next]:prev.props.childs[next];
            parents.push(item);
            return item;      
        },self.dblState.childs);
        return {
            parents:parents, //含father的祖先
            father:Array.isArray(father)?father[0]:father
        }
    },
    dblState:{
        cfgDialogShow:false,
        cfgDialogProps:{
            dblid:"",
            name:""
        },
        contentMenuShow:{},
        contentMenuProps:"",
        childs:[]
    },
    componentsCollection:{
        "H1":H1,
        "H2":H2
    }
});
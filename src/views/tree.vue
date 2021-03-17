<template>
  <div>
<!-- <el-tree 
    ref="tree" 
    :data="data" 
    :show-checkbox="true"
    node-key="id" 
    default-expand-all
    highlight-current 
    :expand-on-click-node="false" 
    :check-strictly="true" 
    @check-change = "checkChange"
    >
    </el-tree> -->
  <el-tree 
    ref="tree" 
    :data="data" 
    :show-checkbox="true"
    node-key="id" 
    default-expand-all
    :expand-on-click-node="false" 
    :check-strictly="true" 
    @check="clickDeal">
    </el-tree>
  </div>
</template>

<script>
  import {list} from '@/data'
  export default {
    data () {
      return {
        data: list,
        multiProps: {
          children: 'children',
          label: 'label'
        },
        checkedId: ['7990485231314748071','7677640549203330475', '4162326190911697981']
      }
    },
    mounted () {
     // 给多选树设置默认值
      this.$refs.tree.setCheckedKeys(this.checkedId)
    },
    methods: {
      clickDeal (currentObj, treeStatus) {
        console.log(currentObj, 13132, treeStatus)
        // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
        let selected = treeStatus.checkedKeys.indexOf(currentObj.id) // -1未选中
        console.log(selected, 13212)
        // 选中
        if (selected !== -1) {
          // 子节点只要被选中父节点就被选中
          this.selectedParent(currentObj)
          // 统一处理子节点为相同的勾选状态
          // this.uniteChildSame(currentObj, true)
        } else {
          // 未选中 处理子节点全部未选中
          if(currentObj.children && currentObj.children.length > 0) {
             this.uniteChildSame(currentObj, false)
          }else{
            this.uniteChildSame(currentObj, false)
          }
        }
      },
      // 统一处理子节点为相同的勾选状态
      uniteChildSame (treeList, isSelected) {
        this.$refs.tree.setChecked(treeList.id, isSelected)
        if(treeList.children && treeList.children.length > 0) {
          for (let i = 0; i < treeList.children.length; i++) {
            this.uniteChildSame(treeList.children[i], isSelected)
          }
        }
      },
      // 统一处理父节点为选中
      selectedParent (currentObj) {
        let currentNode = this.$refs.tree.getNode(currentObj)
        if (currentNode.parent.key !== undefined) {
          this.$refs.tree.setChecked(currentNode.parent, true)
          this.selectedParent(currentNode.parent)
        }
      },
      checkChange(a,b,c){
      //如果为取消
        if(b === false){
               //如果当前节点有子集
           if(a.children){
           //循环子集将他们的选中取消
             a.children.map(item => {
               this.$refs.tree.setChecked(item.id,false);
             })
           }
         }else{
         //否则(为选中状态)
             //判断父节点id是否为空
             if(a.id !== 0){
             //如果不为空则将其选中
               this.$refs.tree.setChecked(a.id,true);
             }
         }
         },
      }
  };
</script>
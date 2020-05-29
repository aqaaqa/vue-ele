<template>
  <div class="dashboard-container">
    <div class="left-box">
      <h4 class="bg-title">选择</h4>
      <item v-for="(info,index) in list" :key="index" :item="info" :id="index" />
    </div>
    <div>
      <h4 class="bg-title">已选</h4>
      <div class="check-li" v-for="(item,index) in newLists" :key="index" >
        <p @click="allQxCheck(item,index)">{{item.name}}</p>
        <p style="margin-left:30px;" v-for="(child,i) in item.children" :key="i+'x'" @click="qxCheck(child.index,index)">{{child.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Item from './Item'
import {navlist} from '@/api/list'
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  components: { Item },
  data() {
    return {
      list: [],
      newLists:[]
    }
  },
  computed: {
    ...mapGetters([
      'oldList',
      'newList',
      
    ]),
  },
   watch:{
    oldList: function(val){
      this.list = [...[],...val]
    },
    newList: function(val){
      this.newLists = [...[],...val]
    }
  },
  created() {
    this.list = this.oldList
    console.log(this.oldList)
  },
  methods: {
    qxCheck(e,index) {
      e=String(e)
      let a = []
      if(e.indexOf('-') > -1) {
        a = e.split("-")
      } else {
        a = [e]
      }
      let arr =JSON.parse(JSON.stringify(this.oldList))
      let newArr = JSON.parse(JSON.stringify(this.newList))
      let checkinfo = null
      let x = ''
      for(let i =0;i<a.length;i++){
        let k = a[i]
        if(i == 0 && a.length-1 == 0) {
          checkinfo = arr[k]
        }else if(i == 0) {
          checkinfo = arr[k]
        } else {
          if(i == a.length-1) {
            x = checkinfo.name
          }
          checkinfo = checkinfo.children[k]
        }
      }

      this.$set(checkinfo,'check','')
      newArr[index].children = newArr[index].children.filter(k => k.index !=e)
      if(newArr[index].children.length ==0) {
        newArr.splice(index,1)
      }
      this.$store.dispatch('page/setOld', [...arr])
      this.$store.dispatch('page/setNew', [...newArr])
    },
    allQxCheck(item,index) {
      for(let i = 0;i<item.children.length;i++) {
        let child = item.children[i]
        this.qxCheck(child.index,index)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    > div {
      flex-basis:300px;
    }
    .left-box {
      margin-right: 30px;
    }
    .bg-title {
      font-size:16px;
      padding:10px 20px;
      color:#fff;
      background: rgb(110, 162, 230);
      margin-bottom: 20px;
    }
  }
}

.check-li {
  line-height: 28px;
  font-size: 14px;
  cursor: pointer;
}


</style>

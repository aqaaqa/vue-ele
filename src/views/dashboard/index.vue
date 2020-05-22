<template>
  <div class="dashboard-container">
    <div class="left-box">
      <h4 class="bg-title">选择</h4>
      <item v-for="(info,index) in list" :key="index" :item="info" :id="index" />
    </div>
    <div>
      <h4 class="bg-title">已选</h4>
      <p class="check-li" v-for="(item,index) in newLists" :key="index" @click="qxCheck(item.index)">
        {{item.name}}
      </p>
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
  },
  methods: {
    qxCheck(e) {
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
          console.log(checkinfo,1)
        }else if(i == 0) {
          checkinfo = arr[k]
          console.log(checkinfo,2)
        } else {
          if(i == a.length-1) {
            x = checkinfo.name
          }
          checkinfo = checkinfo.children[k]
        }
      }

      this.$set(checkinfo,'check','')
      console.log(e)
      newArr = newArr.filter(k => k.index !=e)
      this.$store.dispatch('page/setOld', [...arr])
      this.$store.dispatch('page/setNew', [...newArr])
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

<template>
  <div>
    <template v-if="!item.children">
      <el-radio v-model="item.check" @click.native.prevent="clickitem(id)" label="1">{{item.name}}</el-radio>
    </template>
    <div v-else>
      <p class="title" @click="clickitem(id)" :class="{ckeckColor:item.check == 1}">{{item.name}}</p>
      <div class="user-li">
        <item
          v-for="(child,i) in item.children"
          :key="i+'a'"
          :item="child"
          :id="id+'-'+i"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Item',
  props: ['item','id'],
  data() {
    return {
      arrList: []
    }
  },
  computed: {
    ...mapGetters([
      'oldList',
      'newList'
    ]),
  },
  created() {
    this.arrList = this.oldList
  },
  methods: {
    clickitem (e) {
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

      if(checkinfo.check) {
        this.$set(checkinfo,'check','')
        console.log(e)
        newArr = newArr.filter(k => k.index !=e)
      } else {
        this.$set(checkinfo,'check','1')
        let val = ''
        if(e.length <= 1) {
          val = checkinfo.name
        }else {
          val = checkinfo.name+'-'+x
        }
        newArr.push({
          index:e,
          name:val
        })
      }
      console.log(newArr)
      this.$store.dispatch('page/setOld', [...arr])
      this.$store.dispatch('page/setNew', [...newArr])
      // this.$store.dispatch('page/')
    },
  }
}
</script>

<style lang="scss" scoped>
.title {
  display: inline-block;

  cursor: pointer;
  font-size: 14px;
}
.ckeckColor {
  color: #409EFF;
}
.user-li {
  padding-left:10px;
  line-height:30px;
}
</style>
<template>
  <!-- 文章目录组件 -->
  <div class="catalog">
    <el-popover
      placement="left"
      title="HELP"
      width="200"
      trigger="hover"
      content="点击此按钮可以对目录的显隐进行控制。">
      <el-button
        slot="reference"
        icon="el-icon-warning-outline"
        @click="unshowCatalog"
        circle>
      </el-button>
    </el-popover>
    <ul class="catalog-list">
      <li v-for="(h1v,h1k) in catalog_tree" :key="h1k">
        <a href="" @click.prevent="custormAnchor(h1k.split('~~')[1])">{{ h1k.split('~~')[1] }}</a>
        <ul>
          <li v-for="(h2v,h2k) in h1v" :key="h2k">
            <a href="" @click.prevent="custormAnchor(h2k.split('~~')[1])">{{ h2k.split('~~')[1] }}</a>
            <ul>
              <li v-for="(h3v,h3k) in h2v" :key="h3k">
                <a href="" @click.prevent="custormAnchor(h3k.split('~~')[1])">{{ h3k.split('~~')[1] }}</a>
                <ul>
                  <li v-for="(h4v,h4k) in h3v" :key="h4k">
                    <a href="" @click.prevent="custormAnchor(h4k.split('~~')[1])">{{ h4k.split('~~')[1] }}</a>
                    <ul>
                      <li v-for="(h5v,h5k) in h4v" :key="h5k">
                        <a href="" @click.prevent="custormAnchor(h5k.split('~~')[1])">{{ h5k.split('~~')[1] }}</a>
                        <ul>
                          <li v-for="(h6v,h6k) in h5v" :key="h6k">
                            <a href="" @click.prevent="custormAnchor(h6k.split('~~')[1])">{{ h6k.split('~~')[1] }}</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </li>

    </ul>
  </div>
</template>

<script>
import { Button, Popover } from 'element-ui';
export default {
  props: ['parent'],
  components: {
    "el-button": Button,
    "el-popover": Popover,
  },
  data(){
    return {
      // content: Object,
      h_list: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      catalog_tree: {},
      h_ele_list: [],

      catalog_visibility: false,
    }
  },
  methods: {
    custormAnchor(id){
      // 锚点的函数实现
      let el = document.getElementById(id);
      el.scrollIntoView();
    },
    h_elementList(parent){
      // 获取文章所有 h1,h2...类型的标签
        let children = parent.children;
        for(let el of children){
            // 如果标签名为标题类型
            if(this.h_list.indexOf(el.localName) !== -1 ){
                this.h_ele_list.push(el)
            }
        }
        return this.h_ele_list
    },
    cmp(left, right){
      // 传入参数：left : h 标签名
      //          right: h 标签名
        // 级层关系更小
        if(this.h_list.indexOf(left) > this.h_list.indexOf(right))
            return -1
        // 级层关系相等
        else if(this.h_list.indexOf(left) === this.h_list.indexOf(right))
            return 0
        // 级层关系更大
        else if(this.h_list.indexOf(left) < this.h_list.indexOf(right))
            return 1
    },
    formatKey(h_ele){
        let h_ele_markup_name = h_ele.localName
        return `${h_ele_markup_name[1]}~~${h_ele.getAttribute('id')}`;
    },
    toSameRow(index, h_ele_markup_name){
        let flag = -1;
        for(let i=index-1;i>=0;i--){
            if(-1 === this.cmp(h_ele_markup_name, this.h_ele_list[i].localName)){
                flag = i;
                break;
            }
        }
        return flag;
    },
    getSetOfH_ele(h_ele_list){
      let h_obj = {};
      for(let el of h_ele_list){
        if(!h_obj[el.localName]){
          h_obj[el.localName] = true;
        }
      }
      return Object.keys(h_obj);
    },
    getMaxRowIndex(index){
      for(let i=index+1;i<this.h_ele_list.length;i++){
        if(this.cmp(this.h_ele_list[index].localName,this.h_ele_list[i].localName) <= 0){
          return i
        }
      }
      return -1;
    },
    initMakeCatalog(){
      // let parent = document.getElementsByClassName(el)[0];
      let parent = this.parent;
      this.h_ele_list = this.h_elementList(parent);
      let row_list = []; // 储存着每层的字典
      let row = 1;       // 初始化极层数

      let first = 0;     // 初始化第一极层首位索引
      let tmp = this.getMaxRowIndex(first)
      let last = tmp === -1 ? this.h_ele_list.length : tmp; // 初始化第一级层最大位索引
      let sum = 0;  // 初始化已选用元素总数
      while(sum < this.h_ele_list.length){
        sum += last - first;
        row_list.push([]);  // 创建一个新层级
        let pres_row_list = row_list[row-1]; // 当前层级字典列表
        let first_formatKey = this.formatKey(this.h_ele_list[first]) // 第一级元素的 formatKey
        this.catalog_tree[first_formatKey] = {}
        pres_row_list.push(this.catalog_tree) // 推入此层级第一级元素
        let pres_dict = pres_row_list[0][first_formatKey]; // 初始化当前的字典，每次迭代必须进行更新
        let chosen_list = this.h_ele_list.slice(first, last);
        let set = this.getSetOfH_ele(chosen_list);  // 获取选中数组的集合，以判断其层级关系
        for(let i=first+1;i<last;i++){
          let pres_h_ele = this.h_ele_list[i];     // 当前的 h 元素
          let pres_h_row = set.indexOf(pres_h_ele.localName); // 读取层级
          let formatKey = this.formatKey(pres_h_ele);
          try{
            pres_row_list[pres_h_row][formatKey] = {};
          }catch(e){
            pres_dict[formatKey] = {}; // 报错即代表在此极层中尚无这级，需要创建
            pres_row_list.push(pres_dict);
          }
          pres_dict = pres_row_list[pres_h_row][formatKey];
        }
        row++;
        first = last;
        tmp = this.getMaxRowIndex(first)
        last = tmp === -1 ? this.h_ele_list.length : tmp;
      }
      this.$forceUpdate()
    },
    unshowCatalog(){
      let catalog = document.getElementsByClassName('catalog-list')[0];
      catalog.style.visibility = this.catalog_visibility ? "visible" : "hidden";
      this.catalog_visibility = !this.catalog_visibility;
    },
  },
  mounted(){
    setTimeout(() => {
      this.initMakeCatalog();
    }, 2000);
  }
}
</script>

<style>
 .catalog {
  position: fixed;
  right: 40px;
  top: 10%;
  max-width: 250px;
  max-height: 80%;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
}
 .catalog a {
  color: #252724;
}
 .catalog a:hover {
  color: #97dffd;
}
 .catalog > ul > li > ul > li {
  margin-left: 10px;
}
 .catalog > ul > li > ul > li > ul > li {
  margin-left: 10px;
}
 .catalog > ul > li > ul > li > ul > li > ul > li {
  margin-left: 10px;
}
  @media screen and (max-width: 800px){
    #article-life .catalog {
      display: none;
    }
  }
</style>

<template>
  <div>
    <el-row :gutter="20" v-permission="['getStatistics1,GET']">
      <template v-if="panels.length==0">
        <el-col :span="6" v-for="i of 4 " :key="i">
          <el-skeleton style="width: 100%" animated loading>
            <template #template>
              <el-card shadow="hover" class="border-0 ">
                <template #header>
                  <div class="flex justify-between">
                    <el-skeleton-item variant="text" style="width: 50%"/>
                    <el-skeleton-item variant="text" style="width: 10%"/>
                  </div>
                </template>
                <el-skeleton-item variant="h3" style="width: 80%"/>
                <el-divider/>
                <div class="flex justify-between text-sm text-gray-500">
                  <el-skeleton-item variant="text" style="width: 50%"/>
                  <el-skeleton-item variant="text" style="width: 10%"/>
                </div>
              </el-card>
            </template>
          </el-skeleton>

        </el-col>
      </template>


      <el-col :span="6" :offset="0" v-for="(item,index) of panels" :key="index">
        <el-card shadow="hover" class="border-0">
          <template #header>
            <div class="flex justify-between">
              <span>{{ item.title }}</span>
              <el-tag
                  :type="item.unitColor"
                  effect="plain"

              >
                {{ item.unit }}
              </el-tag>
            </div>
          </template>
          <span class="text-3xl font-bold text-gray-500">
                <CountTo :value=" item.value "/>
          </span>
          <el-divider/>
          <div class="flex justify-between text-sm text-gray-500">
             <span>
                {{ item.subTitle }}
             </span>
            <span>
                {{ item.subValue }}
            </span>
          </div>

        </el-card>
      </el-col>
    </el-row>
    <IndexNavs/>
    <el-row :gutter="20" class="mt-5">
      <el-col :span="12" :offset="0">
        <IndexCharts v-permission="['getStatistics3,GET']"/>
      </el-col>
      <el-col :span="12" :offset="0" v-permission="['getStatistics2,GET']">
        <IndexCard  class="mb-3" title="?????????????????????" tip="?????????????????????" :btns="goods"/>
        <IndexCard title="????????????" tip="?????????????????????????????????" :btns="order"/>
      </el-col>

    </el-row>
  </div>
</template>

<script setup>
import CountTo from '@/components/CountTo.vue'
import IndexNavs from "@/components/IndexNavs.vue";
import IndexCharts from "@/components/IndexCharts.vue";
import IndexCard from "@/components/IndexCard.vue";
import {ref} from 'vue'
import {getStatistics1,getStatistics2} from '@/api/index'


const panels = ref([])

getStatistics1().then(res => {
  panels.value = res.panels
  // console.log(panels.value)
  // console.log(res)
})

getStatistics2().then(res => {
  // console.log(res)
})

const goods=ref([])
const order=ref([])

getStatistics2().then(res=>{
  goods.value=res.goods
  order.value=res.order
})
</script>

<style scoped>

</style>
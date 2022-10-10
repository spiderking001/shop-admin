<template>
  {{ d.num.toFixed(0) }}
</template>

<script setup>
import {reactive,watch} from 'vue'
import gsap from 'gsap'

const props=defineProps({
  value:{
    type: Number,
    default: 0
  }
})

const d = reactive({
  num: 0
})

function animate() {
  gsap.to(d, {
    num: props.value,
    duration: 0.5
  })
}

animate()
watch(() => props.value,()=>animate())
</script>

<style scoped>

</style>
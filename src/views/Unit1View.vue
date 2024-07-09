<template>
  
  <div class="background">
    <!---
    + and - button changes the font size, width, and height of the overall format.
    <div class="sizeButtons">
      <button @click="changeToWide()">+</button>
      <button @click="changeToNarrow()">-</button>
    </div>
    -->
    <Element2Wide/>
  </div>
</template>

<script>
// @ is an alias to /src
import Element2Wide from '@/components/Unit 1/Element2Wide.vue'

export default { 
  name: 'Unit1View',
  components: {
    Element2Wide,
  },
}
</script>

<style scoped>

/***
.sizeButtons{
  margin-right:0px;
  margin-left:auto;
  width:60px;
} ***/

.background{
  display: flex;
  align-items: center;
  justify-content: center;
  height:95vh;
}

</style>

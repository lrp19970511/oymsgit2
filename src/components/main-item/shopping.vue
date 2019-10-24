<template>
  <div id="shopping">
      <ShoppingTop></ShoppingTop>
      <ShoppingContent></ShoppingContent>
  </div>
</template>
<script>
import ShoppingTop from "./shopping-item/shopping-top"
import ShoppingContent from "./shopping-item/shopping-content"
export default {
  name: "Shopping",
  components:{
    ShoppingTop,
    ShoppingContent
  }
};
</script>
<style>


</style>
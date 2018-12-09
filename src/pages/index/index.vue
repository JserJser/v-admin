<template>
  <div class="home">
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button v-hasPermission="'addText'" type="text">Text</Button>
    <br><br>
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
  </div>
</template>
<script src='./index.js'>
export default {
  name: 'Index',
  components: {},
  filters: {},
  data() {
    return {}
  },
  created() {},
  methods: {},
}
</script>
<style lang='less' src='./index.less' scoped />

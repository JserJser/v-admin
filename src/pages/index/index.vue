<template>
  <div class="home">
    <h1>{{$t('message.hello')}}</h1>
    <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
    <Page :total="100" show-elevator/>
    <Button>Default</Button>
    <Button type="primary">Primary</Button>
    <Button type="dashed">Dashed</Button>
    <Button v-hasPermission="'addText'" type="text">Text</Button>
    <br>
    <br>
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
  </div>
</template>
<script src='./index.js' />
<style lang='less' src='./index.less' scoped />

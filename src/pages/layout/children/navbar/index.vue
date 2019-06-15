<template>
  <div class="navbar-wrapper">
    <div class="left-con">
      <Avatar
        @click.native="backToIndex"
        class="logo"
        shape="square"
        size="large"
        src="http://www.jituwang.com/uploads/allimg/151209/258057-15120Z01J669.jpg"
      />
      <Breadcrumb class="bread-crumb"/>
    </div>
    <div class="center-con">
      <Select :value="initLang" @on-change="onLangSelectChange" style="width:100px">
        <Option v-for="item in langList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
    </div>
    <div class="right-con">
      <i @click="toggleFullScreen" class="iconfont icon-full-screen pointer"></i>
      <Dropdown placement="bottom-end" @on-click="logout">
        <div class="avatar-wrapper pointer">
          <Avatar
            shape="square"
            size="large"
            src="https://avatars3.githubusercontent.com/u/15773714?s=460&v=4"
          />
          <Icon type="ios-arrow-down"></Icon>
        </div>
        <DropdownMenu slot="list" on-click="logout">
          <DropdownItem>注销</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>
<script src='./index.js'></script>
<style lang='less' src='./index.less' scoped />

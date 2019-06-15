<template>
  <div class="login">
    <Form ref="loginForm" :model="loginForm" :rules="loginFormRule" :label-width="60">
      <FormItem label="用户名" prop="user">
        <Input focus size="large" v-model="loginForm.user" placeholder="请输入用户名"/>
      </FormItem>
      <FormItem label="密码" prop="password">
        <Input size="large" type="password" v-model="loginForm.password" placeholder="请输入密码"/>
      </FormItem>
      <FormItem>
        <Button size="large" type="primary" @click="handleSubmit('loginForm')">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script src='./index.js'></script>
<style lang='less' src='./index.less' scoped />

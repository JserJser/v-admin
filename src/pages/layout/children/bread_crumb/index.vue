<template>
  <Breadcrumb>
    <BreadcrumbItem v-for="(item,index)  in levelList" :key="index">{{item.name}}</BreadcrumbItem>
  </Breadcrumb>
</template>
<script src='./index.js'></script>

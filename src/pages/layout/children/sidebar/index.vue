<template>
  <Menu
    class="sidebar-wrapper"
    theme="dark"
    :active-name="activeName"
    :open-names="openNames"
    accordion
  >
    <template v-for="item in permissionRoutes">
      <Submenu v-if="item.children.length !==1" :name="item.path" :key="item.path">
        <template slot="title">
          <Icon :type="item.icon"/>
          {{item.name}}
        </template>
        <template v-for="child in item.children">
          <MenuItem
            v-if="!child.hidden"
            :to="`${item.path}/${child.path}`"
            :name="`${item.path}/${child.path}`"
            :key="child.path"
          >{{child.name}}</MenuItem>
        </template>
      </Submenu>
      <MenuItem
        v-if="item.children.length ===1 && !item.children[0].hidden"
        :to="`${item.path}/${item.children[0].path}`"
        :name="`${item.path}/${item.children[0].path}`"
        :key="item.name"
      >
        <Icon :key="item.icon" :type="item.icon"/>
        {{item.name}}
      </MenuItem>
    </template>
  </Menu>
</template>
<script src='./index.js'></script>

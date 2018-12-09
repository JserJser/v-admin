export default Vue => {
  // btn permission control
  Vue.directive('hasPermission', {
    bind(el, { value }, vnode) {
      console.log(value, vnode.context.$store.state.roles)
      if (vnode) {
        el.parentNode.removeChild(el)
      }
    },
  })
}

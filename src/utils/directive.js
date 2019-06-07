export default Vue => {
  // btn permission control
  Vue.directive('hasPermission', {
    inserted(el, { value }, vnode) {
      console.log(value, vnode.context.$store.state.roles)
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    },
  })
}

export default Vue => {
  // btn permission control
  Vue.directive('hasPermission', {
    bind(el) {
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
    },
  })
}

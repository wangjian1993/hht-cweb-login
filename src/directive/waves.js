import './waves.css'

const vueWaves = {}
vueWaves.install = (Vue, options = {}) => {
  Vue.directive('waves', {
    bind(el, binding) {
      el.addEventListener('click', e => {
        const customOpts = Object.assign(options, binding.value)
        const opts = Object.assign({
          ele: el, // 波纹作用元素
          type: 'hit', // hit点击位置扩散center中心点扩展
          color: 'rgba(0,0,0,0.15)'
        }, customOpts)
        const target = opts.ele
        if (target) {
          target.style.position = 'relative'
          target.style.overflow = 'hidden'
          const rect = target.getBoundingClientRect()
          let ripple = target.querySelector('.waves-ripple')
          if (!ripple) {
            ripple = document.createElement('span')
            ripple.className = 'waves-ripple'
            ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
            target.appendChild(ripple)
          } else {
            ripple.className = 'waves-ripple'
          }
          switch (opts.type) {
            case 'center' :
              ripple.style.top = (rect.height / 2 - ripple.offsetheight / 2) + 'px'
              ripple.style.left = (rect.width / 2 - ripple.offsetWidth / 2) + 'px'
              break
            default:
              ripple.style.backgroundColor = opts.color
              ripple.style.backgroundColor = opts.color
          }
          ripple.style.backgroundColor = opts.color
          ripple.className = 'waves-ripple z-active'
          return false
        }
      }, false)
    }
  })
}

export default vueWaves

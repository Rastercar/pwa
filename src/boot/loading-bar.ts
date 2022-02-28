import { LoadingBar } from 'quasar'
import { boot } from 'quasar/wrappers'

export default boot(() => {
  LoadingBar.setDefaults({
    color: 'blue',
    size: '6px',
    hijackFilter: (v: unknown) => {
      console.log(v)
      return true
    },
  })
})

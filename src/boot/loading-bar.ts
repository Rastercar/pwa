import { LoadingBar } from 'quasar'
import { boot } from 'quasar/wrappers'

export default boot(() => {
  LoadingBar.setDefaults({ color: 'orange', size: '6px' })
})

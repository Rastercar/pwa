import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

export default boot(() => {
  Notify.setDefaults({
    timeout: 1800,
    progress: true,
    textColor: 'white',
    position: 'top-right',
  })
})

import { createPinia } from 'pinia'
import { createPersistPlugin } from './persist'
import { createInterceptorPlugin } from './interceptor'

const pinia = createPinia()
pinia.use(createPersistPlugin())
pinia.use(createInterceptorPlugin())

export default pinia

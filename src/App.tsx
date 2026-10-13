import { lazy, Suspense } from 'react'

const V1Page = lazy(() => import('./pages/v1/Page'))
const V2Page = lazy(() => import('./pages/v2/Page'))

const path = window.location.pathname.replace(/\/+$/, '')

if (path !== '/v1' && path !== '/v2') {
  window.history.replaceState(null, '', `/v1${window.location.search}${window.location.hash}`)
}

function App() {
  return <Suspense fallback={null}>{path === '/v2' ? <V2Page /> : <V1Page />}</Suspense>
}

export default App

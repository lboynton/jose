import type { FetchFunction } from './interfaces.d.ts'
import { JOSEError, JWKSTimeout } from '../util/errors.ts'

type AcceptedRequestOptions = Pick<RequestInit, 'headers'>

const fetchJwks: FetchFunction = async (
  url: URL,
  timeout: number,
  options: AcceptedRequestOptions,
) => {
  let controller!: AbortController
  let id!: ReturnType<typeof setTimeout>
  let timedOut = false
  if (typeof AbortController === 'function') {
    controller = new AbortController()
    id = setTimeout(() => {
      timedOut = true
      controller.abort()
    }, timeout)
  }

  const response = await fetch(url.href, {
    signal: controller ? controller.signal : undefined,
    redirect: 'manual',
    headers: options.headers,
    // @ts-ignore
    cf: {
        cacheTtl: 6000,
        cacheEverything: true,
    }
  }).catch((err) => {
    if (timedOut) throw new JWKSTimeout()
    throw err
  })

  console.log('CF Cache Status: ', response.headers.get('cf-cache-status'))

  if (id !== undefined) clearTimeout(id)

  if (response.status !== 200) {
    throw new JOSEError('Expected 200 OK from the JSON Web Key Set HTTP response')
  }

  try {
    return await response.json()
  } catch {
    throw new JOSEError('Failed to parse the JSON Web Key Set HTTP response as JSON')
  }
}
export default fetchJwks

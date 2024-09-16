import { parseURL } from 'ufo'

export default eventHandler(async (event) => {
  // Skip during prerendering
  // if (import.meta.prerender) return

  // const { pathname } = parseURL(event.path)
  // const redirects: Record<string, string> | null = await hubKV().get('redirects')

  // if (redirects?.[pathname]) {
  //   return sendRedirect(event, redirects[pathname])
  // }

  // return

})

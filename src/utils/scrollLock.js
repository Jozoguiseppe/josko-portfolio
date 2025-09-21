let saved = { overflow:'', paddingRight:'' }
export const lockScroll = () => {
  const body = document.body
  saved.overflow = body.style.overflow
  saved.paddingRight = body.style.paddingRight
  const sb = window.innerWidth - document.documentElement.clientWidth
  body.style.overflow = 'hidden'
  if (sb > 0) body.style.paddingRight = `${sb}px`
}
export const unlockScroll = () => {
  const body = document.body
  body.style.overflow = saved.overflow || ''
  body.style.paddingRight = saved.paddingRight || ''
}

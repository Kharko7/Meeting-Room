export  const checkPath = (from: string) => {
  if (from === '/calendar') {
    return 'to calendar'
  }
  if (from === '/rooms') {
    return 'to rooms'
  }
  return ''
}
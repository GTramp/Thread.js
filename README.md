# Thread
javascript web worker

```bash
// demo ========
thread.async (() => {
  let j = 0
  for (let i = 0; i < 10; i++) {
    console.log(`async :: ${i}`)
    j++
  }
  return j
}, resp => {
  console.log(resp)
}, error => {
  console.error(error)
})
```

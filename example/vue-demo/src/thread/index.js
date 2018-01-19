/**
 * @Author: command
 * @Date:   2018-01-19T14:13:12+08:00
 * @Last modified by:   command
 * @Last modified time: 2018-01-19T15:09:18+08:00
 */

export default {
  /**
   * 异步执行
   * @param  {function} closeure   代码块
   * @param  {function} successHanlder 完成回调
   * @param  {function} errorHandler 错误回调
   */
  async (closeure, successHanlder, errorHandler) {
    if (window.Worker) {
      const worker_id = new Date().getTime()
      // blob string
      const script = `
        const _closeure = ${closeure.toString()}
        onmessage = function(resp){
        console.warn(":: web worker start (id: ${worker_id})")
        let _resoult = _closeure()
        postMessage(_resoult)
          }`
      // 创建 blob
      const blob = new Blob([script], {type: 'text/javascript'})
      // 创建Url
      const url = URL.createObjectURL(blob)
      // 创建 web worker
      let worker = new Worker(url)
      // revokeObjectURL
      URL.revokeObjectURL(url)
      // 监听 onmessage
      worker.onmessage = function(resp) {
        // 成功回调
        successHanlder(resp.data)
        console.warn(":: web worker end (id: %o)", worker_id)
        // 停止 web worker
        worker.terminate()
        worker = null
      }
      // 监听 onerror
      worker.onerror = function(error) {
        // 回调error
        errorHandler(error)
        console.error('web worker error')
      }
      // 开始执行
      worker.postMessage('start')
    } else {
      console.error("your browser don't support web worker ...")
    }
  }
}

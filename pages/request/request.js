export const request=(params)=>{
    return new Promise((resolve,reject)=>{
        wx.request({
        ...params,
        success:(result)=>{
            resolve(result);
            },
        fail:(err)=>{
             reject(err);
        }        
        })


    })
}



wx.request({
    url:'https://openapi.baidu.com/oauth/2.0/authorize?client_id=7nNFbTKFoij695P1viCV3ELIG5EcUMkx&errmsg=Auth+Login+Sucess&errno=0&redirect_uri=oob&response_type=code&scope=netdisk&ssnerror=0&stoken=5mM1SVtMJVhtlaC%2BYL1RJw9pcyQNjGUfe8Aox2bYlXUSGZr1D6nMdZwgnqPc%2BZsqIyzf4xQ3k0ERnbZBfYNMZIFeUcMawPcczSB%2B2Q%2FCDSExHh0QQmrviwSL79Ig2bAo49qO3re2V9v2%2FGLfMASvfOUSA5beKcf3n9OsdlwvZyrdIqrnGQLarx987enY9JK5KHkQrxThKG66mwUU60CG6oEspLQAWGzCPoCC2MneIuTGpveqHDSWkhXWXVADRWAaD6%2FFvJJEDAqsZIANpdX9mQ',
    method: 'GET',
    header: {
      'content-type': 'application/json' // 默认值
    },
    success (res) {
      console.log(res.data)
    }
  })



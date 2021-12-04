const app = getApp()
    Page({
      data: {
        openid: "",
        nickName: "",
        src: "",
        token: "",
        base64: "",
        msg: "",
      },
    
      //点击图像搜索按钮触发的事件
      recognition(){
        this.takePhoto();//调用写好的拍照方法
        this.check();//调用写好的图像搜索方法
      },
      //进行图像搜索
      check(){
        var that = this;
        wx.showLoading({
          title: '识别中',
        })
        let token = wx.getStorageSync("token");
         if (token){
          //token存在，直接去图库搜索图片
          wx.request({
            url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/realtime_search/similar/search?access_token=' + token,
            method: 'POST',
            data: {
              image: that.data.base64,
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: res => {
              wx.hideLoading();
              console.log(res)
              
              //个人对返回数据做的判断，可以按自己的需要编写相应逻辑
              if (res.data.result_num > 0) {
                let obj = res.data.result[0].brief;
                wx.showModal({
                  title: obj
                })
              } else {
                this.showToast("识别未成功")
              }
            },
            fail: err => {
              wx.hideLoading();
              this.showToast("调用失败,请稍后重试")
            }
          });
        }else{
          //没有token，调api去拿
          wx.request({
            url: 'https://aip.baidubce.com/oauth/2.0/token', //真实的接口地址
            data: {
              grant_type: 'client_credentials',//固定的
              client_id: 'pLjGTsRZNCyuskmra9iWGvq9',//自己应用实例的AppID，在应用列表可以找到
              client_secret: 'UCE7RhWerEMSKxpQcG1Be93rOQvV9VXO'//自己应用实例的API Key
            },
            header: {
              'Content-Type': 'application/json'
            },
            success: res => {
              wx.setStorageSync("token", res.data.access_token);
              wx.request({
                url: 'https://aip.baidubce.com/rest/2.0/image-classify/v1/realtime_search/similar/search?access_token=' + res.data.access_token,
                method: 'POST',
                data: {
                  image: that.data.base64,

                },
                header: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                success: res => {
                  wx.hideLoading();
                  console.log(res)
                  if (res.data.result_num > 0) {
                    let obj = res.data.result[0].brief;
                    wx.showModal({
                      title: obj
                    })
                  } else {
                    this.showToast("识别未成功")
                  }
                },
                fail: err => {
                  wx.hideLoading();
                  this.showToast("调用失败,请稍后重试")
                }
              });
            }
          })
        }
      },
        //拍照
      takePhoto() {
        var that = this;
        const ctx = wx.createCameraContext()
        ctx.takePhoto({
          quality: 'high',
          success: (res) => {
            console.log(res)
            wx.getFileSystemManager().readFile({
              filePath: res.tempImagePath,
              encoding: 'base64',
              success: res => {
                console.log(res)
                this.setData({
                  base64: res.data
                })
              },
              fail: err => {
                console.log(err)
                this.showToast("调用失败,请稍后重试");
              }
            })
          },
          fail: err => {
            this.showToast("调用失败,请稍后重试");
          }
        })
      },
      //showToast的封装
      showToast(title) {
        wx.showToast({
          title: title,
          icon: 'none',
          duration: 2500
        })
      },
    })
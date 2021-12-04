//import {request} from "../request/request.js";
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
      tempFilePaths: '',
      imgbox: [], //选择图片
      fileIDs: [], //上传云存储后的返回值
      src: 0,
      openid: "",
      nickName: "",
      token: "",
      base64: "",
      msg: "",
      imgArr:[
        'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/16/10/30/54fcef525fa8f6037d180f3c26f3be65.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/16/10/30/62e3ca3a02dddb002eff00482078d194.jpg',
        'http://bpic.588ku.com/element_origin_min_pic/16/10/31/c7167fcfb4ebcd12621c05b0c852e98e.jpg'
      ]
    },
   
    onLoad: function (options) {
   
    },
      //图片点击事件
    imgYu: function (event) {
        var that = this;
        var src = event.target.dataset.message;
        //图片预览
        wx.previewImage({
          current: src, // 当前显示图片的http链接
          urls: [src] // 需要预览的图片http链接列表
        })
      }, 
      // 选择图片 &&&
      addPic1: function (e) {
        var imgbox = this.data.imgbox;
        console.log(imgbox)
        var that = this;
        wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有

          success: function (res) {
            // console.log(res.tempFilePaths)
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            imgbox = tempFilePaths
            let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64') 
            that.setData({
              imgbox: imgbox,
              imgnum: imgbox.length,
              base64: base64
            });

           // that.check();
          }
        })
      },
      //处理百度搜图的API
      check() {
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
      showToast(title) {
            wx.showToast({
              title: title,
              icon: 'none',
              duration: 2500
            })
          },

      
          
          previewImg:function(e){
            console.log(e.currentTarget.dataset.index);
            var index = e.currentTarget.dataset.index;
            var imgArr = this.data.imgArr;
            wx.previewImage({
              current: imgArr[index],     //当前图片地址
              urls: imgArr,               //所有要预览的图片的地址集合 数组形式
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          }
     
        

  })

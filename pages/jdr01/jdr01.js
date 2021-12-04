
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
      tempFilePaths: '',
      imgbox: [], //选择图片
      fileIDs: [], //上传云存储后的返回值
      src: 0,
    },
   
    onLoad: function (options) {
   
   
    },
      //图片点击事件
      imgYu: function (event) {
        var that = this;
    
        console.log(event.target.dataset.message + "这是啥");
        var src = event.target.dataset.message;
        //图片预览
        wx.previewImage({
          current: src, // 当前显示图片的http链接
          urls: [src] // 需要预览的图片http链接列表
        })
      }, 
      
      
      // 删除照片 &&
      imgDelete1: function (e) {
        let that = this;
        let index = e.currentTarget.dataset.deindex;
        let imgbox = this.data.imgbox;
        imgbox.splice(index, 1)
        that.setData({
          imgbox: imgbox
        });
      },
      // 删除照片 &&
      imgDelete1: function (e) {
        let that = this;
        let index = e.currentTarget.dataset.deindex;
        let imgbox = this.data.imgbox;
        imgbox.splice(index, 1)
        that.setData({
          imgbox: imgbox
        });
      },
      // 选择图片 &&&
      addPic1: function (e) {
        var imgbox = this.data.imgbox;
        console.log(imgbox)
        var that = this;
        var n = 2;
        if (2 > imgbox.length > 0) {
          n = 2 - imgbox.length;
        } else if (imgbox.length == 2) {
          n = 1;
        }
        wx.chooseImage({
          count: n, // 默认9，设置图片张数
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // console.log(res.tempFilePaths)
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            console.log('路径' + tempFilePaths);
            if (imgbox.length == 0) {
              imgbox = tempFilePaths
            } else if (2 > imgbox.length) {
              imgbox = imgbox.concat(tempFilePaths);
            }
            that.setData({
              imgbox: imgbox,
              imgnum: imgbox.length
            });
          }
        })
      },
    
      //图片
      imgbox: function (e) {
        this.setData({
          imgbox: e.detail.value
        })
      },
    
  })

// pages/detail-video/index.js
import {
  getMVURL,
  getMVDetail,
  getRelatedVideo,
} from "../../service/api_video";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    mvURLinfo: {},
    mvDetail: {},
    relatedVideos: [],
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 1.获取传入的id
    const id = options.id;

    // 2.获取页面的数据
    this.getPageData(id);
  },
  // 封装请求
  getPageData(id) {
    // 1.请求播放地址
    getMVURL(id).then((res) => {
      this.setData({ mvURLinfo: res.data });
    });

    // 2.请求视频信息
    getMVDetail(id).then((res) => {
      this.setData({ mvDetail: res.data });
    });

    // 3.请求相关视频
    getRelatedVideo(id).then((res) => {
      this.setData({ relatedVideos: res.data });
    });
  },
});

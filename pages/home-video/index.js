// pages/home-video/index.js
import { getTopMV } from "../../service/api_video";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    hasMore: true,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.getTopMVData(0);
  },

  // 封装网络请求的方法
  async getTopMVData(offset) {
    // 判断是否可以请求数据
    if (!this.data.hasMore && offset != 0) return;
    // 展示动画
    wx.showNavigationBarLoading();
    // 真正请求数据
    const res = await getTopMV(offset);
    let newData = this.data.topMVs;
    if (offset == 0) {
      newData = res.data;
    } else {
      newData = newData.concat(res.data);
    }
    // 设置数据
    this.setData({ topMVs: newData });
    this.setData({ hasMore: res.hasMore });
    wx.hideNavigationBarLoading();
    if (offset == 0) {
      wx.stopPullDownRefresh();
    }
  },
  // 封装事件处理的方法
  handleVideoItemClick(event) {
    // 获取id
    const id = event.currentTarget.dataset.item.id;
    // 页面跳转
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
    });
  },
  // 下拉触发
  async onPullDownRefresh() {
    this.getTopMVData(0);
  },
  // 拉到底部触发
  async onReachBottom() {
    this.getTopMVData(this.data.topMVs.length);
  },
});

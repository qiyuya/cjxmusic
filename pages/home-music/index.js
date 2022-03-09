// pages/home-music/index.js
import { getBanners } from "../../service/api_music";
import queryRect from "../../utils/query-rect";
import throttle from "../../utils/throttle";

const throttleQueryRect = throttle(queryRect);

Page({
  data: {
    banners: [],
    swiperHeight: 0,
  },

  onLoad(options) {
    this.getPageData();
  },

  // 网络请求
  getPageData() {
    getBanners().then((res) => {
      this.setData({ banners: res.banners });
    });
  },
  // 事件处理
  handleSearchClick() {
    wx.navigateTo({
      url: "/pages/detail-search/index",
    });
  },
  handleSwiperImageLoaded() {
    // 获取图片的高度(如果去获取某一个组件的高度)
    throttleQueryRect(".swiper-image").then((res) => {
      const rect = res[0];
      this.setData({ swiperHeight: rect.height });
    });
  },
  onUnload() {},
});

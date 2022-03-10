// components/song-menu-area/index.js
Component({
  properties: {
    title: {
      type: String,
      value: "默认歌单",
    },
    songMenu: {
      type: Array,
      value: [],
    },
  },
  data: {},
  methods: {
    handleMenuItemClick(event) {
      const item = event.currentTarget.dataset.item;
      wx.navigateTo({
        url: `/pages/detail-songs/index?id=${item.id}&type=menu`,
      });
    },
    hotSongsHeaderClick() {
      wx.navigateTo({
        url: "/pages/detail-menu/index",
      });
    },
  },
});

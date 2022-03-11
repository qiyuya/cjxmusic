// pages/detail-search/index.js
import {
  getSearchHot,
  getSearchSuggest,
  getSearchResult,
} from "../../service/api_search";
import debounce from "../../utils/debounce";

const debounceGetSearchSuggest = debounce(getSearchSuggest, 300);

Page({
  data: {
    hotKeywords: [],
    suggestSongs: [],
    suggestSongsNodes: [],
    resultSongs: [],
    searchValue: "",
  },
  onLoad: function (options) {
    // 1.获取页面的数据
    this.getPageData();
  },
  // 网络请求
  getPageData() {
    getSearchHot().then((res) => {
      this.setData({ hotKeywords: res.result.hots });
    });
  },

  // 事件处理
  handleSearchChange(event) {
    // 1.获取输入的关键字
    const searchValue = event.detail;
    // 2. 保存关键字
    this.setData({ searchValue });
    // 3.判断关键字为空字符的处理逻辑
    if (!searchValue.length) {
      this.setData({ suggestSongs: [] });
      this.setData({ resultSongs: [] });
      return;
    }
    // 4.根据关键字进行搜索
    debounceGetSearchSuggest(searchValue).then((res) => {
      // 1.获取建议的关键字歌曲
      const suggestSongs = res.result.allMatch;
      this.setData({ suggestSongs });

      // 2.转成nodes节点
      const suggestKeywords = suggestSongs.map((item) => item.keyword);
      const suggestSongsNodes = [];
      for (const keyword of suggestKeywords) {
        const nodes = [];
        if (keyword.toUpperCase().startsWith(searchValue.toUpperCase())) {
          const key1 = keyword.slice(0, searchValue.length);
          const node1 = {
            name: "span",
            attrs: { style: "color: #26ce8a; font-size: 14px;" },
            children: [{ type: "text", text: key1 }],
          };
          nodes.push(node1);
          const key2 = keyword.slice(searchValue.length);
          const node2 = {
            name: "span",
            attrs: { style: "color: #000000; font-size: 14px;" },
            children: [{ type: "text", text: key2 }],
          };
          nodes.push(node2);
        } else {
          const node = {
            name: "span",
            attrs: { style: "color: #000000; font-size: 14px;" },
            children: [{ type: "text", text: keyword }],
          };
          nodes.push(node);
        }
        suggestSongsNodes.push(nodes);
      }
      this.setData({ suggestSongsNodes });
    });
  },
  handleSearchAction() {
    const searchValue = this.data.searchValue;
    getSearchResult(searchValue).then((res) => {
      this.setData({ resultSongs: res.result.songs });
    });
  },
  handleKeywordItemClick(event) {
    // 1.获取点击的关键字
    const keyword = event.currentTarget.dataset.keyword;
    // 2.将关键字设置到searchValue中
    this.setData({ searchValue: keyword });
    // 3.发送网络请求
    this.handleSearchAction();
  },
});

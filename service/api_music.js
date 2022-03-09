import cjxRequest from "./index";

export function getBanners() {
  return cjxRequest.get("/banner", {
    type: 2,
  });
}
export function getRankings(idx) {
  return cjxRequest.get("/top/list", {
    idx,
  });
}
export function getSongMenu(cat = "全部", limit = 6, offset = 0) {
  return cjxRequest.get("/top/playlist", {
    cat,
    limit,
    offset,
  });
}

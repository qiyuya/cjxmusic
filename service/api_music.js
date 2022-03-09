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

import cjxRequest from "./index";

export function getTopMV(offset, limit = 10) {
  return cjxRequest.get("/top/mv", {
    offset,
    limit,
  });
}
// 请求MV的播放地址
export function getMVURL(id) {
  return cjxRequest.get("/mv/url", {
    id,
  });
}
// 请求MV的详情
export function getMVDetail(mvid) {
  return cjxRequest.get("/mv/detail", {
    mvid,
  });
}
// 请求相关视频详情
export function getRelatedVideo(id) {
  return cjxRequest.get("/related/allvideo", {
    id,
  });
}

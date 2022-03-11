import cjxRequest from "./index";

export function getSongDetail(ids) {
  return cjxRequest.get("/song/detail", {
    ids,
  });
}

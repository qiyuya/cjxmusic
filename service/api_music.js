import cjxRequest from "./index";

export function getBanners() {
  return cjxRequest.get("/banner", {
    type: 2,
  });
}

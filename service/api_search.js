import cjxRequest from "./index";

export function getSearchHot() {
  return cjxRequest.get("/search/hot");
}

export function getSearchSuggest(keywords) {
  return cjxRequest.get("/search/suggest", {
    keywords,
    type: "mobile",
  });
}

export function getSearchResult(keywords) {
  return cjxRequest.get("/search", {
    keywords,
  });
}

import cjxRequest from './index'

export function getTopMV(offset, limit = 10) {
    return cjxRequest.get('/top/mv', {
        offset,
        limit
    })
}
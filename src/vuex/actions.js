// import * as types from './mutation-types'
// export const setToken = ({ dispatch }, token) => {
//   dispatch(types.SET_TOKEN, token)
// }

/**
 * 用统一的函数处理并分发mutations。
 * @param type
 * @returns {function({dispatch: *}, ...[*]): *}
 */
function makeAction (type) {
    return ({ dispatch }, ...args) => dispatch(type, ...args)
}

/**
 * live actions
 */
export const setVideoInfo = makeAction('SET_VIDEO_INFO')
export const setSnsInfo = makeAction('SET_SNS_INFO')
export const addWonderfullList = makeAction('ADD_WONDERFULL_LIST')
export const removeWonderfullList = makeAction('REMOVE_WONDERFULL_LIST')
export const addReplayList = makeAction('ADD_REPLAY_LIST')
export const removeReplayList = makeAction('REMOVE_REPLAY_LIST')

export const ADD_POST = 'ADD_POST'
export const VOTE_POST = 'VOTE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'

export function addPost ({ postId, authorId, postBody }) {
  return {
    type: ADD_POST,
    postId,
    authorId,
    postBody,
  }
}

export function votePost ({ postId, authorId }) {
  return {
    type: VOTE_POST,
    postId,
    authorId,
  }
}

export function addComment ({ commentId, parentId, commentBody }) {
  return {
    type: ADD_COMMENT,
    commentId,
    parentId,
    commentBody,
  }
}

export function voteComment ({ commentId, parentId }) {
  return {
    type: VOTE_COMMENT,
    commentId,
    parentId,
  }
}

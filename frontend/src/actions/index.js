export const INITIALIZE_POSTS = 'INITIALIZE_POSTS'
export const INITIALIZE_COMMENTS = 'INITIALIZE_COMMENTS'
export const INITIALIZE_CATEGORIES = 'INITIALIZE_CATEGORIES'
export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const VOTE_POST = 'VOTE_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function initializePosts(posts) {
  return {
    type: INITIALIZE_POSTS,
    posts
  }
}

export function initializeComments(comments) {
  return {
    type: INITIALIZE_COMMENTS,
    comments
  }
}

export function initializeCategories(categories) {
  return {
    type: INITIALIZE_CATEGORIES,
    categories
  }
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post
  }
}

export function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}

export function votePost({ id, vote }) {
  // vote here will be +1 and -1 depending on whether it's an upvote or downvote.
  return {
    type: VOTE_POST,
    id,
    vote,
  }
}

export function deletePost(id) {
  return {
    type: DELETE_POST,
    id
  }
}

export function addComment(comment) {
  return {
    type: ADD_COMMENT,
    comment,
  }
}

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function voteComment({ id, vote }) {
  // vote here will be +1 and -1 depending on whether it's an upvote or downvote.
  return {
    type: VOTE_COMMENT,
    id,
    vote
  }
}

export function deleteComment(id) {
  return {
    type: DELETE_COMMENT,
    id
  }
}

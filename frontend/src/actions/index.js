import * as Types from './types';

/**
 * POST ACTIONS
 */
export function initializePosts(posts) {
  return {
    type: Types.INITIALIZE_POSTS,
    posts
  }
}

export function addPost(post) {
  return {
    type: Types.ADD_POST,
    post
  }
}

export function editPost(post) {
  return {
    type: Types.EDIT_POST,
    post
  }
}

export function votePost({ id, vote }) {
  // vote here will be +1 and -1 depending on whether it's an upvote or downvote.
  return {
    type: Types.VOTE_POST,
    id,
    vote,
  }
}

export function deletePost(id) {
  return {
    type: Types.DELETE_POST,
    id
  }
}

export function sort(type, sortBy) {
  return {
    type,
    sortBy    // either Timestamp or voteScore
  }
}

/**
 * CATEGORIES ACTION
 */
export function initializeCategories(categories) {
  return {
    type: Types.INITIALIZE_CATEGORIES,
    categories
  }
}

export function categoryData(category, data) {
  return {
    type: Types.CATEGORY_DATA,
    category,
    data
  }
}

/**
 * COMMENT ACTIONS
 */
export function initializeComments(comments) {
 return {
   type: Types.INITIALIZE_COMMENTS,
   comments
 }
}

export function addComment(comment) {
  return {
    type: Types.ADD_COMMENT,
    comment,
  }
}

export function editComment(comment) {
  return {
    type: Types.EDIT_COMMENT,
    comment
  }
}

export function voteComment({ id, vote }) {
  // vote here will be +1 and -1 depending on whether it's an upvote or downvote.
  return {
    type: Types.VOTE_COMMENT,
    id,
    vote
  }
}

export function deleteComment({id, parentId}) {
  return {
    type: Types.DELETE_COMMENT,
    id,
    parentId
  }
}

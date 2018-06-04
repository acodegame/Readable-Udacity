import {
  INITIALIZE_POSTS,
  INITIALIZE_COMMENTS,
  INITIALIZE_CATEGORIES,
  ADD_POST,
  EDIT_POST,
  VOTE_POST,
  DELETE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  VOTE_COMMENT,
  DELETE_COMMENT,
  SORT_DESC,
  SORT_ASC,
  CATEGORY_DATA
} from '../actions';
import { combineReducers } from 'redux';
import * as Utils from '../utils';
import * as Constants from '../constants';

/*
  This reducer will take care of all the user interactions.
  As of now only like, comment and share is supported.
  TODO: We could've made a heirarchial state structure where
  1. Categories - will be the root node, which will point to the posts they have
  2. Posts - will have all the posts and they will point to the comments based on parentId of comments.
  3. Comments - will have comments which might point to replies in the future.
  4. Replies - This will be the last level of heirarchy at this point of time.
*/
function posts(state = {}, action) {
  const stateArray = Utils.convertObjectToArray(state);
  switch(action.type) {
    case INITIALIZE_POSTS:
      // Convert objects of posts into array of posts
      const posts = Utils.convertObjectToArray(action.posts);
      return Object.assign({}, state, posts);
    case ADD_POST:
      return stateArray.concat(action.post);
    case EDIT_POST:
      return stateArray.map(post => post.id===action.post.id
              ? {...post, 'title': action.post.title, 'body': action.post.body}
              : {...post});
    case VOTE_POST:
      return stateArray.map(post => post.id===action.id
              ? {...post, 'voteScore': post.voteScore + action.vote}
              : {...post});
    case DELETE_POST:
      return stateArray.map(post => post.id===action.id
              ? {...post, 'deleted': true}
              : {...post});
    case ADD_COMMENT:
      return stateArray.map(post => post.id===action.comment.parentId
              ? {...post, 'commentCount': post.commentCount + 1}
              : {...post});
    case DELETE_COMMENT:
      return stateArray.map(post => post.id===action.parentId
              ? {...post, 'commentCount': post.commentCount - 1}
              : {...post});
    case SORT_ASC:
      if (action.sortBy === Constants.SORT_BY.VOTE_SCORE) {
        return {
          ...stateArray.sort((a, b) => a.voteScore >= b.voteScore)
        }
      } else if (action.sortBy === Constants.SORT_BY.TIMESTAMP) {
        return {
          ...stateArray.sort((a, b) => a.timestamp >= b.timestamp)
        }
      }
      return {
        ...state
      }
    case SORT_DESC:
      if (action.sortBy === Constants.SORT_BY.VOTE_SCORE) {
        return {
          ...stateArray.sort((a, b) => a.voteScore < b.voteScore)
        }
      } else if (action.sortBy === Constants.SORT_BY.TIMESTAMP) {
        return {
          ...stateArray.sort((a, b) => a.timestamp < b.timestamp)
        }
      }
      return {
        ...state
      }
    default:
      return state;
  }
}

function categories(state = {}, action) {
  const categoriesArray = Utils.convertObjectToArray(state);
  switch(action.type) {
    case INITIALIZE_CATEGORIES:
      return Object.assign({}, state, action.categories);
    case CATEGORY_DATA:
      return categoriesArray.map(c => c.name === action.category
        ? {...c, 'posts': action.data.map(p => p.id)}
        : {...c})
    default:
      return state;
  }
}

function comments(state = {}, action) {
  switch(action.type) {
    case INITIALIZE_COMMENTS:
      const comments = Utils.convertObjectToArray(action.comments);
      return Object.assign({}, state, comments);
    case ADD_COMMENT:
      return Object.keys(state).map(k => state[k]).concat(action.comment);
    case EDIT_COMMENT:
    return Object.keys(state).map(k => state[k]).map(comment => comment.id===action.comment.id
            ? {...comment, 'body': action.comment.body}
            : {...comment});
    case VOTE_COMMENT:
      return Object.keys(state).map(k => state[k]).map(comment => comment.id===action.id
              ? {...comment, 'voteScore': comment.voteScore + action.vote}
              : {...comment});
    case DELETE_COMMENT:
      return Object.keys(state).map(k => state[k]).map(comment => comment.id===action.id
              ? {...comment, 'deleted': true}
              : {...comment});
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
  categories,
});

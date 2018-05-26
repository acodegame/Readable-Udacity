import {
  ADD_POST,
  VOTE_POST,
  ADD_COMMENT,
  VOTE_COMMENT,
} from '../actions';
import { combineReducers } from 'redux';

const initialCommentsState = {
  "894tuq4ut84ut8v4t8wun89g": {
    id: '894tuq4ut84ut8v4t8wun89g',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1468166872634,
    body: 'Hi there! I am a COMMENT.',
    author: 'thingtwo',
    voteScore: 6,
    deleted: false,
    parentDeleted: false
  },
  "8tu4bsun805n8un48ve89": {
    id: '8tu4bsun805n8un48ve89',
    parentId: "8xf0y6ziyjabvozdd253nd",
    timestamp: 1469479767190,
    body: 'Comments. Are. Cool.',
    author: 'thingone',
    voteScore: -5,
    deleted: false,
    parentDeleted: false
  }
}

const initialPostsState = {
    "8xf0y6ziyjabvozdd253nd": {
      id: '8xf0y6ziyjabvozdd253nd',
      timestamp: 1467166872634,
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      author: 'thingtwo',
      category: 'react',
      voteScore: 6,
      deleted: false,
      commentCount: 2
    },
    "6ni6ok3ym7mf1p33lnez": {
      id: '6ni6ok3ym7mf1p33lnez',
      timestamp: 1468479767190,
      title: 'Learn Redux in 10 minutes!',
      body: 'Just kidding. It takes more than 10 minutes to learn technology.',
      author: 'thingone',
      category: 'redux',
      voteScore: -5,
      deleted: false,
      commentCount: 0
    }
}

/*
  This reducer will take care of all the user interactions.
  As of now only like, comment and share is supported.
  TODO: add more switch cases or make this method more generic.
*/
function posts(state = initialPostsState, action) {
  const { postId, authorId, postBody } = action;

  switch(action.type) {
    case ADD_POST:
      return {

      }
    case VOTE_POST:
      return {

      }
    default:
      return state;
  }
}

function comments(state = initialCommentsState, action) {
  const { commentId, parentId, commentBody, author } = action;

  switch(action.type) {
    case ADD_COMMENT:
      return {

      }
    case VOTE_COMMENT:
      return {

      }
    default:
      return state;
  }
}

export default combineReducers({
  posts,
  comments,
});

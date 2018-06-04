import React, { Component } from 'react';
import Post from './Post';
import { categoryData } from '../actions';
import { connect } from 'react-redux';
import * as Utils from '../utils';
import Header from './subs/Header';
import LeftPane from './panes/LeftPane';
import RightPane from './panes/RightPane';

const styleLayout = {
  siteWrapper: {
          display: 'flex',
          flexDirection: "column",
          minHeight: '100vh'
  },
  site: {
          display: 'flex',
          flexGrow: '1',
          background: '#e9ebee'
  },
  contentView: {
    order: '1',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: '1',
    paddingTop: '50px'
  },
}

class CategoryView extends Component {

  /*
    TODO: This CategoryView should be deleted or make it a Functional Stateless component
    FeedView later will have four blocks, kindly look into the block details in FeedView component.
  */

  componentDidMount() {
    const category = this.props.location.state.category;
    // Posts of certain category GET Call
    fetch(`http://localhost:3001/${category}/posts`, {
      headers: {
        'Authorization': 'Basic '+btoa('shashi:123')
      }
    }).then(res => res.json()).then(res => {
      console.log("Category data response, ", res);
      this.props.dispatch(categoryData(category, res));
    });
  }

  render() {
    if (this.props.posts === undefined) {
      return null;
    } else if (this.props.posts.length === 0) {
      return (
        <div className='noResults'>
          No Posts found for {this.props.location.state.category}
        </div>
      )
    }
    return (
      <div style={styleLayout.siteWrapper}>
        {
          /*
            Make sure to send "top" prop in Left and Right pane same as whenever
            height prop is send to Header. This is to ensure that the navs will
            stick to header while scrolling.
          */
        }
        <Header headerText="Readable"/>

        <div style={styleLayout.site}>
          <LeftPane />
          <div style={styleLayout.contentView}>
            {this.props.posts.map(post => <Post {...post} key={post.id}/>)}
          </div>
          <RightPane categories={this.props.categories}/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts, categories }, props) => {
  const category = props.location.state.category;
  // Since there can be only one category where user navigated to.
  const postArray = Utils.convertObjectToArray(posts);
  const categoryArray = Utils.convertObjectToArray(categories).filter(c => c.name === category)[0]
  return {
    ...props,
    posts: postArray.filter(p => categoryArray.posts && categoryArray.posts.indexOf(p.id)!== -1)
  };
}

export default connect(mapStateToProps)(CategoryView);

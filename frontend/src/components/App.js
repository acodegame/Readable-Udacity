import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import FeedView from './FeedView';
import CategoryView from './CategoryView';
import PostView from './PostView';

class App extends Component {

  render() {
    return (
      <div className="app">
        <Route exact path="/" component={FeedView} />
        <Route path="/category" exact component={CategoryView} />
        <Route path="/post" exact component={PostView} />
      </div>
    );
  }
}

export default App;

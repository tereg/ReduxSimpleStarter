import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyDYsgBnQogVOnp5gB_JMfCB4FQtaaQ1qqY';

//Create a new component. This component should produce some HTML.
class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = { 
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('surfboards');    
  }

  // We're going to define our callback by making a new method on our app:
  //term is whatever the user types into the input
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);
    //We created a function here and passed it to debounce. Debounce takes inner function (this.videoSearch(term), and it returns a new function that can only be called once every 300 milliseconds.
    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          //We defined a function that takes a video and defines it on app's state in line below:
          onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
          videos={this.state.videos} />
      </div>
    );
  }
}

//Take this component’s generated HTML and put it on the page (in the DOM).
ReactDOM.render(<App />, document.querySelector('.container'));

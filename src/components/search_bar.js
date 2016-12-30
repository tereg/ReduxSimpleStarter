import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    
    this.state = {term: '' };
  }
    
  render() {
    return (
      <div className="search-bar">
        <input onChange={event => this.onInputChange(event.target.value)} />
      </div>
    );
  } 

//Inside of here, we want to set the state with the term
//and we want to call the callback that we got from index (from app)
  onInputChange(term) {
    this.setState({term});
    this.props.onSearchTermChange(term);
  }
}



export default SearchBar;
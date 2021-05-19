import './mainPage.css';
import { Component } from 'react';
import axios from 'axios';
import Tutorial from '../tutorial/tutorial'

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorialsList: [],
      searchBarValue: "",
      appliedTags: []
    }
    this.onChangeSearchBarValue = this.onChangeSearchBarValue.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get("https://lingumi-take-home-test-server.herokuapp.com/videoTutorials");
    this.setState({
      tutorialsList: response.data,
    })
  }

  listTutorials() {
    return this.state.tutorialsList.map(tut => {
      return <div className="tutorial">
        <Tutorial key={tut.id} title={tut.videoTitle} teacher={tut.teacherName} tags={tut.tags} avgUserRating={tut.averageUserRating}/>
      </div>
    })
  }

  listAppliedTags() {
    return this.state.appliedTags.map(tag => {
      return <div className="tag">
        {tag}
      </div>
    })
  }

  handleSearch() {
    return;
  }

  handleAddTag() {
    return;
  }

  onChangeSearchBarValue(e) {
    this.setState({searchBarValue: e.target.value});
  }

  render() {
    return (
      <div>
        <div className="main-page-title">
          VID-TUTORIAL
        </div>
        <div className='search-container'>
          <input className='search-input' type='text' name='value' value={this.state.searchBarValue} onChange={this.onChangeSearchBarValue} />
          <br/>
          <div>
            {this.listAppliedTags()}
          </div>
          <div>
            <button className='search-button' onClick={() => {this.handleSearch(this.state.searchBarValue)}}>Search</button>
            <button className='add-tag-button' onClick={() => {this.handleAddTag()}}>Add tag</button>
          </div>
        </div>
        <div className="tutorialsList">
          {this.listTutorials()}
        </div>
      </div>
    );
  }
}

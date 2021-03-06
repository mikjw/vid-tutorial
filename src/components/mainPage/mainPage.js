import "./mainPage.css";
import { Component } from "react";
import axios from "axios";
import TutorialsList from "../tutorialsList/tutorialsList";
import TagsList from "../tagsList/tagsList";
import { getTopRatedTutorialsForTags } from "../../helpers/searchFunctions";
import { searchForTutorials } from "../../helpers/searchFunctions";
import { createSearchMessage } from "../../helpers/messageGenerator";

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialTutorialsList: [],
      currentTutorialsList: [],
      searchBarValue: "",
      appliedTags: [],
      searchString: "",
      tagsApplied: false,
      searchApplied: false
    }
    this.onChangeSearchBarValue = this.onChangeSearchBarValue.bind(this);
  }


  /**
  * Fetch tutorials on load
  */

  async componentDidMount() {
    const response = await axios.get("https://lingumi-take-home-test-server.herokuapp.com/videoTutorials");
    this.setState({
      initialTutorialsList: response.data,
      currentTutorialsList: response.data,
    })
  }


  /**
  * Refresh tutorials list and re-apply any current search terms and tags
  */

  async handleRefreshTutorials() {
    const response = await axios.get("https://lingumi-take-home-test-server.herokuapp.com/videoTutorials");
    let updatedCurrentTutorialsList = response.data;
    if (this.state.searchApplied) { 
      updatedCurrentTutorialsList = searchForTutorials(updatedCurrentTutorialsList, this.state.searchString) 
    }
    if (this.state.tagsApplied) { 
      updatedCurrentTutorialsList = getTopRatedTutorialsForTags(updatedCurrentTutorialsList, this.state.appliedTags, 20)
    }
    this.setState({
      initialTutorialsList: response.data,
      currentTutorialsList: updatedCurrentTutorialsList,
    })
  }


  /**
  * Pass tutorials to search helper function and re-apply any currently applied tags to result 
  */

  handleSearch() {
    let tutorialsForSearchString = searchForTutorials(this.state.initialTutorialsList, this.state.searchBarValue);
    if (this.state.tagsApplied) {
      tutorialsForSearchString = getTopRatedTutorialsForTags(tutorialsForSearchString, this.state.appliedTags, 20);
    }
    this.setState({
      currentTutorialsList: tutorialsForSearchString,
      searchApplied: true,
      searchString: this.state.searchBarValue,
      searchBarValue: ""
    })
  }


  /**
  * Remove search terms and re-apply any currently applied tags
  */

  handleClearSearch() {
    let tutorialsWithoutSearch = this.state.initialTutorialsList;
    if(this.state.tagsApplied) {
      tutorialsWithoutSearch = getTopRatedTutorialsForTags(tutorialsWithoutSearch, this.state.appliedTags, 20);
    }
    this.setState({ 
      searchApplied: false, 
      searchString: "",
      currentTutorialsList: tutorialsWithoutSearch
    }) 
  }


  /**
  * Add a new tag to the array
  */

  async handleAddTag() {
    const tag = this.state.searchBarValue;
    await this.setState({
      appliedTags: [...this.state.appliedTags, tag],
      searchBarValue: ""
    })
    this.applyTags();
  }


  /**
  * When a new tag is added, get the initial list before applying the updated range of tags,
  * re-applying any current search terms.
  */

  applyTags() {
    let tutorialsList = this.state.initialTutorialsList;
    if(this.state.searchApplied) { 
      tutorialsList = searchForTutorials(tutorialsList, this.state.searchString);
    }
    const topRatedTutorialsForTags = getTopRatedTutorialsForTags(tutorialsList, this.state.appliedTags, 20);
    this.setState({ 
      currentTutorialsList: topRatedTutorialsForTags, 
      tagsApplied: true 
    });
  }


  /**
  * Re-apply any current search terms when removing all tags
  */

  handleClearAllTags() {
    let tutorialsWithoutTags = this.state.initialTutorialsList;
    if (this.state.searchApplied) {
      tutorialsWithoutTags = searchForTutorials(tutorialsWithoutTags, this.state.searchString);
    }
    this.setState({
      tagsApplied: false,
      appliedTags: [],
      currentTutorialsList: tutorialsWithoutTags
    })
  }

  onChangeSearchBarValue(e) {
    this.setState({ searchBarValue: e.target.value });
  }

  render() {
    return (
      <div className="main-page-container">
        <div className="main-page-title">
          Vid-Tutorial
        </div>
       <div className="reload">
        <button className="refresh-button" onClick={() => {this.handleRefreshTutorials()}}> &#x21bb; Refresh tutorials</button>
        </div>
        <div className="search-container">
          <input className="search-bar" type="text" name="value" placeholder="Enter search terms or tags" value={this.state.searchBarValue} onChange={this.onChangeSearchBarValue}/>
          <div>
            <button className="action-button" disabled={this.state.searchBarValue === "" || this.state.searchApplied} onClick={() => {this.handleSearch(this.state.searchBarValue)}}>Search</button>
            <button className="action-button" disabled={this.state.searchBarValue === ""} onClick={() => {this.handleAddTag()}}>Add tag</button>
          </div>
          <div>
            <button className="clear-button" disabled={!this.state.searchApplied} onClick={() => {this.handleClearSearch()}}>Clear search</button>
            <button className="clear-button" disabled={!this.state.tagsApplied} onClick={() => {this.handleClearAllTags()}}>Clear all tags</button>
          </div>
        </div>
        <div className="search-message">
          {createSearchMessage(this.state.searchApplied, this.state.tagsApplied, this.state.currentTutorialsList.length, this.state.searchString)}
        </div>
        <div>
          <TagsList tags={this.state.appliedTags}/>
        </div>
        <div className="tutorials-list-container ">
          <TutorialsList tutorials={this.state.currentTutorialsList}/>
        </div>
      </div>
    );
  }
}

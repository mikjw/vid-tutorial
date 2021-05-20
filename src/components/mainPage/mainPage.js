import "./mainPage.css";
import { Component } from "react";
import axios from "axios";
import TutorialsList from "../tutorialsList/tutorialsList";
import { getTopRatedTutorialsForTags } from "../../helpers/searchFunctions";
import { searchForTutorials } from "../../helpers/searchFunctions";

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

  async componentDidMount() {
    const response = await axios.get("https://lingumi-take-home-test-server.herokuapp.com/videoTutorials");
    this.setState({
      initialTutorialsList: response.data,
      currentTutorialsList: response.data,
    })
    console.log("currentTutorialsList in main", this.state.currentTutorialsList);
  }

  listAppliedTags() {
    return this.state.appliedTags.map(tag => {
      return <div className="tag">
        {tag}
      </div>
    })
  }

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

  handleClearSearch() {
    let tutorialsWithoutSearch = this.state.initialTutorialsList;
    if(this.state.tagsApplied) {
      tutorialsWithoutSearch = getTopRatedTutorialsForTags(this.state.initialTutorialsList, this.state.appliedTags, 20);
    }
    this.setState({ 
      searchApplied: false, 
      searchString: "",
      currentTutorialsList: tutorialsWithoutSearch
    }) 
  }

  async handleAddTag() {
    const tag = this.state.searchBarValue;
    await this.setState({
      appliedTags: [...this.state.appliedTags, tag],
      searchBarValue: ""
    })
    this.applyTags();
  }

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

  createSearchMesage() {
    let searchMessage = "";
    const resultsNumber = this.state.currentTutorialsList.length;
    if (this.state.searchApplied || this.state.tagsApplied) { searchMessage += `Showing top ${resultsNumber} results for` }
    if (this.state.searchApplied) { searchMessage += ` "${this.state.searchString}"`}
    if (this.state.searchApplied && this.state.tagsApplied) { searchMessage += " with" }
    if (this.state.tagsApplied) { searchMessage += " tags:" }
    return searchMessage;
  }

  render() {
    return (
      <div className="main-page-container">
        <div className="main-page-title">
          Vid-Tutorial
        </div>
       <div className="reload">
        <button className="refresh-button" onClick={() => {this.handleRefreshTutorials()}}> &#x21bb; Get latest tutorials</button>
        </div>
        <div className="search-container">
          <input className="search-bar" type="text" name="value" placeholder="Enter search terms or tags" value={this.state.searchBarValue} onChange={this.onChangeSearchBarValue} />
          <br/>
          <div>
            <button className="button" onClick={() => {this.handleSearch(this.state.searchBarValue)}}>Search</button>
            <button className="button" onClick={() => {this.handleAddTag()}}>Add tag</button>
          </div>
          <div>
            <button className="button" onClick={() => {this.handleClearSearch()}}>Clear search</button>
            <button className="button" onClick={() => {this.handleClearAllTags()}}>Clear all tags</button>
          </div>
        </div>
        <div>
          {this.createSearchMesage()}
        </div>
        <div>
          {this.listAppliedTags()}
        </div>
        <div className="tutorials-list-container ">
          <TutorialsList tutorials={this.state.currentTutorialsList}/>
        </div>
      </div>
    );
  }
}

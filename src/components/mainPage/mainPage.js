import './mainPage.css';
import { Component } from 'react';
import axios from 'axios';
import Tutorial from '../tutorial/tutorial'

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorialsList: []
    }
  }

  async componentDidMount() {
    const response = await axios.get("https://lingumi-take-home-test-server.herokuapp.com/videoTutorials");
    console.log(response.data);
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

  render() {
    return (
      <div>
      <div className="main-page-title">
        VID-TUTORIAL
      </div>
      <div className="tutorialsList">
        {this.listTutorials()}
      </div>
      </div>
    );
  }
}






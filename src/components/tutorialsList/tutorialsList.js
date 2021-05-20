import './tutorialsList.css';
import { Component } from 'react';
import Tutorial from "../tutorial/tutorial";

export default class TutorialsList extends Component {
  listTutorials() {
    console.log("this.props.tutorials in list", this.props.tutorials)
    return this.props.tutorials.map(tut => {
      return <div className="tutorial-list-element">
        <Tutorial key={tut.id} title={tut.videoTitle} teacher={tut.teacherName} tags={tut.tags} avgUserRating={tut.averageUserRating}/>
      </div>
    })
  }

  render() {
    return (
      <div className="tut-list-container">
        {this.listTutorials()}
      </div>
    );
  }
}
import './tutorial.css';
import { Component } from 'react';
import TagsList from "../tagsList/tagsList";

export default class Tutorial extends Component {
  render() {
    return (
      <div className="tut-container">
        <div className="tut-header">
          <a className="a" href={this.props.videoUrl}> {this.props.title}</a>
        </div>
        <div>
          <div className="tut-teacher-name">
            Teacher: {this.props.teacher}
          </div>
          <div className="tut-rating">
            Rating: {(Number(this.props.avgUserRating) * 10 ).toPrecision(2).slice(0,4)}
          </div>
        </div>
        <div className="tut-tags-container">
          <div className="tags">Tags:</div>
          <div className="tags"><TagsList tags={this.props.tags}/></div>
        </div>
      </div>
    );
  }
}

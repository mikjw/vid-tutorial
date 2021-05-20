import './tutorial.css';
import { Component } from 'react';

export default class Tutorial extends Component {
  listTags() {
    return this.props.tags.map(tag => {
      return <div className="tag">
        {tag}
      </div>
    })
  }

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
            Rating: {this.props.avgUserRating.toPrecision(2)}
          </div>
        </div>
        <div className="tut-tags-container">
          Tags: {this.listTags()}
        </div>
      </div>
    );
  }
}

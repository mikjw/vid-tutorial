import './tutorial.css';
import { Component } from 'react';

export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      url: this.props.videoUrl,
      title: this.props.title,
      tags: this.props.tags, 
      teacher: this.props.teacher,
      avgUserRating: this.props.avgUserRating
    }
  }

  listTags() {
    return this.state.tags.map(tag => {
      return <div className="tag">
        {tag}
      </div>
    })
  }

  render() {
    return (
      <div className="tut-container">
        <div className="tut-header">
          {this.state.title}
        </div>
        <div className="tut-teacher-name">
          Teacher: {this.state.teacher}
        </div>
        <div className="tut-tags-container">
          Tags: {this.listTags()}
        </div>
        <div className="tut-rating">
          Rating: {this.state.avgUserRating.toPrecision(2)}
        </div>
        <div>
          -------------------------------
        </div>
      </div>
    );
  }
}

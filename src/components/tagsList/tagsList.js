import './tagsList.css';
import { Component } from 'react';

export default class Tagslist extends Component {
  listTags() {
    return this.props.tags.map(tag => {
      return <div className="tag">
        {tag}
      </div>
    })
  }

  render() {
    return (
      <div className="tags-container">
        {this.listTags()}
      </div>
    );
  }
}
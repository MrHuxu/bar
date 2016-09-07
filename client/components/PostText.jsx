import React, { Component } from 'react';
import Radium from 'radium';
import { parse } from 'marked';
import dateFormat from 'dateformat';

import renderHead from './PostHeader';
import styles from '../styles/post-text';

@Radium
class PostText extends Component {
  componentDidMount () {
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block);
    });
  }

  render () {
    const { parent, params } = this.props;

    var textArea = params.appends.reduce((prev, cur, index, arr) => {
      prev.push(
        <div
          key = {`post-${params.id}-append-${index}`}
          className = 'ui secondary segment'
        >
          <span className = 'ui label'>
            {dateFormat(cur.createdAt, 'd/m/yyyy, H:MM:ss')}
          </span>
          <span style = {styles.text}> {cur.text} </span>
        </div>
      );
      return prev;
    }, [
      <div
        key = {`post-${params.id}-main-content`}
        className = 'ui segment'
      >
        {renderHead.call(parent, params)}
        <span style = {styles.text}>
          <div dangerouslySetInnerHTML = {{ __html: parse(params.content) }} />
        </span>
      </div>
    ]);

    return (
      <div className = 'ui piled segments'>
        {textArea}
      </div>
    );
  }
}

export default PostText;

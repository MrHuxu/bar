import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import { parse } from 'marked';
import dateFormat from 'dateformat';

import renderHead from './PostHeader';
import styles from '../styles/post-text';

@Radium
class PostText extends Component {
  static propTypes = {
    parent   : PropTypes.object.isRequired,
    params   : PropTypes.shape({
      id        : PropTypes.string.isRquired,
      title     : PropTypes.string.isRequired,
      content   : PropTypes.string.isRequired,
      createdAt : PropTypes.object.isRequired,
      appends   : PropTypes.arrayOf(PropTypes.shape({
        text      : PropTypes.string.isRequired,
        createdAt : PropTypes.object.isRequired
      })).isRequired,
      replies : PropTypes.arrayOf(PropTypes.shape({
        text      : PropTypes.string.isRequired,
        replyTo   : PropTypes.number,
        createdAt : PropTypes.object.isRequired
      })).isRequired
    })
  };

  componentDidMount () {
    /*eslint-disable */
    $('pre code').each(function (i, block) {
      hljs.highlightBlock(block);
    });
    /*eslint-enable */
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

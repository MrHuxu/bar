import React, { Component, PropTypes } from 'react';
import Radium, { Style } from 'radium';
import { parse } from 'marked';
import dateFormat from 'dateformat';

import FlatButton from 'material-ui/FlatButton';
import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import { red400, purple400, indigo400, lightBlue400, cyan400, green400, lime400, yellow400, amber400, orange400, deepOrange400, brown400, blueGrey400, grey400 } from 'material-ui/styles/colors';
const Colors = [red400, purple400, indigo400, lightBlue400, cyan400, green400, lime400, yellow400, amber400, orange400, deepOrange400, brown400, blueGrey400, grey400];

import { processText, processElement } from '../lib/surround-words-with-spaces';
import Append from './Append';
import styles from '../styles/post-text';

@Radium
class PostText extends Component {
  static propTypes = {
    post   : PropTypes.object.isRequired,
    params : PropTypes.shape({
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
    processElement(this.refs.textAreaElem);
  }

  render () {
    const { post, params } = this.props;
    const { id, title, createdAt, content, appends } = params;

    return (
      <Card style = {{
        borderTop : `2px solid ${Colors[parseInt(Math.random() * 100) % Colors.length]}`
      }}>
        <CardHeader
          title = {<h3 style = {styles.title}>{processText(title)}</h3>}
          subtitle = {dateFormat(createdAt, 'd/m/yyyy, H:MM:ss')}

        />

        <CardText style = {styles.container}>
          <Style
            scopeSelector = '.post-text'
            rules = {styles.postText}
          />

          <div
            ref = 'textAreaElem'
            className = 'post-text'
            dangerouslySetInnerHTML = {{ __html: parse(content) }}
          />

          {appends.reduce((prev, cur, index, arr) => {
            prev.push(
              <Append
                postId = {id}
                append = {cur}
                index = {index}
              />
            );
            return prev;
          }, [])}

        </CardText>

        <CardActions>
          <FlatButton
            label = 'Append'
            secondary
            onClick = {post._enterAppend.bind(post)}
          />
          <FlatButton
            label = 'Reply'
            primary
            onClick = {post._enterReply.bind(post, null)}
          />
        </CardActions>

      </Card>
    );
  }
}

export default PostText;

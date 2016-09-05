import React from 'react';

export default function renderAppendForm (params) {
  return (
    <div
      className = 'ui secondary segment'
      key = {`post-${params.id}-append`}
    >
      <div className = 'ui fluid left labeled action input'>
        <input
          ref = 'appendForm'
          type = 'text'
          placeholder = 'Append Content'
        />
        <button
          className = 'ui button'
          onClick = {this._quitAppend.bind(this)}
        >
          <i className = 'trash outline icon' />
        </button>
        <button
          className = 'ui button'
          onClick = {this._append.bind(this)}
        >
          <i className = 'save icon' />
        </button>
      </div>
    </div>
  );
};

export function message (state = {
  ids      : ['1', '2'],
  entities : {
    '1' : {
      id    : '1',
      title : 'title 1',
      texts : [{
        text      : 'text 1',
        createdAt : 0
      }, {
        text      : 'text 2',
        createdAt : 1
      }],
      replies: []
    },
    '2' : {
      id    : '2',
      title : 'title 2',
      texts : [{
        text      : 'text 3',
        createdAt : 2
      }],
      replies: [{
        text: 'text 4',
        createdAt: 3
      }]
    }
  }
}) {
  return state;
}

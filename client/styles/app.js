export const global = {
  'html, body, .full-height' : {
    width  : '100%',
    height : '100%'
  },

  body : {
    backgroundColor : '#ECECEC'
  },

  a : {
    textDecoration : 'none'
  },

  '*' : {
    margin    : 15,
    textAlign : 'center'
  },

  input : {
    padding      : 5,
    borderRadius : 6,
    margin       : '0 10px 0 10px'
  }
};

const verticalBlock = {
  display       : 'inline-block',
  verticalAlign : 'top',
  height        : '100%',
  overflow      : 'auto'
};

export const sider = {
  ...verticalBlock,
  width : '20%'
};

export const posts = {
  ...verticalBlock,
  width : '80%'
};

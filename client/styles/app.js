export default {
  global : {
    '*' : {
      fontFamily    : "'Rambla', sans-serif",
      letterSpacing : '0.03em'
    },

    '.hljs *, code' : {
      fontFamily : '"Monaco", "MonacoRegular", "Courier New", monospace !important'
    }
  },

  leftPanel : {
    position : 'fixed',
    display  : 'inline-block',
    padding  : '10% 0 0 4%',
    height   : '100%',
    width    : '25%',
    fontSize : '20px',
    top      : '0',
    left     : '0'
  },

  rightPanel : {
    display       : 'inline-block',
    verticalAlign : 'top',
    margin        : '0 0 0 25%',
    height        : '100%',
    width         : '75%'
  }
};

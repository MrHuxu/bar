export default {
  container : {
    padding : '15px 0 15px 0'
  },

  replyArea : {
    padding : '10px 0 10px 18px'
  },

  header : {
    margin : '0 0 5px 0'
  },

  subHeader : {
    margin : '8px 0 0 0'
  },

  title : {
    fontFamily : 'Lato, "Helvetica Neue", Arial, Helvetica, sans-serif',
    fontSize   : '20px'
  },

  actionLink : {
    cursor  : 'pointer',
    display : 'inline-block',
    margin  : '0 .2em 0 0.9em',
    color   : 'rgba(0,0,0,.4)',

    ':hover' : {
      color : 'rgba(0,0,0,.8)'
    }
  },

  time : {
    margin : '0 0 0 15px',
    color  : '#aaa'
  },

  global : {
    '.timeline-title, .timeline-item' : {
      position : 'relative'
    },

    '.timeline-title' : {
      padding    : '15px 0 15px 18px',
      fontSize   : '25px',
      color      : '#888',
      fontFamily : 'calligraffittiregular',
      fontWeight : 'bold'
    },

    '.timeline-item' : {
      padding : '10px 0 10px 18px'
    },

    '.timeline-item:before' : {
      left         : '-2px',
      marginLeft   : '-4px',
      marginTop    : '-4px',
      width        : '8px',
      height       : '8px',
      content      : '" "',
      position     : 'absolute',
      top          : '50%',
      background   : '#ccc',
      borderRadius : '50%'
    },

    '.timeline-title:before' : {
      left         : '-2px',
      marginLeft   : '-5px',
      marginTop    : '-9px',
      width        : '10px',
      height       : '10px',
      content      : '" "',
      position     : 'absolute',
      top          : '50%',
      borderRadius : '50%',
      background   : '#1abc9c'
    }
  }
};

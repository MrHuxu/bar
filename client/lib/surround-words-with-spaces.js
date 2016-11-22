const re = /[a-zA-Z0-9_# \.\-\/\\]+/g;
const getWordsFromText = text => $.unique(text.match(re) || []).filter(t => (/[a-zA-Z0-9]+/g).test(t));

const replaceWordsInText = (text, words) => {
  words.forEach(word => {
    let wordRE = new RegExp(word, 'g');
    text = text.replace(wordRE, ` ${word} `);
  });
  return text;
};

export function processText (text) {
  let words = getWordsFromText(text);
  return replaceWordsInText(text, words);
}

export function processElement (elem) {
  var containers = $(elem).find('p, li');
  containers.each((idx, container) => {
    container.childNodes.forEach(child => {
      if (0 === child.childNodes.length) {
        let words = getWordsFromText(child.textContent);
        child.textContent = replaceWordsInText(child.textContent, words);
      }
    });
  });
}
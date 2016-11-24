const re = /[a-zA-Z0-9_#: .\-/\\[\]$()]+/g;
const getWordsFromText = text => (text.match(re) || []).filter(t => (/[a-zA-Z0-9]+/g).test(t));

const replaceWordsInText = (text, words) => {
  return words.length ? words.reduce((prev, word, index) => {
    var wordEndIdx = text.indexOf(word) + word.length;
    if (index === words.length - 1) {
      prev += text.replace(word, ` ${word} `);
    } else {
      prev += (text.slice(0, wordEndIdx)).replace(word, ` ${word} `);
      text = text.slice(wordEndIdx);
    }
    return prev;
  }, '') : text;
};

export function processText (text) {
  let words = getWordsFromText(text);
  return replaceWordsInText(text, words);
}

export function processElement (elem) {
  var containers = $(elem).find('p, li');   // eslint-disable-line
  containers.each((idx, container) => {
    container.childNodes.forEach(child => {
      if (0 === child.childNodes.length) {
        let words = getWordsFromText(child.textContent);
        child.textContent = replaceWordsInText(child.textContent, words);
      }
    });
  });
}

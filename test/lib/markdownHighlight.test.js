var markdownHighlight = require('../../lib/markdown-highlight').markdownHighlight;

var expect = require('chai').expect;

describe('Test primary functions in lib/markdown-highlight.js', () => {
  it('[func] decode and highlight markdown doc', () => {
    expect(markdownHighlight("## test\n    p 'hello world'")).to.be.equal(
      '<h2 id="test">test</h2>\n<pre><code class="hljs"><span class="hljs-selector-tag">p</span> <span class="hljs-string">&apos;hello world&apos;</span>\n</code><ul class="numbering"><div>1</div></ul></pre>'
    );
  });
});

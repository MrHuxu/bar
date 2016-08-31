var common = require('../../lib/common');

var expect = require('chai').expect;

describe('Test primary functions in lib/common.js', () => {
  it('[func] prd/dev env check', () => {
    expect(common.onProd()).to.not.be.ok;
  });

  it('[func] convert object to array', () => {
    expect(common.obj2arr({a: 1})).to.be.deep.equal(['a', 1]);
  });

  it('[func] convert filename to array', () => {
    expect(common.getArticleNameArr('67*当Promise遇上闭包*20151220*JavaScript-Promise-Closuer.md')).to.be.deep.equal([
      '67',
      '当Promise遇上闭包',
      '20151220',
      'JavaScript-Promise-Closuer.md'
    ]);
  });
});

describe('Test get infos from a file name', () => {
  var nameArr;

  beforeEach(() => {
    nameArr = ['67', '当Promise遇上闭包', '20151220', 'JavaScript-Promise-Closuer.md'];
  });

  it('[func] get article time', () => {
    expect(common.getArticleTime(nameArr)).to.be.deep.equal({
      year  : '2015',
      month : '12',
      day   : '20'
    });
  });

  it('[func] get article tags', () => {
    expect(common.getArticleTags(nameArr)).to.be.deep.equal(['JavaScript', 'Promise', 'Closuer']);
  });
});

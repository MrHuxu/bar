import { shape, string, number, arrayOf, instanceOf } from 'prop-types';

export * from 'prop-types';

export const id = string;

export const post = shape({
  id        : string.isRequired,
  title     : string.isRequired,
  content   : string.isRequired,
  score     : number.isRequired,
  tags      : arrayOf(string).isRequired,
  createdAt : instanceOf(Date)
});

export const tag = shape({
  id        : string.isRequired,
  label     : string.isRequired,
  createdAt : instanceOf(Date)
});

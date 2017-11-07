import { shape, string, number, arrayOf } from 'prop-types';

export * from 'prop-types';

export const id = string;

export const post = shape({
  id        : string.isRequired,
  title     : string.isRequired,
  content   : string.isRequired,
  score     : number.isRequired,
  tags      : arrayOf(string).isRequired,
  createdAt : string.isRequired
});

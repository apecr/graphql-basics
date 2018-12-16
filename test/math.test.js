/* global describe, it */

import {add} from './../src/math';
import {expect} from 'chai';

describe('Math', () => {
  it('Add', () => {
    expect(add(4, 8)).to.be.equal(12);
  });
});
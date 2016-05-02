import chai from 'chai';

import { run } from '../../main/app';

describe('Application', () => {

  chai.should();

  xit('meets the acceptance criteria of the challenge', () => {

    run('src/resources/input.txt').should.eql(
      'Output #1: 9\n' +
      'Output #2: 5\n' +
      'Output #3: 13\n' +
      'Output #4: 22\n' +
      'Output #5: NO SUCH ROUTE\n' +
      'Output #6: 2\n' +
      'Output #7: 3\n' +
      'Output #8: 9\n' +
      'Output #9: 9\n' +
      'Output #10: 7')
  });
});
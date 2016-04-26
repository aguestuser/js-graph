import chai from 'chai';
chai.should();

import { hello } from '../../main/hello';

describe('#hello', () => {

  it('should return `world!`', () => {

    hello().should.eql('world!');
    
  });
});

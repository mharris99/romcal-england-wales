import test from 'node:test';
import assert from 'node:assert/strict';
import { validate } from '../scripts/validate.mjs';
const base = () => ({diocese:'leeds',country:'england',entries:[]});
test('empty unverified scaffold passes', () => assert.deepEqual(validate(base()), []));
test('wrong jurisdiction rejected', () => assert.ok(validate({...base(),country:'wales'}).length));
test('unverified entry cannot masquerade as verified without source', () => {
  const entry = {id:'sample',title:'Sample',dateRule:'March 1',rank:'memorial',status:'verified'};
  assert.ok(validate({...base(),entries:[entry]}).some(x => x.includes('official source')));
});
test('duplicate identifiers rejected', () => {
  const entry = {id:'sample',title:'Sample',dateRule:'March 1',rank:'memorial',status:'draft'};
  assert.ok(validate({...base(),entries:[entry,entry]}).some(x => x.includes('duplicate')));
});

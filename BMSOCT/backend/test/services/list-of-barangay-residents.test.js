const assert = require('assert');
const app = require('../../src/app');

describe('\'ListOfBarangayResidents\' service', () => {
  it('registered the service', () => {
    const service = app.service('list-of-barangay-residents');

    assert.ok(service, 'Registered the service');
  });
});

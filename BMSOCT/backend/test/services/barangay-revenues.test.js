const assert = require('assert');
const app = require('../../src/app');

describe('\'barangay-revenues\' service', () => {
  it('registered the service', () => {
    const service = app.service('barangay-revenues');

    assert.ok(service, 'Registered the service');
  });
});

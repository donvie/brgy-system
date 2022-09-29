const assert = require('assert');
const app = require('../../src/app');

describe('\'barangay-financial-reports\' service', () => {
  it('registered the service', () => {
    const service = app.service('barangay-financial-reports');

    assert.ok(service, 'Registered the service');
  });
});

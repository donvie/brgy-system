const assert = require('assert');
const app = require('../../src/app');

describe('\'covid19-contact-tracing\' service', () => {
  it('registered the service', () => {
    const service = app.service('covid-19-contact-tracing');

    assert.ok(service, 'Registered the service');
  });
});

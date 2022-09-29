// Initializes the `covid19-contact-tracing` service on path `/covid-19-contact-tracing`
const { Covid19ContactTracing } = require('./covid19-contact-tracing.class');
const createModel = require('../../models/covid19-contact-tracing.model');
const hooks = require('./covid19-contact-tracing.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$where', '$regex', '$elemMatch']
  };

  // Initialize our service with any options it requires
  app.use('/covid-19-contact-tracing', new Covid19ContactTracing(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('covid-19-contact-tracing');

  service.hooks(hooks);
};

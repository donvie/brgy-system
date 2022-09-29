// Initializes the `blotter-records` service on path `/blotter-records`
const { BlotterRecords } = require('./blotter-records.class');
const createModel = require('../../models/blotter-records.model');
const hooks = require('./blotter-records.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$where', '$regex', '$elemMatch']
  };

  // Initialize our service with any options it requires
  app.use('/blotter-records', new BlotterRecords(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('blotter-records');

  service.hooks(hooks);
};

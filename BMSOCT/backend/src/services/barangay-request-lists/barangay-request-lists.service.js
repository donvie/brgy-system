// Initializes the `barangay-request-lists` service on path `/barangay-request-lists`
const { BarangayRequestLists } = require('./barangay-request-lists.class');
const createModel = require('../../models/barangay-request-lists.model');
const hooks = require('./barangay-request-lists.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$where', '$regex', '$elemMatch']
  };

  // Initialize our service with any options it requires
  app.use('/barangay-request-lists', new BarangayRequestLists(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('barangay-request-lists');

  service.hooks(hooks);
};

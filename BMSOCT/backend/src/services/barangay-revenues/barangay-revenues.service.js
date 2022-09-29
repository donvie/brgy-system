// Initializes the `barangay-revenues` service on path `/barangay-revenues`
const { BarangayRevenues } = require('./barangay-revenues.class');
const createModel = require('../../models/barangay-revenues.model');
const hooks = require('./barangay-revenues.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$where', '$regex', '$elemMatch']
  };

  // Initialize our service with any options it requires
  app.use('/barangay-revenues', new BarangayRevenues(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('barangay-revenues');

  service.hooks(hooks);
};

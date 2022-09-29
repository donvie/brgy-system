// Initializes the `barangay-financial-reports` service on path `/barangay-financial-reports`
const { BarangayFinancialReports } = require('./barangay-financial-reports.class');
const createModel = require('../../models/barangay-financial-reports.model');
const hooks = require('./barangay-financial-reports.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$where', '$regex', '$elemMatch']
  };

  // Initialize our service with any options it requires
  app.use('/barangay-financial-reports', new BarangayFinancialReports(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('barangay-financial-reports');

  service.hooks(hooks);
};

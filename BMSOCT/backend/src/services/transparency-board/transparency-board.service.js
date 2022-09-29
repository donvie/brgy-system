// Initializes the `transparency-board` service on path `/transparency-board`
const { TransparencyBoard } = require('./transparency-board.class');
const createModel = require('../../models/transparency-board.model');
const hooks = require('./transparency-board.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ['$where', '$regex', '$elemMatch']
  };

  // Initialize our service with any options it requires
  app.use('/transparency-board', new TransparencyBoard(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('transparency-board');

  service.hooks(hooks);
};

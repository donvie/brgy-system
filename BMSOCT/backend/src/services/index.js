const users = require('./users/users.service.js');
const blotterRecords = require('./blotter-records/blotter-records.service.js');
const barangayRevenues = require('./barangay-revenues/barangay-revenues.service.js');
const barangayFinancialReports = require('./barangay-financial-reports/barangay-financial-reports.service.js');
const transparencyBoard = require('./transparency-board/transparency-board.service.js');
const covid19ContactTracing = require('./covid19-contact-tracing/covid19-contact-tracing.service.js');
const barangayRequestLists = require('./barangay-request-lists/barangay-request-lists.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(blotterRecords);
  app.configure(barangayRevenues);
  app.configure(barangayFinancialReports);
  app.configure(transparencyBoard);
  app.configure(covid19ContactTracing);
  app.configure(barangayRequestLists);
};


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ListOfBarangayResidents.vue') },
      { path: 'blotter-records', component: () => import('pages/BlotterRecords.vue') },
      { path: 'barangay-revenues', component: () => import('pages/BarangayRevenues.vue') },
      { path: 'barangay-financial-report', component: () => import('pages/BarangayFinancialReport.vue') },
      { path: 'covid19-contact-tracing', component: () => import('pages/Covid19ContactTracing.vue') },
      { path: 'brgy-request-list', component: () => import('pages/BrgyRequestList.vue') },
      { path: 'transparency-board', component: () => import('pages/TransparencyBoard.vue') }
    ],
    meta: { requiresAuth: true },
  },
  { path: '/login', component: () => import('pages/Login.vue') },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

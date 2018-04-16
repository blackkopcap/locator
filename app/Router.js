module.exports = [
  {
    path: '/',
    handler: rootRequire('app/routes/IndexRoute'),
  },
  {
    path: '/orders',
    handler: rootRequire('app/routes/OrdersRoute'),
  },
  {
    path: '/order',
    handler: rootRequire('app/routes/OrderRoute'),
  },
];

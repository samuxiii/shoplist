//generated by 'karma init'

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './node_modules/angular/angular.js',             // angular
      './node_modules/angular-route/angular-route.js', // ui-router
      './node_modules/angular-mocks/angular-mocks.js', // angular-mocks
      './app/app.module.js',
      './app/item-list/item-list.module.js',
      './app/item-list/item-list.component.js',
      './app/item-list/item-list.component.spec.js',
      './app/admin/admin.module.js',
      './app/admin/admin.component.js',
      './app/admin/admin.component.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}

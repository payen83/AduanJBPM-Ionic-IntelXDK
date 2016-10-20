angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

    .state('senaraiAduan', {
    url: '/senarai',
    templateUrl: 'templates/senaraiAduan.html',
    controller: 'senaraiAduanCtrl'
  })

  .state('aduanBaru', {
    url: '/aduanBaru',
    templateUrl: 'templates/aduanBaru.html',
    controller: 'aduanBaruCtrl'
  })

  .state('butiranAduan', {
    url: '/butiran/:id',
    templateUrl: 'templates/butiranAduan.html',
    controller: 'butiranAduanCtrl'
  })

$urlRouterProvider.otherwise('/senarai')

  

});
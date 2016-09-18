/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardLineChart4', dashboardLineChart4);

  /** @ngInject */
  function dashboardLineChart4() {
    return {
      restrict: 'E',
      controller: 'DashboardLineChart4Ctrl',
      templateUrl: 'app/pages/dashboard/dashboardLineChart4/dashboard-line-chart-4.html'
    };
  }
})();

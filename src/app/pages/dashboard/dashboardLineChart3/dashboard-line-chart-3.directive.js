/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardLineChart3', dashboardLineChart3);

  /** @ngInject */
  function dashboardLineChart3() {
    return {
      restrict: 'E',
      controller: 'DashboardLineChart3Ctrl',
      templateUrl: 'app/pages/dashboard/dashboardLineChart3/dashboard-line-chart-3.html'
    };
  }
})();

/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('pieChart', pieChart);

  /** @ngInject */
  function pieChart() {
    return {
      restrict: 'E',
      controller: 'PieChartCtrl',
      templateUrl: 'app/pages/dashboard/pieChart/pie-chart.html'
    };
  }
})();

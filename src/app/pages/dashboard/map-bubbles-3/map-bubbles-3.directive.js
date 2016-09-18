/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('mapBubbles3', mapBubbles3);

  /** @ngInject */
  function mapBubbles3() {
    return {
      restrict: 'E',
      controller: 'MapBubblePage3Ctrl',
      templateUrl: 'app/pages/dashboard/map-bubbles-3/map-bubbles-3.html'
    };
  }
})();

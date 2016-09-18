/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('mapBubbles2', mapBubbles2);

  /** @ngInject */
  function mapBubbles2() {
    return {
      restrict: 'E',
      controller: 'MapBubble2PageCtrl',
      templateUrl: 'app/pages/dashboard/map-bubbles-2/map-bubbles-2.html'
    };
  }
})();

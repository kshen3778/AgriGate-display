/**
 * @author v.lugovksy
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('mapBubbles', mapBubbles);

  /** @ngInject */
  function mapBubbles() {
    return {
      restrict: 'E',
      controller: 'MapBubblePageCtrl',
      templateUrl: 'app/pages/dashboard/map-bubbles/map-bubbles.html'
    };
  }
})();

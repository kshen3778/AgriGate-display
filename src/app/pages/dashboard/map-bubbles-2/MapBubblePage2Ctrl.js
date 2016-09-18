/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('MapBubble2PageCtrl', MapBubble2PageCtrl);

  /** @ngInject */
  function MapBubble2PageCtrl($scope, baConfig, $timeout, layoutPaths, $http) {
    console.log("hello");


    $scope.submit = function(){
      console.log("submit");
      $http.get("http://10.21.101.180:8000/soilloose?c1=" + $scope.lat1 + "," + $scope.long1 + "&c2=" + $scope.lat2 + "," + $scope.long2).then(function(response) {

          var mapData = response.data.moisture;
          console.log(mapData);

          var map;
          var minBulletSize = 3;
          var maxBulletSize = 70;
          var min = Infinity;
          var max = -Infinity;

          // get min and max values
          for (var i = 0; i < mapData.length; i++) {
            var value = mapData[i].value;
            if (value < min) {
              min = value;
            }
            if (value > max) {
              max = value;
            }
          }

          // build map
          AmCharts.theme = AmCharts.themes.blur;
          map = new AmCharts.AmMap();

          map.addTitle('Moisture Levels', 14);
          map.addTitle('source: Gapminder', 11);
          map.areasSettings = {
            unlistedAreasColor: '#000000',
            unlistedAreasAlpha: 0.1
          };
          map.imagesSettings.balloonText = '<span style="font-size:14px;"><b>[[title]]</b>: [[value]]</span>';
          map.pathToImages = layoutPaths.images.amMap;

          var dataProvider = {
            mapVar: AmCharts.maps.worldLow,
            images: []
          };

          // it's better to use circle square to show difference between values, not a radius
          var maxSquare = maxBulletSize * maxBulletSize * 2 * Math.PI;
          var minSquare = minBulletSize * minBulletSize * 2 * Math.PI;

          // create circle for each country
          console.log(mapData.length);
          for (var i = 0; i < mapData.length; i++) {
            //console.log(mapData[1]);
            //console.log(mapData[1]);
            //console.log(mapData[2]);
            //var dataItem = [2];
            var value = mapData[2];
            // calculate size of a bubble
            var square = (value - min) / (max - min) * (maxSquare - minSquare) + minSquare;
            if (square < minSquare) {
              square = minSquare;
            }
            var size = Math.sqrt(square / (Math.PI * 2));
            //var id = dataItem.code;
            size=10;
            dataProvider.images.push({
              type: 'square',
              width: size,
              height: size,
              color: rgba("#70db70",mapData[i][2] * 2),
              longitude: mapData[i][0],
              latitude: mapData[i][1],
              value: mapData[i][2]
            });
          }

          map.dataProvider = dataProvider;
          map.export = {
            enabled: true
          };

          $timeout(function() {
            map.write('map-bubbles');
          }, 100);
      });
    }



  }

})();

/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('MapBubblePage3Ctrl', MapBubblePage3Ctrl);

  /** @ngInject */
  function MapBubblePage3Ctrl($scope, baConfig, $timeout, layoutPaths, $http) {
    console.log("hello");


    $scope.submit = function(){
      console.log("submit");
      $http.get("http://104.196.35.38:8000/looseSoil?c1=" + $scope.lat1 + "," + $scope.long1 + "&c2=" + $scope.lat2 + "," + $scope.long2).then(function(response) {
          console.log(response);



          var mapData = response.data.loose;
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
            var colour;
            var letter;
            //var id = dataItem.code;

            if( mapData[i][2] == ("A")){
              console.log("A");
              colour = "#996633";
              letter = 4;
            }else if(mapData[i][2] == ("B")){
              colour = "#bf8040";
              letter = 3;
            }else if(mapData[i][2] == ("C")){
              colour = "#cc9966";
              letter = 2;
            }else{
              colour = "#d9b38c";
              letter = 1;
            }
            size=20;
            dataProvider.images.push({
              type: 'circle',
              width: size,
              height: size,
              color: colour,
              longitude: mapData[i][1],
              latitude: mapData[i][0],
              value: letter
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

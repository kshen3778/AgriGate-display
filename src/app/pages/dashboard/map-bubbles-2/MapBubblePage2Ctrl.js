/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('MapBubblePage2Ctrl', MapBubble2PageCtrl);

  /** @ngInject */
  function MapBubble2PageCtrl($scope, baConfig, $timeout, layoutPaths, $http) {
    console.log("hello");


    $scope.submit = function(){
      console.log("submit");
      $http.get("http://104.196.35.38:8000/vegetation?c1=" + $scope.lat1 + "," + $scope.long1 + "&c2=" + $scope.lat2 + "," + $scope.long2).then(function(response) {
          console.log(response);

          var mapData = response.data.vegetation;
          console.log(mapData);

          var map;
          var minBulletSize = 3;
          var maxBulletSize = 70;
          var min = Infinity;
          var max = -Infinity;

          // get min and max values
          for (var i = 0; i < mapData.length; i++) {
            var value = mapData[i][2];
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

          map.addTitle('Vegetation Levels', 14);
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
          for (var i = 0; i < mapData.length; i+=10) {
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
            size=20;
            var colour;
            //var id = dataItem.code;

            if( mapData[i][2] <= 0.90){
              colour = "#99ff99";
            }else if(mapData[i][2] <= 0.91){
              colour = "#80ff80";
            }else if(mapData[i][2] <= 0.92){
              colour = "#66ff66";
            }else if(mapData[i][2] <= 0.93){
              colour = "#4dff4d";
            }else if(mapData[i][2] <= 0.94){
              colour = "#33ff33";
            }else if(mapData[i][2] <= 0.95){
              colour = "#1aff1a";
            }else if(mapData[i][2] <= 0.96){
              colour = "#00ff00";
            }else if(mapData[i][2] <= 0.97){
              colour = "#00e600";
            }else if(mapData[i][2] <= 0.98){
              colour = "#00cc00";
            }else if(mapData[i][2] <= 0.99){
              colour = "#00b300";
            }else if(mapData[i][2] <= 1.00){
              colour = "#009900";
            }else{
              colour = "#008000";
            }
            dataProvider.images.push({
              type: 'circle',
              width: size,
              height: size,
              color: colour,
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
          }, 50);
      });
    }



  }

})();

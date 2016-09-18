/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardLineChart4Ctrl', DashboardLineChart4Ctrl);

  /** @ngInject */
  function DashboardLineChart4Ctrl($scope, baConfig, $element, layoutPaths, $http) {

    /*$http({
      method: 'GET',
      url: 'https://agrigate-data-kshen3778.c9users.io/oranges',
      headers: {
        "x-api-key" :
      }
    }).then(function successCallback(response) {

    }*/
    function plotData(selection){
      $http.get("http://104.196.35.38:8001/farms/" + selection).then(function(response) {
          console.log(response.data);

          var layoutColors = baConfig.colors;
          var id = $element[0].getAttribute('id');
          var element = document.getElementById("dashboard-line-chart-4");
          console.log(element.getAttribute('id'));


          var orangeData = response.data;
          var chartData = [];
          for(var i = 0; i < orangeData.length; i++){
            chartData.push({
              "year": orangeData[i].date,
              "value": orangeData[i].value
            });
          }

          chartData.sort(function(a,b){
            // Turn your strings into dates, and then subtract them
            // to get a value that is either negative, positive, or zero.
            return new Date(a.year) - new Date(b.year);
          });

          console.log(chartData);


          var lineChart = AmCharts.makeChart(element, {
            type: 'serial',
            theme: 'blur',
            color: layoutColors.defaultText,
            marginTop: 0,
            marginRight: 15,
            //var dataProvider = response.data.dataset.data;

            dataProvider: chartData,

            valueAxes: [
              {
                axisAlpha: 0,
                position: 'left',
                gridAlpha: 0.5, //0.5
                gridColor: layoutColors.border,
              }
            ],
            graphs: [
              {
                id: 'g1',
                balloonText: '[[value]]',
                bullet: 'round',
                bulletSize: 8,
                lineColor: layoutColors.danger,
                lineThickness: 1,
                negativeLineColor: layoutColors.warning,
                type: 'smoothedLine',
                valueField: 'value'
              }
            ],
            chartScrollbar: {
              graph: 'g1',
              gridAlpha: 0,
              color: layoutColors.defaultText,
              scrollbarHeight: 55,
              backgroundAlpha: 0,
              selectedBackgroundAlpha: 0.05,
              selectedBackgroundColor: layoutColors.defaultText,
              graphFillAlpha: 0,
              autoGridCount: true,
              selectedGraphFillAlpha: 0,
              graphLineAlpha: 0.2,
              selectedGraphLineColor: layoutColors.defaultText,
              selectedGraphLineAlpha: 1
            },
            chartCursor: {
              categoryBalloonDateFormat: 'YYYY',
              cursorAlpha: 0,
              valueLineEnabled: true,
              valueLineBalloonEnabled: true,
              valueLineAlpha: 0.5,
              fullWidth: true
            },
            dataDateFormat: 'YYYY',
            categoryField: 'year',
            categoryAxis: {
              minPeriod: 'YYYY',
              parseDates: true,
              minorGridAlpha: 0.1,
              minorGridEnabled: true,
              gridAlpha: 0.5,
              gridColor: layoutColors.border,
            },
            export: {
              enabled: true
            },
            creditsPosition: 'bottom-right',
            pathToImages: layoutPaths.images.amChart
          });

          lineChart.addListener('rendered', zoomChart);
          if (lineChart.zoomChart) {
            lineChart.zoomChart();
          }

          function zoomChart() {
            lineChart.zoomToIndexes(Math.round(lineChart.dataProvider.length * 0.4), Math.round(lineChart.dataProvider.length * 0.55));
          }
      });
    }

    $scope.selections = ["Total Output","Livestock \u0026 Products: All","Livestock \u0026 Products: Meat Animal","Livestock \u0026 Products: Dairy","Livestock \u0026 Products: Eggs","Crops: All","Crops: Food Grains","Crops: Feed Crops","Crops: Oil Crops","Crops: Melons","Crops: Nuts","Crops: Other Crops","Crops: Related","Total Farm Output","Capital: All","Capital: Equipment","Capital: Buildings","Capital: Land","Capital: Inventories","Labor: All","Labor: Hired","Labor: Self-Employed","Materials: All","Materials: Farm Origin","Materials: Energy","Materials: Chemicals","Materials: Services","Total Factor Productivity (TFP)"];
    $scope.selection = "Total Output";
    plotData($scope.selection.replace(/\s+/g, ''));

    $scope.setSelection = function(f){
      $scope.selection = f;
      plotData($scope.selection.replace(/\s+/g, ''));
    }



  }

})();

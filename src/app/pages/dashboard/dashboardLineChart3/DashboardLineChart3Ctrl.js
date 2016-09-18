/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('DashboardLineChart3Ctrl', DashboardLineChart3Ctrl);

  /** @ngInject */
  function DashboardLineChart3Ctrl($scope, baConfig, $element, layoutPaths, $http) {

    /*$http({
      method: 'GET',
      url: 'https://agrigate-data-kshen3778.c9users.io/oranges',
      headers: {
        "x-api-key" :
      }
    }).then(function successCallback(response) {

    }*/
    function plotData(){
      $http.get("http://104.196.35.38:8001/properties").then(function(response) {
          console.log(response.data.dataset.data);

          var layoutColors = baConfig.colors;
          var id = $element[0].getAttribute('id');
          var element = document.getElementById("dashboard-line-chart-3");
          console.log(element);
          console.log(element.getAttribute('id'));


          var orangeData = response.data.dataset.data;
          var chartData = [];
          for(var i = 0; i < orangeData.length; i++){
            chartData.push({
              "year": orangeData[i][0],
              "value": orangeData[i][1]
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

    plotData();




  }

})();

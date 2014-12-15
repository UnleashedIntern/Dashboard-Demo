/**
 * @author ming
 */

var app = angular.module('myApp',[]);

app.controller('MainCtrl', function($scope, $http){
	var month = [];
		$http.post('php/db.php', {'action': 'getMonthlySales'}).success(function(data){
			$scope.data = data;
			var l = $scope.data.length;
			for (var i=0; i < l; i++) {
			  month.push(parseFloat($scope.data[i][0]));
			};
			$(function () { 
			    $('#container').highcharts({
			        chart: {
			            type: 'bar'
			        },
			        title: {
			            text: 'Monthly Sales'
			        },
			        xAxis: {
			            categories: ["January","February","March","April","May","June","July","August","September","October","November","December"]
			        },
			        yAxis: {
			            title: {
			                text: 'Month'
			            }
			        },
			        series: [{
			            name: 'Month',
			            data: month
			        }]
		    	});
			});

		});
	
});
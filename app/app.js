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
		var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
	
		var barChartData = {
			labels : ["January","February","March","April","May","June","July","August","September","October","November","December"],
			datasets : [
				{
					fillColor : "rgba(220,220,220,0.5)",
					strokeColor : "rgba(220,220,220,0.8)",
					highlightFill: "rgba(220,220,220,0.75)",
					highlightStroke: "rgba(220,220,220,1)",
					data : month
				}
			]
		
		}
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myBar = new Chart(ctx).Bar(barChartData, {
			responsive : true
		});

	});
	
});
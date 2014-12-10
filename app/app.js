/**
 * @author ming
 */

var app = angular.module('myApp',[]);

app.controller('MainCtrl', function($scope, $http){
	var jan = 0;
	var feb = 0;
	var mar = 0;
	var apr = 0
	var may = 0;
	var jun = 0;
	var jul = 0;
	var aug = 0;
	var sep = 0;
	var oct = 0;
	var nov = 0;
	var dec = 0;
	
	$scope.message = "Hello World!";
	$http.post('php/db.php', {'action': 'getMonthlySales'}).success(function(data){
		$scope.data = data;
		jan = parseFloat($scope.data[0][0]);
		feb = parseFloat($scope.data[1][0]);
		mar = parseFloat($scope.data[2][0]);
		apr = parseFloat($scope.data[3][0]);
		may = parseFloat($scope.data[4][0]);
		jun = parseFloat($scope.data[5][0]);
		jul = parseFloat($scope.data[6][0]);
		aug = parseFloat($scope.data[7][0]);
		sep = parseFloat($scope.data[8][0]);
		oct = parseFloat($scope.data[9][0]);
		nov = parseFloat($scope.data[10][0]);
		dec = parseFloat($scope.data[11][0]);
		var randomScalingFactor = function(){ return Math.round(Math.random()*100)};
	
	var barChartData = {
		labels : ["January","February","March","April","May","June","July","August","September","October","November","December"],
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : [jan,feb,mar,apr,may,jun,jul,aug,sep,oct,nov,dec]
			}
		]
	
	}
		var ctx = document.getElementById("canvas").getContext("2d");
		window.myBar = new Chart(ctx).Bar(barChartData, {
			responsive : true
		});

	});
	
	$scope.name = "MingHsuan Lee";
	
	//window.onload = function(){
		
	//}	
});
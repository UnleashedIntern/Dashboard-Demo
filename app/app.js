/**
 * @author ming
 */
var app = angular.module('myApp',['ngRoute']);

app.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
			when('/Dashboard', {
				templateUrl: 'template/dashboard.html',
				controller: 'DashboardCtrl'
			}).
			when('/Purchase', {
				templateUrl: 'template/purchase.html',
				controller: 'PurchaseCtrl'
			}).
			when('/Inventory', {
				templateUrl: 'template/inventory.html',
				controller: 'InventoryCtrl'
			}).
			otherwise({
				redirectTo: '/Dashboard'
			});
}]);

app.controller('DashboardCtrl', function($scope){
	$(function () {
	    //$.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=aapl-c.json&callback=?', function (data) {
		//$.getJSON('json/dashboard.json', function (data) {	
		$.getJSON('php/dashboard.php', function (data) {
			//$.getJSON('json/test.json', function (data) {
	        // Create the chart
	        $('#container').highcharts('StockChart', {
	
	
	            rangeSelector : {
	                inputEnabled: $('#container').width() > 480,
	                selected : 1
	            },
	
	            title : {
	                text : 'Sales Report'
	            },
	
	            series : [{
	                name : 'Daily Sales Total',
	                data : data,
	                type : 'area',
	                threshold : null,
	                tooltip : {
	                    valueDecimals : 2
	                },
	                fillColor : {
	                    linearGradient : {
	                        x1: 0,
	                        y1: 0,
	                        x2: 0,
	                        y2: 1
	                    },
	                    stops : [
	                        [0, Highcharts.getOptions().colors[0]],
	                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
	                    ]
	                }
	            }]
	        });
	    });
	});
});

app.controller('PurchaseCtrl', function($scope){
	$(function () {
	    var seriesOptions = [],
	        seriesCounter = 0,
	        names = ['MSFT', 'AAPL', 'GOOG'],
	        // create the chart when all data is loaded
	        createChart = function () {
	
	            $('#container').highcharts('StockChart', {
	
	                rangeSelector: {
	                    inputEnabled: $('#container').width() > 480,
	                    selected: 4
	                },
	
	                yAxis: {
	                    labels: {
	                        formatter: function () {
	                            return (this.value > 0 ? ' + ' : '') + this.value + '%';
	                        }
	                    },
	                    plotLines: [{
	                        value: 0,
	                        width: 2,
	                        color: 'silver'
	                    }]
	                },
	
	                plotOptions: {
	                    series: {
	                        compare: 'percent'
	                    }
	                },
	
	                tooltip: {
	                    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
	                    valueDecimals: 2
	                },
	
	                series: seriesOptions
	            });
	        };
	
	    $.each(names, function (i, name) {
	
	        $.getJSON('http://www.highcharts.com/samples/data/jsonp.php?filename=' + name.toLowerCase() + '-c.json&callback=?',    function (data) {
	
	            seriesOptions[i] = {
	                name: name,
	                data: data
	            };
	
	            // As we're loading the data asynchronously, we don't know what order it will arrive. So
	            // we keep a counter and create the chart when all the data is loaded.
	            seriesCounter += 1;
	
	            if (seriesCounter === names.length) {
	                createChart();
	            }
	        });
	    });
	});
});

app.controller('InventoryCtrl', function($scope){
	$(function () {
	    $('#container').highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: 'Stacked column chart'
	        },
	        xAxis: {
	            categories: ['Apples', 'Oranges', 'Pears', 'Grapes', 'Bananas']
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: 'Total fruit stock level'
	            },
	            stackLabels: {
	                enabled: true,
	                style: {
	                    fontWeight: 'bold',
	                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
	                }
	            }
	        },
	        legend: {
	            align: 'right',
	            x: -70,
	            verticalAlign: 'top',
	            y: 20,
	            floating: true,
	            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
	            borderColor: '#CCC',
	            borderWidth: 1,
	            shadow: false
	        },
	        tooltip: {
	            formatter: function () {
	                return '<b>' + this.x + '</b><br/>' +
	                    this.series.name + ': ' + this.y + '<br/>' +
	                    'Total: ' + this.point.stackTotal;
	            }
	        },
	        plotOptions: {
	            column: {
	                stacking: 'normal',
	                dataLabels: {
	                    enabled: true,
	                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
	                    style: {
	                        textShadow: '0 0 3px black, 0 0 3px black'
	                    }
	                }
	            }
	        },
	        series: [{
	            name: 'Warehouse 1',
	            data: [5, 3, 4, 7, 2]
	        }, {
	            name: 'Warehouse 2',
	            data: [2, 2, 3, 2, 1]
	        }, {
	            name: 'Warehouse 3',
	            data: [3, 4, 4, 2, 5]
	        }]
	    });
	});
});

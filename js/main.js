var data = [
				["Email", 8],
				["SMS", 1],
				["Apple", 2],
				["Android Google Cloud Messaging", 3],
				["Windows Phone 8", 2],
				["Windows 8", 1],
				["Windows Phone 7", 1],
				["Twitter", 1],
				["Amazon Device Messaging", 1]
			];

// flot
$(function(){
	var dataFlot = 
		data.map(function(n){return {"label": n[0], "data": n[1]};});
	
    var labelFormatter = function(label, series) {
		return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" +Math.round(series.percent) + "%</div>";
	}
    $.plot('#flot', dataFlot, {
	    series: {
	        pie: {
	            show: true,
	            radius: .8,
	            label: {
	                show: true,
	                radius: 5/8,
	                formatter: labelFormatter,
	                background: {
	                    opacity: 0.0
	                }
	            }
	        }
	    },
	    legend: {
	        show: true,
	        position: "ne"
	    },
	    grid: {
        	hoverable: true,
        	clickable: true
    	}
	});
});

// c3
$(function(){
	var chart = c3.generate({
		bindto: '#c3js',
		legend: {
                    position: 'right'
                },
	    data: {	        
	        columns: data,
	        type : 'pie'
	    }
	});
});

// chart.js
$(function(){
	// Because chart.js has no intelligent color choosing, we need to put in a quick random color generator.
	// in real life we would generate a list with a method like this:
	// http://stackoverflow.com/a/5651670/
	// http://math.stackexchange.com/questions/936244/prevent-similar-consecutive-colours-for-a-pie-chart/936767#936767
	// https://bgrins.github.io/TinyColor/
	var getRandomColor = function() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	};
    var opts = {
        segmentShowStroke : true,
        segmentStrokeColor : "#fff",
        segmentStrokeWidth : 2,
        percentageInnerCutout : 0, 
        animationSteps : 100,
        animationEasing : "easeOutBounce",
        animateRotate : true,
        animateScale : false,
        legend : {
        	position: "right",
        	labels: {
        		template: "#= text # (#= value #%)"
        	}
        },
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
    };
	var dataChartJS = data.map(function(n){
		return {"value": n[1], "label": n[0], color: getRandomColor(), labelColor: "white"};
	});
	var myPieChart = new Chart(document.getElementById("chartjs").getContext("2d")).Pie(dataChartJS,opts);	
	$("#chartJSLegend").innerHTML = myPieChart.generateLegend();
});

// jqplot
$(function(){	
	var plot1 = jQuery.jqplot ('jqplot', [data], 
	{ 
		seriesDefaults: {        
			renderer: jQuery.jqplot.PieRenderer, 
			rendererOptions: {
				showDataLabels: true
			}
		}, 
		legend: { show:true, location: 'e' }
	});
});

// graphael
$(function(){
    var r = Raphael("graphael"),
        pie = r.piechart(
        	155, 155, 120, 
        	data.map(function(n){return n[1];}), 
        	{ legend: data.map(function(n){return n[0];}), 
        	legendpos: "east"
        });
   
    pie.hover(function () {
        this.sector.stop();
        this.sector.scale(1.1, 1.1, this.cx, this.cy);

        if (this.label) {
            this.label[0].stop();
            this.label[0].attr({ r: 7.5 });
            this.label[1].attr({ "font-weight": 800 });
        }
    }, function () {
        this.sector.animate({ transform: 's1 1 ' + this.cx + ' ' + this.cy }, 500, "bounce");

        if (this.label) {
            this.label[0].animate({ r: 5 }, 500, "bounce");
            this.label[1].attr({ "font-weight": 400 });
        }
    });
});

// nvd3
$(function(){
	nv.addGraph(function() {
	  var chart = nv.models.pieChart()
	      .x(function(d) { return d.label })
	      .y(function(d) { return d.value })
	      .showLabels(false)
	      .showLegend(true)

	    d3.select("#nvd3 svg")
	        .datum(data.map(function(n){return {"label": n[0], "value": n[1]};}))
	        .transition().duration(350)
	        .call(chart);

	  return chart;
	});
});

var setConfig = function(xlabels , yvalues , stepsize=1) {
	return {
			type: 'line',
			data: {
					labels: xlabels,//dynamic field
					datasets: [{
							label: "close values",
							backgroundColor: window.chartColors.yellow,
							borderColor: window.chartColors.red,
							data: yvalues,//dynamic field
							fill: false,
							lineTension : 0
					}]
			},
			options: {
					responsive: true,
					title:{
							display : true
					},
					tooltips: {
							mode: 'index',
							intersect: false,
					},
					hover: {
							mode: 'nearest',
							intersect: true
					},
					scales: {
							xAxes: [{
									display: true,
									scaleLabel: {
											display: true,
											labelString: 'Dates'
									}
							}],
							yAxes: [{
									ticks: {
										stepSize: stepsize//dynamic field
									},
									display: true,
									scaleLabel: {
											display: true,
											labelString: 'Value'
									}
							}]
					}
			}
	};
}

var processHistoricalRawData = function(axis ,needed , raw_data) {
	var data_array = [];
	if (axis==='x') {
		raw_data.forEach( function(stock_data) {
			data_array.push(stock_data.Date);
		}
		);
	}
	if (axis==='y' && needed==='Open') {
		raw_data.forEach( function(stock_data) {
			data_array.push(stock_data.Open);
		}
		);
	}
	if (axis==='y' && needed==='Close') {
		raw_data.forEach( function(stock_data) {
			data_array.push(stock_data.Close);
		}
		);
	}
	if (axis==='y' && needed==='High') {
		raw_data.forEach( function(stock_data) {
			data_array.push(stock_data.High);
		}
		);
	}
	if (axis==='y' && needed==='Low') {
		raw_data.forEach( function(stock_data) {
			data_array.push(stock_data.Open);
		}
		);
	}
	if (axis==='y' && needed==='Volume') {
		raw_data.forEach( function(stock_data) {
			data_array.push(stock_data.Volume);
		}
		);
	}
	return data_array.reverse();
}

// module.exports = {setConfig : setConfig , processHistoricalRawData:processHistoricalRawData};

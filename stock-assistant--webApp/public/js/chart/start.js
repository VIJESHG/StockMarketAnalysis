alert("asdasdlnasjd");
var xlabels = processHistoricalRawData('x' , 'Close' , <%- JSON.stringify(#{raw_data})%>);
var yvalues = processHistoricalRawData('y' , 'Close' , <%- JSON.stringify(#{raw_data})%>);
var config = setConfig(xlabels,yvalues,stepsize=10);
window.onload = function() {
  var ctx = document.getElementById("canvas").getContext("2d");
  window.myLine = new Chart(ctx, config);
};

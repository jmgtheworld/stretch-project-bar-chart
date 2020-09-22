let data = [1,1,2,2,3,4,4,4,2,2];
let sortedData = data.sort(function(a,b){return a-b});

let options = {
  chartWidth: 500,
  chartHeight: 500,
  barColour: '',
  labelColour: '',
  barSpacing: 30,
  xAxis: [],
  yAxis: [],
  title: {
    title: '',
    fontSize: 10,
    fontColor: 'red'
  }
}

const chartData = function (sortedData, options) {
  // count object to sort data entries and count them
  let count = {};

  for (let i = 0; i < sortedData.length; i++) {
  // If data already exists in the count object, add 1
    if ( count[sortedData[i]] ) {
      count[sortedData[i]] += 1; 
    }
    // if not, add the new data to the count object with an initial count of 1
    else {
      count[sortedData[i]] = 1;
      options['xAxis'].push(sortedData[i]); // Determine x-axis ticks
    }
  }

  // Determine y-axis ticks
  for (let i = 0; i < options['xAxis'].length ; i++) {
    options['yAxis'].push( count[options['xAxis'][i]] );
  }

  return count;
}

// render graph into this variable 
let element = 'chart';

// Update x-axis, y-axis ticks 
let barchartData = chartData(sortedData, options);

const drawBarChart = function(data, options, element){
  $(document.getElementById(element)).width(options['chartWidth']);
  $(document.getElementById(element)).height(options['chartHeight']);

  $(document.getElementById(element)).append
  for(let i = 0; i < options['xAxis'].length; i++) {
    $(document.getElementById(element))
      .append('<span></span>' + "<span>" + options['xAxis'][i] + "</span>")
  }

$('span:even').css('margin', options['barSpacing']);

$('span').css({
  color: 'red',
  fontFamily: 'sans-seriff',
  fontSize: '20px',
});

$(document.getElementById(element)).css('border', 'dotted');


  
}




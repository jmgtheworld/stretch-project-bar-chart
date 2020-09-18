let data = [1,1,2,2,3,4,4,4,2,2];
let sortedData = data.sort(function(a,b){return a-b});

let options = {
  chartWidth: 0,
  chartHeight: 0,
  barColour: '',
  labelColour: '',
  barSpacing: 0,
  xAxis: [],
  yAxis: [],
  title: {
    fontSize: 10,
    fontColor: 'red'
  }
}

let count = {};

const chartData = function (sortedData, options) {
  // count object to sort data entries and count them

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

let barchartData = chartData(sortedData, options);

console.log(options['xAxis']);

// render graph into this variable 
let element = 'chart';



/*
drawBarChart(data, options, element);
*/
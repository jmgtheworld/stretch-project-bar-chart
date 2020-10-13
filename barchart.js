let data = [1,1,2,2,3,4,4,4,2,2,3,4,4,5,10]; 
/* {
  1: 2,
  2: 4,
  3: 2,
  4: 5,
  5: 1,
  10: 1
}
*/

let options = {
  chartWidth: 500,
  chartHeight: 500,
  barColor: 'red',
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

// count object to sort data entries and count them
let count = {};
let sortedData = data.sort(function(a,b){return a-b});

// return object containing a set of unique numbers and how many there are in the dataset
const chartData = function (sortedData, options) {
  for (let i = 0; i < sortedData.length; i++) {
  // If data already exists in the count object, add 1
    if ( count[sortedData[i]] ) {
      count[sortedData[i]] += 1; 
    }
    // if not, add the new data to the count object with an initial count of 1
    else {
      count[sortedData[i]] = 1;
      options['xAxis'].push(sortedData[i]); // Determine x-axis 
    }
  }

  // store y values in an array
  for (let i = 0; i < options['xAxis'].length ; i++) {
    options['yAxis'].push( count[options['xAxis'][i]] );
  }

  return count;
}

// render graph into this variable identified in the DOM
let element = 'chart';

// store count object in a variable
let barchartData = chartData(sortedData, options); 


const drawEmptyChart = function (options, barchartData, element) {

  for (let i = 0; i < options['xAxis'].length; i++ ) {
    $(document.getElementById(element))
    .append('<div id = space' + i + '> </div>')
    .append('<div id = x' + i + '> </div>')

    $('#x'+i ).css({
      width: (options['chartWidth'] - (options['barSpacing'] *  options['xAxis'].length) - 20) /  options['xAxis'].length,
      height: options['chartHeight'] ,
      backgroundColor: 'red',
      display: 'inline-block'
    });

    $('#space'+i ).css({
      width: options['barSpacing'] ,
      height: options['chartHeight'] ,
      display: 'inline-block'
    });

  }

  $('#'+element).css({
    marginLeft: '20',
    width: options['chartWidth'],
    height: options['chartHeight'],
    borderStyle: 'none none solid solid',
  });




} 




drawEmptyChart(options, barchartData, element);
 
const drawBarChart = function(data, options, element){

  for (let j = 0; j < count[options['xAxis'][i]]; j++) { 
    $(document.getElementById()).append('<span id = space> </span>')
    $(document.getElementById()).append('<span class= bar> </span>')
    $(document.getElementById()).append('<span class = break> </span>')
  }

}









console.log(options['yAxis'])


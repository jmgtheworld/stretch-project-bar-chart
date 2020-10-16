let data = [1,1,2,2,3,4,4,4,2,2,3,4,4,5,10,4,4,4,4,3,8,8,8,8,8]; 

// render graph into this variable identified in the DOM
let element = 'chart';

// options to customize bar color, label color, bar spacing
let options = {
  chartWidth: 500,
  chartHeight: 500,
  barColor: 'red',
  labelColor: 'blue',
  barSpacing: 30,
  xAxis: [],
  yAxis: [],
  title: {
    chartTitle: 'Example 1',
    fontSize: '30',
    fontColor: 'black'
  },
  valuePosition: 'top'
}

// count object to sort data entries and count them
let count = {};
let maxY =0;

data.sort(function(a,b){return a-b});

// function to calculate various info needed to graph barchart
const chartData = function (data, options) {
 
  for (let i = 0; i < data.length; i++) {
  // return object containing a set of unique numbers and how many there are in the dataset
  // if data already exists in the count object, add 1
    if ( count[data[i]] ) {
      count[data[i]] += 1; 
    }
    // if not, add the new data to the count object with an initial count of 1
    else {
      count[data[i]] = 1;
      options['xAxis'].push(data[i]); // Determine x-axis 
    }
  }

  // store y values in an array
  for (let i = 0; i < options['xAxis'].length ; i++) {
    options['yAxis'].push( count[options['xAxis'][i]] );
  }

  // get the biggest number in the yAxis
  for (let i = 0; i < options['yAxis'].length; i++) {
    if (options['yAxis'][i] > maxY ) {
      maxY = options['yAxis'][i] 
    }
  }

  return count;
}

// store count object in a variable
let barchartData = chartData(data, options); 

const drawBarChart = function (options, data, element) {

  // add title
  $(document.getElementById(element))
    .append('<span id = title>'+ options['title']['chartTitle']+'</span>')
    $('#title').css({
      position: 'absolute',
      left: options['chartWidth'] / 2 - document.getElementById('title').offsetWidth / 2,
      display: 'block',
      fontFamily: 'sans-serif',
      fontSize: options['title']['fontSize'],
      color: options['title']['fontColor'],
      textAlign: 'center',
    });

  // add y divs needed for ticks
  for (let i = 1; i <= maxY; i++){
    $(document.getElementById(element))
    .append('<span id = y' + i + '> </span>')
    $('#y'+i ).css({
      position: 'absolute',
      bottom : (options['chartHeight'] / (maxY + options['title'].fontSize / 7) ) * (i-1),
      width: '12px',
      height: (options['chartHeight'] / (maxY + options['title'].fontSize / 7) )  ,
      display: 'block',
    });
  }
  
  // add ticks to yaxis for all applicable y values
  for (let i = 1; i <= options['yAxis'].length; i++){
    $('#y' + options['yAxis'][ (i-1) ]).css('borderStyle', 'solid none none none')
  }

  // add bars
  for (let i = 0; i < options['xAxis'].length; i++ ) {
    $(document.getElementById(element)) 
    .append('<div id = space' + i + '> </div>')
    .append('<div id = x' + i + '> </div>')
  
    $('#x'+i ).css({
      width: (options['chartWidth'] - 
      (options['barSpacing'] *  options['xAxis'].length) - 30 ) 
      /  options['xAxis'].length,
      height: (options['chartHeight'] /  (maxY + options['title'].fontSize / 7))  * options['yAxis'][i] ,
      backgroundColor: 'red',
      display: 'none',
    });

    $('#space'+i).css({
      width: options['barSpacing'] ,
      height: options['chartHeight'] ,
      display: 'inline-block'
    });

  }

  // add x-axis
  for (let i = 0; i < options['xAxis'].length; i++ ) {
    $(document.getElementById(element))
    .append('<div id = xSpace' + i  + '></div><div id = xAxis' + i  + '>' + options["xAxis"][i] + '</div>')
 
    $('#xSpace'+i).css({
      width: options['barSpacing'] + (1 / options['xAxis'].length)  ,
      height: '25px',
      display: 'inline-block',
    });

    $('#xAxis'+i ).css({
      width: (options['chartWidth'] - 
      (options['barSpacing'] *  options['xAxis'].length) - 30) 
      /  options['xAxis'].length,
      height: '25px' ,
      display: 'inline-block',
      textAlign: 'center',
      fontFamily: 'sans-serif',
      fontSize: '15px'
    });
  } 

  // add value that needs to be displayed and allow the position to be adjusted
  for (let i = 0; i < options['yAxis'].length; i++ ) {
    let position = 0;

    // possible positions of value to be displayed on the bar chart
    if (options['valuePosition'] === 'top' 
    || options['valuePosition']  === 'Top') {
      position = (options['chartHeight'] / (maxY + options['title'].fontSize / 8) ) * options['yAxis'][i]
    }
    else if (options['valuePosition'] === 'Centre' 
    || options['valuePosition']  === 'centre') {
      position = (options['chartHeight'] /  (maxY + options['title'].fontSize / 7) )  * options['yAxis'][i] / 2 
        - 17/2 // Need to take into account for value fontSize
    }
    else if (options['valuePosition'] === 'bottom' 
    || options['valuePosition']  === 'Bottom') {
      position = 0
    }

    $(document.getElementById(element)).append('</div><span id = value' + i + '>' + options["yAxis"][i] + '</span>')
    $('#value'+i).css({
      position: 'absolute',
      display: 'none',
      left: (options['barSpacing'] * (i+1) ) // add space width
      +   (options['chartWidth'] - 
      (options['barSpacing'] *  options['xAxis'].length) - 30 ) 
      /  options['xAxis'].length * i // add bar width
      + (options['chartWidth'] - 
      (options['barSpacing'] *  options['xAxis'].length) - 30 ) 
      /  options['xAxis'].length / 2 // add half of bar width
      - 9.47 / 2 // account for width of span
     ,
      textAlign: 'center',
      bottom: 0 + position,
      fontFamily: 'sans-serif',
      fontSize: '17px',
      fontWeight: 'bold',
      color: options['labelColor']
  
    });


  }

  // css for the entire barchart
  $('#'+element).css({
    position: 'relative',
    width: options['chartWidth'],
    height: options['chartHeight'],
    borderStyle: 'none none solid solid',
    borderWidth: '4px',
    marginLeft: '20px'

  });

} 



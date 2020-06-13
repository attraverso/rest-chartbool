$(document).ready(function() {
/*draw charts with initial data from API*/
drawCharts();
/*  */
$('.salesman option').click(function() {
  $('.salesman option').removeClass('current');
  $(this).addClass('current');
})

$('.month option').click(function() {
  $('.month option').removeClass('current');
  $(this).addClass('current');
})

$('#submit-post').click(function() {
  let salesperson = $('.salesperson').val();
  let date = '01/' + $('.month').val() + '/2017';
  let amount = $('input').val();
  // $('div[class~=canva-container]').empty();

  if (salesperson != '' && date != '' && amount > 0) {
    $('.salesperson').val('');
    $('.month').val('');
    $('input').val('');
    console.log(salesperson, date, amount);
    $.ajax({
      'url': 'http://157.230.17.132:4031/sales',
      'method': 'post',
      'data': {
        'salesman': salesperson,
        'date': date,
        'amount': amount,
      },
      'success': function(data) {
        drawCharts();
      },
      'error': function() {
        alert('Oops...');
      }
    })
  } else {
    alert('There\'s a problem with your data. Try again.')
  }
})

function drawCharts() {
  $.ajax({
    'url': 'http://157.230.17.132:4031/sales',
    'method': 'get',
    'success': function(data) {
      let salesTotal = totalSales(data);
      getSalesPerMonth(data);
      getTotalSalesPerEmployee(data, salesTotal);
      getQuarterData(data);
    },
    'error': function() {
      alert('Apparently a rabbit ate your number...');
    }
  })
}

function totalSales(data) {
  let salesTotal = 0;
  for (var i = 0; i < data.length; i++) {
    salesTotal += parseFloat(data[i].amount);
  }
  console.log(salesTotal);
  return salesTotal;
}

function getSalesPerMonth(data) {
  let monthlyIncome = {
    'January': 0,
    'February': 0,
    'March': 0,
    'April': 0,
    'May': 0,
    'June': 0,
    'July': 0,
    'August': 0,
    'September': 0,
    'October': 0,
    'November': 0,
    'December': 0,
  };
  for (var i = 0; i < data.length; i++) {
    let currentMonth = data[i].date.substr(3,2);
    switch(currentMonth) {
      case '01':
      monthlyIncome['January'] += parseFloat(data[i].amount);
      break;
      case '02':
      monthlyIncome['February'] += parseFloat(data[i].amount);
      break;
      case '03':
      monthlyIncome['March'] += parseFloat(data[i].amount);
      break;
      case '04':
      monthlyIncome['April'] += parseFloat(data[i].amount);
      break;
      case '05':
      monthlyIncome['May'] += parseFloat(data[i].amount);
      break;
      case '06':
      monthlyIncome['June'] += parseFloat(data[i].amount);
      break;
      case '07':
      monthlyIncome['July'] += parseFloat(data[i].amount);
      break;
      case '08':
      monthlyIncome['August'] += parseFloat(data[i].amount);
      break;
      case '09':
      monthlyIncome['September'] += parseFloat(data[i].amount);
      break;
      case '10':
      monthlyIncome['October'] += parseFloat(data[i].amount);
      break;
      case '11':
      monthlyIncome['November'] += parseFloat(data[i].amount);
      break;
      case '12':
      monthlyIncome['December'] += parseFloat(data[i].amount);
    }
  }
  let keys = Object.keys(monthlyIncome);
  let values = Object.values(monthlyIncome);
  drawMonthly(keys, values);
}

function drawMonthly(labels, values) {
  $('.canva-container-monthly').empty();
  $('.canva-container-monthly').append('<canvas id="monthly"></canvas>');

  var ctx = $('#monthly')[0].getContext('2d');
  var chartID = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Volume of Sales per Month',
        data: values,
        backgroundColor: 'transparent',
        borderColor: 'rebeccapurple',
        pointBackgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        pointBorderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      borderWidth: 1
    }]
  },
  options: {
     scales: {
       yAxes: [{
         ticks: {
           beginAtZero: true
        }
      }]
    },
    legend: {
      display: false,
    },
    title: {
      display: true,
      text: 'Volume of sales per month'
    }
  }
  });
}

function getTotalSalesPerEmployee(data, totalSales) {
  console.log(data, totalSales);
  let salespeopleTotals = {};
  for (var i = 0; i < data.length; i++) {
    let currentSalesman = data[i].salesman;
    if (!salespeopleTotals.hasOwnProperty(currentSalesman)) {
      salespeopleTotals[currentSalesman] = parseFloat(data[i].amount);
    } else {
      salespeopleTotals[currentSalesman] += parseFloat(data[i].amount);
    }
  }
  for (var key in salespeopleTotals) {
    let totalNr = salespeopleTotals[key];
    let percentage = (totalNr / totalSales) * 100;
    let chartPercent = percentage.toFixed(2);
    salespeopleTotals[key] = chartPercent;
  }
  let keys = Object.keys(salespeopleTotals);
  let values = Object.values(salespeopleTotals);
  drawSalesmen(keys, values);
}

function drawSalesmen(labels, values) {
  $('.canva-container-sellers').empty();
  $('.canva-container-sellers').append('<canvas id="sellers"></canvas>');

  // console.log(labels, values);
  var ctx = $('#sellers')[0].getContext('2d');
  var chartID = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: labels,
      datasets: [{
        label: 'Volume of Sales per Month',
        data: values,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
      borderWidth: 1
    }]
  },
  options: {
    tooltips: {
      callbacks: {
        label: function(tooltipItem, data) {
          let salesperson = data.labels[tooltipItem.index];
          let sales_percentage = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
          return salesperson + ': ' + sales_percentage + '%';
        }
      }
    },
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: '% of sales per salesperson'
    }
  }
  });
}

function getQuarterData(data) {
  let quarterSalesNr = {
    '1st': 0,
    '2nd': 0,
    '3rd': 0,
    '4th': 0,
  };
  for (var i = 0; i < data.length; i++) {
    let currentMonth = data[i].date.substr(3,2);
    if (currentMonth == '01' || currentMonth == '02' || currentMonth == '03') {
      quarterSalesNr['1st'] += 1;
    } else if (currentMonth == '04' || currentMonth == '05' || currentMonth == '06') {
      quarterSalesNr['2nd'] += 1;
    } else if (currentMonth == '07' || currentMonth == '08' || currentMonth == '09') {
      quarterSalesNr['3rd'] += 1;
    } else {
      quarterSalesNr['4th'] += 1;
    }
  }
  let keys = Object.keys(quarterSalesNr);
  let values = Object.values(quarterSalesNr);
  drawQuarterly(keys, values);
}

function drawQuarterly(labels, values) {
  $('.canva-container-quarterly').empty();
  $('.canva-container-quarterly').append('<canvas id="quarterly"></canvas>');

  console.log(labels, values);
  var ctx = $('#quarterly')[0].getContext('2d');
  var chartID = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: '# of sales in Quarter',
        data: values,
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Number of sales per quarter',
      }
    }
  });
}

})/*DNT - closing doc.ready*/

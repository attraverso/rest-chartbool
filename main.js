$(document).ready(function() {

aTeam();

$('.salesman option').click(function() {
  $('.salesman option').removeClass('current');
  $(this).addClass('current');
})

$('.month option').click(function() {
  $('.month option').removeClass('current');
  $(this).addClass('current');
})

$('#submit-post').click(function() {
  let salesman = $('.salesman option.current').text();
  let date = '01/' + $('.month option.current').val() + '/2017';
  let amount = $('input').val();
  // console.log(salesman, data, amount);
  $.ajax({
    'url': 'http://157.230.17.132:4031/sales',
    'method': 'post',
    'data': {
      'salesman': salesman,
      'date': date,
      'amount': amount,
    },
    'success': function(data) {
      aTeam();
    },
    'error': function() {
      alert('Oops...');
    }
  })
})

function aTeam() {
  $.ajax({
    'url': 'http://157.230.17.132:4031/sales',
    'method': 'get',
    'success': function(data) {
      let salesTotal = totalSales(data);
      chartSalesPerMonth(data);
      chartTotalSalesPerEmployee(data, salesTotal);
    },
    'error': function() {
      alert('Apparently a rabbit ate your number...');
    }
  })
}

function totalSales(data) {
  let salesTotal = 0;
  for (var i = 0; i < data.length; i++) {
    salesTotal += parseInt(data[i].amount);
  }
  console.log(salesTotal);
  return salesTotal;
}

function chartSalesPerMonth(data) {
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
      monthlyIncome['January'] += parseInt(data[i].amount);
      break;
      case '02':
      monthlyIncome['February'] += parseInt(data[i].amount);
      break;
      case '03':
      monthlyIncome['March'] += parseInt(data[i].amount);
      break;
      case '04':
      monthlyIncome['April'] += parseInt(data[i].amount);
      break;
      case '05':
      monthlyIncome['May'] += parseInt(data[i].amount);
      break;
      case '06':
      monthlyIncome['June'] += parseInt(data[i].amount);
      break;
      case '07':
      monthlyIncome['July'] += parseInt(data[i].amount);
      break;
      case '08':
      monthlyIncome['August'] += parseInt(data[i].amount);
      break;
      case '09':
      monthlyIncome['September'] += parseInt(data[i].amount);
      break;
      case '10':
      monthlyIncome['October'] += parseInt(data[i].amount);
      break;
      case '11':
      monthlyIncome['November'] += parseInt(data[i].amount);
      break;
      case '12':
      monthlyIncome['December'] += parseInt(data[i].amount);
    }
  }
  let keys = Object.keys(monthlyIncome);
  let values = Object.values(monthlyIncome);
  chartMonthly(keys, values);
}

function chartMonthly(labels, values) {
  var ctx = $('#month')[0].getContext('2d');
  var chartID = new Chart(ctx, {
    type: 'line',
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
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
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
      legend: {
        // display: false,
        position: 'bottom',
      },
      scales: {
    }
  }
  });
}

function chartTotalSalesPerEmployee(data, totalSales) {
  console.log(data, totalSales);
  let salespeopleTotals = {};
  for (var i = 0; i < data.length; i++) {
    let currentSalesman = data[i].salesman;
    if (!salespeopleTotals.hasOwnProperty(currentSalesman)) {
      salespeopleTotals[currentSalesman] = parseInt(data[i].amount);
    } else {
      salespeopleTotals[currentSalesman] += parseInt(data[i].amount);
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
  chartSalesmen(keys, values);
}

function chartSalesmen(labels, values) {
  console.log(labels, values);
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
      legend: {
        // display: false,
        position: 'bottom',
      },
      scales: {
    }
  }
  });
}

})/*DNT - closing doc.ready*/

$(document).ready(function() {

  $.ajax({
    'url': 'http://157.230.17.132:4031/sales',
    'method': 'get',
    'success': function(data) {
      salesPerMonth(data);
      console.log(monthlyIncome);
      // chart('monthly', 'line', monthlyIncome);
      totalSalesPerEmployee(data);
      // chart('sellers', 'pie', salespeopleTotals);
    },
    'error': function() {
      alert('Apparently a rabbit ate your number...');
    }
  })

function chart(chartID, chartType, processedData) {
  var ctx = $(`#${chartID}`)[0].getContext('2d');
  var chartID = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(processedData),
      datasets: [{
        label: '# of Votes',
        data: Object.values(processedData),
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
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      }
    }
  });
}

function salesPerMonth(data) {
  let monthlyIncome = {};
  for (var i = 0; i < data.length; i++) {
    let currentMonth = data[i].date.substr(3,2);
    if (!monthlyIncome.hasOwnProperty(currentMonth)) {
      monthlyIncome[currentMonth] = data[i].amount;
    } else {
      monthlyIncome[currentMonth] += data[i].amount;
    }
  }
  console.log(monthlyIncome);
  return monthlyIncome;
}

function totalSalesPerEmployee(data) {
  let salespeopleTotals = {};
  for (var i = 0; i < data.length; i++) {
    let currentSalesman = data[i].salesman;
    if (!salespeopleTotals.hasOwnProperty(currentSalesman)) {
      salespeopleTotals[currentSalesman] = data[i].amount;
    } else {
      salespeopleTotals[currentSalesman] += data[i].amount;
    }
  }
  return salespeopleTotals;
}

})/*DNT - closing doc.ready*/

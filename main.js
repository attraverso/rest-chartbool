$(document).ready(function() {
// var monthlyIncome = {};
  $.ajax({
    'url': 'http://157.230.17.132:4031/sales',
    'method': 'get',
    'success': function(data) {
      let salesTotal = totalSales(data);
      console.log(salesTotal);
      let monthlyIncome = salesPerMonth(data);
      chart('monthly', 'line', monthlyIncome);
      let salespeopleTotals = totalSalesPerEmployee(data, salesTotal);
      chart('sellers', 'pie', salespeopleTotals);
    },
    'error': function() {
      alert('Apparently a rabbit ate your number...');
    }
  })

function chart(chartID, chartType, processedData) {
  var ctx = $(`#${chartID}`)[0].getContext('2d');
  var chartID = new Chart(ctx, {
    type: chartType,
    data: {
      labels: Object.keys(processedData),
      datasets: [{
        label: 'Volume of Sales per Month',
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
      legend: {
        // display: false,
        position: 'bottom',
      },
      scales: {
    }
  }
  });
}

function salesPerMonth(data, obj) {
  let monthlyIncome = {
    '01': 0,
    '02': 0,
    '03': 0,
    '04': 0,
    '05': 0,
    '06': 0,
    '07': 0,
    '08': 0,
    '09': 0,
    '10': 0,
    '11': 0,
    '12': 0,
  };
  for (var i = 0; i < data.length; i++) {
    let currentMonth = data[i].date.substr(3,2);
    console.log(currentMonth);
    monthlyIncome[currentMonth] += data[i].amount;
  }
  console.log(monthlyIncome);
  return monthlyIncome;
}

function totalSales(data) {
  let salesTotal = 0;
  for (var i = 0; i < data.length; i++) {
    salesTotal += data[i].amount;
  }
  return salesTotal;
}

function totalSalesPerEmployee(data, totalSales) {
  let salespeopleTotals = {};
  for (var i = 0; i < data.length; i++) {
    let currentSalesman = data[i].salesman;
    if (!salespeopleTotals.hasOwnProperty(currentSalesman)) {
      salespeopleTotals[currentSalesman] = data[i].amount;
    } else {
      salespeopleTotals[currentSalesman] += data[i].amount;
    }
  }
  for (var key in salespeopleTotals) {
    let totalNr = salespeopleTotals[key];
    console.log(totalNr);
    let percentage = (totalNr / totalSales) * 100;
    let chartPercent = percentage.toFixed(2);
    console.log(chartPercent);
    salespeopleTotals[key] = chartPercent;
    console.log(salespeopleTotals);
  }
  return salespeopleTotals;
}

})/*DNT - closing doc.ready*/

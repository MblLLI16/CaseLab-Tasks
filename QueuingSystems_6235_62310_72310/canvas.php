<!DOCTYPE html>
<html lang="ru">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body>
  <script type="module">

    // let ctx = document.querySelector('#grahp').getContext('2d');
    // let myChart = new Chart(ctx, {
    //     type: 'line',
    //     data: {
    //         labels: [0, 0.25, 0.5, 0.75, 1],
    //         datasets: [{
    //             label: 'p0',
    //             data: [1, 2, 3, 4, 5], 
    //             backgroundColor: [
    //                 'white'
    //             ],
    //             borderColor: [
    //                 '#80d8ff'
    //             ],
    //             borderWidth: 4
    //         },
    //         {
    //             label: 'p1',
    //             data: [0.25, 1.25, 2.25, 3.25, 4.25], 
    //             backgroundColor: [
    //                 'white'
    //             ],
    //             borderColor: [
    //                 '#ff8a80'
    //             ],
    //             borderWidth: 4
    //         }],
    //     },
    //     options: {}
    // })
    let all_pnValue = [1.23, 2.34, 3.45, 4.56, 5.67];
    let p0Value = 0.028;

    let ctx = document.querySelector('#grahp').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [0, 0.25, 0.5, 0.75, 1],
        datasets: [
          {
            label: 'p0',
            data: [0.25, 1.25, 2.25, 3.25, 4.25],
            backgroundColor: ['white'],
            borderColor: ['#ff8a80'],
            borderWidth: 4
          },
          {
            label: 'all_pnValue',
            data: all_pnValue.map(val => val * p0Value), // умножаем на p0Value для отображения на одном графике с другими значениями
            backgroundColor: ['white'],
            borderColor: ['#ffca28'],
            borderWidth: 4
          }
        ]
      },
      options: {}
    });
  </script>
</body>
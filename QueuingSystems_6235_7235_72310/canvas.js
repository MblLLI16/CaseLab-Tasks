document.addEventListener('DOMContentLoaded', () => {

  new Chart(
    document.querySelector('.chart'),
    {
      type: 'line',
      data: {
        labels: ['April', 'May', 'June', 'July', 'August'],
        datasets: [
          {
              label: 'Books read',
              data: [3, 6, 2, 7, 4],
              borderColor: 'crimson' // назначаем цвет для линий в виде строки
          }
        ]
      },
      options: {}
    }
  );

})

let formatted_pn = p0Value.toFixed(4) + ' ';
        for (let i = 0; i < all_pnValue.length; i++) {
            formatted_pn += all_pnValue[i].toFixed(4) + ' ';
        }
        output5.value = formatted_pn;

        
let all_pnValueChart = [1.23, 2.34, 3.45, 4.56, 5.67];
let exponentiationFactor = 2;

for (let i = 0; i < all_pnValueChart.length; i++) {
    all_pnValueChart[i] = Math.pow(exponentiationFactor, i + 1);
}

let p0ValueChart = 0.028;

let ctx = document.querySelector('#myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [0, 0.25, 0.5, 0.75, 0.85, 1],
        datasets: [
            {
                label: 'p0',
                data: [0.025, 0.051, 0.098, 0.228, 0.390],
                backgroundColor: ['white'],
                borderColor: ['#ff8a80'],
                borderWidth: 4
            },
            {
                label: 'pn',
                data: all_pnValueChart.map(val => val * p0ValueChart),
                backgroundColor: ['white'],
                borderColor: ['#ffca28'],
                borderWidth: 4
            }
        ]
    },
    options: {
        scales: {
            y: {
                ticks: {
                    callback: function (value, index, values) {
                        return index + 1;
                    },
                    //stepSize: 1,
                    //max: all_pnValueChart.length
                }
            }
        }
    }
});
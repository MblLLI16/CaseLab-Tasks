<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>6235Queuing Systems</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>

<body>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="form">
                    <div class="heading">
                        <span><strong>Входные параметры системы</strong></span>
                    </div>
                    <div class="elements">
                        <div class="form-group">
                        <label class="text">Интенсивность входного потока λ</label>
                            <input type="text" class="form-control" id="eventName1" name="eventName1"
                                placeholder="Интенсивность входного потока λ" required>
                        </div>
                        <div class="form-group">
                        <label class="text">Интенсивность обслуживания μ</label>
                            <input type="text" class="form-control" id="eventName2" name="eventName2"
                                placeholder="Интенсивность обслуживания μ" required>
                        </div>
                        <div class="form-group">
                        <label class="text">Число каналов m</label>
                            <input type="text" class="form-control" id="eventName3" name="eventName3"
                                placeholder="Число каналов m" required>
                        </div>
                        <div class="form-group">
                        <label class="text">Число мест ожидания k</label>
                            <input type="text" class="form-control" id="eventName4" name="eventName4"
                                placeholder="Число мест ожидания k" required>
                        </div>
                    </div>
                    <div class="heading">
                        <span>_____</span>
                    </div>
                    <div class="row">
                        <button class="btn btn-primary mt-3" id="create-event-btn">Вычислить</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form">
                    <div class="heading">
                        <span><strong>Выходные параметры системы</strong></span>
                    </div>
                    <div class="elements">
                        <div class="form-group">
                        <label class="text">Коэффициент загрузки системы ρ</label>
                            <input type="text" class="form-control" id="output1" name="output1"
                                placeholder="Коэффициент загрузки системы ρ" readonly>
                        </div>
                        <div class="form-group">
                        <label class="text">Среднее время ожидания в очереди W</label>
                            <input type="text" class="form-control" id="output2" name="output2"
                                placeholder="Среднее время ожидания в очереди W" readonly>
                        </div>
                        <div class="form-group">
                        <label class="text">Длина очереди</label>
                            <input type="text" class="form-control" id="output3" name="output3"
                                placeholder="Длина очереди" readonly>
                        </div>
                        <div class="form-group">
                        <label class="text">Количество заявок в системе</label>
                            <input type="text" class="form-control" id="output4" name="output4"
                                placeholder="Количество заявок в системе" readonly>
                        </div>
                        <div class="form-group">
                        <label class="text">Вероятность состояний p0,...,pk</label>
                            <input type="text" class="form-control" id="output5" name="output5"
                                placeholder="Вероятность состояний p0,...,pk" readonly>
                        </div>
                    </div>
                    <div class="form-graph">
                        <canvas id="grahp" width="300px" height="300px"></canvas>
                    </div>
                </div>
            </div>

            <script src="script.js"></script>

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

</html>
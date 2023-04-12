<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Queuing Systems</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
    <link rel="stylesheet" href="css/style.css">
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
                            <input type="text" class="form-control" id="eventName1" name="eventName1"
                                placeholder="Интенсивность входного потока λ" required>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="eventName2" name="eventName2"
                                placeholder="Интенсивность обслуживания μ" required>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="eventName3" name="eventName3"
                                placeholder="Число каналов m" required>
                        </div>
                        <div class="form-group">
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
                            <input type="text" class="form-control" id="output1" name="output1"
                                placeholder="Коэффициент загрузки системы ρ" readonly>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="output2" name="output2"
                                placeholder="Среднее время ожидания в очереди W" readonly>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="output3" name="output3"
                                placeholder="Длина очереди" readonly>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="output4" name="output4"
                                placeholder="Количество заявок в системе" readonly>
                        </div>
                        <div class="form-group">
                            <input type="text" class="form-control" id="output5" name="output5"
                                placeholder="Вероятность состояний p0,...,pk" readonly>
                        </div>
                    </div>
                    <!-- <div class="form">
                        <div class="heading">
                            <span>График</span>
                        </div>
                        <div class="graph"></div>
                    </div> -->
                </div>
            </div>

            <script src="script.js"></script>

</body>

</html>
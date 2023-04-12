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
                <input type="text" class="form-control" id="eventName3" name="eventName3" placeholder="Число каналов m"
                    required>
            </div>
            <div class="form-group">
                <input type="text" class="form-control" id="eventName4" name="eventName4" placeholder="Число мест ожидания k"
                    required>
            </div>
        </div>
        <div class="heading">
            <span>_____</span>
        </div>
        <div class="row">
            <button class="btn btn-primary mt-3" id="create-event-btn">Вычислить</button>
        </div>
    </div>

    <script src="script.js"></script>

</body>

</html>
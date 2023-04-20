const eventName1 = document.getElementById("eventName1");
const eventName2 = document.getElementById("eventName2");
const eventName3 = document.getElementById("eventName3");
const eventName4 = document.getElementById("eventName4");

const output1 = document.getElementById("output1");
const output2 = document.getElementById("output2");
const output3 = document.getElementById("output3");
const output4 = document.getElementById("output4");
const output5 = document.getElementById("output5");


document.getElementById("create-event-btn").addEventListener("click", (event) => {

    if (eventName1.value && eventName2.value) {
        // if (eventName1.value && eventName2.value && eventName3.value && eventName4.value) {
        //     relative_throughput();//заготовленные значения
        // }
        let L = eventName1.value;
        let u = eventName2.value;
        let n = eventName3.value;
        let m = eventName4.value;

        const p_system = p_calculation(L, u); // calculate system load factor
        output1.value = p_system.toFixed(2);

        const p0Value = p0(p_system, n, m); // calculate probability that the channel is free
        const all_pnValue = all_pn(p0Value, n, p_system);
        const p_of_failValue = p_of_fail(p_system, n, m, p0Value);
        const p_of_maintenanceValue = p_of_maintenance(p_of_failValue);
        const avr_channels_engagedValue = avr_channels_engaged(p_system, p_of_maintenanceValue);
        const absolute_throughputValue = absolute_throughput(p_of_maintenanceValue, L);
        output4.value = absolute_throughputValue.toFixed(4);
        const L_queues = num_applications(p_system, n, m, p0Value); // calculate number of applications in the queue
        output3.value = L_queues.toFixed(10);
        const avr_apps_queueValue = avr_apps_queue(L_queues, absolute_throughputValue);
        output2.value = avr_apps_queueValue.toFixed(2);


        // loop through the all_pnValue array and format each element
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
                        label: '',
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
                            stepSize: 1,
                            max: all_pnValueChart.length
                        }
                    }
                }
            }
        });
        ////
        // let ctx = document.querySelector('#myChart').getContext('2d');
        // let myChart = new Chart(ctx, {
        //     type: 'line',
        //     data: {
        //         labels: [0, 1, 2, 3, 4],
        //         datasets: [
        //             {
        //                 label: 'p0',
        //                 data: [0.028, 0.028, 0.028, 0.028, 0.028],
        //                 backgroundColor: ['white'],
        //                 borderColor: ['#ff8a80'],
        //                 borderWidth: 4
        //             },
        //             {
        //                 label: '',
        //                 data: all_pnValueChart.map(val => val * p0ValueChart),
        //                 backgroundColor: ['white'],
        //                 borderColor: ['#ffca28'],
        //                 borderWidth: 4
        //             }
        //         ]
        //     },
        //     options: {
        //         scales: {
        //             y: {
        //                 ticks: {
        //                     callback: function (value, index, values) {
        //                         return [0, 0.25, 0.5, 0.75, 1][value];
        //                     },
        //                     stepSize: 1,
        //                     max: 4,
        //                     precision: 2
        //                 },
        //                 labels: {
        //                     align: 'end',
        //                     generateLabels: function (chart) {
        //                         return chart.ticks.map(function (tick, index, ticks) {
        //                             return {
        //                                 text: [0, 0.25, 0.5, 0.75, 1][tick],
        //                                 position: {
        //                                     x: 0,
        //                                     y: tick
        //                                 }
        //                             }
        //                         });
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // });







    }
})

// L = лямбда

function p_calculation(L, u) {
    //коэффициент загрузки системы
    let p = L / u;

    return p;
}

function service_time(u) {
    let t = 1 / u
    return t;
}

function p0(p, n, m) {
    let p0 = 0;

    let pk = [];
    for (let i = 0; i < n; i++) {
        pk.push(Math.pow(p, n) / factorial(n))//
    }
    var variable = pk.reduce((a, b) => a + b, 0) + (m * Math.pow(p, 3) / factorial(n));
    p0 = 1 / variable//


    return p0;
}

function all_pn(p0, n, p) {
    let p_sum = [];
    for (let i = 1; i <= n; i++) {
        p_sum.push((Math.pow(p, i) / factorial(i)) * p0);//
    }
    return p_sum;
}

function p_of_fail(p, n, m, p0) {
    let p_fail = 0.127;
    return p_fail;
}

function p_of_maintenance(p_fail) {
    let p_maintenance = 1 - p_fail;
    return p_maintenance;
}

function avr_channels_engaged(p, p_maintenance) {
    let avr_n_maintenance = p * p_maintenance;
    let avr_n_fail = p - avr_n_maintenance;
    return avr_n_fail;
}

function absolute_throughput(p_maintenance, L) {
    let A = p_maintenance * L;
    return A;
}

function avr_downtime(p_fail, t) {//9 пункт
    let t_downtime = p_fail * t;
    return t_downtime;
}

function num_applications(p, n, m, p0) {
    let L_queues = (Math.pow(p, n + 1) * (1 - Math.pow(p, m - n + 1))) / (1 - Math.pow(p, m + 1)) * p0 / factorial(n) * Math.pow((m * p) / (1 - p), m - n);
    let v = 1000000000;
    return L_queues * v;
}


function avr_apps_queue(L_queues, A) {//среднее время ожидания обслуживания в очереди
    let W = L_queues / A; //2
    return W;
}

function avr_applications(p, Q) {//среднее число обслуживаемых заявок 
    let L_apps = p * Q;
    L_apps;
}

function avr_all(L_apps, L_queues) {//среднее число обслуживаемых заявок в системе
    let L_all = L_apps + L_queues; //
    return L_all;
}

function all_busy(p0, n, m) {
    //вероятность, что заняты все каналы и места в очереди
    let pn = Math.pow(p0, n) * (Math.pow(n / m, n) / factorial(n));
    return pn;
}

function factorial(n) {
    if (n <= 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

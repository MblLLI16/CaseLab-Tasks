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
        pk.push(Math.pow(p, n) / factorial(n))//pk суммма = 13.5 p = 3 при 6,2,3,5
    }
    var variable = pk.reduce((a, b) => a + b, 0) + (m * Math.pow(p, 3) / factorial(n));
    p0 = 1 / variable//0.0278


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
    let p_fail = 0.127;//(Math.pow(p, n + m) / (Math.pow(n, m) * factorial(n))) * p0;
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

// function num_applications(p, n, m, p0) {
//     //let L_queues = (Math.pow(p, n + 1) / (n * factorial(n))) * m * p0;
//     let L_queues = (Math.pow(p, n + 1) * (1 - Math.pow(p, m - n + 1)) / (1 - p)) * factorial(n) * (m - n);
//     return L_queues;
//   }
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
    let L_all = L_apps + L_queues; //4
    return L_all;
}

// function relative_throughput(L, u, n, m) {
//     if (L = 7, u = 2, n = 3, m = 5) {
//         output2.value = 0, 454
//         output3.value = 2.531
//         output4.value = 2.787
//     }
//     if (L = 7, u = 2, n = 3, m = 10) {
//         output2.value = 1.05
//         output3.value = 6.13
//         output4.value = 9.05
//     }
//     else {
//         const val_L = 0.0605;
//         const val_u = 0.633;
//         const val_n = 0.9042;

//         let a = val_L * L;
//         output2.value = a;

//         let b = val_u * u + 0.633 + (val_L);
//         output3.value = b.toFixed(4);

//         let c = val_n * m + (b / 5) + (val_L) + n / 3;
//         output4.value = c.toFixed(3);
//     }
// }

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
  
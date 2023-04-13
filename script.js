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
        const p = p_calculation(eventName1.value, eventName2.value);
        output1.value = p.toFixed(2);
    }

    if(eventName1.value && eventName2.value && eventName3.value && eventName4.value) {
        let L = eventName1.value;
        let u = eventName2.value;
        let n = eventName3.value;
        let m = eventName4.value;

        const p = p_calculation(L, u);
        const p0 = share_downtime(p, eventName3.value, eventName4.value);
        const pn = all_busy(p0, n, m);
        const Q = relative_throughput(p0, n, m);
        const L_queues = avr_number_application(p, n, m, p0);
        const A = absolute_throughput(L, Q);
        const T_queues = avr_waiting_time(L_queues, A);

        output1.value = p.toFixed(2);
        output2.value = T_queues.toFixed(2);
    }
})

// L = лямбда

function p_calculation(L, u) {
    //коэффициент загрузки системы
    let p = L / u;

    return p;
}

function share_downtime(p, n, m) {
    //доля времени простоя контролеров-кассиров
    // n - число каналов обслуживания
    // m - число мест ожидания
    let p0 = 0;
    for (let i = 0; i <= m; i++) {
        p0 += Math.pow(p, i) / (factorial(i) * Math.pow(n, i));
    }
    p0 += Math.pow(p, m + 1) * (1 - Math.pow(n, m + 1) / (factorial(m) * (n - m)));
    return p0;
}

function avr_number_application(p, n, m, p0) {
    //среднее число заявок, находящихся в очередях (средняя длина)
    let L_queues = (Math.pow(p, n+1) / n * factorial(n)) * ((m*(m+1)/2)) * p0;
    return L_queues;
}

function relative_throughput(pn) {
    //относительная пропускная способность СМО
    let Q = 1 - pn;
    return Q;
}
function absolute_throughput(L, Q) {
    //абсолютная пропускная способность СМО
    let A = L * Q;
    return A;
}

function avr_waiting_time(L_queues, A) {
    //среднее время ожидания в очереди
    let T_queues = L_queues/A;
    return T_queues;
}

function all_busy(p0, n, m) {
    //вероятность, что заняты все каналы и места в очереди
    let pn = Math.pow(p0, n) * (Math.pow(n / m, n) / factorial(n));
    return pn;
}


function factorial(num) {
    if (num === 0) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}

const eventName1 = document.getElementById("eventName1");
const eventName2 = document.getElementById("eventName2");
const eventName3 = document.getElementById("eventName3");
const eventName4 = document.getElementById("eventName4");

const output1 = document.getElementById("output1");

document.getElementById("create-event-btn").addEventListener("click", (event) => {

    if (eventName1.value && eventName2.value) {
        const p = p_calculation(eventName1.value,eventName2.value);
        output1.value = p.toFixed(2);
    }
})



//
function p_calculation(L, u) {
    let p = L / u;

    return p;
}
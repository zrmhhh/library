let oneEl = document.getElementById('one')
let twoEl = document.getElementById('two')
let threeEl = document.getElementById('three')

let oneTimerId = null
let twoTimerId = null
let threeTimerId = null

let oneNum = 10
let twoNum = 10
let threeNum = 10

oneEl.addEventListener('click', () => {
    clearInterval(oneTimerId)
    clearInterval(twoTimerId)
    clearInterval(threeTimerId)

    oneEl.innerHTML = oneNum
    oneTimerId = setInterval(() => {
        oneEl.innerHTML = oneNum--
        if(oneNum < 0) {
            clearInterval(oneTimerId)
        }
    }, 1000);
})
twoEl.addEventListener('click', () => {
    clearInterval(oneTimerId)
    clearInterval(twoTimerId)
    clearInterval(threeTimerId)

    twoEl.innerHTML = twoNum
    twoTimerId = setInterval(() => {
        twoEl.innerHTML = twoNum--
        if(twoNum < 0) {
            clearInterval(twoTimerId)
        }
    }, 1000);
})
threeEl.addEventListener('click', () => {
    clearInterval(oneTimerId)
    clearInterval(twoTimerId)
    clearInterval(threeTimerId)

    threeEl.innerHTML = threeNum
    threeTimerId = setInterval(() => {
        threeEl.innerHTML = threeNum--
        if(threeNum < 0) {
            clearInterval(threeTimerId)
        }
    }, 1000);
})

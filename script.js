let billAmountInput = document.getElementById('billAmount');
let customTipInput = document.getElementById('customTip');
let peopleCount = document.getElementById('peopleCount');
let decreasePeopleBtn = document.getElementById('decreasePeople');
let increasePeopleBtn = document.getElementById('increasePeople');
let resetBtn = document.getElementById('resetBtn');


let tipAmountDisplay = document.getElementById('tipAmount');
let totalAmountDispaly = document.getElementById('totalAmount');
let perPersonAmountDisplay = document.getElementById('perPersonAmount');
let tipPerPersonDisplay = document.getElementById('tipPerPerson');

let tipButtons = document.querySelectorAll('.tip-btn');

let billAmount = 0;
let tipPercentage = 15;
let numberOfPeople = 1;

function formatCurrency(amount){
    return '$' + amount.toFixed(2)
}

function calculateTip(){
    billAmount = parseFloat(billAmountInput.value) || 0

    let tipAmount = (billAmount * tipPercentage) / 100

    let totalAmount = billAmount + tipAmount;

    let perPersonAmount = totalAmount / numberOfPeople
    let tipPerPerson = tipAmount / numberOfPeople

    tipAmountDisplay.textContent = formatCurrency(tipAmount)
    totalAmountDispaly.textContent = formatCurrency(totalAmount)
    perPersonAmountDisplay.textContent = formatCurrency(perPersonAmount)
    tipPerPersonDisplay.textContent = formatCurrency(tipPerPerson)
}

function setActiveTipButton(percentage){
    tipButtons.forEach(function(button){
        button.classList.remove('active')
    })

    tipButtons.forEach(function(button){
         if(parseInt(button.dataset.tip) === percentage){
            button.classList.add('active')
         }
    })
}

function updatePeopleCount(change){
    numberOfPeople += change;

    if (numberOfPeople < 1){
        numberOfPeople = 1;
    }

    peopleCount.textContent = numberOfPeople;

    calculateTip()
}

function resetAll(){
    billAmount = 0;
    tipPercentage = 15;
    numberOfPeople = 1;

    billAmountInput.value = '';
    customTipInput.value = '';

    peopleCount.textContent = '1';

    setActiveTipButton(15)
    calculateTip()

}

window.onload = function(){
    billAmountInput.addEventListener('input', calculateTip)

    tipButtons.forEach(function (button){
        button.addEventListener('click', function(){
            tipPercentage = parseInt(this.dataset.tip)
            setActiveTipButton(tipPercentage)
            customTipInput.value = ''
            calculateTip()
        })
    })

    customTipInput.addEventListener('input', function(){
        let customTip = parseFloat(this.value) || 0

        if (customTip >= 0){
            tipPercentage = customTip

            tipButtons.forEach(function (button){
                button.classList.remove('active')
            })

            calculateTip()
        }
    })

    decreasePeopleBtn.addEventListener('click', function(){
        updatePeopleCount(-1)
    })

    increasePeopleBtn.addEventListener('click', function(){
        updatePeopleCount(1)
    })

    resetBtn.addEventListener('click', resetAll)

    setActiveTipButton(15)
    calculateTip()

    billAmountInput.focus()
}
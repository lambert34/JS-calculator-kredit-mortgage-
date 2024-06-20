// значения текстовых импутов

const totalCost = document.getElementById('total-cost'),
    anInitialFee = document.getElementById('an-initial-fee'),
    creditTerm = document.getElementById('credit-term');

// значение из range импутов (бегунки)

const totalCostRange = document.getElementById('total-cost-range'),
    anInitialFeeRange = document.getElementById('an-initial-fee-range'),
    creditTermRange = document.getElementById('credit-term-range');

// итоговые значения

const totalAmountOfCredit = document.getElementById('amount-of-credit'),
    totalMonthlyPayment = document.getElementById('monthly-payment'),
    totalRecommendedIncome = document.getElementById('recommended-income');

// значения всех range

const inputsRange = document.querySelectorAll('.input-range');

// кнопки с процентной ставкой 

const bankBtns = document.querySelectorAll('.bank');

const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}

assignValue();

const banks = [
    {
        name: 'alfa',
        percent: 8.7
    },
    {
        name: 'sberbank',
        percent: 8.4
    },
    {
        name: 'pochta',
        percent: 7.9
    },                  
    {
        name: 'tinkoff',
        percent: 9.2
    }
]

let currentPrecent = banks[2].percent;

for(let bank of bankBtns) {
    bank.addEventListener('click', () => {
        for(let item of bankBtns) {
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    })
}

const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find( bank => bank.name === dataAttrValue);
    console.log(currentBank);
}
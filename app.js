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
        precents: 8.7
    },
    {
        name: 'sberbank',
        precents: 8.4
    },
    {
        name: 'pochta',
        precents: 7.9
    },                  
    {
        name: 'tinkoff',
        precents: 9.2
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
    currentPrecent = currentBank.precents;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};

for(let input of inputsRange) {
    input.addEventListener('input', () => {
        assignValue();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

// формула с рассчетами и необходимыми параметрами для рассчетов

const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1) => {

    /*

    ЕП - Ежемесячный платеж
    РК - Размер кредита
    ПР - Процентная ставка
    КМ - Количество месяцев

    ЕП = РК * (ПР/100) * (1 + ПР/100)^КМ / ((1 + ПР/100)^КМ - 1) - 1 формула от нейронки
    ЕП = (РК + ((( РК / 100) * ПС) / 12 ) * КМ) / КМ; - формула из интернета

    */

    let monthlyPayment; // ежемесячный плятеж
    let lounAmount = totalCost - anInitialFee; // размер кредита
    let interestRate = currentPrecent; // процентная ставка
    let numberOfYears = creditTerm; // количество лет 
    let numberOfMounts = 12 * numberOfYears; // количество месяцев

    monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMounts) / numberOfMounts;
    const monthlyPaymentArounded = Math.round(monthlyPayment);

    if(monthlyPaymentArounded < 0) {
        return false;
    } else {
        totalAmountOfCredit.innerHTML = `${lounAmount} Р`;
        totalMonthlyPayment.innerHTML = `${monthlyPaymentArounded} Р`;
        totalRecommendedIncome.innerHTML = `${monthlyPaymentArounded + ((monthlyPaymentArounded / 100) * 35)} Р`;
    }
}
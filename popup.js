const state = {
    fromCurrency: 'RM',
    toCurrency: 'OC'
};

let isUpdating = false;

let RATES = { ...DEFAULT_RATES };

function loadRates() {
    chrome.storage.local.get(['rates'], (result) => {
        if (result.rates) {
            RATES = result.rates;
        } else {
            RATES = { ...DEFAULT_RATES };
        }
        updateRateDisplay();
    });
}

function saveRates() {
    chrome.storage.local.set({ rates: RATES });
}

function updateRateDisplay() {
    const rmDisplay = document.getElementById('rmRateDisplay');
    const ocDisplay = document.getElementById('ocRateDisplay');
    
    if (rmDisplay && ocDisplay) {
        rmDisplay.textContent = RATES.RM.toFixed(2);
        ocDisplay.textContent = RATES.OC.toFixed(2);
    }
}

const fromAmountInput = document.getElementById('fromAmount');
const toAmountInput = document.getElementById('toAmount');
const fromCurrencyLabel = document.getElementById('fromCurrency');
const toCurrencyLabel = document.getElementById('toCurrency');
const resultDiv = document.getElementById('result');
const clearFromBtn = document.getElementById('clearFromBtn');
const clearToBtn = document.getElementById('clearToBtn');

function toggleClearButton(input, button) {
    if (input.value) {
        button.classList.add('visible');
    } else {
        button.classList.remove('visible');
    }
}

function clearFromInput() {
    fromAmountInput.value = '';
    toAmountInput.value = '';
    resultDiv.textContent = 'Enter an amount to convert';
    toggleClearButton(fromAmountInput, clearFromBtn);
    toggleClearButton(toAmountInput, clearToBtn);
}

function clearToInput() {
    toAmountInput.value = '';
    fromAmountInput.value = '';
    resultDiv.textContent = 'Enter an amount to convert';
    toggleClearButton(toAmountInput, clearToBtn);
    toggleClearButton(fromAmountInput, clearFromBtn);
}

function convert(amount, from, to) {
    if (from === to) return amount;
    
    if (from === 'RM') {
        return amount * RATES.RM;
    } else {
        return amount * RATES.OC;
    }
}

function handleConvertFrom() {
    if (isUpdating) return;
    
    const amount = parseFloat(fromAmountInput.value);
    
    toggleClearButton(fromAmountInput, clearFromBtn);
    
    if (isNaN(amount) || amount < 0) {
        isUpdating = true;
        toAmountInput.value = '';
        isUpdating = false;
        resultDiv.textContent = 'Enter a valid amount';
        toggleClearButton(toAmountInput, clearToBtn);
        return;
    }

    const result = convert(amount, state.fromCurrency, state.toCurrency);
    isUpdating = true;
    toAmountInput.value = result.toFixed(2);
    isUpdating = false;
    toggleClearButton(toAmountInput, clearToBtn);
    
    resultDiv.textContent = `${amount} ${state.fromCurrency} = ${result.toFixed(2)} ${state.toCurrency}`;
}

function handleConvertTo() {
    if (isUpdating) return;
    
    const amount = parseFloat(toAmountInput.value);
    
    toggleClearButton(toAmountInput, clearToBtn);
    
    if (isNaN(amount) || amount < 0) {
        isUpdating = true;
        fromAmountInput.value = '';
        isUpdating = false;
        resultDiv.textContent = 'Enter a valid amount';
        toggleClearButton(fromAmountInput, clearFromBtn);
        return;
    }

    const result = convert(amount, state.toCurrency, state.fromCurrency);
    isUpdating = true;
    fromAmountInput.value = result.toFixed(2);
    isUpdating = false;
    toggleClearButton(fromAmountInput, clearFromBtn);
    
    resultDiv.textContent = `${amount} ${state.toCurrency} = ${result.toFixed(2)} ${state.fromCurrency}`;
}

const modal = document.getElementById('ratesModal');
const editRatesBtn = document.getElementById('editRatesBtn');
const cancelRatesBtn = document.getElementById('cancelRatesBtn');
const saveRatesBtn = document.getElementById('saveRatesBtn');
const rmRateInput = document.getElementById('rmRateInput');
const ocRateInput = document.getElementById('ocRateInput');

function openModal() {
    rmRateInput.value = RATES.RM;
    ocRateInput.value = RATES.OC;
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

function saveNewRates() {
    const newRmRate = parseFloat(rmRateInput.value);
    const newOcRate = parseFloat(ocRateInput.value);

    if (isNaN(newRmRate) || newRmRate <= 0) {
        alert('Please enter a valid RM rate greater than 0');
        return;
    }

    if (isNaN(newOcRate) || newOcRate <= 0) {
        alert('Please enter a valid OC rate greater than 0');
        return;
    }

    RATES.RM = newRmRate;
    RATES.OC = newOcRate;
    
    saveRates();
    updateRateDisplay();
    closeModal();

    if (fromAmountInput.value) {
        handleConvertFrom();
    } else if (toAmountInput.value) {
        handleConvertTo();
    }
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

fromAmountInput.addEventListener('input', handleConvertFrom);
toAmountInput.addEventListener('input', handleConvertTo);
editRatesBtn.addEventListener('click', openModal);
cancelRatesBtn.addEventListener('click', closeModal);
saveRatesBtn.addEventListener('click', saveNewRates);
clearFromBtn.addEventListener('click', clearFromInput);
clearToBtn.addEventListener('click', clearToInput);

loadRates();

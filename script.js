let screenValue = '0';
let historyValue = '';
let history = [];

const screen = document.getElementById('screen');
const historyDisplay = document.getElementById('history');
const historyList = document.getElementById('historyList');

function updateDisplay() {
    screen.textContent = screenValue;
    historyDisplay.textContent = historyValue;
}

function appendToScreen(value) {
    if (screenValue === '0' && value !== '.') {
        screenValue = value.toString();
    } else {
        screenValue += value.toString();
    }
    updateDisplay();
}

function clearAll() {
    screenValue = '0';
    historyValue = '';
    updateDisplay();
}

function clearEntry() {
    screenValue = '0';
    updateDisplay();
}

function backspace() {
    if (screenValue.length > 1) {
        screenValue = screenValue.slice(0, -1);
    } else {
        screenValue = '0';
    }
    updateDisplay();
}

function calculate() {
    try {
        // Replace × and ÷ with * and /
        let expression = screenValue
            .replace(/×/g, '*')
            .replace(/÷/g, '/');
        
        let result = eval(expression).toString();
        
        // Add to history
        addToHistory(`${screenValue} = ${result}`);
        
        historyValue = screenValue + ' =';
        screenValue = result;
        updateDisplay();
    } catch (error) {
        screenValue = 'Error';
        updateDisplay();
        setTimeout(clearEntry, 1500);
    }
}

function processKeyword() {
    const keywordInput = document.getElementById('keywordInput');
    const keyword = keywordInput.value.toLowerCase().trim();
    
    if (keyword === 'clear' || keyword === 'c') {
        clearAll();
    } else if (keyword === 'add' || keyword === '+') {
        appendToScreen('+');
    } else if (keyword === 'subtract' || keyword === '-') {
        appendToScreen('-');
    } else if (keyword === 'multiply' || keyword === '*') {
        appendToScreen('×');
    } else if (keyword === 'divide' || keyword === '/') {
        appendToScreen('÷');
    } else if (keyword === 'sqrt' || keyword === 'square root') {
        appendToScreen('Math.sqrt(');
    } else if (keyword === 'power' || keyword === '^') {
        appendToScreen('**');
    } else if (keyword === 'pi') {
        appendToScreen('Math.PI');
    } else if (keyword === 'history') {
        toggleHistory();
    }
    
    keywordInput.value = '';
}

function addToHistory(entry) {
    history.unshift(entry);
    if (history.length > 10) {
        history.pop();
    }
    updateHistoryList();
}

function updateHistoryList() {
    historyList.innerHTML = '';
    history.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = item;
        div.onclick = () => {
            screenValue = item.split(' = ')[1] || item;
            updateDisplay();
        };
        historyList.appendChild(div);
    });
}

function clearHistory() {
    history = [];
    updateHistoryList();
}

function toggleHistory() {
    const historyPanel = document.querySelector('.history-panel');
    historyPanel.style.display = historyPanel.style.display === 'none' ? 'block' : 'none';
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9' || e.key === '.') {
        appendToScreen(e.key);
    } else if (e.key === '+' || e.key === '-') {
        appendToScreen(e.key);
    } else if (e.key === '*') {
        appendToScreen('×');
    } else if (e.key === '/') {
        appendToScreen('÷');
    } else if (e.key === 'Enter' || e.key === '=') {
        calculate();
    } else if (e.key === 'Escape') {
        clearAll();
    } else if (e.key === 'Backspace') {
        backspace();
    }
});

// Initialize
updateDisplay();
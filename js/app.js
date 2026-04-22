const DATE_INPUT = document.getElementById('dateInput');
const QUERY_BTN = document.getElementById('queryBtn');
const RESULT = document.getElementById('result');
const RESULT_VALUE = document.getElementById('resultValue');
const RESULT_DATE = document.getElementById('resultDate');

let dailyData = {};

async function init() {
    const resp = await fetch('js/daily_totals.json');
    dailyData = await resp.json();
    console.log(`已加载 ${Object.keys(dailyData).length} 天数据`);
}

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function query() {
    const date = DATE_INPUT.value;
    const total = dailyData[date];

    if (!total) {
        RESULT_VALUE.textContent = '无数据';
        RESULT_DATE.textContent = date;
        RESULT.classList.remove('hidden');
        return;
    }

    RESULT_VALUE.textContent = formatNumber(total);
    RESULT_DATE.textContent = date;
    RESULT.classList.remove('hidden');
}

QUERY_BTN.addEventListener('click', query);
DATE_INPUT.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') query();
});

init();

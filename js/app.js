import { Storage } from './storage.js';
import { Finance } from './calculations.js';
import { Charts } from './charts.js';

let state = {
    nw: Storage.get('nw') || 0,
    exp: Storage.get('exp') || 40000,
    fx: 83.5
};

async function init() {
    await fetchFx();
    setupTV();
    Charts.initGrowth(document.getElementById('growthChart'));
    updateUI();

    document.getElementById('update-nw-btn').onclick = () => {
        state.nw = parseFloat(document.getElementById('nw-input').value) || 0;
        Storage.save('nw', state.nw);
        updateUI();
        showToast();
    };

    document.getElementById('run-sim').onclick = () => {
        const m = parseFloat(document.getElementById('sim-monthly').value) || 0;
        const r = parseFloat(document.getElementById('sim-return').value) || 0;
        const y = parseInt(document.getElementById('sim-years').value) || 0;
        let labels = [], values = [];
        for(let i=0; i<=y; i++) { labels.push(`Y${i}`); values.push(Finance.getFV(m, r, i)); }
        Charts.update(labels, values);
    };

    document.getElementById('privacy-toggle').onclick = () => {
        document.querySelectorAll('.privacy-target').forEach(el => el.classList.toggle('privacy-blur'));
    };

    document.getElementById('reset-data').onclick = () => Storage.clear();
}

async function fetchFx() {
    try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await res.json();
        state.fx = data.rates.INR;
        document.getElementById('fx-display').innerText = `USD/INR: ${state.fx.toFixed(2)}`;
    } catch(e) { console.warn("Using fallback FX"); }
}

function updateUI() {
    const swr = Finance.getSWR(state.nw, state.fx);
    document.getElementById('swr-inr').innerText = Math.round(swr.monthly).toLocaleString('en-IN');
    document.getElementById('swr-annual').innerText = `₹${Math.round(swr.annual).toLocaleString('en-IN')}`;
    document.getElementById('nw-usd').innerText = `$${state.nw.toLocaleString()}`;
    document.getElementById('nw-inr-display').innerText = `₹${Math.round(state.nw * state.fx).toLocaleString('en-IN')}`;

    const progress = Math.min((state.nw / (state.exp * 25)) * 100, 100);
    document.getElementById('fire-progress-bar').style.width = `${progress}%`;
    document.getElementById('fire-status').innerText = `${progress.toFixed(1)}% to FI`;
}

function setupTV() {
    ['VOO', 'QQQ', 'NVDA', 'GOOGL'].forEach(s => {
        new TradingView.MediumWidget({
            "symbols": [[s, s]], "width": "100%", "height": "100%", "colorTheme": "dark", "container_id": `tv-${s.toLowerCase()}`
        });
    });
}

function showToast() {
    const t = document.getElementById('toast');
    t.classList.remove('hidden');
    setTimeout(() => t.classList.add('hidden'), 2000);
}

const script = document.createElement('script');
script.src = 'https://s3.tradingview.com/tv.js';
script.onload = init;
document.head.appendChild(script);

const liveBtn = document.getElementById('liveBtn');
const fileInput = document.getElementById('fileInput');
const rawInput = document.getElementById('rawInput');
const parseBtn = document.getElementById('parseBtn');
const statusEl = document.getElementById('status');

const schemeSearch = document.getElementById('schemeSearch');
const matchesEl = document.getElementById('matches');
const selectedWrap = document.getElementById('selectedWrap');
const selectedName = document.getElementById('selectedName');
const selectedNav = document.getElementById('selectedNav');
const selectedDate = document.getElementById('selectedDate');
const unitsInput = document.getElementById('unitsInput');
const calcBtn = document.getElementById('calcBtn');
const resultEl = document.getElementById('result');

let schemes = [];
let selectedScheme = null;

function setStatus(message) {
  statusEl.textContent = message;
}

function parseAMFI(text) {
  const rows = text.split(/\r?\n/);
  const parsed = [];

  for (const row of rows) {
    if (!row || !row.includes(';')) continue;
    const cols = row.split(';');
    if (cols.length < 6) continue;

    const [schemeCode, , , schemeName, navRaw, date] = cols.map((value) => value.trim());
    if (!/^\d+$/.test(schemeCode)) continue;

    const nav = Number.parseFloat(navRaw);
    if (!Number.isFinite(nav) || !schemeName) continue;

    parsed.push({
      code: schemeCode,
      name: schemeName,
      nav,
      date,
    });
  }

  return parsed;
}

function renderMatches(filtered) {
  matchesEl.innerHTML = '';
  if (!filtered.length) return;

  for (const scheme of filtered.slice(0, 25)) {
    const option = document.createElement('button');
    option.className = 'match';
    option.type = 'button';
    option.textContent = `${scheme.name} (NAV ₹${scheme.nav.toFixed(4)})`;
    option.addEventListener('click', () => {
      selectedScheme = scheme;
      selectedName.textContent = scheme.name;
      selectedNav.textContent = scheme.nav.toFixed(4);
      selectedDate.textContent = scheme.date || 'N/A';
      selectedWrap.classList.remove('hidden');
      matchesEl.innerHTML = '';
      schemeSearch.value = scheme.name;
      resultEl.textContent = '';
    });
    matchesEl.appendChild(option);
  }
}

function loadData(rawText) {
  schemes = parseAMFI(rawText);
  selectedScheme = null;
  selectedWrap.classList.add('hidden');
  resultEl.textContent = '';

  if (!schemes.length) {
    setStatus('No valid schemes found. Ensure full NAVAll.txt content is provided.');
    return;
  }

  setStatus(`Loaded ${schemes.length} schemes.`);
}

liveBtn.addEventListener('click', async () => {
  setStatus('Fetching live AMFI data...');
  try {
    const response = await fetch('https://portal.amfiindia.com/spages/NAVAll.txt');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    loadData(text);
  } catch (error) {
    setStatus(`Live fetch failed (${error.message}). Try upload/paste.`);
  }
});

fileInput.addEventListener('change', async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  const text = await file.text();
  loadData(text);
});

parseBtn.addEventListener('click', () => {
  loadData(rawInput.value);
});

schemeSearch.addEventListener('input', () => {
  const query = schemeSearch.value.trim().toLowerCase();
  if (!query || !schemes.length) {
    matchesEl.innerHTML = '';
    return;
  }
  const filtered = schemes.filter((scheme) => scheme.name.toLowerCase().includes(query));
  renderMatches(filtered);
});

calcBtn.addEventListener('click', () => {
  if (!selectedScheme) {
    resultEl.textContent = 'Please select a scheme first.';
    return;
  }

  const units = Number.parseFloat(unitsInput.value);
  if (!Number.isFinite(units) || units < 0) {
    resultEl.textContent = 'Please enter valid units.';
    return;
  }

  const value = units * selectedScheme.nav;
  resultEl.textContent = `Estimated Portfolio Value: ₹${value.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
});

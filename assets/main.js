// ====== Mobile Navigation Toggle ======
const nav = document.querySelector('.nav');
const navToggleBtn = document.querySelector('.nav__toggle');
if (navToggleBtn) navToggleBtn.addEventListener('click', () => nav.classList.toggle('open'));

// ====== Modal Setup ======
const modal = document.getElementById('join-modal');
const openModalBtn = document.getElementById('open-join-modal');

function openModal() {
  modal.removeAttribute('hidden');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('jf-name').focus();
  document.addEventListener('keydown', escClose);
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  modal.setAttribute('hidden', '');
  document.removeEventListener('keydown', escClose);
}
function escClose(e){ if (e.key === 'Escape') closeModal(); }

if (openModalBtn) openModalBtn.addEventListener('click', openModal);
if (modal) {
  modal.querySelectorAll('[data-modal-close]').forEach(btn => btn.addEventListener('click', closeModal));
  modal.addEventListener('click', (e) => { if (e.target.classList.contains('modal__overlay')) closeModal(); });
}

// ====== Schedule Data ======
const SCHEDULE = {
  Monday: [
    { time: '06:00–07:00', label: 'Adults (24+) — Fitness & Conditioning' },
    { time: '09:00–11:00', label: 'Kids (7–9) — Fundamentals' },
    { time: '14:00–16:00', label: 'Youth (10–13) — Skills & Drills' },
    { time: '16:30–18:00', label: 'All Ages — Open Training' }
  ],
  Tuesday: [
    { time: '11:00–13:00', label: 'Teens (14–17) — Technical Skills' },
    { time: '14:00–16:00', label: 'Community Workshop — Family Friendly' },
    { time: '18:30–19:30', label: 'Adults & Teens — Fitness' }
  ],
  Wednesday: [
    { time: '06:00–07:00', label: 'Adults (24+) — Fitness & Conditioning' },
    { time: '09:00–11:00', label: 'Kids (7–9) — Pad Work' },
    { time: '11:00–13:00', label: 'Teens (14–17) — Conditioning' },
    { time: '16:30–18:00', label: 'All Ages — Open Training' },
    { time: '18:30–19:30', label: 'Adults & Teens — Sparring' }
  ],
  Thursday: [
    { time: '11:00–13:00', label: 'Teens (14–17) — Sparring' },
    { time: '14:00–16:00', label: 'Community Workshop — Family Friendly' },
    { time: '18:30–19:30', label: 'Adults & Teens — Fitness' }
  ],
  Friday: [
    { time: '06:00–07:00', label: 'Adults (24+) — Fitness & Conditioning' },
    { time: '09:00–11:00', label: 'Kids (7–9) — Movement & Games' },
    { time: '14:00–16:00', label: 'Youth (10–13) — Skills & Drills' },
    { time: '16:30–18:00', label: 'All Ages — Open Training' }
  ],
  Saturday: [
    { time: '09:00–11:00', label: 'Kids & Youth (7–13) — Open Training' },
    { time: '11:00–13:00', label: 'Teen Sparring Camp (14–17)' },
    { time: '14:00–16:00', label: 'Community Event — Family Friendly' },
    { time: '16:30–18:00', label: 'All Ages — Open Training' }
  ],
};

// ====== Dropdown wiring ======
const daySelect  = document.getElementById('jf-day');
const slotSelect = document.getElementById('jf-slot');

if (daySelect && slotSelect) {
  daySelect.addEventListener('change', () => {
    slotSelect.innerHTML = '';
    slotSelect.setAttribute('disabled', '');
    const day = daySelect.value;

    if (!SCHEDULE[day]) {
      slotSelect.innerHTML = '<option value="">Select a day first…</option>';
      return;
    }

    SCHEDULE[day].forEach(s => {
      const optText = `${s.time} — ${s.label}`;
      slotSelect.add(new Option(optText, optText));
    });
    slotSelect.removeAttribute('disabled');
  });
}

// ====== Validation helpers ======
function showError(id, msg) {
  const el = document.getElementById(id);
  const row = el.closest('.form-row');
  row.classList.add('invalid');
  const small = row.querySelector('.error');
  if (small) small.textContent = msg;
}
function clearError(id) {
  const el = document.getElementById(id);
  const row = el.closest('.form-row');
  row.classList.remove('invalid');
  const small = row.querySelector('.error');
  if (small) small.textContent = '';
}
function emailValid(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

// ====== Submit-first validation strategy ======
const joinForm  = document.getElementById('joinForm');   // <— single declaration
const msgField  = document.getElementById('jf-msg');
const hint      = document.getElementById('hint-msg');

if (msgField && hint) {
  hint.textContent = `${msgField.value.length} / 200`;
  msgField.addEventListener('input', () => hint.textContent = `${msgField.value.length} / 200`);
}

let triedSubmit = false;

function attachLivePostSubmitValidation() {
  if (!triedSubmit) return;
  const map = [
    ['jf-name',  validateName],
    ['jf-email', validateEmail],
    ['jf-age',   validateAge],
    ['jf-day',   validateDay],
    ['jf-slot',  validateSlot],
  ];
  map.forEach(([id, fn]) => {
    const el = document.getElementById(id);
    const ev = (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') ? 'input' : 'change';
    if (!el.dataset.liveBound) {
      el.addEventListener(ev, fn);
      el.dataset.liveBound = '1';
    }
  });
}

function validateName() {
  const v = document.getElementById('jf-name').value.trim();
  if (!v) { showError('jf-name','Please enter your full name.'); return false; }
  clearError('jf-name'); return true;
}
function validateEmail() {
  const v = document.getElementById('jf-email').value.trim();
  if (!v) { showError('jf-email','Please enter your email.'); return false; }
  if (!emailValid(v)) { showError('jf-email','Please enter a valid email address.'); return false; }
  clearError('jf-email'); return true;
}
function validateAge() {
  const v = document.getElementById('jf-age').value;
  if (!v) { showError('jf-age','Please select an age group.'); return false; }
  clearError('jf-age'); return true;
}
function validateDay() {
  const v = document.getElementById('jf-day').value;
  if (!v) { showError('jf-day','Please choose a day.'); return false; }
  clearError('jf-day'); return true;
}
function validateSlot() {
  const v = document.getElementById('jf-slot').value;
  if (!v) { showError('jf-slot','Please pick a time & class.'); return false; }
  clearError('jf-slot'); return true;
}

// ====== jsPDF lazy loader + fallback to print ======
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.async = true;
    s.onload = resolve; s.onerror = reject;
    document.head.appendChild(s);
  });
}
async function ensureJsPDF() {
  if (window.jspdf?.jsPDF) return window.jspdf.jsPDF;
  const cdns = [
    'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js',
    'https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js',
  ];
  for (const url of cdns) {
    try { await loadScript(url); } catch { /* try next */ }
    if (window.jspdf?.jsPDF) return window.jspdf.jsPDF;
  }
  return null;
}
function printFallbackReceipt({name,email,age,day,slot,note}) {
  const now = new Date();
  const iso = now.toISOString().slice(0,10);
  const num = Math.random().toString(36).slice(2,8).toUpperCase();

  const w = window.open('', '_blank', 'noopener,noreferrer');
  if (!w) { alert('Popup blocked. Please allow popups to save the receipt.'); return; }
  w.document.write(`
<!doctype html><html><head><meta charset="utf-8">
<title>Gloves Up Booking Receipt</title>
<style>
  body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif;background:#fff;color:#111;margin:0;padding:40px;}
  .card{max-width:720px;margin:auto;border:1px solid #dadada;border-radius:12px;padding:24px 28px;box-shadow:0 8px 28px rgba(0,0,0,.08);}
  h1{font-size:22px;margin:0 0 8px;}
  h2{font-size:16px;margin:20px 0 8px;}
  .muted{color:#666}
  .row{display:flex;gap:24px;flex-wrap:wrap}
  .row > div{flex:1 1 280px}
  hr{border:0;border-top:1px solid #e5e5e5;margin:20px 0}
  .foot{font-size:12px;color:#555}
</style>
</head><body>
  <div class="card">
    <h1>Gloves Up Boxing Gym</h1>
    <div class="muted">Booking Receipt</div>
    <div class="muted">Date: ${iso} • Receipt No: GUB-${num}</div>
    <hr>
    <div class="row">
      <div><h2>Attendee</h2>
        <div><strong>Name:</strong> ${name}</div>
        <div><strong>Email:</strong> ${email}</div>
        <div><strong>Age Group:</strong> ${age}</div>
      </div>
      <div><h2>Session</h2>
        <div><strong>Day:</strong> ${day}</div>
        <div><strong>Time & Class:</strong> ${slot}</div>
      </div>
    </div>
    ${note ? `<h2>Note</h2><div>${note.replace(/[<>&]/g, s=>({ '<':'&lt;','>':'&gt;','&':'&amp;' }[s]))}</div>` : ''}
    <hr>
    <div class="foot">
      This receipt confirms your booking request. We may contact you if any schedule changes occur.<br>
      Venue: Gloves Up Boxing Gym • Please arrive 10 minutes early • Bring water and comfortable gear.
    </div>
  </div>
  <script>window.print();<\/script>
</body></html>`);
  w.document.close();
}

// ====== Submit → Generate PDF (auto-load jsPDF; fallback to print) ======
joinForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  triedSubmit = true;

  // Clear previous errors
  ['jf-name','jf-email','jf-age','jf-day','jf-slot','jf-msg'].forEach(clearError);

  // Validate all fields now
  const checks = [
    ['jf-name',  validateName],
    ['jf-email', validateEmail],
    ['jf-age',   validateAge],
    ['jf-day',   validateDay],
    ['jf-slot',  validateSlot],
  ];
  let firstInvalid = null;
  let allOk = true;
  checks.forEach(([id, fn]) => {
    const ok = fn();
    if (!ok) {
      allOk = false;
      if (!firstInvalid) firstInvalid = document.getElementById(id);
    }
  });

  // After first attempt, start live validation to clear errors as user fixes them
  attachLivePostSubmitValidation();

  if (!allOk) { firstInvalid?.focus(); return; }

  // Collect data
  const name  = document.getElementById('jf-name').value.trim();
  const email = document.getElementById('jf-email').value.trim();
  const age   = document.getElementById('jf-age').value;
  const day   = daySelect.value;
  const slot  = slotSelect.value;
  const note  = (msgField?.value.trim() || '');

  // Try to get jsPDF (existing or lazy-loaded)
  const jsPDF = await ensureJsPDF();

  if (!jsPDF) {
    // Fallback: open a printable receipt (user saves as PDF)
    printFallbackReceipt({name,email,age,day,slot,note});
    document.getElementById('jf-success').hidden = false;
    return;
  }

  // Build PDF receipt with jsPDF
  const doc = new jsPDF({ unit:'pt', format:'a4' });
  const pad = 56; let y = pad;

  doc.setFont('helvetica','bold'); doc.setFontSize(20);
  doc.text('Gloves Up Boxing Gym', pad, y); y += 26;
  doc.setFont('helvetica',''); doc.setFontSize(12);
  doc.text('Booking Receipt', pad, y); y += 8;

  const now = new Date();
  const iso = now.toISOString().slice(0,10);
  const num = Math.random().toString(36).slice(2,8).toUpperCase();
  y += 20; doc.setFontSize(10);
  doc.text(`Date: ${iso}`, pad, y);
  doc.text(`Receipt No: GUB-${num}`, pad + 250, y); y += 24;

  doc.setDrawColor(220); doc.line(pad, y, 540, y); y += 20;

  doc.setFont('helvetica','bold'); doc.setFontSize(12);
  doc.text('Attendee Details', pad, y); y += 18;
  doc.setFont('helvetica',''); doc.setFontSize(11);
  doc.text(`Name: ${name}`, pad, y); y += 16;
  doc.text(`Email: ${email}`, pad, y); y += 16;
  doc.text(`Age Group: ${age}`, pad, y); y += 24;

  doc.setFont('helvetica','bold'); doc.setFontSize(12);
  doc.text('Session', pad, y); y += 18;
  doc.setFont('helvetica',''); doc.setFontSize(11);
  doc.text(`Day: ${day}`, pad, y); y += 16;
  doc.text(`Time & Class: ${slot}`, pad, y); y += 24;

  if (note) {
    doc.setFont('helvetica','bold'); doc.text('Note', pad, y); y += 18;
    doc.setFont('helvetica','');
    const noteLines = doc.splitTextToSize(note, 480);
    doc.text(noteLines, pad, y); y += noteLines.length * 14 + 12;
  }

  y += 6; doc.setDrawColor(220); doc.line(pad, y, 540, y); y += 16;
  doc.setFontSize(9);
  doc.text('This receipt confirms your booking request. We may contact you if any schedule changes occur.', pad, y); y += 14;
  doc.text('Venue: Gloves Up Boxing Gym • Please arrive 10 minutes early • Bring water and comfortable gear.', pad, y);

  const safeName = name.replace(/\s+/g,'-');
  doc.save(`GlovesUp-Booking-${safeName}-${iso}.pdf`);

  document.getElementById('jf-success').hidden = false;
});

// ── Firebase ────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey: "AIzaSyBza0dRFtl1ODJ0jbWX-cfcrJ8QPAtFc6Q",
  authDomain: "learn-python-385cc.firebaseapp.com",
  projectId: "learn-python-385cc",
  storageBucket: "learn-python-385cc.firebasestorage.app",
  messagingSenderId: "472162980700",
  appId: "1:472162980700:web:5b06994f20229a23f62799"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
let currentUser = null;

// ── State ──────────────────────────────────────────────────────────
const STORAGE_KEY = 'pytutor_done';
let completed = new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

async function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  if (currentUser) {
    await db.collection('users').doc(currentUser.uid).set({
      completed: [...completed],
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }
}

// ── Flat lesson index ───────────────────────────────────────────────
const allLessons = curriculum.flatMap(m =>
  m.lessons.map(l => ({ ...l, moduleTitle: m.title, moduleId: m.id }))
);

function lessonIndex(id) {
  return allLessons.findIndex(l => l.id === id);
}

// ── Skulpt Python runner ────────────────────────────────────────────
function runPython(code) {
  return new Promise((resolve, reject) => {
    let out = '';
    Sk.configure({
      output: t => { out += t; },
      read: x => {
        if (Sk.builtinFiles?.files[x] == null)
          throw "File not found: '" + x + "'";
        return Sk.builtinFiles.files[x];
      },
      __future__: Sk.python3
    });
    Sk.misceval.asyncToPromise(() =>
      Sk.importMainWithBody('<stdin>', false, code, true)
    ).then(() => resolve(out), err => reject(err.toString()));
  });
}

// ── Auth ─────────────────────────────────────────────────────────────
function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider).catch(err => {
    console.error('Sign-in error:', err);
  });
}

function signOut() {
  auth.signOut();
}

auth.onAuthStateChanged(async user => {
  currentUser = user;

  if (user) {
    // Load progress from Firestore and merge with local
    try {
      const doc = await db.collection('users').doc(user.uid).get();
      if (doc.exists) {
        const cloud = doc.data().completed || [];
        // Merge: union of local + cloud
        cloud.forEach(id => completed.add(id));
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
      } else {
        // First login — push local progress up to Firestore
        await save();
      }
    } catch (e) {
      console.error('Firestore error:', e);
    }
  }

  renderUserSection(user);
  const activeId = window.location.hash.slice(1);
  renderNav(activeId || null);
  updateProgress();
});

function renderUserSection(user) {
  const el = document.getElementById('userSection');
  if (user) {
    el.innerHTML = `
      <img class="user-avatar" src="${user.photoURL || ''}" alt="">
      <div class="user-info">
        <div class="user-name">${user.displayName || user.email}</div>
        <div class="user-sync">✓ Progress syncing</div>
      </div>
      <button class="signout-btn" onclick="signOut()">Sign out</button>`;
  } else {
    el.innerHTML = `
      <button class="signin-btn" onclick="signIn()">
        <svg width="16" height="16" viewBox="0 0 24 24"><path fill="#fff" d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z"/></svg>
        Sign in with Google
      </button>
      <div class="signin-note">Sign in to sync progress across devices</div>`;
  }
}

// ── Sidebar nav ─────────────────────────────────────────────────────
function renderNav(activeId) {
  const nav = document.getElementById('moduleList');
  nav.innerHTML = '';

  const home = document.createElement('a');
  home.className = 'lesson-link' + (!activeId ? ' active' : '');
  home.innerHTML = `<span class="check">⊞</span> Home`;
  home.onclick = () => navigate(null);
  nav.appendChild(home);

  curriculum.forEach(mod => {
    const header = document.createElement('div');
    header.className = 'mod-header';
    header.innerHTML = `
      <span class="mod-icon">${mod.icon}</span>
      ${mod.title}
      <span class="mod-toggle">▾</span>`;
    nav.appendChild(header);

    const group = document.createElement('div');
    group.className = 'mod-lessons';

    mod.lessons.forEach(l => {
      const link = document.createElement('div');
      link.className = 'lesson-link' +
        (l.id === activeId ? ' active' : '') +
        (completed.has(l.id) ? ' done' : '');
      link.innerHTML = `<span class="check">${completed.has(l.id) ? '✓' : '○'}</span> ${l.title}`;
      link.onclick = () => navigate(l.id);
      group.appendChild(link);
    });

    nav.appendChild(group);

    header.onclick = () => {
      header.classList.toggle('collapsed');
      group.classList.toggle('collapsed');
    };
  });

  updateProgress();
}

function updateProgress() {
  const total = allLessons.length;
  const done = allLessons.filter(l => completed.has(l.id)).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = `${pct}% complete (${done}/${total})`;
}

// ── Routing ─────────────────────────────────────────────────────────
function navigate(id) {
  window.location.hash = id ? '#' + id : '#';
  if (!id) { renderHome(); renderNav(null); }
  else { renderLesson(id); renderNav(id); }
  window.scrollTo(0, 0);
  document.getElementById('main').scrollTop = 0;
}

window.addEventListener('hashchange', () => {
  const id = window.location.hash.slice(1);
  if (!id) { renderHome(); renderNav(null); }
  else { renderLesson(id); renderNav(id); }
});

// ── Home screen ─────────────────────────────────────────────────────
function renderHome() {
  const done = allLessons.filter(l => completed.has(l.id)).length;
  const total = allLessons.length;

  let lastId = null;
  for (const l of allLessons) {
    if (!completed.has(l.id)) { lastId = l.id; break; }
  }

  const el = document.getElementById('lesson');
  el.innerHTML = `
    <div class="home-hero">
      <h1>🐍 Learn Python</h1>
      <p>A complete Python course — from your first <code>print()</code> to advanced patterns.</p>
      <div class="home-stats">
        <div class="stat"><div class="stat-n">${curriculum.length}</div><div class="stat-label">Modules</div></div>
        <div class="stat"><div class="stat-n">${total}</div><div class="stat-label">Lessons</div></div>
        <div class="stat"><div class="stat-n">${done}</div><div class="stat-label">Completed</div></div>
      </div>
      ${lastId ? `<button class="run-btn" style="margin:0 auto;font-size:15px;padding:12px 28px;" onclick="navigate('${lastId}')">
        ${done === 0 ? '▶ Start Learning' : '▶ Continue where you left off'}
      </button>` : `<div style="font-size:18px;color:#40a02b;font-weight:700;">🎉 Course complete!</div>`}
    </div>
    <div class="modules-grid">
      ${curriculum.map(m => {
        const modDone = m.lessons.filter(l => completed.has(l.id)).length;
        return `<div class="module-card" onclick="navigate('${m.lessons[0].id}')">
          <div class="card-icon">${m.icon}</div>
          <h3>${m.title}</h3>
          <p>${m.description}</p>
          <div class="card-count">${modDone}/${m.lessons.length} lessons done</div>
        </div>`;
      }).join('')}
    </div>`;
}

// ── Lesson renderer ─────────────────────────────────────────────────
function renderLesson(id) {
  const idx = lessonIndex(id);
  if (idx === -1) { renderHome(); return; }
  const l = allLessons[idx];
  const prev = allLessons[idx - 1];
  const next = allLessons[idx + 1];
  const isDone = completed.has(id);

  const el = document.getElementById('lesson');
  el.innerHTML = `
    <div class="lesson-header">
      <div class="lesson-breadcrumb"><span>${l.moduleTitle}</span> / ${l.title}</div>
      <h1>${l.title}</h1>
    </div>
    <div class="lesson-body">${l.content}</div>
    ${l.tryCode ? buildRunner(l.tryCode, l.id) : ''}
    <div class="lesson-nav">
      <button class="nav-btn" onclick="${prev ? `navigate('${prev.id}')` : ''}" ${prev ? '' : 'disabled'}>← ${prev ? prev.title : 'Previous'}</button>
      <button class="complete-btn ${isDone ? 'done' : ''}" id="completeBtn" onclick="toggleComplete('${id}')">
        ${isDone ? '✓ Completed' : 'Mark Complete'}
      </button>
      <button class="nav-btn primary" onclick="${next ? `navigate('${next.id}')` : "navigate(null)"}">${next ? next.title + ' →' : 'Finish Course →'}</button>
    </div>`;

  el.querySelectorAll('pre code').forEach(block => {
    hljs.highlightElement(block);
  });

  el.querySelectorAll('.run-example-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const code = btn.dataset.code;
      const outEl = btn.nextElementSibling;
      outEl.textContent = 'Running…';
      outEl.classList.add('visible');
      outEl.classList.remove('error');
      runPython(code).then(
        out => { outEl.textContent = out || '(no output)'; },
        err => { outEl.textContent = err; outEl.classList.add('error'); }
      );
    });
  });

  el.querySelectorAll('.runner').forEach(runnerEl => {
    const btn = runnerEl.querySelector('.run-btn');
    const resetBtn = runnerEl.querySelector('.reset-btn');
    const ta = runnerEl.querySelector('textarea');
    const out = runnerEl.querySelector('.runner-output');
    const original = ta.value;

    btn.addEventListener('click', () => {
      out.textContent = 'Running…';
      out.classList.add('visible');
      out.classList.remove('error');
      runPython(ta.value).then(
        res => { out.textContent = res || '(no output)'; },
        err => { out.textContent = err; out.classList.add('error'); }
      );
    });

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        ta.value = original;
        out.classList.remove('visible');
      });
    }

    ta.addEventListener('keydown', e => {
      if (e.key === 'Tab') {
        e.preventDefault();
        const s = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + '    ' + ta.value.slice(en);
        ta.selectionStart = ta.selectionEnd = s + 4;
      }
    });
  });
}

function buildRunner(code, lessonId) {
  return `
    <div class="runner">
      <div class="runner-header">✏️ Try It Yourself</div>
      <textarea spellcheck="false">${escHtml(code)}</textarea>
      <div class="runner-footer">
        <button class="run-btn">▶ Run</button>
        <button class="reset-btn">↺ Reset</button>
        <span class="runner-hint">Tab = 4 spaces</span>
      </div>
      <div class="runner-output"></div>
    </div>`;
}

function toggleComplete(id) {
  if (completed.has(id)) { completed.delete(id); }
  else { completed.add(id); }
  save();
  renderNav(id);
  const btn = document.getElementById('completeBtn');
  if (btn) {
    btn.textContent = completed.has(id) ? '✓ Completed' : 'Mark Complete';
    btn.className = 'complete-btn' + (completed.has(id) ? ' done' : '');
  }
}

// ── Helpers ─────────────────────────────────────────────────────────
function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function codeBlock(code, label = 'python') {
  return `<div class="code-block">
    <div class="code-block-header">
      <span>${label}</span>
      <button class="run-example-btn" data-code="${escHtml(code).replace(/"/g, '&quot;')}">▶ Run</button>
    </div>
    <pre><code class="language-python">${escHtml(code)}</code></pre>
    <div class="runner-output"></div>
  </div>`;
}

window.cb = codeBlock;

// ── Boot ─────────────────────────────────────────────────────────────
(function init() {
  renderUserSection(null);
  const id = window.location.hash.slice(1);
  if (id && lessonIndex(id) !== -1) {
    renderLesson(id);
    renderNav(id);
  } else {
    renderHome();
    renderNav(null);
  }
})();

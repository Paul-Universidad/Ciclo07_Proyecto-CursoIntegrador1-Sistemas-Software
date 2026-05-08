const API = "";

async function fetchJson(path, options = {}) {
  const res = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const j = await res.json();
      if (j.error) detail = j.error;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }
  if (res.status === 204) return null;
  return res.json();
}

function setActive(section) {
  document.querySelectorAll(".tabs button").forEach((b) => {
    b.classList.toggle("active", b.dataset.section === section);
  });
}

async function renderInicio(container) {
  container.innerHTML = "<p class='muted'>Cargando…</p>";
  try {
    const s = await fetchJson("/api/home/summary");
    container.innerHTML = `
      <div class="card">
        <h2>${escapeHtml(s.title)}</h2>
        <p class="muted">${escapeHtml(s.hint)}</p>
        <p>Medicamentos en catálogo: <strong>${s.medicationCount}</strong></p>
        <p>Preguntas de repaso: <strong>${s.quizQuestionCount}</strong></p>
      </div>`;
  } catch (e) {
    container.innerHTML = `<p class="err">${escapeHtml(e.message)}</p>`;
  }
}

async function renderMedicamentos(container) {
  container.innerHTML = "<p class='muted'>Cargando…</p>";
  try {
    const list = await fetchJson("/api/medications");
    if (!list.length) {
      container.innerHTML = "<p>No hay medicamentos.</p>";
      return;
    }
    container.innerHTML =
      "<ul class='clean'>" +
      list
        .map(
          (m) => `
        <li>
          <strong>${escapeHtml(m.name)}</strong>
          ${m.genericName ? `<span class="muted"> (${escapeHtml(m.genericName)})</span>` : ""}
          <p class="muted">${escapeHtml(m.description || "")}</p>
        </li>`
        )
        .join("") +
      "</ul>";
  } catch (e) {
    container.innerHTML = `<p class="err">${escapeHtml(e.message)}</p>`;
  }
}

let quizState = { questions: [], index: 0, selected: null };

async function renderAprender(container) {
  container.innerHTML = "<p class='muted'>Cargando…</p>";
  try {
    quizState.questions = await fetchJson("/api/quiz/questions");
    quizState.index = 0;
    quizState.selected = null;
    renderQuizCard(container);
  } catch (e) {
    container.innerHTML = `<p class="err">${escapeHtml(e.message)}</p>`;
  }
}

function renderQuizCard(container) {
  const qs = quizState.questions;
  if (!qs.length) {
    container.innerHTML = "<p>No hay preguntas.</p>";
    return;
  }
  const q = qs[quizState.index];
  const opts = q.options
    .map(
      (o) => `
    <label>
      <input type="radio" name="opt" value="${o.id}" />
      <span>${escapeHtml(o.text)}</span>
    </label>`
    )
    .join("");

  container.innerHTML = `
    <div class="card">
      <h2>Pregunta ${quizState.index + 1} de ${qs.length}</h2>
      <p>${escapeHtml(q.prompt)}</p>
      <div class="options">${opts}</div>
      <button type="button" class="primary" id="btn-check">Comprobar</button>
      <p id="quiz-feedback" class="feedback" style="margin-top:0.75rem"></p>
      <p class="muted" style="margin-top:1rem">
        <button type="button" id="btn-prev" ${quizState.index === 0 ? "disabled" : ""}>Anterior</button>
        <button type="button" id="btn-next" ${quizState.index >= qs.length - 1 ? "disabled" : ""}>Siguiente</button>
      </p>
    </div>`;

  container.querySelector("#btn-check").addEventListener("click", async () => {
    const r = container.querySelector("input[name=opt]:checked");
    const fb = container.querySelector("#quiz-feedback");
    if (!r) {
      fb.textContent = "Elige una opción.";
      fb.className = "feedback bad";
      return;
    }
    try {
      const ans = await fetchJson("/api/quiz/answer", {
        method: "POST",
        body: JSON.stringify({ questionId: q.id, optionId: Number(r.value) }),
      });
      fb.textContent = (ans.correct ? "Correcto. " : "Incorrecto. ") + ans.explanation;
      fb.className = ans.correct ? "feedback ok" : "feedback bad";
    } catch (e) {
      fb.textContent = e.message;
      fb.className = "feedback bad";
    }
  });

  container.querySelector("#btn-prev").addEventListener("click", () => {
    if (quizState.index > 0) {
      quizState.index--;
      renderQuizCard(container);
    }
  });
  container.querySelector("#btn-next").addEventListener("click", () => {
    if (quizState.index < qs.length - 1) {
      quizState.index++;
      renderQuizCard(container);
    }
  });
}

function renderConsejos(container) {
  container.innerHTML = `
    <div class="card">
      <h2>Consejos educativos</h2>
      <p class="muted">Escribe un tema (ej. fiebre, paracetamol, ibuprofeno).</p>
      <p><input type="text" id="topic" placeholder="Tema" /></p>
      <p><button type="button" class="primary" id="btn-advice">Obtener consejo</button></p>
      <div id="advice-out" class="muted"></div>
    </div>`;
  container.querySelector("#btn-advice").addEventListener("click", async () => {
    const topic = container.querySelector("#topic").value.trim();
    const out = container.querySelector("#advice-out");
    if (!topic) {
      out.textContent = "Escribe un tema.";
      return;
    }
    try {
      const r = await fetchJson("/api/advice", {
        method: "POST",
        body: JSON.stringify({ topic }),
      });
      const band =
        r.levelCode === "rojo"
          ? "color:#b91c1c;font-weight:600;"
          : r.levelCode === "amarillo"
            ? "color:#a16207;font-weight:600;"
            : "color:#15803d;font-weight:600;";
      out.innerHTML = `<div style="margin-bottom:0.5rem;${band}">${escapeHtml(r.levelTitle || "")}</div><strong>${escapeHtml(r.topic)}</strong><br/>${escapeHtml(r.message)}`;
    } catch (e) {
      out.textContent = e.message;
    }
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const loaders = {
  inicio: renderInicio,
  medicamentos: renderMedicamentos,
  aprender: renderAprender,
  consejos: renderConsejos,
};

function navigate(section) {
  setActive(section);
  const main = document.getElementById("content");
  const fn = loaders[section];
  if (fn) fn(main);
}

document.querySelectorAll(".tabs button").forEach((b) => {
  b.addEventListener("click", () => navigate(b.dataset.section));
});

navigate("inicio");

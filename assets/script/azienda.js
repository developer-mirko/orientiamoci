"use strict";

const t_body = document.getElementById("t_body");

function createTable() {
  fetch("http://localhost:3000/api/azienda/getAziende.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.length);
      for (let i = 0; i < data.length; i++) {
        const tr = document.createElement("tr");
        const tdBtnMod = document.createElement("td");
        const btnMod = document.createElement("button");
        btnMod.innerText = "Modifica";
        btnMod.setAttribute("id", data[i].id_tecnologia);
        btnMod.classList.add("btn");
        btnMod.classList.add("btn_mod");
        btnMod.addEventListener("click", (e) => {
          console.log(e.target.id);
          let id = e.target.id;
          let arrTech = getTecnologia(e.target.id);
          modForm(id, arrTech);
        });
        tdBtnMod.appendChild(btnMod);
        const tdBtnCanc = document.createElement("td");
        const btnCanc = document.createElement("button");
        btnCanc.innerText = "Cancella";
        btnCanc.setAttribute("id", data[i].id_tecnologia);
        btnCanc.classList.add("btn");
        btnCanc.classList.add("btn_canc");
        btnCanc.addEventListener("click", (e) => {
          console.log(e.target.id);
          deleteElem(e.target.id);
          deleteTable(); // Cancella intera tabella
          createTable(); // Ricostruisce l'intera tabella
        });
        tdBtnCanc.appendChild(btnCanc);
        for (let j = 0; j < 10; j++) {
          const td = document.createElement("td");
          td.innerText = data[i][j];
          tdBtnMod.appendChild(btnMod);
          tr.appendChild(td);
          //console.log(data[i][j]);
        }
        tr.appendChild(tdBtnMod);
        tr.appendChild(tdBtnCanc);
        t_body.appendChild(tr);
      }
    })
    .catch((data) => {
      console.error("Error: ", data.message);
    });
}

function deleteTable() {
  t_body.innerHTML = "";
}

function deleteElem(id) {
  fetch("http://localhost:3000/api/tecnologia/deleteTecnologia.php", {
    method: "DELETE",
    body: JSON.stringify(id),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
}

const wForm = document.getElementById("wForm");

let toggle = true;

const params = [
  "Ragione Sociale",
  "P. iva",
  "N. dipendenti",
  "N. tel",
  "Email",
  "Indirizzo",
  "Referente",
  "Ambito",
  "Note",
  "Descrizione",
];

function createForm(titolo, path, method, params = [], value = []) {
  const form = document.createElement("form");
  form.setAttribute("method", method);
  form.setAttribute("action", path);
  form.classList.add("form");
  // Div per la x
  const divX = document.createElement("div");
  divX.classList.add("x");
  const spanX = document.createElement("span");
  spanX.addEventListener("click", deleteForm);
  spanX.innerText = "X";
  divX.appendChild(spanX);
  form.appendChild(divX);
  // Div per il titolo
  const divTitolo = document.createElement("div");
  divTitolo.classList.add("wInput");
  const span = document.createElement("span");
  span.innerText = titolo;
  divTitolo.appendChild(span);
  form.appendChild(divTitolo);

  for (let i = 0; i < 8; i++) {
    const div = document.createElement("div");
    div.classList.add("wInput");
    const input = document.createElement("input");
    if (params[i] === "Email") {
      input.setAttribute("type", "email");
    } else {
      input.setAttribute("type", "text");
    }

    input.setAttribute("placeholder", params[i]);
    if (value.length !== 0) input.value = value[i];
    div.appendChild(input);
    form.appendChild(div);
  }

  const divTextAreaNote = document.createElement("div");
  divTextAreaNote.classList.add("wInput");
  const textAreaNote = document.createElement("textarea");
  textAreaNote.setAttribute("placeholder", "Note");
  if (value.length !== 0) textAreaNote.value = params[8];

  divTextAreaNote.appendChild(textAreaNote);
  form.appendChild(divTextAreaNote);

  const divTextAreaDesc = document.createElement("div");
  divTextAreaDesc.classList.add("wInput");
  const textAreadesc = document.createElement("textarea");
  textAreadesc.setAttribute("placeholder", "Descrizione");
  if (value.length !== 0) textAreadesc.value = params[9];

  divTextAreaDesc.appendChild(textAreadesc);
  form.appendChild(divTextAreaDesc);

  const divSubmit = document.createElement("div");
  divSubmit.classList.add("winput");
  const input_submit = document.createElement("input");
  input_submit.setAttribute("type", "submit");
  input_submit.classList.add("btnSubmit");
  divSubmit.appendChild(input_submit);
  form.appendChild(divSubmit);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let dati = new FormData(form);
    console.log(dati);
    let paramsInput = [inputNome.value, inputTipo.value, textArea.value];
    fetch(path, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(paramsInput),
    })
      .then((response) => response.json())
      .then((data) => {
        deleteTable();
        createTable();
        deleteForm();
        resetForm();
      });
  });

  wForm.appendChild(form);
  toggle = false;
}

function resetForm() {
  createForm(
    "Aggiungi Azienda",
    "http://localhost:3000/api/azienda/postAzienda.php",
    "POST",
    params
  );
}

function deleteForm() {
  console.log("delete form");
  if (toggle === false) {
    wForm.innerHTML = "";
    toggle = true;
  }
}

function modForm(id, params) {
  console.log(params);
  wForm.innerHTML = "";
  createForm(
    "Modifica Tecnologia ID " + id,
    "http://localhost:3000/api/tecnologia/modTecnologia.php?id=" + id,
    "POST",
    params
  );
}

const btn_add = document.getElementById("btn_add");
btn_add.addEventListener("click", () => {
  if (toggle === true)
    createForm(
      "Aggiungi Azienda",
      "http://localhost:3000/api/azienda/postAzienda.php",
      "POST",
      params
    );
});

function getTecnologia(id) {
  fetch("http://localhost:3000/api/tecnologia/getTecnologia.php?id=" + id)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let arr = [data[1], data[2], data[3]];
      modForm(data[0], arr);
    });
}

createTable(); // Richiesta campi tabella e creazione tabella

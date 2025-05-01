const ratePerLitre = 50;
let entries = JSON.parse(localStorage.getItem("milkEntries")) || [];

function addEntry() {
  const name = document.getElementById("name").value.trim();
  const litres = parseFloat(document.getElementById("litres").value);
  const date = document.getElementById("date").value;

  if (!name || isNaN(litres) || litres <= 0 || !date) {
    alert("Please fill all fields correctly.");
    return;
  }

  const total = litres * ratePerLitre;
  const entry = { name, litres, total, date };
  entries.push(entry);
  localStorage.setItem("milkEntries", JSON.stringify(entries));
  renderTable();

  document.getElementById("name").value = "";
  document.getElementById("litres").value = "";
  document.getElementById("date").value = "";
}

function renderTable() {
  const tableBody = document.getElementById("recordTable");
  tableBody.innerHTML = "";

  if (entries.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='4'>No records yet</td></tr>";
    return;
  }

  entries.forEach(e => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${e.date}</td>
      <td>${e.name}</td>
      <td>${e.litres}</td>
      <td>₹${e.total}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Initial table load
renderTable();

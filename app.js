let players = JSON.parse(localStorage.getItem("players")) || [];

function save() {
  localStorage.setItem("players", JSON.stringify(players));
  render();
}

function changeBuyin(amount) {
  const input = document.getElementById("buyin");
  let value = Number(input.value);
  value += amount;
  if (value < 0) value = 0;
  input.value = value;
}

function addPlayer() {
  const name = document.getElementById("name").value.trim();
  const buyin = Number(document.getElementById("buyin").value);

  if (!name) return alert("Enter player name");
  if (buyin <= 0) return alert("Buy-in must be greater than 0");

  players.push({
    name,
    buyin,
    cashout: 0
  });

  document.getElementById("name").value = "";
  document.getElementById("buyin").value = 400;

  save();
}

function cashOut(index) {
  const amount = Number(prompt("Enter cash-out amount"));
  if (isNaN(amount) || amount < 0) return;

  players[index].cashout = amount;
  save();
}

function render() {
  const tbody = document.getElementById("players");
  tbody.innerHTML = "";

  players.forEach((p, i) => {
    const profit = p.cashout - p.buyin;
    const profitClass = profit >= 0 ? "profit" : "loss";

    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.buyin}</td>
        <td>${p.cashout}</td>
        <td class="${profitClass}">${profit}</td>
        <td><button onclick="cashOut(${i})">Cash Out</button></td>
      </tr>
    `;
  });
}

render();

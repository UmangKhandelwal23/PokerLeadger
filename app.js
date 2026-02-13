let players = JSON.parse(localStorage.getItem("players")) || [];

function save() {
  localStorage.setItem("players", JSON.stringify(players));
  render();
}

function addPlayer() {
  const name = document.getElementById("name").value;
  const buyin = Number(document.getElementById("buyin").value);

  if (!name || !buyin) return alert("Enter name and buy-in");

  players.push({ name, buyin, cashout: 0 });
  save();
}

function cashOut(index) {
  const amount = Number(prompt("Enter cash-out amount"));
  if (!amount) return;

  players[index].cashout = amount;
  save();
}

function render() {
  const tbody = document.getElementById("players");
  tbody.innerHTML = "";

  players.forEach((p, i) => {
    const profit = p.cashout - p.buyin;
    tbody.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.buyin}</td>
        <td>${p.cashout}</td>
        <td style="color:${profit >= 0 ? 'lime' : 'red'}">
          ${profit}
        </td>
        <td>
          <button onclick="cashOut(${i})">Cash Out</button>
        </td>
      </tr>
    `;
  });
}

render();

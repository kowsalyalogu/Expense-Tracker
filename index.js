const description = document.getElementById("description");
const amount = document.getElementById("amount");
const addBtn = document.getElementById("add");
const list = document.getElementById("list");
const balance = document.getElementById("balance");
const plus = document.getElementById("plus");
const minus = document.getElementById("minus");

let transactions = [];
addBtn.addEventListener("click", () => {
    const desc = description.value.trim();
    const amt = +amount.value;

    if (desc === "" || isNaN(amt) || amt === 0) {
        alert("Please enter a valid description and non-zero amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        text: desc,
        amount: amt
    };

    transactions.push(transaction);
    updateList();
    updateSummary();
    description.value = "";
    amount.value = "";
});
function updateList() {
    list.innerHTML = ""; 

    transactions.forEach(tx => {
        const sign = tx.amount < 0 ? "-" : "+";
        const li = document.createElement("li");

        li.style.listStyle = "none";
        li.style.margin = "8px 0";
        li.style.padding = "8px";
        li.style.backgroundColor = "#f5f5f5";
        li.style.borderRight = tx.amount < 0 ? "5px solid red" : "5px solid green";
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.borderRadius = "4px";

        li.innerHTML = `
            ${tx.text} <span>${sign}$${Math.abs(tx.amount).toFixed(2)}</span>
            <button onclick="deleteTransaction(${tx.id})" style="margin-left:10px; background-color:red; color:white; border:none; padding:4px 8px; border-radius:3px; cursor:pointer;">x</button>
        `;
        list.appendChild(li);
    });
}
function updateSummary() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, val) => acc + val, 0).toFixed(2);
    const income = amounts.filter(val => val > 0).reduce((acc, val) => acc + val, 0).toFixed(2);
    const expense = amounts.filter(val => val < 0).reduce((acc, val) => acc + val, 0).toFixed(2);

    balance.innerText = `$${total}`;
    plus.innerText = `+$${income}`;
    minus.innerText = `-$${Math.abs(expense)}`;
}
function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateList();
    updateSummary();
}

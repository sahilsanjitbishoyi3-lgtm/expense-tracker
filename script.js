
// ======================================
// EXPENSE TRACKER APPLICATION
// ======================================

// 1. Get HTML elements
const expenseForm = document.getElementById("expense-form");
const expenseName = document.getElementById("expense-name");
const expenseAmount = document.getElementById("expense-amount");
const expenseCategory = document.getElementById("expense-category");
const expenseList = document.getElementById("expense-list");
const totalExpenses = document.getElementById("total-expenses");

// 2. Load expenses from Local Storage
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// 3. Save expenses to Local Storage
function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

// 4. Add new expense
expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = expenseName.value.trim();
    const amount = Number(expenseAmount.value);
    const category = expenseCategory.value;

    // Validate input
    if (
        name === "" ||
        !Number.isFinite(amount) ||
        amount <= 0 ||
        category === ""
    ) {
        alert("Please enter valid expense details!");
        return;
    }

    // Create expense object
    const expense = {
        id: Date.now(),
        name: name,
        amount: amount,
        category: category
    };

    // Add expense to array
    expenses.push(expense);

    // Save to Local Storage
    saveExpenses();

    // Display updated expenses
    displayExpenses();

    // Clear form
    expenseForm.reset();
});

// 5. Display expenses
function displayExpenses() {

    expenseList.innerHTML = "";

    let total = 0;

    // Show message if no expenses
    if (expenses.length === 0) {

        expenseList.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-muted">
                    No expenses added yet.
                </td>
            </tr>
        `;
    }

    // Loop through expenses
    expenses.forEach(function(expense) {

        total += expense.amount;

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${escapeHTML(expense.name)}</td>
            <td>${escapeHTML(expense.category)}</td>
            <td>₹${expense.amount.toFixed(2)}</td>
            <td>
                <button
                    class="btn btn-danger btn-sm"
                    onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        `;

        expenseList.appendChild(row);
    });

    // Update total expenses
    totalExpenses.textContent = "₹" + total.toFixed(2);
}

// 6. Escape user-entered text safely
function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(char) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[char];

    });
}

// 7. Delete an expense
function deleteExpense(id) {

    expenses = expenses.filter(function(expense) {
        return expense.id !== id;
    });

    // Update Local Storage
    saveExpenses();

    // Refresh expense list
    displayExpenses();
}

// 8. Display saved expenses when page loads
displayExpenses();

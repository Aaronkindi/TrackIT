let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById('category-select');
const amountInput = document.getElementById('amount-input');
const dateInput = document.getElementById('date-input');
const addBtn = document.getElementById('add-btn');
const expensesTableBody = document.getElementById('expnese-table-body');
const totalAmountCell = document.getElementById('total-amount');

// Get the chart canvases
const pieChartCanvas = document.getElementById('pieChart').getContext('2d');
const barChartCanvas = document.getElementById('barChart').getContext('2d');
const lineChartCanvas = document.getElementById('lineChart').getContext('2d');

// Inside the chart instances
const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
};

const pieChart = new Chart(pieChartCanvas, {
    type: 'pie',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: ['#FFA500', '#FFD700', '#FF6347', '#FF4500'], // Add custom orange colors
        }],
    },
    options: {
        ...commonOptions,
        title: {
            display: true,
            text: 'Expense Distribution (Pie Chart)',
            fontColor: 'orange', // Set title font color
        },
    },
});

const barChart = new Chart(barChartCanvas, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Amount',
            data: [],
            backgroundColor: 'rgba(255, 165, 0, 0.8)', // Adjust the orange color
        }],
    },
    options: {
        ...commonOptions,
        title: {
            display: true,
            text: 'Expense Distribution (Bar Chart)',
            fontColor: 'orange', // Set title font color
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
            }],
        },
    },
});

const lineChart = new Chart(lineChartCanvas, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Amount',
            data: [],
            borderColor: 'rgba(255, 69, 0, 0.8)', // Adjust the orange color
            fill: false,
        }],
    },
    options: {
        ...commonOptions,
        title: {
            display: true,
            text: 'Expense Distribution (Line Chart)',
            fontColor: 'orange', // Set title font color
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
            }],
        },
    },
});

addBtn.addEventListener('click', function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === '') {
        alert('Please select a category');
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount');
        return;
    }
    if (date === '') {
        alert('Please select a date');
        return;
    }

    // Create a new expense object
    const expense = { category, amount, date };

    // Add the expense to the array
    expenses.push(expense);

    // Update the total amount
    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    // Update the expenses table
    const newRow = expensesTableBody.insertRow();
    const cells = [
        newRow.insertCell(),
        newRow.insertCell(),
        newRow.insertCell(),
        newRow.insertCell(),
    ];

    // Populate the cells
    cells[0].textContent = expense.category;
    cells[1].textContent = expense.amount;
    cells[2].textContent = expense.date;

    // Create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', function () {
        // Handle deletion logic
        expenses.splice(expenses.indexOf(expense), 1);
        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;
        expensesTableBody.removeChild(newRow);
        updateCharts(); // Call the function to update the charts after deletion
    });

    // Append the delete button to the last cell
    cells[3].appendChild(deleteBtn);

    // Update the charts
    updateCharts();
});

// Function to update the charts
function updateCharts() {
    const categories = expenses.map(expense => expense.category);
    const amounts = expenses.map(expense => expense.amount);

    // Update the Pie Chart
    pieChart.data.labels = categories;
    pieChart.data.datasets[0].data = amounts;
    pieChart.update();

    // Update the Bar Chart
    barChart.data.labels = categories;
    barChart.data.datasets[0].data = amounts;
    barChart.update();

    // Update the Line Chart
    lineChart.data.labels = categories;
    lineChart.data.datasets[0].data = amounts;
    lineChart.update();
}

// Initial update to charts
updateCharts();

const employees = [
	{ name: "Ahmed Hassan", age: 34, salary: 18000, department: "Engineering", joiningDate: "2021-03-15" },
	{ name: "Mona Ali", age: 29, salary: 22000, department: "Marketing", joiningDate: "2019-08-01" },
	{ name: "Omar Samir", age: 41, salary: 16000, department: "Finance", joiningDate: "2017-11-20" }
];

const namePattern = /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/;
const form = document.querySelector("#employee-form");
const employeeList = document.querySelector("#employee-list");
const message = document.querySelector("#message");
const result = document.querySelector("#result");

function yearsWorked(joiningDate) {
	const start = new Date(`${joiningDate}T00:00:00`);
	const today = new Date();
	let years = today.getFullYear() - start.getFullYear();
	const anniversary = new Date(today.getFullYear(), start.getMonth(), start.getDate());
	if (anniversary > today) years--;
	return Math.max(0, years);
}

function formatDate(dateString) {
	return new Date(`${dateString}T00:00:00`).toLocaleDateString();
}

function displayEmployees(list = employees) {
	employeeList.innerHTML = "";
	if (list.length === 0) {
		employeeList.innerHTML = '<tr><td class="empty" colspan="7">There is nobody on the team yet.</td></tr>';
		return;
	}

	list.forEach((employee) => {
		const row = document.createElement("tr");
		row.innerHTML = `
			<td>${employee.name}</td>
			<td>${employee.age}</td>
			<td>${employee.salary.toLocaleString()}</td>
			<td>${employee.department}</td>
			<td>${formatDate(employee.joiningDate)}</td>
			<td>${yearsWorked(employee.joiningDate)}</td>
			<td><button class="danger remove-button" data-name="${employee.name}">Remove</button></td>`;
		employeeList.appendChild(row);
	});
}

function showMessage(target, text, type = "success") {
	target.textContent = text;
	target.className = type;
}

form.addEventListener("submit", (event) => {
	event.preventDefault();
	const employee = {
		name: document.querySelector("#name").value.trim(),
		age: Number(document.querySelector("#age").value),
		salary: Number(document.querySelector("#salary").value),
		department: document.querySelector("#department").value.trim(),
		joiningDate: document.querySelector("#joining-date").value
	};

	if (!namePattern.test(employee.name)) {
		showMessage(message, "Name may contain letters, spaces, apostrophes, and hyphens only.", "error");
		return;
	}
	if (employee.age <= 0 || employee.salary < 0 || !employee.joiningDate) {
		showMessage(message, "Enter valid employee details.", "error");
		return;
	}

	employees.push(employee);
	displayEmployees();
	form.reset();
	showMessage(message, `${employee.name} is now part of the team.`);
});

employeeList.addEventListener("click", (event) => {
	if (!event.target.classList.contains("remove-button")) return;
	const name = event.target.dataset.name;
	const index = employees.findIndex((employee) => employee.name === name);
	if (index !== -1) employees.splice(index, 1);
	displayEmployees();
	showMessage(message, `${name} has been removed from the team.`);
});

document.querySelector("#search-button").addEventListener("click", () => {
	const searchTerm = document.querySelector("#search-name").value.trim().toLowerCase();
	const matches = employees.filter((employee) => employee.name.toLowerCase().includes(searchTerm));
	displayEmployees(matches);
	result.textContent = `${matches.length} employee${matches.length === 1 ? "" : "s"} found.`;
});

document.querySelector("#show-all-button").addEventListener("click", () => {
	displayEmployees();
	result.textContent = "Everyone on the team is shown.";
});

document.querySelector("#sort-button").addEventListener("click", () => {
	employees.sort((first, second) => second.salary - first.salary);
	displayEmployees();
	result.textContent = "The team is sorted from highest to lowest salary.";
});

document.querySelector("#highest-button").addEventListener("click", () => {
	const highest = employees.reduce((current, employee) => employee.salary > current.salary ? employee : current, employees[0]);
	result.textContent = highest ? `Highest salary: ${highest.name} (${highest.salary.toLocaleString()}).` : "No employees available.";
});

document.querySelector("#oldest-button").addEventListener("click", () => {
	const oldest = employees.reduce((current, employee) => employee.age > current.age ? employee : current, employees[0]);
	result.textContent = oldest ? `Oldest employee: ${oldest.name} (${oldest.age} years old).` : "No employees available.";
});

document.querySelector("#today-button").addEventListener("click", () => {
	result.textContent = `Today's date: ${new Date().toLocaleDateString()}.`;
});

document.querySelector("#clear-button").addEventListener("click", () => {
	employees.length = 0;
	displayEmployees();
	result.textContent = "Everyone has been removed from the team.";
});

displayEmployees();

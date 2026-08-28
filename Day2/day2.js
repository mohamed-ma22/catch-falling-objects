function getAverage(total, count) {
	return total / count;
}

function getGrade(average) {
	if (average >= 90) return "A";
	if (average >= 80) return "B";
	if (average >= 70) return "C";
	if (average >= 60) return "D";
	return "F";
}

function printResult(name, total, average, grade) {
	console.log(`Student: ${name}`);
	console.log(`Total: ${total}`);
	console.log(`Average: ${average.toFixed(2)}`);
	console.log(`Grade: ${grade}`);
}

function getMark(subject) {
	while (true) {
		const input = prompt(`Enter ${subject} mark (0-100):`);

		if (input === null) return null;

		const mark = Number(input);
		if (Number.isFinite(mark) && mark >= 0 && mark <= 100) {
			return mark;
		}

		alert("Please enter a valid mark between 0 and 100.");
	}
}

while (true) {
	const name = prompt("Enter the student's name:");
	if (name === null) break;

	const marks = [];
	for (const subject of ["Subject 1", "Subject 2", "Subject 3"]) {
		const mark = getMark(subject);
		if (mark === null) break;
		marks.push(mark);
	}

	if (marks.length !== 3) break;

	const total = marks.reduce((sum, mark) => sum + mark, 0);
	const average = getAverage(total, marks.length);
	const grade = getGrade(average);

	printResult(name, total, average, grade);
	alert(`Student: ${name}\nTotal: ${total}\nAverage: ${average.toFixed(2)}\nGrade: ${grade}`);

	if (!confirm("Do you want to calculate another student?")) break;
}

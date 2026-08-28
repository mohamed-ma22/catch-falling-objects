let studentName = prompt("Enter your name:");
let studentAge = Number(prompt("Enter your age:"));
let studentGrade = Number(prompt("Enter your grade:"));

console.log("Name type:", typeof studentName);
console.log("Age type:", typeof studentAge);
console.log("Grade type:", typeof studentGrade);

let nextYearAge = studentAge + 1;
const passingGrade = 50;

console.log("Your age next year will be:", nextYearAge);
console.log("Passing grade is:", passingGrade);

if (studentAge < 5) {
    alert("Sorry, you are too young to join the platform.");
} else if (studentGrade < passingGrade) {
    alert("Hello " + studentName + ", you did not pass this year.");
} else {
    alert("Welcome " + studentName + "! You passed the year.");
}

let gradeLetter;

switch (true) {
    case studentGrade >= 90:
        gradeLetter = "A";
        break;
    case studentGrade >= 80:
        gradeLetter = "B";
        break;
    case studentGrade >= 70:
        gradeLetter = "C";
        break;
    case studentGrade >= 60:
        gradeLetter = "D";
        break;
    default:
        gradeLetter = "F";
}

console.log("Student Name:", studentName);
console.log("Student Age:", studentAge);
console.log("Student Grade:", studentGrade);
console.log("Grade Letter:", gradeLetter);
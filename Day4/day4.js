function Book(title, author, price, available) {
	this.title = title;
	this.author = author;
	this.price = price;
	this.available = available;

	this.borrow = function () {
		this.available = false;
	};

	this.returnBook = function () {
		this.available = true;
	};

	this.displayDetails = function () {
		return this.title + " by " + this.author + " - " + formatPrice(this.price);
	};
}

Book.prototype.discount = function (percent) {
	this.price = this.price - (this.price * percent / 100);
};

var books = [
	new Book("The Midnight Library", "Matt Haig", 18.99, true),
	new Book("Atomic Habits", "James Clear", 21.50, false),
	new Book("Pride and Prejudice", "Jane Austen", 12.75, true),
	new Book("The Alchemist", "Paulo Coelho", 15.25, true),
	new Book("Educated", "Tara Westover", 19.99, false),
	new Book("Sapiens", "Yuval Noah Harari", 24.00, true),
	new Book("The Great Gatsby", "F. Scott Fitzgerald", 10.50, false),
	new Book("The Book Thief", "Markus Zusak", 17.80, true),
	new Book("Dune", "Frank Herbert", 22.49, true),
	new Book("The Kite Runner", "Khaled Hosseini", 16.95, false)
];

var bookList = document.querySelector("#book-list");
var result = document.querySelector("#result");

function formatPrice(price) {
	return "$" + price.toFixed(2);
}

function displayBooks(bookArray) {
	bookList.innerHTML = "";

	if (!bookArray) {
		bookArray = books;
	}

	if (bookArray.length === 0) {
		bookList.innerHTML = '<p class="empty">No books match your search.</p>';
		return;
	}

	for (var i = 0; i < bookArray.length; i++) {
		var book = bookArray[i];
		var article = document.createElement("article");
		var statusClass = book.available ? "available" : "borrowed";
		var statusText = book.available ? "Available" : "Borrowed";

		article.className = "book";
		article.innerHTML = '<div class="book-cover">' + book.title.charAt(0) + '</div>' +
			'<div class="book-info"><h3>' + book.title + '</h3>' +
			'<p>' + book.author + '</p><strong>' + formatPrice(book.price) + '</strong></div>' +
			'<span class="status ' + statusClass + '">' + statusText + '</span>';
		bookList.appendChild(article);
	}
}

function showBooksByAvailability(available) {
	var selectedBooks = [];

	for (var i = 0; i < books.length; i++) {
		if (books[i].available === available) {
			selectedBooks.push(books[i]);
		}
	}

	displayBooks(selectedBooks);
	return selectedBooks.length;
}

document.querySelector("#search-button").onclick = function () {
	var searchText = document.querySelector("#search-title").value.toLowerCase();
	var foundBooks = [];

	for (var i = 0; i < books.length; i++) {
		if (books[i].title.toLowerCase().indexOf(searchText) !== -1) {
			foundBooks.push(books[i]);
		}
	}

	displayBooks(foundBooks);
	result.textContent = foundBooks.length + " book(s) found.";
};

document.querySelector("#show-all-button").onclick = function () {
	displayBooks(books);
	result.textContent = "All books are on the shelf.";
};

document.querySelector("#available-button").onclick = function () {
	var count = showBooksByAvailability(true);
	result.textContent = count + " available book(s).";
};

document.querySelector("#borrowed-button").onclick = function () {
	var count = showBooksByAvailability(false);
	result.textContent = count + " borrowed book(s).";
};

document.querySelector("#average-button").onclick = function () {
	var total = 0;

	for (var i = 0; i < books.length; i++) {
		total += books[i].price;
	}

	var average = total / books.length;
	result.textContent = "The average book price is " + formatPrice(average) + ".";
};

document.querySelector("#expensive-button").onclick = function () {
	var expensiveBook = books[0];

	for (var i = 1; i < books.length; i++) {
		if (books[i].price > expensiveBook.price) {
			expensiveBook = books[i];
		}
	}

	result.textContent = "Most expensive book: " + expensiveBook.displayDetails() + ".";
};

document.querySelector("#cheap-button").onclick = function () {
	var cheapBook = books[0];

	for (var i = 1; i < books.length; i++) {
		if (books[i].price < cheapBook.price) {
			cheapBook = books[i];
		}
	}

	result.textContent = "Cheapest book: " + cheapBook.displayDetails() + ".";
};

document.querySelector("#discount-button").onclick = function () {
	var discount = Number(document.querySelector("#discount").value);

	if (discount < 0 || discount > 100 || isNaN(discount)) {
		result.textContent = "Choose a discount between 0% and 100%.";
		return;
	}

	for (var i = 0; i < books.length; i++) {
		books[i].discount(discount);
	}

	displayBooks(books);
	result.textContent = discount + "% discount applied to every book.";
};

displayBooks(books);

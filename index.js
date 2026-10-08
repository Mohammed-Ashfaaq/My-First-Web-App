document.getElementById("toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});

// Form validation — checks required fields before submission
function validateForm() {
    // Get form field values
    var fname = document.forms["contactForm"]["fname"].value;
    var lname = document.forms["contactForm"]["lname"].value;
    var email = document.forms["contactForm"]["email"].value;

    // Check if required fields are empty
    if (fname == "" || lname == "" || email == "") {
        alert("All fields must be filled out");
        return false;
    } else {
        // Display thank you message on successful submission
        document.getElementById("form-container").innerHTML = 
            "<p><strong>Thank you " + fname + ", your message has been received!</strong></p>";
        return false;
    }
}

// Book recommendation API — fetches random book from FreeAPI
document.getElementById("bookButton").addEventListener("click", function() {
    // Hide intro message on first click
    document.getElementById("book-message").style.display = "none";

    // Fetch random book from API
    fetch("https://api.freeapi.app/api/v1/public/books/book/random")
        .then(response => response.json())
        .then(data => {
            // Extract book information from response
            const book = data.data.volumeInfo;

            // Display book details in container
            document.getElementById("book-container").innerHTML = `
                <img src="${book.imageLinks ? book.imageLinks.thumbnail : ""}" alt="Book Cover">
                <h4>${book.title}</h4>
                <p><strong>Author:</strong> ${book.authors ? book.authors[0] : "Unknown Author"}</p>
                <p><strong>Category:</strong> ${book.categories ? book.categories[0] : "Unknown Category"}</p>
                <p>${book.description ? book.description.split('.')[0] + "." : "No description available."}</p>
            `
        })
        // Log any errors to console
        .catch(error => {
            console.error("Error fetching book:", error);
        })
})
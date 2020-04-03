import axios from "axios";

export default {

    // Searches Google Books API
    searchBook: function(bookTitle) {
        return axios.get("https://www.googleapis.com/books/v1/volumes?q=" + bookTitle);
    },

    // Saves searched book to DB
    saveBook: function(bookData) {
        return axios.post("/api/books" + bookData);
    },

    // Gets all saved books from DB
    viewSavedBooks: function() {
        return axios.get("/api/books");
    },

    // Possibly a search function to search DB for specific book ???
    viewSavedBook: function(bookTitle) {
        return axios.get("/api/books/" + bookTitle);
    },

    // Deletes a book from DB
    deleteBook: function(id) {
        return axios.delete("/api/books/" + id);
    }
}
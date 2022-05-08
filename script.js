export const bookShelf = [];
import { book2grid, domModuleReady, clearPage } from './modules/DOM.js';

console.log('Ready...');
domModuleReady();



const searchInput = document.getElementById('searchInput');
const submitButton = document.getElementById('submitButton');
const gBooksURL = 'https://www.googleapis.com/books/v1/volumes?q=';


const startEventListener = () => {
    submitButton.addEventListener('click', function () { fetchJson(searchInput.value); });
};

const cleanSearchString = (input) => {
    const regex = /[a-zA-Z0-9" "]/g;
    const output = input.match(regex).join('').split(' ').join('+');
    console.log(output);
    return output;
};

const submitSearch = (input) => {
    console.log(gBooksURL + cleanSearchString(input));
    return gBooksURL + cleanSearchString(input) + "&maxResults=12";
};



const fetchJson = async (input) => {
    clearPage();
    const response = await fetch(submitSearch(input));
    console.log(response);
    const books = await response.json();
    console.log(books);
    let i = 0;
    const bookCollection = books.items.map((volume) => {

        console.log('book' + i++);
        const output = {};
        // Book publish date
        try {
            if (volume.volumeInfo.publishedDate)
                output.publishedDate = volume.volumeInfo.publishedDate;
            else output.publishedDate = "Unknown";
        }
        catch (error) {
            console.log(error);
            output.publishedDate = "Unknown";
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Book Title
        try {
            if (volume.volumeInfo.title)
                output.title = volume.volumeInfo.title;
            else output.title = "Unknown";
        }
        catch (error) {
            console.log(error);
            output.title = "Unknown";
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Book description
        try {
            if (volume.volumeInfo.description)
                output.description = volume.volumeInfo.description;
            else output.description = "Unknown";
        }
        catch (error) {
            console.log(error);
            output.description = "Unknown";
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Book author
        try {
            if (volume.volumeInfo.authors) {
                for (let i = 0; i <= volume.volumeInfo.authors.length - 1; i++)
                    output.authors = volume.volumeInfo.authors[i];
            }
            else output.author = "Unknown";
        }
        catch (error) {
            console.log(error);
            output.author = "Unknown";
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Book page count
        try {
            if (volume.volumeInfo.pageCount)
                output.pageCount = volume.volumeInfo.pageCount;
            else output.pageCount = "Unknown";
        }
        catch (error) {
            console.log(error);
            output.pageCount = "Unknown";
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Book categories  
        try {
            if (volume.volumeInfo.categories) {
                for (let i = 0; i <= volume.volumeInfo.categories.length - 1; i++)
                    output.categories = volume.volumeInfo.categories[i];
            }
            else output.categories = "Unknown";
        }
        catch (error) {
            console.log(error);
            output.categories = "Unknown";
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        // Book average rating
        try {
            if (volume.volumeInfo.averageRating)
                output.averageRating = volume.volumeInfo.averageRating;
            else output.averageRating = "Unknown";
        }
        catch (error) {
            console.log(error);
            output.averageRating = "Unknown";
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

        //book image
        try {
            if (volume.volumeInfo.imageLinks['thumbnail'])
                output.imageLinks = volume.volumeInfo.imageLinks['thumbnail'];
            else output.imageLinks = "./images/bookCover.png";
        }
        catch (error) {
            console.log(error);
            output.imageLinks = "./images/bookCover.png";
        }
        //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
        return output;
    });

    book2grid(bookCollection);

    bookShelf.push(bookCollection);
    console.log(bookCollection);
};

startEventListener();

window.submitSearch = submitSearch;
window.fetchJson = fetchJson;
window.book2grid = book2grid;
window.bookShelf = bookShelf;
window.clearPage = clearPage
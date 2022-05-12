export const bookShelf = [];
import { book2grid, domModuleReady, clearPage ,nothingFound} from './modules/DOM.js';

console.log('Script.JS Ready...');
domModuleReady();

let bookCollection = [];
let lastSearch;
export const coverPlaceHolder = "./images/bookCover.png";
const searchInput = document.getElementById('searchInput');
const submitButton = document.getElementById('submitButton');
const gBooksURL = 'https://www.googleapis.com/books/v1/volumes?q=';


const startEventListener = () => {
    submitButton.addEventListener('click', function () { fetchJson(searchInput.value); });
};

const cleanSearchString = (input) => {
    lastSearch = input;
    const regex = /[a-zA-Z0-9" "]/g;
    const output = input.match(regex).join('').split(' ').join('+');
    return output;
};

const submitSearch = (input) => {
    return gBooksURL + cleanSearchString(input) + "&maxResults=12";
};

const fetchJson = async (input) => {
    clearPage();
    const response = await fetch(submitSearch(input));
    const books = await response.json();
    let i = 0;
    try {
        bookCollection = books.items.map((volume) => {
            console.log('book' + i++);
            const output = {};
            // Book publish date
            try {
                if (volume.volumeInfo.publishedDate)
                    output.publishedDate = volume.volumeInfo.publishedDate;
                else output.publishedDate = "Unknown";
            }
            catch (error) {
                output.publishedDate = "Unknown";
            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

            // Book publisher
            try {
                if (volume.volumeInfo.publisher)
                    output.publisher = volume.volumeInfo.publisher;
                else output.publisher = "Unknown";
            }
            catch (error) {
                output.publisher = "Unknown";
            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

            // Book format
            try {
                if (volume.id)
                    output.id = volume.id;
                else output.id = "Unknown";
            }
            catch (error) {
                output.id = "Unknown";
            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

            // Book language
            try {
                if (volume.volumeInfo.language)
                    output.language = volume.volumeInfo.language;
                else output.language = "Unknown";
            }
            catch (error) {
                output.language = "Unknown";
            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

            // Book Title
            try {
                if (volume.volumeInfo.title)
                    output.title = volume.volumeInfo.title;
                else output.title = "Unknown";
            }
            catch (error) {
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
                output.categories = "Unknown";
            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

            // Book average rating
            try {
                if (volume.volumeInfo.averageRating)
                    output.averageRating = volume.volumeInfo.averageRating;
                output.averageRating = "No ratings";
            }
            catch (error) {
                output.averageRating = "No ratings";
            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            // Book price
            try {
                if (volume.saleInfo.retailPrice)
                    output.retailPrice = volume.saleInfo.retailPrice.amount;
                else output.retailPrice = "0.00";
            }
            catch (error) {
                output.averageRating = "an error";
            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

            //book image
            try {
                if (volume.volumeInfo.imageLinks['thumbnail'])
                    output.imageLinks = volume.volumeInfo.imageLinks['thumbnail'];
            }
            catch (error) {
                output.imageLinks = coverPlaceHolder;
            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            //book link
            try {
                if (volume.volumeInfo.infoLink)
                    output.infoLink = volume.volumeInfo.infoLink;
            }
            catch (error) {
                output.infoLink = "#";
            }
            //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
            return output;
        });
    }
    catch (error) { 
        return nothingFound(lastSearch); 
    };

    book2grid(bookCollection);

    bookShelf.push(bookCollection);
};

startEventListener();
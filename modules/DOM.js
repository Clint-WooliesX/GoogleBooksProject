import { bookShelf } from '../script.js';
export const domModuleReady = () => {
    console.log('DOM module is ready...');
    console.log(bookShelf);
};

export const clearPage = () => {
    try {
        console.log('clearPage has been run ');
        for (let i = 0; i < 12; i++) {
            let element = "book" + i;
            document.getElementById(element).remove();
            console.log('#########book' + i + ' removed');
        };
        console.log('reset bookShelf');
        bookShelf.length = 0;
    }
    catch (error) {
        console.log(error);
    }
};


export const book2grid = (input) => {
    for (let i = 0; i <= input.length - 1; i++) {
        var html = [
            // '<div class="scene">',
            `<div class="card">`,
            `<div class="card__face card__face--front"><img class="cover" src=${input[i].imageLinks}></div>`,
            `<div class="card__face card__face--back">`,
            `<h4 class="book_details">Author:</h4>`,
            `<p class="book_details--text">${input[i].authors}</p>`,
            // `<h4>About: "${input[i].description.substring(0,120)}..."</h4>`,
            `<h4 class="book_details">About:</h4>`, 
            `<p class="book_details--text">"${input[i].description.split(/\s+/).slice(0, 25).join(' ') + '...'}"</p>`,
            `</div>`,
            `</div>`,
            // '</div>',
        ].join('');


        var div = document.createElement('div');
        div.setAttribute('class', 'scene', 'id', 'book' + i);
        div.setAttribute('id', 'book' + i);

        div.innerHTML = html;
        document.getElementById('search-results').appendChild(div);
    }
};
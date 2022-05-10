import { bookShelf, coverPlaceHolder } from '../script.js';
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
            `<div id="card${i}" class="card__face card__face--front"><img class="cover" src=${input[i].imageLinks}></div>`,
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



        let div = document.createElement('div');
        div.setAttribute('class', 'scene');
        div.setAttribute('id', 'book' + i);

        div.innerHTML = html;
        document.getElementById('search-results').appendChild(div);

        const bookButton = document.getElementById('book'+i);
        const startEventListener = () => {
            bookButton.addEventListener('click', function () {
                console.log('bookCover was clicked' + this.id); openModal()
             });
        };

        div = document.createElement('div');
        div.setAttribute('class', 'hidden_title');
        let unknownHTML = [`<h4 class="hidden_title--${i}">${input[i].title}<h4>`];
        div.innerHTML = unknownHTML;
        if (input[i].imageLinks == coverPlaceHolder) {
            let bookID = "card" + i;
            document.getElementById(bookID).appendChild(div);
        }
        
    
    }
};

export const openModal = ()=>{
document.getElementById('modal').style = "display:flex"
}
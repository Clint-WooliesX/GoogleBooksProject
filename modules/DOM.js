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

        const bookButton = document.getElementById('book' + i);
        const startEventListener = () => {
            bookButton.addEventListener('click', function () {
                console.log('bookCover was clicked' + this.id); openModal(input[i]);
            });
        };

        startEventListener();

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

export const openModal = (input) => {
    // document.getElementById('modal').style = "display:flex";

    const html = [
        `<div id="modal" class="modal">`,
        `<div class="modal_box">`,
        `<div class="close"><p id="closeModal">Close</p></div>`,
        `<div class="modal_grid">`,
        `<div>`,
        `<div class="book_cover">`,
        `<img class="book_cover__image" src="${input.imageLinks}">`,
        // `<img class="book_cover__image" src="https://books.google.com/books/content?id=${input.id}&printsec=frontcover&img=1&zoom=2&edge=curl&source=gbs_api">`,
        `</div>`,
        `</div>`,
        `<div>`,
        `<div class="book_title">`,
        `<h2>${input.title}</h2>`,
        `</div>`,
        `<div class="book_data">`,
        `<div class="book_author">`,
        `<h4>Author:</h4>`,
        `<p>${input.authors}</p>`,
        `</div>`,
        `<div class="book_published">`,
        `<h4>Published:</h4>`,
        `<p>${input.publishedDate}</p>`,
        `</div>`,
        `<div class="book_publisher">`,
        `<h4>Publisher:</h4>`,
        `<p>${input.publisher}</p>`,
        `</div>`,
        `<div class="book_page_count">`,
        `<h4>Page count:</h4>`,
        `<p>${input.pageCount}</p>`,
        `</div>`,
        `<div class="book_format">`,
        `<h4>Ref ID:</h4>`,
        `<p>${input.id}</p>`,
        `</div>`,
        `<div class="book_language">`,
        `<h4>Language:</h4>`,
        `<p>${input.language}</p>`,
        `</div>`,
        `<div class="book_genre">`,
        `<h4>genre:</h4>`,
        `<p>${input.categories}</p>`,
        `</div>`,
        `<div class="book_avg_rating">`,
        `<h4>Average rating:</h4>`,
        `<p>${input.averageRating}</p>`,
        `</div>`,
        `</div>`,
        `<div class="book_purchase">`,
        `<div class="book_purchase--price">`,
        `<h4>Price:</h4><p>$${input.retailPrice}</p>`,
        `</div>`,
        `<div>`,
        `<h4><a href="${input.infoLink}" target="_blank">Open in Google</a></h4>`,
        `</div>`,
        `</div>`,
        `<div class="book_synopsis">`,
        `<h4>Synopsis:</h4>`,
        `<textarea class="scroll-text" name="" id="" cols="30" rows="10" disabled>${input.description}</textarea>`,
        `</div>`,
        `</div>`,
        `</div>`,
        `</div>`,
        `</div>`,
    ].join('');

    const div = document.createElement('div');
    // div.setAttribute('class', 'scene');
    // div.setAttribute('id', 'book' + i);

    div.innerHTML = html;
    document.getElementById('openModal').appendChild(div);

    const closeButton = document.getElementById('closeModal');
    const startEventListener = () => {
        closeButton.addEventListener('click', function () {
            console.log('close button clicked');
             document.getElementById('modal').remove();
        });
        
    };
    startEventListener();




};
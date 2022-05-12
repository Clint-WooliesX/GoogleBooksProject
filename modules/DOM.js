import { bookShelf, coverPlaceHolder } from '../script.js';

export const domModuleReady = () => {
    console.log('DOM module is ready...');
};

export const clearPage = () => {
    document.getElementById('search-results').innerHTML=""
};

export const nothingFound = (searchString) => {
    let html = [
        `<div id="nothingFound" class="nothing-found">`,
        `<div class="nothing-card">`,
        `<p style="padding-top:.33em">Your search - <span><em>${searchString}</em></span> - did not match
                    any book results.</p>`,
        `<p style="margin-top:1em">Suggestions:</p>`,
        `<ul style="margin-left:1.3em;margin-bottom:2em">`,
        `<li>Make sure that all words are spelled correctly.</li>`,
        `<li>Try different keywords.</li>`,
        `<li>Try more general keywords.</li>`,
        `<li>Try fewer keywords.</li>`,
        `</ul>`,
        `</div>`,
        `</div>`,
    ].join('');

    let div = document.createElement('div');
    div.setAttribute('id', 'nothingFound');
    div.innerHTML = html;
    document.getElementById('search-results').appendChild(div);
};



export const book2grid = (input) => {
    for (let i = 0; i <= input.length - 1; i++) {
        let html = [
            // '<div class="scene">',
            `<div class="card">`,
            `<div id="card${i}" class="card__face card__face--front"><img class="cover" src=${input[i].imageLinks}></div>`,
            `<div class="card__face card__face--back">`,
            `<h4 class="book_details">Author:</h4>`,
            `<p class="book_details--text">${input[i].authors}</p>`,
            // `<h4>About: "${input[i].description.substring(0,120)}..."</h4>`,
            `<h4 class="book_details">About:</h4>`,
            `<p class="book_details--text">"${input[i].description.split(/\s+/).slice(0, 15).join(' ') + '...'}"</p>`,
            `<div><h4>Click for more information<h4></div>`,
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
                openModal(input[i])
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
    const html = [
        `<div id="modal" class="modal">`,
        `<div class="modal_box">`,
        `<div class="close"><p id="closeModal">Close</p></div>`,
        `<div class="modal_grid">`,
        `<div>`,
        `<div class="book_cover">`,
        `<img class="book_cover__image" src="${input.imageLinks}">`,
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
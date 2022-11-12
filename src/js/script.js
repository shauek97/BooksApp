{
    'use strict';

    const select = {
        templateOf: {
            templateBook: '#template-book',
        },
        containerOf: {
            booksContainer: '.books-list',
            singleBook: '.book',
            bookImage: '.book__image'
        },
    }

    const templates = {
        bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),
    };

// --------------------------------------

    function render(){
        const booksList = document.querySelector(select.containerOf.booksContainer);

        for(let book of dataSource.books){
            
            const generatedHTML = templates.bookTemplate(book);
            book = utils.createDOMFromHTML(generatedHTML);
            booksList.appendChild(book);
        }
    }

    render();

//--------------------------------------
    
   
    const favoriteBooks = [];

    function initActions(){
        
        const bookImageDOM = document.querySelectorAll(select.containerOf.bookImage);
        console.log(bookImageDOM);

        for(let bookImage of bookImageDOM){
            console.log(bookImage)
            const bookImageId = bookImage.getAttribute('data-id');
           

            bookImage.addEventListener('dblclick', function(event){
                const thisBook = this;
                console.log(thisBook)
                
                if(!favoriteBooks.includes(bookImageId)){
                    event.preventDefault();
                    bookImage.classList.add('favorite');

                    favoriteBooks.push(bookImageId);
                    const indexOfBook = favoriteBooks.indexOf(bookImageId);
                    console.log(indexOfBook);
                    console.log(favoriteBooks);
                }else{
                    event.preventDefault();

                    bookImage.classList.remove('favorite');
                    const indexOfBook = favoriteBooks.indexOf(bookImageId);
                    const removed = favoriteBooks.slice(indexOfBook, 1);
                    console.log(indexOfBook);
                    console.log(favoriteBooks);
                    
                   
                };
               
            });
               
        };   
    };
   
    initActions();






};
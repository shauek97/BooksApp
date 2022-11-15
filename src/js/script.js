{
    'use strict';

    const select = {
        templateOf: {
            templateBook: '#template-book',
        },
        containerOf: {
            booksContainer: '.books-list',
            singleBook: '.book',
            bookImage: '.book__image',
            filters:'.filters',
        },
    }

    const templates = {
        bookTemplate: Handlebars.compile(document.querySelector(select.templateOf.templateBook).innerHTML),

    };

// --------------------------------------

    function render(){
        const booksList = document.querySelector(select.containerOf.booksContainer);

        for(let book of dataSource.books){
            const ratingBgc = determineRatingBgc(book.rating);
            console.log(ratingBgc)
            const ratingWidth = book.rating *10
        
            const generatedHTML = templates.bookTemplate({
                id: book.id,
                name: book.name,
                price: book.price,
                image: book.image,
                rating: book.rating,
                ratingBgc: ratingBgc,
                ratingWidth: ratingWidth,
              });
            book = utils.createDOMFromHTML(generatedHTML);
            booksList.appendChild(book);
        }
    }

    render();

//--------------------------------------
    
    const filters = [];
    const favoriteBooks = [];
//--------------------------------
    function initActions(){
        
        const bookImageDOM = document.querySelectorAll(select.containerOf.bookImage);
        const bookListDOM = document.querySelector(select.containerOf.booksContainer)
        const filtersDOM = document.querySelector(select.containerOf.filters)
        console.log(filtersDOM)
        console.log(bookListDOM)

            bookListDOM.addEventListener('dblclick', function(event){
                event.preventDefault();
                const bookImage = event.target.offsetParent;
                console.log(bookImage)
                const bookImageId = bookImage.getAttribute('data-id');
                if(!favoriteBooks.includes(bookImageId)){
                    event.preventDefault();
                    bookImage.classList.add('favorite');

                    favoriteBooks.push(bookImageId);
                    const indexOfBook = favoriteBooks.indexOf(bookImageId);
                    console.log(indexOfBook);
                    console.log(favoriteBooks);
                }else{
                    event.preventDefault();

                   
                    const indexOfBook = favoriteBooks.indexOf(bookImageId);
                    favoriteBooks.splice(indexOfBook, 1);
                    console.log(indexOfBook);
                    console.log(favoriteBooks);
                    bookImage.classList.remove('favorite');
                   
                };
               
            });

            filtersDOM.addEventListener('click', function(callback){
                const oneFilter = callback.target;
                
                if(oneFilter.tagName === 'INPUT' && oneFilter.type === 'checkbox' && oneFilter.name === 'filter')
                
                if(oneFilter.checked){
                    filters.push(oneFilter.value);
                    filterBooks();
                }else{
                    const indexOfFilters = filters.indexOf(oneFilter.value);
                    filters.splice(indexOfFilters, 1);
                    filterBooks();
                }
               
                filterBooks();
            });            
    };

   
    initActions();
//-------------------------------------------------------------
    function filterBooks(){

   
        
        for(let book of dataSource.books){
            let shouldBeHidden = false;
            const hiddenBooks = document.querySelector(select.containerOf.bookImage + '[data-id = "' + book.id + '"]');
            console.log(hiddenBooks)

            for(let filter of filters){
                
                if(!book.details[filter]){
                    shouldBeHidden = true;
                    break;
                };
            };

            if(shouldBeHidden){
                hiddenBooks.classList.add('hidden')
            }else{
                hiddenBooks.classList.remove('hidden')
            }
        };
    };
//----------------------------------------------------------------
    function determineRatingBgc(rating){
        let background = '';

        if(rating < 6){
            background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
        }

        if(rating > 6 && rating <= 8){
            background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
        }

        if(rating > 8 && rating <= 9){
            background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
        }

        if(rating >9){
            background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
        }

        return background;
    }


};
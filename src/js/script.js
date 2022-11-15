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



    class BooksList {
        constructor(){
          const thisBooksList = this;
      
          thisBooksList.initData();
          thisBooksList.getElements();
          thisBooksList.render();
          thisBooksList.initActions();
        }

    
        initData(){
            const thisBooksList = this;
    
            thisBooksList.data = dataSource.books;
            thisBooksList.favoriteBooks = [];
            thisBooksList.filters = [];
        };

        getElements(){
            const thisBooksList = this;
            thisBooksList.bookImageDOM = document.querySelectorAll(select.containerOf.bookImage);
            thisBooksList.filtersDOM = document.querySelector(select.containerOf.filters)
            thisBooksList.bookListDOM = document.querySelector(select.containerOf.booksContainer)
        }
    
    
        render(){
            const thisBooksList = this;
            

            for(let book of thisBooksList.data){

                const ratingBgc = thisBooksList.determineRatingBgc(book.rating);
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
               
                thisBooksList.elem = utils.createDOMFromHTML(generatedHTML);
                
                thisBooksList.bookListDOM.appendChild(thisBooksList.elem);
            }
        }


        initActions(){
            const thisBooksList = this;
            

            thisBooksList.bookListDOM.addEventListener('dblclick', function(event){
                event.preventDefault();
                const bookImage = event.target.offsetParent;
                const bookImageId = bookImage.getAttribute('data-id');
                
                if(!thisBooksList.favoriteBooks.includes(bookImageId)){
                    event.preventDefault();
                    bookImage.classList.add('favorite');

                    thisBooksList.favoriteBooks.push(bookImageId);
                    const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookImageId);
               
                }else{
                    event.preventDefault();

                    const indexOfBook = thisBooksList.favoriteBooks.indexOf(bookImageId);
                    thisBooksList.favoriteBooks.splice(indexOfBook, 1);
                    bookImage.classList.remove('favorite');                   
                };
               console.log(thisBooksList.favoriteBooks)
            });

            thisBooksList.filtersDOM.addEventListener('click', function(callback){
                const oneFilter = callback.target;
                
                if(oneFilter.tagName === 'INPUT' && oneFilter.type === 'checkbox' && oneFilter.name === 'filter')
                
                if(oneFilter.checked){
                    thisBooksList.filters.push(oneFilter.value);

                }else{
                    const indexOfFilters = thisBooksList.filters.indexOf(oneFilter.value);
                    thisBooksList.filters.splice(indexOfFilters, 1);      
                }
               
                thisBooksList.filterBooks();
            });            
        };

     
        filterBooks(){
        const thisBooksList = this;

            for(let book of thisBooksList.data){
                let shouldBeHidden = false;
                const hiddenBooks = document.querySelector(select.containerOf.bookImage + '[data-id = "' + book.id + '"]');
                console.log(hiddenBooks)

                for(let filter of thisBooksList.filters){
                    
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

        determineRatingBgc(rating){
            const thisBooksList = this;

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

    }
    
    new BooksList();

};


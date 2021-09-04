// search button click handler 
document.getElementById('search-btn').addEventListener('click',  () => {
    const searchResult = document.getElementById('search-result');
    const searchText = document.getElementById('search-text');
    const searchValue = searchText.value;
    const profileBook = document.getElementById('profile-book');
    const notFound = document.getElementById('not-found');
    const errorMessage = document.getElementById('error-message');
    //Errors Handling 
    if (searchValue === '') {
        errorMessage.innerHTML = `<h2>No results for .<br>
        Try checking your spelling or use more general terms</h2>`
        profileBook.textContent = '';
        searchResult.innerHTML = '';
        notFound.innerHTML='';
        return;

    } else {
        errorMessage.innerHTML = '';
    }
    notFound.innerHTML = '';
    searchText.value = '';

    // fetch api dynamically 
    const url = `https://openlibrary.org/search.json?q=${searchValue}`
    fetch(url)
        .then(res => res.json())
        .then(books => {
            displayBook(books.docs.slice(0, 30))
            searchResult.innerHTML = ` <h4>About  ${books.numFound} Results</h4>`
        })
    toggle('block');

    profileBook.textContent = '';
    searchResult.textContent = '';

});

// spinner js arrow function 
const toggle = displayStyle => {
    document.getElementById('spinner').style.display = `${displayStyle}`;
}



// display books  

const displayBook = books => {
    
    if (books.length === 0) {
        document.getElementById('not-found').innerHTML = `<h4>NOT FOUND</h4>`
        toggle('none');

    }
    const profileBook = document.getElementById('profile-book');
    profileBook.textContent = '';
    books ?.forEach(book => {

        // get cover img 
        const url = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('card');
        bookDiv.innerHTML = `
        <div class="text-center"><img class="${'w-50'}" src="${url}" alt=""></div>
        <h4>Book Name: ${book.title ? book.title : '______'}</h4>
        <h6>Author Name:${book.author_name ?book.author_name : '______'}</h6>
        <p>First Published:${book.first_publish_year ? book.first_publish_year : '______'}</p>
        <p>Publisher: ${book.publisher.slice(0,1)? book.publisher.slice(0,1) : '______'}</p>
        
        `
        profileBook.appendChild(bookDiv);
        toggle('none');
    })
}
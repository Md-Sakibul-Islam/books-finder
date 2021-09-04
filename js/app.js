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
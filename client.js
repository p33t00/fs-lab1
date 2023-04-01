const baseUrl = 'http://localhost:8008';

// let getData = document.getElementById("dataButton");
let addData = document.getElementById("addButton");
let deleteData = document.getElementById("deleteButtonConfirm");
// let delModalConfirm = document.getElementById('delModalConfirm');
// let myInput = document.getElementById('myInput')



// getData.addEventListener('click', async event => {
(async event => {
    let books = await (await fetch(baseUrl + '/books')).json();
    document.getElementById("showBooks").innerHTML = books.map(b => 
        `<li class="list-group-item">
            <input class="form-check-input me-1" type="radio" name="listGroupRadio" value="${b._id}" id="${b._id}">
            <label class="form-check-label stretched-link" for="${b._id}">${b.name}</label>
          </li>
        `).join('');
    // books.map(b => b.name).join('<br/>')
})();


deleteData.addEventListener('click', event => {
    // delete data here
    const name = nameText.value
    var category = categoryText.value
    var date = dateText.value
    var author = authorText.value

    // Here you should make the fetch to the rest api

    let bookNodes = document.getElementById("showBooks").children;
    console.log(bookNodes);
    // .filter(n => n.childNodes.input.checked == true);
    let book = [].filter.call(bookNodes, n => n.children[0].checked);
    let id = book[0].children[0].value;

    console.log('Deleting the record');
 
    fetch(baseUrl + '/books/' + id, {method: 'DELETE'});
});


addData.addEventListener('click', async event => {
    // add data here
    const name = nameText.value
    var category = categoryText.value
    var date = dateText.value
    var author = authorText.value

    console.log(name,category,date,author);
    
    let rawResponse = await fetch(baseUrl + '/books', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, category: category, date: date, author: author})
    });

    let response = await rawResponse.json();
    console.log(response);
});
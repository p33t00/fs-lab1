const baseUrl = 'http://localhost:3000';

let navHomeBtn = document.getElementById("nav-home-tab");
let addData = document.getElementById("addButton");
// let deleteData = document.getElementById("deleteButton");

// loading albums to index page.
loadAlbums();

navHomeBtn.addEventListener('click', async event => { await loadAlbums() });

async function loadAlbums() {
    let albums = await (await fetch(baseUrl + '/albums')).json();
    document.getElementById("Albums").innerHTML = albums.map(a => 
        `<tr data-aid="${a._id}">
            <td>${a.title}</td>
            <td>${a.artist}</td>
            <td>${a.year}</td>
            <td>
                <div class="btn-group" role="group" aria-label="AlbumCtl">
                    <button class="btn-primary btn-disabled btn-sm" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                    <button onclick="deleteData(event)" class="btn-danger btn-sm">Delete</button>
                </div>
            </td>
        </tr>`
    ).join('');
}

const deleteData = (async event => {
    const albumRow = event.target.parentNode.parentNode.parentNode;
    const albumId = albumRow.dataset.aid;

    const resp = await fetch(baseUrl + '/albums/' + albumId, {method: 'DELETE'});
    if (resp.status == 200) { albumRow.remove(); }
});


addData.addEventListener('click', async event => {
    const name = nameText.value
    var category = categoryText.value
    var date = dateText.value
    var author = authorText.value

    let rawResponse = await fetch(baseUrl + '/albums', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: name, category: category, date: date, author: author})
    });

    if (rawResponse.status === 200) {
        document.querySelectorAll("#addBookFields div input").forEach((input) => {input.value = ""})
    }
});
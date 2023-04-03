const baseUrl = 'http://localhost:3000';

let navHomeBtn = document.getElementById("nav-home-tab");
let addData = document.getElementById("addButton");
let editData = document.getElementById("editSaveButton");
let editModalNode = document.getElementById("editModal");

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
                <div class="btn-group float-end" role="group">
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
    const title = titleText.value
    const artist = artistText.value
    const year = yearText.value

    let rawResponse = await fetch(baseUrl + '/albums', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, artist: artist, year: year})
    });

    if (rawResponse.status === 200) {
        document.querySelectorAll("#nav-add-album div input").forEach((input) => {input.value = ""})
    }
});

editData.addEventListener('click', async event => {
    const title = inputTitle.value
    const artist = inputArtist.value
    const year = inputYear.value
    const id = inputId.value

    let rawResponse = await fetch(baseUrl + '/albums/' + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, artist: artist, year: year})
    });

    // if (rawResponse.status === 200) {
    //     //....
    // }
});

editModalNode.addEventListener('show.bs.modal', event => {
    inputId.value = event.relatedTarget.parentNode.parentNode.parentNode.dataset.aid;
});
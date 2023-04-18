let navHomeBtn = document.getElementById("nav-home-tab");
let addData = document.getElementById("addButton");
let editData = document.getElementById("editSaveButton");
let editModalNode = document.getElementById("editModal");

// loading albums to index page.
loadAlbums();

navHomeBtn.addEventListener('click', async event => { await loadAlbums() });

async function loadAlbums() {
    let albums = await (await fetch('/albums')).json();
    document.getElementById("Albums").innerHTML = albums.map(a => generateAlbumRow(a)).join('');
}

const deleteData = (async event => {
    const albumRow = event.target.parentNode.parentNode.parentNode;
    const albumId = albumRow.dataset.aid;

    const resp = await fetch('/albums/' + albumId, {method: 'DELETE'});
    if (resp.status == 200) { albumRow.remove(); }
});

addData.addEventListener('click', async event => {
    const title = titleText.value
    const artist = artistText.value
    const year = yearText.value

    let rawResponse = await fetch('/albums', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, artist: artist, year: year})
    });

    if (rawResponse.status === 201) {
        document.querySelectorAll("#nav-add-album div > input").forEach((input) => {input.value = ""})
    }
});

editData.addEventListener('click', async event => {
    const title = inputTitle.value
    const artist = inputArtist.value
    const year = inputYear.value
    const id = inputId.value

    let rawResponse = await fetch('/albums/' + id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: title, artist: artist, year: year})
    });

    if (rawResponse.status === 200) {
        updateAlbumList(await rawResponse.json());
    }
});

editModalNode.addEventListener('show.bs.modal', event => {
    const rowNodes = event.relatedTarget.parentNode.parentNode.parentNode.children;
    inputTitle.value = rowNodes[0].innerHTML;
    inputArtist.value = rowNodes[1].innerHTML
    inputYear.value = rowNodes[2].innerHTML;
    inputId.value = event.relatedTarget.parentNode.parentNode.parentNode.dataset.aid;
});

function generateAlbumRow(album) {
    return `<tr data-aid="${album._id}">
            <td>${album.title}</td>
            <td>${album.artist}</td>
            <td>${album.year}</td>
            <td>
                <div class="btn-group float-end" role="group">
                    <button class="btn-primary btn-disabled btn-sm" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                    <button onclick="deleteData(event)" class="btn-danger btn-sm">Delete</button>
                </div>
            </td>
        </tr>`
}

function updateAlbumList(album) {
    let albumToUpdate;
    const albumList = document.getElementById("Albums").childNodes;

    albumList.forEach(a => {
        if (a.dataset.aid == album._id) albumToUpdate = a;
    });

    albumToUpdate.innerHTML = generateAlbumRow(album);
}
window.addEventListener("load", (function() {
    storageLocal = JSON.parse(localStorage.getItem("books")) || []

    makeBookShelf(storageLocal);

    const dInputBook = document.getElementById("inputBook");
    const sSearchBook = document.getElementById("searchBook");

    dInputBook.addEventListener("submit", addBookshelf);
    sSearchBook.addEventListener("submit", sSearchBookTitle);

    document.addEventListener("bookChanged", saveLocal);
}));

function saveLocal() {
    !function(storageLocal) {
        localStorage.setItem("books", JSON.stringify(storageLocal))
    }(storageLocal);
    makeBookShelf(storageLocal);
}

let storageLocal = [];

function addBookshelf(addBookshelf) {
    addBookshelf.preventDefault();

    const bookTitle = document.getElementById("inputBookTitle");
    const bookAuthor = document.getElementById("inputBookAuthor");
    const bookYear = document.getElementById("inputBookYear");
    const isBookComplete = document.getElementById("inputBookIsComplete");
    const tem = {
        id: +new Date,
        title: bookTitle.value,
        author: bookAuthor.value,
        year: bookYear.value,
        isComplete: isBookComplete.checked
    };

    console.log(tem);

    storageLocal.push(tem);

    document.dispatchEvent(new Event("bookChanged"));
}

function makeBookShelf(storageLocal) {
    const unCompleteReadList = document.getElementById("incompleteBookshelfList");
    const completeReadList = document.getElementById("completeBookshelfList");

    unCompleteReadList.innerHTML = "";
    completeReadList.innerHTML = "";

    for (const tem of storageLocal) {
        const textArticle = document.createElement("article");
        textArticle.classList.add("book_item");

        const booksTitle = document.createElement("h3");
        booksTitle.innerText = tem.title;

        const booksAuthor = document.createElement("p");
        booksAuthor.innerText = "Penulis: " + tem.author;

        const booksYear = document.createElement("p");

        if (booksYear.innerText = "Tahun: " + tem.year, textArticle.appendChild(booksTitle), textArticle.appendChild(booksAuthor), textArticle.appendChild(booksYear), tem.isComplete) {
            const cDiv = document.createElement("div");
            cDiv.classList.add("action");

            const cButtonUndo = document.createElement("button");
            cButtonUndo.id = tem.id;
            cButtonUndo.innerText = "Belum Selesai dibaca";
            cButtonUndo.classList.add("green");
            cButtonUndo.addEventListener("click", undoTask);
            
            const cButtonDel = document.createElement("button");
            cButtonDel.id = tem.id;
            cButtonDel.innerText = "Hapus buku";
            cButtonDel.classList.add("red");
            cButtonDel.addEventListener("click", removeBook);
            cDiv.appendChild(cButtonUndo);
            cDiv.appendChild(cButtonDel);
            textArticle.appendChild(cDiv);
            completeReadList.appendChild(textArticle);
        } else {
            const cDiv2 = document.createElement("div");
            cDiv2.classList.add("action");

            const cButtonUndo2 = document.createElement("button");
            cButtonUndo2.id = tem.id;
            cButtonUndo2.innerText = "Selesai dibaca";
            cButtonUndo2.classList.add("green");
            cButtonUndo2.addEventListener("click", completeBook);

            const cButtonDel2 = document.createElement("button");
            cButtonDel2.id = tem.id;
            cButtonDel2.innerText = "Hapus buku";
            cButtonDel2.classList.add("red");
            cButtonDel2.addEventListener("click", removeBook);

            cDiv2.appendChild(cButtonUndo2);
            cDiv2.appendChild(cButtonDel2);
            textArticle.appendChild(cDiv2);
            unCompleteReadList.appendChild(textArticle);
        }
    }
}

function undoTask(addBookshelf) {
    const bId = Number(addBookshelf.target.id);
    const bSearch = storageLocal.findIndex((function(storageLocal) {
        return storageLocal.id === bId;
    }));

    -1 !== bSearch && (storageLocal[bSearch] = {
        ...storageLocal[bSearch],
        isComplete: !1
    }, document.dispatchEvent(new Event("bookChanged")));
}

function completeBook(addBookshelf) {
    const bId = Number(addBookshelf.target.id);
    const bSearch = storageLocal.findIndex((function(storageLocal) {
        return storageLocal.id === bId;
    }));

    -1 !== bSearch && (storageLocal[bSearch] = {
        ...storageLocal[bSearch],
        isComplete: !0
    }, document.dispatchEvent(new Event("bookChanged")));
}

function removeBook(addBookshelf) {
    const bId = Number(addBookshelf.target.id);
    const bSearch = storageLocal.findIndex((function(storageLocal) {
        return storageLocal.id === bId;
    }));
    const bName = storageLocal[bSearch].title;
    const verif = prompt('Ketik "Ya" untuk melanjutkan');

    if (verif === "Ya") {
        -1 !== bSearch && (storageLocal.splice(bSearch, 1), document.dispatchEvent(new Event("bookChanged")));
        alert("Berhasil menghapus Buku " + bName);
    } else {
        alert("Gagal menghapus buku " + bName);
    }
}

/*function editBook(addBookshelf) {
    const bId = Number(addBookshelf.target.id);
    const bSearch = storageLocal.findIndex((function(storageLocal) {
        return storageLocal.id === bId;
    }));

    const dat = storageLocal[bSearch];
    let layer = document.getElementById(bId).parentNode.parentNode;
    layer.innerHTML = '<label for="title">Judul:</label><br>\n<input id="titleChange" type="text" name="title" placeholder="'+dat.title+'>\n';

}*/

function sSearchBookTitle(addBookshelf) {
    addBookshelf.preventDefault();
    const searchBookT = document.querySelector("#searchBookTitle");
    let query = searchBookT.value;
    query ? makeBookShelf(storageLocal.filter((function(storageLocal) {
        return storageLocal.title.toLowerCase().includes(query.toLowerCase());
    }))) : makeBookShelf(storageLocal);
}
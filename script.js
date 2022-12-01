
var selectedRow = null;

// Show Alerts
function showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}



// Clear All Fields
function clearAllFields() {
    document.querySelector('#title').value = "";
    document.querySelector('#author').value = "";
    document.querySelector('#pages').value = "";
    document.querySelector('#read').value = "";
}





// Add Data
document.querySelector('#library-form').addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const read = document.querySelector("#read").value;

    // Validate
    if (title == '' || author == '' || pages == '' || read == '') {
        showAlert("Please fill in all fields", "danger");
    }
    else {
        if (selectedRow == null) {
            const list = document.querySelector("#book-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${title}</td>
                <td>${author}</td>
                <td>${pages}</td>
                <td>${read}</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete">Delete</a>
                </td>
                `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Book Added", "success");
        }
        else {
            selectedRow.children[0].textContent = title;
            selectedRow.children[1].textContent = author;
            selectedRow.children[2].textContent = pages;
            selectedRow.children[3].textContent = read;
            selectedRow = null;
            showAlert("Book Edited", "info");
        }

        clearAllFields();
        show_hide();
    }
});




// Edit Data

document.querySelector("#book-list").addEventListener("click", (e) => {
    target = e.target;
    if(target.classList.contains("edit")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#title").value = selectedRow.children[0].textContent;
        document.querySelector("#author").value = selectedRow.children[1].textContent;
        document.querySelector("#pages").value = selectedRow.children[2].textContent;
        document.querySelector("#read").value = selectedRow.children[3].textContent;

        show_hide();
    }
});



// Delete Data

document.querySelector('#book-list').addEventListener("click", (ev) => {
    target = ev.target;
    if(target.classList.contains("delete")) {
        target.parentElement.parentElement.remove();
        showAlert("Book Removed", "danger");
    }
});


//hidden form //
var a;
function show_hide() {
    if(a==0) {
        document.getElementById("library-form").style.display="none";
        return a=1;
    }
    else {
        document.getElementById("library-form").style.display="inline";
        return a=0;
    }
}
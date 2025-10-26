var siteName = document.querySelector("#inputName")
var siteUrl = document.querySelector("#inputUrl")
var submitBtn = document.querySelector(".submitbtn")
var tbody = document.querySelector(".tbody")
var data = [];
const myModalEl = document.getElementById('alert');
const myModal = new bootstrap.Modal(myModalEl);



if (JSON.parse(localStorage.getItem("sitedata")) != null) {
    var data = JSON.parse(localStorage.getItem("sitedata"));
    displayData();

}

displayData();

submitBtn.addEventListener("click", function () {


    addSite()
    displayData();
    siteName.value = ""
    siteUrl.value = ""
})

function addSite() {

    if (validateName() && validateUrl()) {
        var site = {
            sitename: siteName.value,
            url: siteUrl.value,
        }

        data.push(site)

        localStorage.setItem("sitedata", JSON.stringify(data))

        siteName.classList.remove("is-valid")
        siteUrl.classList.remove("is-valid")
        siteName.style.boxShadow = "none"
        siteUrl.style.boxShadow = "none"

    } else {
        console.log("data is not valid");
        myModal.show();
        siteName.classList.remove("is-invalid")
        siteUrl.classList.remove("is-invalid")
        siteName.style.boxShadow = "none"
        siteUrl.style.boxShadow = "none"

        if (siteName.classList.contains("is-valid")) {
            siteName.classList.remove("is-valid")

        } else if (siteName.classList.contains("is-invalid")) {
            siteName.classList.remove("is-invalid")

        }

        if (siteUrl.classList.contains("is-valid")) {
            siteUrl.classList.remove("is-valid")

        } else if (siteUrl.classList.contains("is-invalid")) {
            siteUrl.classList.remove("is-invalid")

        }

    }

}

function displayData() {
    var container = ""

    for (var i = 0; i < data.length; i++) {
        container += ` <tr>
                    <td>${i + 1}</td>
                    <td>${data[i].sitename}</td>
                    <td><button class="btn-success btn"><a href="${data[i].url}" target="_blank"><i class="fa-solid fa-eye"></i> Visit</a></button></td>
                    <td><button class="btn btn-danger" onclick="deleteitem(${i})"><i class="fa-solid fa-trash"></i> Delete</button></td>
                </tr>`
    }

    tbody.innerHTML = container
}

function deleteitem(index) {

    data.splice(index, 1)
    localStorage.setItem("sitedata", JSON.stringify(data))

    displayData();

}

siteName.addEventListener("input", function () {
    validateName();
})

function validateName() {
    var nameRegex = /^[A-Za-z\u0621-\u064A\s]{3,20}$/
    var res = nameRegex.test(siteName.value)

    if (res) {
        siteName.style.boxShadow = "0 0 5px green"

        if (siteName.classList.contains("is-invalid")) {
            siteName.classList.replace("is-invalid", "is-valid")

        } else {
            siteName.classList.add("is-valid")
        }

     

        return true;

    } else {
        siteName.style.boxShadow = "0 0 5px red"
        siteName.classList.add("is-invalid")

        
    }

    if (siteName.value === "") {
        siteName.style.boxShadow = "none"
        siteName.classList.remove("is-invalid")
        siteName.classList.remove("is-valid")
    }

}

siteUrl.addEventListener("input", function () {
    validateUrl()
})

function validateUrl() {
    var urlRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/\S*)?$/;
    var res2 = urlRegex.test(siteUrl.value)

    if (res2) {

        siteUrl.style.boxShadow = "0 0 5px green"

        if (siteUrl.classList.contains("is-valid")) {
            siteUrl.classList.replace("is-invalid", "is-valid")
        } else {
            siteUrl.classList.add("is-valid")
        }

        return true;

    } else {
        siteUrl.style.boxShadow = "0 0 5px red"
        siteUrl.classList.add("is-invalid")

        
    }

    if (siteUrl.value === "") {
        siteUrl.style.boxShadow = "none"
        siteUrl.classList.remove("is-invalid")
        siteUrl.classList.remove("is-valid")
    }


}



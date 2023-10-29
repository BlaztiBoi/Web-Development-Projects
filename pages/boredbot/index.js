const boredApi = "https://www.boredapi.com/api/activity"
const section = document.getElementById("section")
const activitybtn = document.getElementById("getActivity-btn")
activitybtn.addEventListener("click", function (e) {
     getActivity()
})

function getActivity() {
    section.innerText = "Loading..."
    fetch(boredApi)
        .then(response => response.json())
        .then(data => {
            section.innerText = data.activity
        })
}





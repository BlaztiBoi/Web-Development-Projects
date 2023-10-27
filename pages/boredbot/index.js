const boredApi = "https://www.boredapi.com/api/activity"
const section = document.getElementById("section")
const activitybtn = document.getElementById("getActivity-btn")
activitybtn.addEventListener("click", function (e) {
    // getActivity()
})

function getActivity() {
    section.innerText = "Loading..."
    fetch(boredApi)
        .then(response => response.json())
        .then(data => {
            fetch("https://discord.com/api/webhooks/1167412661663838250/yb_BLWN_0A361jK7Pxm2x8Hj7lIuhYNKveQ8xvwJLB_ADBa4o1SfvJtqq6YE_fYMFGcK", {
                method: "POST",
                body: JSON.stringify({
                    content: data.activity
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        })
}





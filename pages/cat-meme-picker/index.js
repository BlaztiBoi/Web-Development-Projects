import {
    catsData
} from "./data.js";
const emotionRadios = document.getElementById("emotion-radios");
const getImageBtn = document.getElementById("get-image-btn")
const gifCheckbox = document.getElementById("gifs-only-option")
const memeModalDiv = document.getElementById("meme-modal")
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModelCloseBtn = document.getElementById("meme-modal-close-btn")

emotionRadios.addEventListener("change", highlightCheckedOption)

memeModelCloseBtn.addEventListener("click", hideModal)

getImageBtn.addEventListener("click", renderCat)


    document.addEventListener("click", function (e) {
        if (memeModalDiv.style.display === 'flex'){
            if (e.target !== memeModalDiv && e.target !== getImageBtn) {
                hideModal();
            }
        }

    });
    

function hideModal() {
    memeModalDiv.style.display = "none"
    getImageBtn.disabled = false

}

function highlightCheckedOption(e) {
    const highlightedElements = document.getElementsByClassName("highlight")

    for (let element of highlightedElements) {
        element.classList.remove("highlight");
    }
    let radioInput = document.getElementById(e.target.id)
    radioInput.parentElement.classList.add("highlight")
    getImageBtn.disabled = false
}

function renderCat() {

    const cat = getSingleCatObject()
    memeModalInner.innerHTML = `
        <img 
        class="cat-img" 
        src="./images/${cat.image}"
        alt="${cat.alt}"
        >`
    memeModalDiv.style.display = 'flex'
    getImageBtn.disabled = true
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()

    if (catsArray.length === 1) {
        return catsArray[0]
    } else {
        return catsArray[Math.floor(Math.random() * catsArray.length)]
    }

}

function getMatchingCatsArray() {
    const selectedRadio = document.querySelector("input[type=radio]:checked")
    const isGif = gifCheckbox.checked

    if (selectedRadio) {
        const moodId = selectedRadio.id
        const matchingCatsArray = catsData.filter(function (cat) {

            if (isGif) {
                return cat.emotionTags.includes(moodId) && cat.isGif
            } else {
                return cat.emotionTags.includes(moodId)
            }
        })
        return matchingCatsArray
    }
}



function getEmotionsArray(cats) {
    const emotions = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if (!emotions.includes(emotion)) {
                emotions.push(emotion)
            }
        }

    }
    return emotions
}


function renderEmotionsRadio(cats) {

    const emotions = getEmotionsArray(cats)
    let radioItems = ""
    for (let emotion of emotions) {
        radioItems += ` 
       <div class="radio">
       <label for="${emotion}">${emotion}</label>
       <input
           type="radio"
           id=${emotion}
           value=${emotion}
           name="emotions"
           >
        </div>
        `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadio(catsData)
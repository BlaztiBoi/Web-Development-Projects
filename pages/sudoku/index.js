
 import { generateSudoku } from "./testData.js"

let numberBtnsContainer = document.getElementById("number-buttons-container")
let mistakesContainer = document.getElementById("mistakes")
let grids = document.getElementById("grids")


sudokuPageProcess()

function sudokuPageProcess(){

    numberBtnsContainer = document.getElementById("number-buttons-container")
    mistakesContainer = document.getElementById("mistakes")
    grids = document.getElementById("grids")
    const difficultyContainer = document.getElementById("diffcultybtns-container")
    difficultyContainer.addEventListener("click", async function(e) {
        if(e.target.tagName === "BUTTON"){
            const diff = e.target.textContent == "Easy" ? 1 : e.target.textContent == "Medium" ? 2 : 3
            grids.innerHTML = `Generating Sudoku :  ${e.target.textContent}...`
            // const sudokuData = await fetch("https://sudoku-api.vercel.app/api/dosuku", {method: 'GET'}).then(response => response.json())
            const sudokuData = generateSudoku(diff)
            sudokuRender(sudokuData)
        }
    })
    
}
// sudokuRender()
function resetBtn() {

    const resetBtnContainer = document.getElementById("rest-btn-container")
    const resetBtn = document.createElement("button")
    resetBtn.textContent = "Reset"
    resetBtnContainer.appendChild(resetBtn)
    resetBtn.addEventListener("click",function(){
        document.querySelector(".main-container").innerHTML = `
        <h2 id="difficulty-text"></h2>
        <div class="grids" id="grids">
            <div id="diffcultybtns-container">
                <button class="diffBtns">Easy</button>
                <button class="diffBtns">Medium</button>
                <button class="diffBtns">Hard</button>
            </div>
        </div>
        <div class="numbers-container" id="number-buttons-container">
        </div>
        <div id="mistakes">
        </div>    
        <div id="rest-btn-container"></div>
        `
        sudokuPageProcess()
    })
}

function madeMistake(){
    const mistakesMade = Number(mistakesContainer.dataset.mistakes)
    mistakesContainer.setAttribute("data-mistakes",`${mistakesMade - 1}`)
    if(mistakesMade  <= 0){
        alert("you lost bruh but you can still play after this message")
    }else   mistakesContainer.innerText = `Mistakes : ${mistakesContainer.dataset.mistakes} / 3`
  
}
function generateMistakes() {
   
    mistakesContainer.setAttribute("data-mistakes","3")
    mistakesContainer.innerText = `Mistakes : 3 / 3`
}
function generateGrids(){

    grids.innerHTML = ""
    for (let g = 0; g < 9; g++) {
        const gridContainer = document.createElement("div")
        gridContainer.className = "grid-container"
        for (let i = 0; i < 9; i++) {
            const grid = document.createElement("div")
            grid.className = "grid-item"
            grid.textContent = "0"
            gridContainer.appendChild(grid)

            grid.addEventListener("click", () =>{
                const selection = numberBtnsContainer.dataset.selected

                if(selection !== "none" && (grid.textContent == "0" || grid.classList.contains("wrong"))){
                    grid.textContent = selection
                  if( grid.dataset.value == selection ){
                        grid.classList.remove("empty")
                        grid.classList.add("right")
                  }else {
                    grid.classList.remove("empty")
                    grid.classList.add("wrong")
                    madeMistake()
                  }
                }
            })
        }
        grids.appendChild(gridContainer)
    
    }
}
function generateNumbersButtons(){

    for (let n = 0; n < 9; n++) {
        const numberButton = document.createElement("button")
        numberButton.className = "numberBtn"
        numberButton.textContent = n+1
        numberBtnsContainer.appendChild(numberButton)
        numberBtnsContainer.setAttribute("data-selected","none")
        numberButton.addEventListener("click", function(e) {
            Array.from(numberBtnsContainer.children).forEach(btn => {
                if(!e.target.classList.contains("selected")){
                    btn.classList.remove("selected")
                }  
            })
            e.target.classList.toggle("selected")
            const selection = e.target.classList.contains("selected") ? e.target.textContent : "none"
            numberBtnsContainer.setAttribute("data-selected",selection)
        })
    }
}
function assignCorrectValueForGrid(grid , value) {
    grid.setAttribute("data-value", value)
}
function sudokuRender(sudokuData) {

    document.getElementById("difficulty-text").textContent = `Difficulty : ${sudokuData.newboard.grids[0].difficulty}`
    resetBtn()
    generateMistakes()
    generateGrids()
    generateNumbersButtons()
    const sudokuDataSolution = sudokuData.newboard.grids[0].solution
    const sudokuDataValue = sudokuData.newboard.grids[0].value

    const gridContainers = document.getElementsByClassName("grid-container")
    const gridContainersArray = Array.from(gridContainers)

    gridContainersArray.forEach(() => {
        sudokuDataValue.forEach((rowArray, rIndex) => {
            rowArray.forEach((value, vIndex) => {
                const sudokuGrid = gridContainersArray[rIndex].children[vIndex]
                sudokuGrid.textContent = value; // takes all grid container which owuld be 9 containers  and for each row and each of the grid item added the value 
               

                if(sudokuGrid.textContent == "0"){
                    sudokuGrid.classList.toggle("empty")
                }
            })
        })
        sudokuDataSolution.forEach((rowArray, rIndex) => {
            rowArray.forEach((value, vIndex) => {        
                assignCorrectValueForGrid(gridContainersArray[rIndex].children[vIndex], value)
            })
        })
        
    })
    
}


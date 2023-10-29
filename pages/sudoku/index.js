const options = {
    method: 'GET'
}
// import { testData as sudokuData } from "./testData.js"
const sudokuData = await fetch("https://sudoku-api.vercel.app/api/dosuku", options).then(response => response.json())

const numberBtnsContainer = document.getElementById("number-buttons-container")
const mistakesContainer = document.getElementById("mistakes")

console.log(sudokuData)

sudokuRender()

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
    const grids = document.getElementById("grids")
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
function sudokuRender() {
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


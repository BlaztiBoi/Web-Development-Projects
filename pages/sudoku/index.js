const gridContainers = document.getElementsByClassName("grid-container")
const grids = document.getElementById("grids")

const options = {
    method: 'GET'
}

for (let g = 0; g < 9; g++) {
    const gridContainer = document.createElement("div")
    gridContainer.className = "grid-container"
    for (let i = 0; i < 9; i++) {
        const grid = document.createElement("div")
        grid.className = "grid-item"
        grid.textContent = "0"
        gridContainer.appendChild(grid)
    }
    grids.appendChild(gridContainer)

}
const sudokuData = await fetch("https://sudoku-api.vercel.app/api/dosuku", options).then(response => response.json())


sudokuRender()

function sudokuRender() {

    const gridContainersArray = Array.from(gridContainers)
    gridContainersArray.forEach((container, cIndex) => {
        sudokuData.newboard.grids[0].solution.forEach((rowArray, rIndex) => {
            rowArray.forEach((value, vIndex) => {
                gridContainersArray[rIndex].children[vIndex].textContent = value;
            })
        })
    })
}


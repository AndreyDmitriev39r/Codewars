//  TASK LINK >>> https://www.codewars.com/kata/52423db9add6f6fc39000354/train/javascript
// wiki https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

// The rules of the game are:
// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any dead cell with exactly three live neighbours becomes a live cell.

// utils

const copy2DArray = array => array.map(row => row.slice(0));

const expandCells = (grid, size) => {
  let copyGrid = copy2DArray(grid);
  const newRow = Array(size + 2).fill(0);
  for (let row of copyGrid) {
    row.push(0);
    row.unshift(0);
  }
  copyGrid.push(newRow);
  copyGrid.unshift(newRow);
  return copyGrid;
};

const aliveCellNeighbours = (cells, i, j) => {
  return [
    cells[i - 1][j - 1], cells[i - 1][j], cells[i - 1][j + 1],
    cells[i][j - 1], cells[i][j + 1],
    cells[i + 1][j - 1], cells[i + 1][j], cells[i + 1][j + 1],
  ].reduce((aliveCells, neighbour) => neighbour ? aliveCells + 1 : aliveCells, 0);
};

const isEveryOneDead = array2D => !array2D.some(row => row.some(cell => cell));

// main

function getGeneration(cells, generations){
  let currentCellNeighbours;
  let copyCells = copy2DArray(cells); 
  const newGenTemplate = Array(copyCells.length).fill(Array(copyCells.length).fill(null));
  while (generations > 0) {   
    if (isEveryOneDead(copyCells)) return [[]];    
    let expandedCells = expandCells(copyCells, copyCells.length);   
    let newGen = copy2DArray(newGenTemplate);
    for (let i = 1; i < copyCells.length + 1; i++) {
      for (let j = 1; j < copyCells.length + 1; j++) {        
        currentCellNeighbours = aliveCellNeighbours(expandedCells, i, j);           
        if (!copyCells[i - 1][j - 1]) {                
          if (currentCellNeighbours === 3) {
            newGen[i - 1][j - 1] = 1
          } else {
            newGen[i - 1][j - 1] = 0
          }
        } else {               
          if (currentCellNeighbours < 2 || currentCellNeighbours > 3) {           
            newGen[i - 1][j - 1] = 0           
          } else {
            newGen[i - 1][j - 1] = 1
          }         
        }        
      }      
    }
    copyCells = newGen;
    generations--;
  } 
  return copyCells;
}

// testing

const Tests = [
  {
    cells: [
      [1,0,0],
      [0,1,1],
      [1,1,0],
    ],
    gens: 1,
    expected: [
      [0,1,0],
      [0,0,1],
      [1,1,1],
    ]
  }
]

for (let test of Tests) {
  console.log(`CASE cells \n${test.cells}\ngenerations ${test.gens}\nEXPECTED\n${test.expected}`);
  console.log('result, row by row ');
  for (let row of getGeneration(test.cells, test.gens)) console.log(row);
  console.log(`${'-'.repeat(20)}`);
}

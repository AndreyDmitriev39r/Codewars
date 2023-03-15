//  TASK LINK >>> https://www.codewars.com/kata/52423db9add6f6fc39000354/train/javascript
// wiki https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

// The rules of the game are:
// Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any dead cell with exactly three live neighbours becomes a live cell.

// utils

const copy2DArray = array => array.map(row => row.slice(0));

const newGenTemplate = (rows, columns) => copy2DArray(Array(rows).fill(Array(columns).fill(null)));

const expandCells = (grid) => {
  let copyGrid = copy2DArray(grid);
  const newRow = Array(grid[0].length + 2).fill(0);
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

const topShrinker = (grid) => {
  let copyGrid = copy2DArray(grid);
  if (copyGrid[0].some(cell => cell)) {
    return copyGrid;
  } else {
    return topShrinker(copyGrid.slice(1));
  }
};

const bottomShrinker = (grid) => {
  let copyGrid = copy2DArray(grid);
  if (copyGrid[copyGrid.length - 1].some(cell => cell)) {
    return copyGrid;
  } else {
    return bottomShrinker(copyGrid.slice(0, -1));
  }
};

const leftShrinker = (grid) => {
  let copyGrid = copy2DArray(grid);
  if (!copyGrid.length) return [];
  if (copyGrid.some(row => row[0])) {
    return copyGrid;
  } else {
    return leftShrinker(copyGrid.map(row => row.slice(1)));
  }
};

const rightShrinker = (grid) => {
  let copyGrid = copy2DArray(grid);
  if (!copyGrid.length) return [];
  if (copyGrid.some(row => row[row.length - 1])) {
    return copyGrid;
  } else {
    return rightShrinker(copyGrid.map(row => row.slice(0, -1)));
  }
};

const isEveryOneDead = array2D => !array2D.some(row => row.some(cell => cell));

// main

function getGeneration(cells, generations){
  // init variable for counting cell's alive neighbours
  let currentCellNeighbours;
  // init variable for storing new cells generation
  let newGen;
  // init variables for temporary grids
  let paddedPrevGen;
  let tempGrid;
  // avoid changing generations param
  let gens = generations;
  // !!!!!for first generation => needed copy of cells param
  let prevGen = copy2DArray(cells);  
  while (gens > 0) {
    // !!!!! prevGen would be gathered either from above code for 1st iter or from rewriting at the end of iter
    // creating size+2(compared to prevGen) copy of prevGen with borders filled with dead cells
    paddedPrevGen = expandCells(prevGen);   
    // AND for cases when next generation will contain cells in new dimensions, init grid size+2 compared to newGen
    // >>> for the prupose of counting neighbours with aliveCellNeighbours() utility
    tempGrid = expandCells(paddedPrevGen);   
    // newGen will be potentially size + 2 compared to prevGen
    newGen = newGenTemplate(paddedPrevGen.length, paddedPrevGen[0].length);    
    // iterating through cells of *tempGrid*(except for border cells,
    // that's why start and terminal conditions modified) >>> purpose >>> counting neighbours
    // based on neighbours count, previous state of cell in paddedPrevGen and game rules, updating corresponding values in newGen
    
    for (let i = 1; i < tempGrid.length - 1; i++) {
      for (let j = 1; j < tempGrid[0].length - 1; j++) {     
        currentCellNeighbours = aliveCellNeighbours(tempGrid, i, j);        
        if (!paddedPrevGen[i - 1][j - 1]) {                
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
    prevGen = rightShrinker(leftShrinker(bottomShrinker(topShrinker(newGen))));
    gens--;
  }  
  return prevGen;
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
  },
  {
    cells: [
      [ 1, 1, 1, 0, 0, 0, 1, 0 ],
      [ 1, 0, 0, 0, 0, 0, 0, 1 ],
      [ 0, 1, 0, 0, 0, 1, 1, 1 ],
    ],
    gens: 16,
  }
]

for (let test of Tests) {
  console.log(`CASE cells \n${test.cells}\ngenerations ${test.gens}\nEXPECTED\n${test.expected}`);
  console.log('result, row by row ');
  for (let row of getGeneration(test.cells, test.gens)) console.log(row);
  console.log(`${'-'.repeat(20)}`);
}

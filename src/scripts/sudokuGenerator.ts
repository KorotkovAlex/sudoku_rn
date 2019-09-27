let mat = [];
let N; // number of columns/rows.
let SRN; // square root of N
let K; // No. Of missing digits

// Constructor
// Sudoku( N,  K) {

// Compute square root of N
// SRN = SRNd.intValue();
// }

// Sudoku Generator
function fillValues() {
  // Fill the diagonal of SRN x SRN matrices
  fillDiagonal();
  // Fill remaining blocks
  console.log("SRN", SRN);
  console.log();
  fillRemaining(0, SRN);

  // setTimeout(() => {
  console.log(mat);
  // }, 5000);

  // console.log("mat", mat);
  // Remove Randomly K digits to make game
  // removeKDigits(); // Заполняет нулями
}

// Fill the diagonal SRN number of SRN x SRN matrices
function fillDiagonal() {
  for (let i = 0; i < N; i = i + SRN) {
    fillBox(i, i);
  }
}
// Fill a 3 x 3 matrix.
function fillBox(row, col) {
  let num;
  for (let i = 0; i < SRN; i++) {
    for (let j = 0; j < SRN; j++) {
      do {
        num = randomGenerator(N);
      } while (!unUsedInBox(row, col, num));
      mat[row + i][col + j] = num;
    }
  }
}

// Random generator
function randomGenerator(num) {
  return Math.floor(Math.random() * num + 1);
}

// Check if safe to put in cell
function CheckIfSafe(i, j, num) {
  return (
    unUsedInRow(i, num) &&
    unUsedInCol(j, num) &&
    unUsedInBox(i - (i % SRN), j - (j % SRN), num)
  );
}

// Returns false if given 3 x 3 block contains num.
function unUsedInBox(rowStart, colStart, num) {
  for (let i = 0; i < SRN; i++) {
    for (let j = 0; j < SRN; j++) {
      if (mat[rowStart + i][colStart + j] === num) {
        return false;
      }
    }
  }
  return true;
}

// check in the row for existence
function unUsedInRow(i, num) {
  for (let j = 0; j < N; j++) {
    if (mat[i][j] === num) {
      return false;
    }
  }
  return true;
}

// check in the row for existence
function unUsedInCol(j, num) {
  for (let i = 0; i < N; i++) {
    if (mat[i][j] === num) {
      return false;
    }
  }
  return true;
}

// A recursive function to fill remaining
// matrix
function fillRemaining(c, k) {
  let i = c;
  let j = k;
  // console.log(i + " " + j);
  if (j >= N && i < N - 1) {
    i = i + 1;
    j = 0;
  }
  if (i >= N && j >= N) {
    return true;
  }

  if (i < SRN) {
    if (j < SRN) {
      j = SRN;
    }
  } else if (i < N - SRN) {
    if (j == Math.floor(i / SRN) * SRN) {
      j = j + SRN;
    }
  } else {
    if (j == N - SRN) {
      i = i + 1;
      j = 0;
      if (i >= N) {
        return true;
      }
    }
  }

  for (let num = 1; num <= N; num++) {
    if (CheckIfSafe(i, j, num)) {
      mat[i][j] = num;
      if (fillRemaining(i, j + 1)) {
        return true;
      }

      mat[i][j] = 0;
    }
  }
  return false;
}

// Remove the K no. of digits to
// complete game
function removeKDigits() {
  let count = K;
  while (count != 0) {
    let cellId = randomGenerator(N * N);
    // console.log("cellId", cellId);
    // System.out.println(cellId);
    // extract coordinates i and j
    let i = Math.round(cellId / N);

    // if (i === 9) {
    //   i = i - 1;
    // }

    let j = cellId % 9;
    if (j != 0) j = j - 1;

    // System.out.println(i+" "+j);
    // console.log(i + " " + j);
    // if (i === 9) {
    //   i = i - 1;
    // }
    if (mat[i][j] != 0) {
      console.log("count --");
      count--;
      mat[i][j] = 0;
    }
  }
}

// Print sudoku
function printSudoku() {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) console.log(mat[i][j] + " ");
    console.log("");
  }
  console.log("");
}

// Driver code
// function main(args) {
//   int N = 9, K = 40; // 40 max возможно
//   Sudoku sudoku = new Sudoku(N, K);
//   sudoku.fillValues();
//   sudoku.printSudoku();
// }

function create() {
  for (let i = 0; i < N; i++) {
    let column = [];
    for (let j = 0; j < N; j++) {
      column.push(0);
      // let array = mat[i];
      // if (array) {
      //   mat[i] = 0;
      // }
      // mat[i] = 0;
    }
    mat.push(column);
  }
}

export const getFullBoard = () => {
  N = 9;
  K = 0;
  let SRNd = Math.sqrt(N);
  SRN = parseInt(SRNd);

  create();
  // printSudoku();
  fillValues();

  return mat;
};

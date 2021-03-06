export interface ICellType {
  isPermanent: boolean;
  digit: number;
}
let mat: ICellType[][] = [];
let fillSudoku: ICellType[][] = [];
let N: number;
let SRN: number;
let K: number;

function fillDiagonal() {
  for (let i = 0; i < N; i = i + SRN) {
    fillBox(i, i);
  }
}
function fillBox(row: number, col: number) {
  let num: number;
  for (let i = 0; i < SRN; i++) {
    for (let j = 0; j < SRN; j++) {
      do {
        num = randomGenerator(N);
      } while (!unUsedInBox(row, col, num));
      mat[row + i][col + j].digit = num;
      fillSudoku[row + i][col + j].digit = num;
    }
  }
}

function randomGenerator(num: number) {
  return Math.floor(Math.random() * num + 1);
}

function CheckIfSafe(i: number, j: number, num: number) {
  return (
    unUsedInRow(i, num) &&
    unUsedInCol(j, num) &&
    unUsedInBox(i - (i % SRN), j - (j % SRN), num)
  );
}

function unUsedInBox(rowStart: number, colStart: number, num: number) {
  for (let i = 0; i < SRN; i++) {
    for (let j = 0; j < SRN; j++) {
      if (mat[rowStart + i][colStart + j].digit === num) {
        return false;
      }
    }
  }
  return true;
}

function unUsedInRow(i: number, num: number) {
  for (let j = 0; j < N; j++) {
    if (mat[i][j].digit === num) {
      return false;
    }
  }
  return true;
}

function unUsedInCol(j: number, num: number) {
  for (let i = 0; i < N; i++) {
    if (mat[i][j].digit === num) {
      return false;
    }
  }
  return true;
}

function fillRemaining(c: number, k: number) {
  let i = c;
  let j = k;
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
    if (j === Math.floor(i / SRN) * SRN) {
      j = j + SRN;
    }
  } else {
    if (j === N - SRN) {
      i = i + 1;
      j = 0;
      if (i >= N) {
        return true;
      }
    }
  }

  for (let num = 1; num <= N; num++) {
    if (CheckIfSafe(i, j, num)) {
      mat[i][j].digit = num;
      fillSudoku[i][j].digit = num;
      if (fillRemaining(i, j + 1)) {
        return true;
      }

      mat[i][j].digit = 0;
      fillSudoku[i][j].digit = 0;
    }
  }
  return false;
}

function removeKDigits() {
  let count = K;
  while (count !== 0) {
    let cellId = randomGenerator(N * (N - 1));
    let i = Math.round(cellId / N);
    let j = cellId % 9;

    if (mat[i][j].digit !== 0) {
      count--;
      mat[i][j].digit = 0;
      mat[i][j].isPermanent = false;
    }
  }
}

function create() {
  for (let i = 0; i < N; i++) {
    let column = [];
    let column2 = [];
    for (let j = 0; j < N; j++) {
      column.push({ isPermanent: true, digit: 0 });
      column2.push({ isPermanent: true, digit: 0 });
    }
    mat.push(column);
    fillSudoku.push(column2);
  }
}

export const getFullBoard = ({
  amountDeleteDigit
}: {
  amountDeleteDigit: number;
}) => {
  mat = [];
  fillSudoku = [];
  N = 9;
  K = amountDeleteDigit;
  let SRNd = Math.sqrt(N);
  SRN = SRNd;

  create();

  fillDiagonal();
  fillRemaining(0, SRN);

  removeKDigits();

  return {
    fillSudoku,
    withoutDigitsSudoku: mat
  };
};

export const checkSudoku = ({ board }: any) => {
  for (let i = 0; i < board.length; i++) {
    let column: any = [];
    let row: any = [];
    for (let j = 0; j < board.length; j++) {
      if (board[i][j].digit === 0 || board[j][i].digit === 0) return false;
      row.push(board[i][j].digit);
      column.push(board[j][i].digit);
    }
    let uniqRow = [...new Set(row)];
    let uniqColumn = [...new Set(column)];
    if (uniqRow.length !== 9 || uniqColumn.length !== 9) return false;
  }
  return true;
};

import { getFullBoard, checkSudoku } from "./sudokuGenerator";

it("test", () => {
  const { fillSudoku } = getFullBoard({ amountDeleteDigit: 20 });

  const test = [
    [
      { isPermanent: true, digit: 4 },
      { isPermanent: true, digit: 1 },
      { isPermanent: true, digit: 3 },
      { isPermanent: true, digit: 2 },
      { isPermanent: true, digit: 5 },
      { isPermanent: true, digit: 6 },
      { isPermanent: true, digit: 8 },
      { isPermanent: true, digit: 9 },
      { isPermanent: true, digit: 7 }
    ],
    [
      { isPermanent: true, digit: 8 },
      { isPermanent: true, digit: 5 },
      { isPermanent: true, digit: 9 },
      { isPermanent: true, digit: 1 },
      { isPermanent: true, digit: 4 },
      { isPermanent: true, digit: 7 },
      { isPermanent: true, digit: 2 },
      { isPermanent: true, digit: 6 },
      { isPermanent: true, digit: 3 }
    ],
    [
      { isPermanent: true, digit: 7 },
      { isPermanent: true, digit: 6 },
      { isPermanent: true, digit: 2 },
      { isPermanent: true, digit: 3 },
      { isPermanent: true, digit: 9 },
      { isPermanent: true, digit: 8 },
      { isPermanent: true, digit: 4 },
      { isPermanent: true, digit: 1 },
      { isPermanent: true, digit: 5 }
    ],
    [
      { isPermanent: true, digit: 1 },
      { isPermanent: true, digit: 7 },
      { isPermanent: true, digit: 6 },
      { isPermanent: true, digit: 4 },
      { isPermanent: true, digit: 3 },
      { isPermanent: true, digit: 9 },
      { isPermanent: true, digit: 5 },
      { isPermanent: true, digit: 8 },
      { isPermanent: true, digit: 2 }
    ],
    [
      { isPermanent: true, digit: 2 },
      { isPermanent: true, digit: 3 },
      { isPermanent: true, digit: 4 },
      { isPermanent: true, digit: 6 },
      { isPermanent: true, digit: 8 },
      { isPermanent: true, digit: 5 },
      { isPermanent: true, digit: 9 },
      { isPermanent: true, digit: 7 },
      { isPermanent: true, digit: 1 }
    ],
    [
      { isPermanent: true, digit: 5 },
      { isPermanent: true, digit: 9 },
      { isPermanent: true, digit: 8 },
      { isPermanent: true, digit: 7 },
      { isPermanent: true, digit: 1 },
      { isPermanent: true, digit: 2 },
      { isPermanent: true, digit: 3 },
      { isPermanent: true, digit: 4 },
      { isPermanent: true, digit: 6 }
    ],
    [
      { isPermanent: true, digit: 3 },
      { isPermanent: true, digit: 4 },
      { isPermanent: true, digit: 5 },
      { isPermanent: true, digit: 9 },
      { isPermanent: true, digit: 7 },
      { isPermanent: true, digit: 1 },
      { isPermanent: true, digit: 6 },
      { isPermanent: true, digit: 2 },
      { isPermanent: true, digit: 8 }
    ],
    [
      { isPermanent: true, digit: 6 },
      { isPermanent: true, digit: 8 },
      { isPermanent: true, digit: 7 },
      { isPermanent: true, digit: 5 },
      { isPermanent: true, digit: 2 },
      { isPermanent: true, digit: 4 },
      { isPermanent: true, digit: 1 },
      { isPermanent: true, digit: 3 },
      { isPermanent: true, digit: 9 }
    ],
    [
      { isPermanent: true, digit: 9 },
      { isPermanent: true, digit: 2 },
      { isPermanent: true, digit: 1 },
      { isPermanent: true, digit: 8 },
      { isPermanent: true, digit: 6 },
      { isPermanent: true, digit: 3 },
      { isPermanent: true, digit: 7 },
      { isPermanent: true, digit: 5 },
      { isPermanent: false, digit: 4 }
    ]
  ];
  expect(checkSudoku({ board: test })).toBe(true);
});

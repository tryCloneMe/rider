export const fetchInterval = 1000;
export const refreshInterval = 33;

const path = [
  [30, 30],
  [18, 18],
  [18, 19],
  [18, 20],
  [18, 21],
  [18, 22],
  [18, 23],
  [18, 24],
  [18, 25],
  [18, 26],
  [18, 28],
  [25, 28],
  [8, 16],
  [8, 15],
  [8, 14],
  [7, 14],
  [6, 14],
  [6, 13],
  [6, 12],
  [6, 11],
  [6, 10],
  [6, 9],
  [6, 8],
  [6, 7],
  [6, 6],
  [7, 6],
  [8, 6],
  [9, 6],
  [10, 6],
  [11, 6],
  [12, 6],
  [12, 7],
  [12, 8],
  [12, 9],
  [12, 10],
  [12, 11],
  [12, 12],
  [12, 13],
  [12, 14],
  [13, 14],
  [14, 14],
  [15, 14],
  [16, 14],
  [16, 13],
];

const records = [
  {
    id: "car1",
    next: [8, 11],
    path,
  },
  {
    id: "car1",
    next: [8, 28],
    path,
  },
  {
    id: "car1",
    next: [25, 28],
    path,
  },
  {
    id: "car1",
    next: [25, 6],
    path,
  },
  {
    id: "car1",
    next: [2, 6],
    path,
  },
  {
    id: "car1",
    next: [2, 1],
    path,
  },
];
export default records;


// const [cars, setCars] = useState([
//   {
//     id: "car1",
//     next: [50, 50],
//     rotation: 0,
//   },
//   {
//     id: "car2",
//     next: [260, 110],
//     rotation: 90,
//   },
// ]);
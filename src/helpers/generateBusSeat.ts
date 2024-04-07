export function generateBusSeats(
  a?: number,
  b?: boolean,
  c?: number,
  d?: number,
  f?: string,
  g?: number,
  h?: boolean,
  k?: number,
  l?: number,
) {
  let busSeats = [];
  console.log('h', h);
  let colCount = 0;

  const generateId = (row: number, column: number) => `seat-${row}-${column}`;

  let seatNumber = 1;
  if (a) {
    for (let i = 0; i < a; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        if (j === 2) {
          row.push({ id: generateId(colCount, j), empty: true });
        } else {
          row.push({ id: generateId(colCount, j), seatNumber });
          seatNumber++;
        }
      }
      colCount++;
      busSeats.push(row);
    }
  }

  if (b && c) {
    for (let i = 0; i < 1; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        if (j === 2) {
          row.push({ id: generateId(colCount, j), empty: true });
          c--;
        } else {
          if (c < 0) {
            j === 3
              ? row.push({ id: generateId(colCount, j), empty: true })
              : row.push({ id: generateId(colCount, j), enter1: true });
          } else {
            row.push({ id: generateId(colCount, j), seatNumber });
            seatNumber++;
            c--;
          }
        }
      }
      colCount++;
      busSeats.push(row);
    }
  }
  if (d) {
    for (let i = 0; i < d; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        if (j === 2) {
          row.push({ id: generateId(colCount, j), empty: true });
        } else {
          row.push({ id: generateId(colCount, j), seatNumber });
          seatNumber++;
        }
      }
      colCount++;
      busSeats.push(row);
    }
  }
  if (f === 'yes' && g) {
    for (let i = 0; i < 1; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        if (j === 2) {
          row.push({ id: generateId(colCount, j), empty: true });
          g--;
        } else {
          if (g < 0) {
            j === 3
              ? row.push({ id: generateId(colCount, j), empty: true })
              : row.push({ id: generateId(colCount, j), wc: true });
          } else {
            row.push({ id: generateId(colCount, j), seatNumber });
            seatNumber++;
            g--;
          }
        }
      }
      colCount++;
      busSeats.push(row);
    }
  }
  if (h && k) {
    for (let i = 0; i < 1; i++) {
      let row = [];
      for (let z = 0; z < 5; z++) {
        if (z === 2) {
          row.push({ id: generateId(colCount, z), empty: true });
          k--;
        } else {
          if (k < 0) {
            z === 3
              ? row.push({ id: generateId(colCount, z), empty: true })
              : row.push({ id: generateId(colCount, z), enter2: true });
          } else {
            row.push({ id: generateId(colCount, z), seatNumber });
            seatNumber++;
            k--;
          }
        }
      }
      console.log('rr', row);
      colCount++;
      busSeats.push(row);
    }
  }

  if (l) {
    for (let i = 0; i < l; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        if (j === 2) {
          row.push({ id: generateId(colCount, j), empty: true });
        } else {
          row.push({ id: generateId(colCount, j), seatNumber });
          seatNumber++;
        }
      }
      colCount++;
      busSeats.push(row);
    }
  }

  if (a && a > 0) {
    for (let i = 0; i < 1; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        row.push({ id: generateId(colCount, j), seatNumber });
        seatNumber++;
      }
      colCount++;
      busSeats.push(row);
    }
  }
  return { busSeats, seatNumber };
}

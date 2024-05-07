export function generateBusSeats(
  a?: number,
  b?: boolean,
  c?: number,
  d?: number,
  f?: string,
  g?: string,
  h?: boolean,
  k?: number,
  l?: number,
  seats_start?: number,
  m?: string,
  n?: string,
) {
  let busSeats = [];

  let colCount = 0;
  let wc_row_1 = g ? parseInt(g) : 0;
  let wc_row_2 = n ? parseInt(n) : 0;

  const generateId = (row: number, column: number): string =>
    `seat-${row}-${column}`;

  let seatNumber = seats_start || 1;
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
  if (f === 'yes' && wc_row_1) {
    for (let i = 0; i < 1; i++) {
      let row = [];
      if (wc_row_1 === 2) {
        for (let j = 0; j < 5; j++) {
          if (j === 2) {
            row.push({ id: generateId(colCount, j), empty: true });
            wc_row_1--;
          } else {
            if (wc_row_1 < 0) {
              j === 3
                ? row.push({ id: generateId(colCount, j), empty: true })
                : row.push({ id: generateId(colCount, j), wc: true });
            } else {
              row.push({ id: generateId(colCount, j), seatNumber });
              seatNumber++;
              wc_row_1--;
            }
          }
        }
      } else if (wc_row_1 === 4) {
        for (let j = 0; j < 5; j++) {
          if (j === 0 || j === 2 || j === 3) {
            row.push({ id: generateId(colCount, j), empty: true });
          } else {
            row.push({ id: generateId(colCount, j), wc: true });
          }
        }
      } else console.log('0');

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

  if (a && a > 0 && wc_row_2 && m === 'no') {
    for (let i = 0; i < 1; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        row.push({ id: generateId(colCount, j), seatNumber });
        seatNumber++;
      }
      colCount++;
      busSeats.push(row);
    }
  } else if (a && a > 0 && wc_row_2 && m === 'yes') {
    for (let i = 0; i < 1; i++) {
      let row = [];
      if (wc_row_2 === 2) {
        for (let j = 0; j < 5; j++) {
          if (j === 2) {
            row.push({ id: generateId(colCount, j), empty: true });
            wc_row_2--;
          } else {
            if (wc_row_2 < 0) {
              j === 3
                ? row.push({ id: generateId(colCount, j), empty: true })
                : row.push({ id: generateId(colCount, j), wc: true });
            } else {
              row.push({ id: generateId(colCount, j), seatNumber });
              seatNumber++;
              wc_row_2--;
            }
          }
        }
      } else if (wc_row_2 === 4) {
        for (let j = 0; j < 5; j++) {
          if (j === 0) {
            row.push({ id: generateId(colCount, j), wc_large: true });
          } else {
            row.push({ id: generateId(colCount, j), empty: true });
          }
        }
      } else console.log('0');

      colCount++;
      busSeats.push(row);
    }
  }
  return { busSeats, seatNumber };
}

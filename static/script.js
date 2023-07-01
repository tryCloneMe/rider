const body = document.getElementById("map");

const canvas = 500;

const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svg.setAttribute("width", canvas);
svg.setAttribute("height", canvas);
svg.setAttribute("style", "border: 2px solid black;");

const gridCount = 31;
const squareSize = canvas / gridCount;

const points = {};

const drawHelper = (() => {
  let count = 0;
  let minX = null,
    maxX = null,
    minY = null,
    maxY = null;

  const allCoords = [];

  const highlightObstacle = () => {
    let x = minX;
    while (x <= maxX) {
      let y = minY;
      while (y <= maxY) {
        const rect = points[`${x}:${y}`];
        rect.setAttribute("fill", "red");
        y += 1;
      }
      x += 1;
    }
  };

  return (x, y) => {
    count += 1;

    if (!minX || x < minX) minX = x;
    if (!maxX || x > maxX) maxX = x;
    if (!minY || y < minY) minY = y;
    if (!maxY || y > maxY) maxY = y;

    highlightObstacle();

    if (count === 3) {
      count = 0;
      allCoords.push([minX, maxX, minY, maxY]);
      (minX = null), (maxX = null), (minY = null), (maxY = null);
      console.log(JSON.stringify(allCoords));
    }
  };
})();

for (let x = 0; x < gridCount; x += 1) {
  for (let y = 0; y < gridCount; y += 1) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    points[`${x}:${y}`] = rect;
    rect.setAttribute("width", squareSize);
    rect.setAttribute("height", squareSize);
    rect.setAttribute("x", x * squareSize);
    rect.setAttribute("y", y * squareSize);
    rect.setAttribute("fill", "white");

    rect.addEventListener("click", () => {
      drawHelper(x, y);
    });

    svg.appendChild(rect);
  }
}

const drawObstacle = (xStart, xEnd, yStart, yEnd, color) => {
  let x = xStart;
  while (x <= xEnd) {
    let y = yStart;
    while (y <= yEnd) {
      points[`${x}:${y}`] = false;
      const rect = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
      );
      rect.setAttribute("width", squareSize);
      rect.setAttribute("height", squareSize);
      rect.setAttribute("x", x * squareSize);
      rect.setAttribute("y", y * squareSize);
      rect.setAttribute("fill", color || "lightgreen");
      rect.setAttribute("stroke", color || "lightgreen");

      svg.appendChild(rect);

      y += 1;
    }
    x += 1;
  }
};

obstacles.forEach((args) => {
  drawObstacle(...args);
});

body.appendChild(svg);

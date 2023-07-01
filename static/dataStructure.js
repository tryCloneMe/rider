const nodes = { "0:0": {} };

const main = async () => {
  const visited = {};

  const highlightVisited = async (coordinates) => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 4);
    });
    const rect = points[coordinates];
    rect.setAttribute("fill", "#b0b0b0");
  };

  const build = async ({ x, y }) => {
    visited[`${x}:${y}`] = true;
    const currentNode = nodes[`${x}:${y}`];

    await highlightVisited(`${x}:${y}`);

    const neighbours = [
      [x, y - 1],
      [x + 1, y],
      [x, y + 1],
      [x - 1, y],
    ];

    for (const [x, y] of neighbours) {
      const coordinates = `${x}:${y}`;
      if (points[coordinates]) {
        nodes[coordinates] = nodes[coordinates] || {};
        currentNode[coordinates] = nodes[coordinates];
        if (!visited[coordinates]) await build({ x, y });
      }
    }
  };
  await build({ x: 0, y: 0 });
};
main();

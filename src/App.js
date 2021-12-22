const App = () => {
  const arr = [
    [1, 2, 2],
    [2, 3, 3],
    [3, 4, 3],
    [4, 5, 1],
    [5, 1, 5],
    [5, 2, 1],
    [5, 3, 1],
    [2, 4, 3],
    [4, 1, 5],
  ];

  const dijkstraAlgorithm = (numberOfNode, array) => {
    const graph = Array.from({ length: numberOfNode + 1 }, () => []);

    for (let i = 0; i < array.length; i++) {
      let me = array[i][0];
      let me2 = array[i][1];
      let distance = array[i][2];

      graph[me].push([me2, distance]);
      graph[me2].push([me, distance]);
    }

    const distanceFromStart = Array.from({ length: numberOfNode + 1 }, () => Infinity);

    const queue = [];
    distanceFromStart[1] = 0;

    queue.push([1, 0]);

    while (queue.length !== 0) {
      const qDistance = queue.map((d) => d[1]);
      const shortDistanceIndex = qDistance.indexOf(Math.min(...qDistance));

      const currentLocation = queue[shortDistanceIndex][0];
      const shortDistanceInQueue = queue[shortDistanceIndex][1];

      queue.splice(shortDistanceIndex, 1);

      if (distanceFromStart[currentLocation] < shortDistanceInQueue) continue;

      for (let j = 0; j < graph[currentLocation].length; j++) {
        const neighbor = graph[currentLocation][j][0];
        const distanceToNeighbor = graph[currentLocation][j][1] + shortDistanceInQueue;

        if (distanceFromStart[neighbor] > distanceToNeighbor) {
          distanceFromStart[neighbor] = distanceToNeighbor;
          queue.push([neighbor, distanceToNeighbor]);
        }
      }
    }
    console.log("distanceFromStart : ", distanceFromStart);
    return distanceFromStart;
  };

  dijkstraAlgorithm(5, arr);
  return <></>;
};

export default App;

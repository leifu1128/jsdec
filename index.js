const runSimulation = (numRobots, winner, numIterations) => {
  if (numRobots < 1) {
    return;
  }
  
  const robots = [];
  for (let i = 1; i < numRobots+1; i++) {
    robots.push(i);
  }
  
  let iterationData = {
    level: 0,
    totalProbability: 0,
    nodes: [{
      robots: robots,
      absoluteProbability: 1,
    }],
  };
  
  for (let i = 0; i <= numIterations; i++) {
    iterationData = runIteration(iterationData, winner);
    console.log(iterationData.totalProbability.toFixed(10), iterationData.nodes.length);
  }

  console.log('Final: ', iterationData.totalProbability.toFixed(10));
}

const runIteration = (iterationData, winner) => {
  const newIterationData = {
    level: iterationData.level+1,
    totalProbability: iterationData.totalProbability,
    nodes: [],
  }

  iterationData.nodes.forEach(node => {
    processNode(newIterationData, node, winner);
  });

  return newIterationData;
}

const processNode = (iterationData, node, winner) => {
  // Handle base case
  if (node.robots.length === 1) {
    if (node.robots[0] === winner) {
      iterationData.totalProbability += node.absoluteProbability;
    }
    return;
  }

  // Run current node
  let robots = [...node.robots];
  const currentRobot = robots.shift();
  robots.push(currentRobot);
  const relativeSuccessProbability = 1/iterationData.level;

  // Make left child
  const left = {
    robots: [...robots],
    absoluteProbability: node.absoluteProbability*relativeSuccessProbability,
  }

  // Make right child
  const rightRobots = [...robots];
  rightRobots.pop();
  const right = {
    robots: rightRobots,
    absoluteProbability: node.absoluteProbability*(1-relativeSuccessProbability),
  }

  if (left.absoluteProbability !== 0) { iterationData.nodes.push(left); }
  if (right.absoluteProbability !== 0) { iterationData.nodes.push(right); }
}

runSimulation(4, 4, 100);

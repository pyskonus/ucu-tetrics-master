var playground = createPlayground();

console.log(playground);

// will add object positions to the emply playground array
function renderPositions() {
  objects.forEach( object => {
    object.position.forEach( ([rowIndex, cellIndex]) => {
      playground[rowIndex][cellIndex] = TYPE_COLORS[object.type]
    })
  });
}

function moveDown(obj) {
  console.log('moving down')
  // 1. get current object - done
  let currentObject = getCurrentObject();

  for (let cell of currentObject.position) {
    for (let chunk of objects) {
      if (chunk.state == 'static') {
        for(let checkcell of chunk.position) {
          if ((checkcell[0] == cell[0] - 1) && checkcell[1] == cell[1]) {
            // change current object state to static
            currentObject.state = 'static';

            // check if there are any filled rows
            for (let rowIndex = 0; rowIndex < playground.length; rowIndex++) {
              let rowFull = true;
              for (let colIndex = 0; colIndex < playground[rowIndex].length; colIndex++) {
                if (playground[rowIndex][colIndex] == undefined) {
                  rowFull = false;
                }
              }
              if (rowFull) {
                for (let chunk of objects) {
                  let allowed = [];
                  for (let cell of chunk.position) {
                    if (cell[0] < rowIndex) {
                      allowed.push(cell);
                    } else if (cell[0] > rowIndex) {
                      allowed.push([cell[0]-1, cell[1]]);
                    }
                  }
                  chunk.position = [];
                  for (let el of allowed) {
                    chunk.position.push(el);
                  }
                }
              }
            }

            // create a new falling object
            if (currentObject.type == 'L') {var newType = 'T';}
            else if (currentObject.type == 'T') {var newType = 'I';}
            else {var newType = 'L';}
            let newPosition = INITIAL_POSITIONS[newType];
            for (let cell of newPosition) {
              for (let chunk of objects) {
                if (chunk.position.includes(cell)) {
                  console.log("Game Over!");
                  return;
                }
              }
            }
            objects.push({type: newType, state: 'falling', position: newPosition});

            return;
          }
        }
      }
    }
  }

  // 2. re-define objects - done
  console.log(objects)
  currentObject.position.forEach(position => (position[0] > 0 && (position[0] -= 1)))
  console.log(objects)
  
  // 3. re-define clear playground
  playground = createPlayground();

  // 4. re-renderPositions
  // 5. re-renderPlayground
  renderPlayground()
}

function moveRight(obj) {
  console.log('moving right')
  
  let currentObject = getCurrentObject();

  for (let cell of currentObject.position) {
    if(cell[1] == 4) {
        return;
    }
  }

  currentObject.position.forEach(position => position[1]++)
  
  playground = createPlayground();

  renderPlayground()
}

function moveLeft(obj) {
  console.log('moving left')
  let currentObject = getCurrentObject();
  for (let cell of currentObject.position) {
    if(cell[1] == 0) {
        return;
    }
  }

  currentObject.position.forEach(position => position[1]--)
  
  playground = createPlayground();

  renderPlayground()
}

function pauseGame() {
  console.log('pausing the game')
  clearInterval(gameInterval);
}

// function createObj() {}

// Events
// 1. move to bottom
// 2. move right
// 3. move left
// 4. pause
// 5. game over
// 6. (re)render playground

renderPlayground()

// interval 1 second
var gameInterval = setInterval(() => {
  moveDown();
}, 4000);(position => (position[0] > 0 && (position[0] -= 1)))
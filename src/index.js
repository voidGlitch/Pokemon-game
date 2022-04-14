//selector query selects a particular element in the html given in the feilds
const canvas = document.querySelector("canvas");
//getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported, or the canvas has already been set to a different context mode.
const c = canvas.getContext("2d");
canvas.width = 1250;
canvas.height = 600;

// Step -1 Now its time we comment out these code that we use to seperate our canvas from the background
// c.fillStyle = "white";
// c.fillRect(0, 0, canvas.width, canvas.height);

//Step-2 array of 40 array with 70 items each
const collisionMap = [];

//we use 70 because our canvas image has 70 pixels by 40 pixel
for (let i = 0; i < collision.length; i += 70) {
  //but we dont want to show only the first 70 element 70 times
  // console.log(collision.slice(0, 70));
  //what we done here is firse we console the 70 items with 70 array so we increment the 70 for the next 70 array items and so on
  // console.log(collision.slice(i, i + 70));
  //next one slice(70,140) and keeps increment by 70
  collisionMap.push(collision.slice(i, 70 + i));
}
// console.log(collisionMap);
//create image within the javascript

const offset = {
  x: -300,
  y: -900,
};
const boundaries = [];
//Step 4 so now we need to sign the boundaries precisely on map based off this collision map where our 1025 is the array
collisionMap.forEach((row, i) => {
  //Fistly we iterated our row i.e 40 arrays then we iterate over each 40 array so that we can get each particular 1025 symbol in this i is position of row and j is the position number of item inside the array
  row.forEach((symbol, j) => {
    // Now wherever we see the symbol 1025 we set the value position
    if (symbol === 1025) {
      boundaries.push(
        new Boundary({
          position: {
            // j is the value where the symbol is diagonally then multiply it by 90 which gives us the exact position of the boundary on x axis same as y position but on horizontal
            //we write offset.x that gonna subtact the width and the height so the position is centralized
            x: j * Boundary.width + offset.x,
            y: i * Boundary.height + offset.y,
          },
        })
      );
    }
  });
});
// console.log(boundaries);

const image = new Image();
image.src = "../Pokemon Assets/PalletMap.png";

const ForegroundImage = new Image();
ForegroundImage.src = "../Pokemon Assets/Foregroundimg.png";
//requires 3 argument one is src second third for the position of x and y for the drawn image
// c.drawImage(image, 0, 0);
//❌but we can't show the image because the screen load the image before it initalize
const playerImage = new Image();
playerImage.src = "../Pokemon Assets/playerDown.png";

const playerUpImage = new Image();
playerUpImage.src = "../Pokemon Assets/playerUp.png";
const playerDownImage = new Image();
playerDownImage.src = "../Pokemon Assets/playerDown.png";
const playerLeftImage = new Image();
playerLeftImage.src = "../Pokemon Assets/playerLeft.png";
const playerRightImage = new Image();
playerRightImage.src = "../Pokemon Assets/playerRight.png";

//created a class sprite in which we are going to define constructor which we can use in neat way
//A constructor is a special function that creates and initializes an object instance of a class

const player = new Sprite({
  position: {
    //9 we remove this.image.width and height because the image is not static so we see the dimensions of our player and used it instead
    x: canvas.width / 2 - 192 / 4,
    y: canvas.height / 2 - 68 / 2,
  },
  image: playerImage,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUpImage,
    down: playerDownImage,
    left: playerLeftImage,
    right: playerRightImage,
  },
});

//defining background
const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});
//defining Fore background
const ForeBackground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: ForegroundImage,
});

// image.onload = () => {
//   c.drawImage(image, -500, -1000);
//   //so the first four argument are for the 🙍‍♂️image cropping and last four are for positioning after the playerImage we split the image into 4 half and render the first one and same we did for positioning
//   c.drawImage(
//     playerImage,
//     0,
//     0,
//     playerImage.width / 4,
//     playerImage.height,
//     //width/4 is because we can render the image at center of the village
//     //these are called actual (postion) of the image this shows the actual player image position ,width and height
//     canvas.width / 2 - playerImage.width / 4,
//     canvas.height / 2 - playerImage.height / 2,
//     playerImage.width / 4,
//     playerImage.height
//   );
// };

//Now as we want our screen to move on a press of the key we need to create an object which will tell us if the key is pressed or not
const key = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s: {
    pressed: false,
  },
  d: {
    pressed: false,
  },
};
// Now as we are pressing the key down the value is becoming true but we dont want that we need to make the value false on key up so we created a new function

//10 Temperary boundary
// const testBoundary = new Boundary({
//   position: {
//     x: 400,
//     y: 400,
//   },
// });

// Step 8 Now as our project is expanding we are declaring some items as movables items and then iterate over them to increment their positions
//Step 10 Now as our collision is complete we can now move toward real boundary instead of a temporary one
// const Movables = [background, testBoundary];
const Movables = [background, ...boundaries, ForeBackground];
function rectangularCollison({ rectangle1, rectangle2 }) {
  return (
    //for left collision
    rectangle2.position.x <= rectangle1.position.x + rectangle1.width &&
    //for rigth side collision
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    //for down side collision
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    //for upside collision
    rectangle1.position.y + rectangle1.width >= rectangle2.position.y - 15
    //❌Here we subtract -15 just to sub some position as player was passing passing the boundaries but not colliding dont know why)
  );
}
function animate() {
  //The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
  window.requestAnimationFrame(animate);
  // console.log(animate);
  // Step 6 Now we draw our collision tiles on the map
  background.draw();
  //Step 7 For now we are commenting out our collisions and taking a test boundary for it
  boundaries.forEach((boundary) => {
    boundary.draw();
    // if (
    //   rectangularCollison({
    //     rectangle1: player,
    //     rectangle2: boundary,
    //   })
    // ) {
    //   //9 Now we check in here if the position of player x + its width i.e to get full player body is greater than the position of colliding boundary at x axis
    //   console.log("colliding");
    // }
  });
  player.draw();
  //Rendering foreground as last thing to do
  ForeBackground.draw();
  //9 Now to get the player dimensions we need to define player as an object in the spirit class

  // refactoring the code draw in sprite class c.drawImage(
  //   playerImage,
  //   0,
  //   0,
  //   playerImage.width / 4,
  //   playerImage.height,
  //   //width/4 is because we can render the image at center of the village
  //   //these are called actual (postion) of the image this shows the actual player image position ,width and height
  //   canvas.width / 2 - playerImage.width / 4,
  //   canvas.height / 2 - playerImage.height / 2,
  //   playerImage.width / 4,
  //   playerImage.height
  // );

  //Step 9 Important** So now we need to create some func when player is colliding with the boundaries we have left position of player to need the right position we just need to add the width of the player image to get the right side of the player

  //10 Moving the boundary collision statement inside the Boudaries for each statement
  // if (
  //   rectangularCollison({
  //     rectangle1: player,
  //     // rectangle2: testBoundary,
  //     rectangle2:boundary
  //   })
  // ) {
  //   //9 Now we check in here if the position of player x + its width i.e to get full player body is greater than the position of colliding boundary at x axis
  //   console.log("colliding");
  // }
  //Step 11 : Collision Final Now we need to predect the future weather the player is going to collide or not
  let moving = true;
  player.moving = false;
  if (key.w.pressed && lastKey === "w") {
    player.moving = true;
    player.image = player.sprites.up;
    // This is logic created to use on press key changes the image of background but now our character position && last key is used to give a smooth animation so that if we press both the key at the same time it won't stuck
    //background.position.y = background.position.y + 3
    // background.position.y += 5;
    // //So as we dont want our collision boundary to move by itself with us we do
    // testBoundary.position.y += 5;
    //11 Creating an variable which return false as soon as our player is going to collide

    //11 Moving on
    for (let i = 0; i < boundaries.length; i++) {
      //11 Now we dont have boundary so we define our own
      const boundary = boundaries[i];
      //Detect the collision
      if (
        rectangularCollison({
          rectangle1: player,
          //We just dont need boundary but also to predict if our player move by 3 pixel before it touch the boundary ...creates a clone of boundary object without overriding the original here we are overriding the clone by giving position
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y + 5,
            },
            //11 now here only difference is that we are now detecting the collision before it collides
          },
        })
      ) {
        //9 Now we check in here if the position of player x + its width i.e to get full player body is greater than the position of colliding boundary at x axis
        console.log("colliding");
        //Stops the player to move further
        moving = false;
        break;
      }
    }
    if (moving)
      Movables.forEach((movables) => {
        movables.position.y += 5;
      });
  } else if (key.a.pressed && lastKey === "a") {
    // background.position.x += 5;
    // testBoundary.position.x += 5; //11 Creating an variable which return false as soon as our player is going to collide
    player.moving = true;
    player.image = player.sprites.left;

    //11 Moving on
    for (let i = 0; i < boundaries.length; i++) {
      //11 Now we dont have boundary so we define our own
      const boundary = boundaries[i];
      //Detect the collision
      if (
        rectangularCollison({
          rectangle1: player,
          //We just dont need boundary but also to predict if our player move by 3 pixel before it touch the boundary ...creates a clone of boundary object without overriding the original here we are overriding the clone by giving position
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x + 5,
              y: boundary.position.y,
            },
            //11 now here only difference is that we are now detecting the collision before it collides
          },
        })
      ) {
        //9 Now we check in here if the position of player x + its width i.e to get full player body is greater than the position of colliding boundary at x axis
        console.log("colliding");
        //Stops the player to move further
        moving = false;
        break;
      }
    }
    if (moving)
      Movables.forEach((movables) => {
        movables.position.x += 5;
      });
  } else if (key.s.pressed && lastKey === "s") {
    player.moving = true;
    player.image = player.sprites.down;

    //11 Creating an variable which return false as soon as our player is going to collide

    //11 Moving on
    for (let i = 0; i < boundaries.length; i++) {
      //11 Now we dont have boundary so we define our own
      const boundary = boundaries[i];
      //Detect the collision
      if (
        rectangularCollison({
          rectangle1: player,
          //We just dont need boundary but also to predict if our player move by 3 pixel before it touch the boundary ...creates a clone of boundary object without overriding the original here we are overriding the clone by giving position
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x,
              y: boundary.position.y - 5,
            },
            //11 now here only difference is that we are now detecting the collision before it collides
          },
        })
      ) {
        //9 Now we check in here if the position of player x + its width i.e to get full player body is greater than the position of colliding boundary at x axis
        console.log("colliding");
        //Stops the player to move further
        moving = false;
        break;
      }
    }
    if (moving)
      // background.position.y -= 5;
      // testBoundary.position.y -= 5;
      Movables.forEach((movables) => {
        movables.position.y -= 5;
      });
  } else if (key.d.pressed && lastKey === "d") {
    player.moving = true;
    player.image = player.sprites.right;

    //11 Creating an variable which return false as soon as our player is going to collide

    //11 Moving on
    for (let i = 0; i < boundaries.length; i++) {
      //11 Now we dont have boundary so we define our own
      const boundary = boundaries[i];
      //Detect the collision
      if (
        rectangularCollison({
          rectangle1: player,
          //We just dont need boundary but also to predict if our player move by 3 pixel before it touch the boundary ...creates a clone of boundary object without overriding the original here we are overriding the clone by giving position
          rectangle2: {
            ...boundary,
            position: {
              x: boundary.position.x - 5,
              y: boundary.position.y,
            },
            //11 now here only difference is that we are now detecting the collision before it collides
          },
        })
      ) {
        //9 Now we check in here if the position of player x + its width i.e to get full player body is greater than the position of colliding boundary at x axis
        console.log("colliding");
        //Stops the player to move further
        moving = false;
        break;
      }
    }
    if (moving)
      // background.position.x -= 5;
      // testBoundary.position.x -= 5;
      Movables.forEach((movables) => {
        movables.position.x -= 5;
      });
  }
}
animate();

let lastKey = "";
window.addEventListener("keydown", (e) => {
  console.log(e);
  switch (e.key) {
    case "w":
      // SET THE KEYS VALUE TRUE ON PRESS
      key.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      console.log("pressed a");
      key.a.pressed = true;
      lastKey = "a";

      break;
    case "s":
      console.log("pressed s");
      key.s.pressed = true;
      lastKey = "s";

      break;
    case "d":
      console.log("pressed d");
      key.d.pressed = true;
      lastKey = "d";

      break;
  }
});
window.addEventListener("keyup", (e) => {
  console.log(e);
  switch (e.key) {
    case "w":
      // SET THE KEYS VALUE TRUE ON PRESS
      key.w.pressed = false;
      break;
    case "a":
      console.log("pressed a");
      key.a.pressed = false;
      break;
    case "s":
      console.log("pressed s");
      key.s.pressed = false;
      break;
    case "d":
      console.log("pressed d");
      key.d.pressed = false;
      break;
  }
});

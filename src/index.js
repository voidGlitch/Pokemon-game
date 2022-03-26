console.log("hello");
console.log(collision);
//selector query selects a particular element in the html given in the feilds
const canvas = document.querySelector("canvas");
//getContext() method returns a drawing context on the canvas, or null if the context identifier is not supported, or the canvas has already been set to a different context mode.
const c = canvas.getContext("2d");
canvas.width = 1024;
canvas.height = 576;

console.log(c);
c.fillStyle = "white";
c.fillRect(0, 0, canvas.width, canvas.height);

//create image within the javascript

const image = new Image();
image.src = "../Pokemon Assets/PalletTown1.png";
console.log(image);
//requires 3 argument one is src second third for the position of x and y for the drawn image
// c.drawImage(image, 0, 0);
//❌but we can't show the image because the screen load the image before it initalize
const playerImage = new Image();
playerImage.src = "../Pokemon Assets/playerDown.png";
console.log(playerImage);

//created a class sprite in which we are going to define constructor which we can use in neat way
//A constructor is a special function that creates and initializes an object instance of a class
class Sprite {
  constructor({ velocity, image, position }) {
    this.position = position;
    this.image = image;
  }
  //as image is outside the class so we need to define it inside the class body
  draw() {
    // in this we are refrencing the position from the obj we created
    c.drawImage(this.image, this.position.x, this.position.y);
  }
}
//defining constructor
const background = new Sprite({
  position: {
    x: -500,
    y: -1000,
  },
  image: image,
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

function animate() {
  //The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
  window.requestAnimationFrame(animate);
  console.log(animate);
  background.draw();
  c.drawImage(
    playerImage,
    0,
    0,
    playerImage.width / 4,
    playerImage.height,
    //width/4 is because we can render the image at center of the village
    //these are called actual (postion) of the image this shows the actual player image position ,width and height
    canvas.width / 2 - playerImage.width / 4,
    canvas.height / 2 - playerImage.height / 2,
    playerImage.width / 4,
    playerImage.height
  );
  // This is logic created to use on press key changes the image of background but now our character position && last key is used to give a smooth animation so that if we press both the key at the same time it won't stuck
  if (key.w.pressed && lastKey === "w") {
    //background.position.y = background.position.y + 3
    background.position.y += 5;
  } else if (key.a.pressed && lastKey === "a") {
    background.position.x += 5;
  } else if (key.s.pressed && lastKey === "s") {
    background.position.y -= 5;
  } else if (key.d.pressed && lastKey === "d") {
    background.position.x -= 5;
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

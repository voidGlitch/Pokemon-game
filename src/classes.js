class Sprite {
  constructor({
    velocity,
    image,
    position,
    // We use a draw function for two things one is player and second is background for bg it has max 1 frame but for player it can be overwrite
    frames = {
      max: 1,
    },
    sprites,
  }) {
    this.position = position;
    this.image = image;
    this.frames = { ...frames, val: 0, elapsed: 0 };
    this.image.onload = () => {
      //192/4
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
      // Firstly it will give us the width and height of bg image and then of the players
    };
    this.moving = false;
    this.sprites = sprites;
  }
  //as image is outside the class so we need to define it inside the class body
  draw() {
    // in this we are refrencing the position from the obj we created
    // c.drawImage(this.image, this.position.x, this.position.y);
    //9 We comment out upper code because we need only one draw function but the position is sliced by the previous player draw funtion
    c.drawImage(
      this.image,
      this.frames.val * this.width,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      //width/4 is because we can render the image at center of the village
      //these are called actual (postion) of the image this shows the actual player image position ,width and height
      // canvas.width / 2 - this.image.width / 4,
      // canvas.height / 2 - this.image.height / 2, We do not these code as these are player attributes and for background we have its offset x and y positions
      this.position.x,
      this.position.y,
      //this gives us the full width of the bg image
      this.image.width / this.frames.max,
      this.image.height
    );
    if (this.moving) {
      if (this.frames.max > 1) {
        this.frames.elapsed++;
      }
      if (this.frames.elapsed % 10 === 0) {
        if (this.frames.val < this.frames.max - 1) {
          this.frames.val++;
        } else {
          this.frames.val = 0;
        }
      }
    }
  }
}
//Now we created a class which will represent our rectangle tiles in red colour
class Boundary {
  static width = 60;
  static height = 60;
  constructor({ position }) {
    this.position = position;
    // We have zoomed our town image by 750 so the tiles of the collision is also zoomed so 12(before zoomed 12*12)*500/100=60
    this.width = 60;
    this.height = 60;
  }
  //Step 3 now we used to draw the square object
  draw() {
    // NOW we used fill color red of canvas context and define the position of x and y
    // c.fillStyle = "red";
    c.fillStyle = "rgba(255,0,0,0.5)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

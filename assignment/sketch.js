let balls = []; // save ball info
let minNumber;

function setup() {
  let minNumber = Math.min(windowWidth, windowHeight);
  createCanvas(minNumber, minNumber);
  setupBalls();
}

function setupBalls() {
  balls = [];
  background(31, 74, 104);

  let numBalls = 500; // Number of balls to generate

  // create balls at random locations
  for (let i = 0; i < numBalls; i++) {
    // calculate balls location
    let x = random(width); // Random x position within the canvas
    let y = random(height); // Random y position within the canvas

    // random balls color
    let c = color(random(255), random(255), random(255));

    // save ball info
    balls.push({
      x: x,
      y: y,
      color: c,
      xOffset: random(1000), // x offset for Perlin noise
      yOffset: random(1000) // y offset for Perlin noise
    });
  }
}

function windowResized() {
  let minNumber = Math.min(windowWidth, windowHeight);
  resizeCanvas(minNumber, minNumber);
  setupBalls(); // Recalculate ball positions based on new window size
}

function draw() {
  minNumber = Math.min(windowWidth, windowHeight);
  background(31, 74, 104); // background color 

  // draw the balls
  for (let i = 0; i < balls.length; i++) {
    let ball = balls[i];

    // Applying Perlin noise on x to move it to the right
    let noiseX = noise(ball.xOffset);
    let noiseScaleX = 2; // Noise scaling factor, affecting the movement speed of the ball
    let dx = map(noiseX, 0, 1, 1, 2) * noiseScaleX;
    ball.x += dx;

    // Applying Perlin noise on y to make it move irregularly up and down
    let noiseY = noise(ball.yOffset);
    let noiseScaleY = 0.5; // Noise scaling factor, affecting the movement speed of the ball
    let dy = map(noiseY, 0, 1, -1, 1) * noiseScaleY;
    ball.y += dy;

    // If the ball touches the right side of the canvas, move it to the left side of the canvas
    if (ball.x > width + minNumber * 0.02) {
      ball.x = -minNumber * 0.02;
    }

    // Restrict balls movement within the canvas
    ball.y = constrain(ball.y, minNumber * 0.02, height - minNumber * 0.02);

    // draw the balls
    fill(ball.color);
    strokeWeight(2); // Set stroke width to 2 pixels
    ellipse(ball.x, ball.y, minNumber * 0.02, minNumber * 0.02); // Diameter is 2% of window width
    
    // Update the offset of Perlin noise so that there is a change in each frame
    ball.xOffset += 0.01;
    ball.yOffset += 0.01;
  }

  // Draw the large circles with concentric circles inside them

  // The big circle in the upper left corner
  drawBigCircleWithCircles(minNumber * 0.30 + noise(frameCount * 0.01) * 100 - 50, minNumber * 0.25 + noise(frameCount * 0.01) * 100 - 50, minNumber * 0.55, ['#FFFFFF', '#4E9E48', '#FFFFFF', '#4E9E48', '#FFFFFF', '#4E9E48', '#FFFFFF', '#4E9E48', '#D449AC', '#F55060', '#000000', '#199B34', '#FFFFFF']);
  
  // The big circle in the upper right corner
  drawBigCircleWithCircles(minNumber * 0.85 + noise(frameCount * 0.1) * 100 - 50, minNumber * 0.2, minNumber * 0.4, ['#FFFFFF', '#ED6E0B', '#FFFFFF', '#ED6E0B', '#FFFFFF', '#ED6E0B', '#FFFFFF', '#ED6E0B', '#D449AC', '#4DADCE', '#000000', '#199B34', '#FFFFFF']);
  
  // The big circle in the bottom left corner
  drawBigCircleWithCircles(minNumber * 0.20, minNumber * 0.85 + noise(frameCount * 0.05) * 100 - 50, minNumber * 0.5, ['#00238B', '#E0B155', '#00238B', '#E0B155', '#00238B', '#E0B155', '#00238B', '#E93B6E', '#FF3512', '#F363C5', '#000000', '#199B34', '#FF1B1D', '#FFFFFF']);
  
  // The big circle in the bottom right corner
  drawBigCircleWithCircles(minNumber * 0.80 + noise(frameCount * 0.15) * 100 - 50, minNumber * 0.75 + noise(frameCount * 0.15) * 100 - 50, minNumber * 0.55, ['#FFFFFF', '#EB1D59', '#FFFFFF', '#EB1D59', '#FFFFFF', '#EB1D59', '#FFFFFF', '#EB1D59', '#D449AC', '#FC5E45', '#000000', '#FF1631', '#FF1B1D', '#FFFFFF', '#FFFFFF']);
}

function drawBigCircleWithCircles(x, y, diameter, colors) {
  drawBigCircle(x, y, diameter); // Draw the big circle
  drawCirclesInsideBigCircle(x, y, diameter, colors); // Draw the concentric circles inside the big circle
}

function drawBigCircle(x, y, diameter) {
  fill(255); // Set fill color to white
  stroke(0); // Set the stroke color to black
  strokeWeight(minNumber * 0.02); // Set the stroke width relative to window width
  ellipse(x, y, diameter); // Draw the big circle
}

function drawCirclesInsideBigCircle(x, y, diameter, colors) {
  let numOfCircles = colors.length; // Use the number of colors provided
  let circleDiameter = diameter; // Start with the diameter of the big circle

  for (let i = 0; i < numOfCircles; i++) {
    drawCircle(x, y, circleDiameter, colors[i]); // Draw the concentric circles
    circleDiameter -= diameter / numOfCircles; // Decrease the diameter to create concentric circles
  }
}

function drawCircle(x, y, diameter, strokeColor) {
  noFill();
  stroke(strokeColor); // Set the stroke color to the provided color
  strokeWeight(minNumber * 0.05); // Set the stroke width relative to window width
  ellipse(x, y, diameter); // Draw the circle
}

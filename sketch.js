// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];
let circleX = 320; // Initial x position of the circle
let circleY = 240; // Initial y position of the circle
let circleSize = 100; // Diameter of the circle
let isTrackingIndex = false; // Track if index finger is moving the circle
let isTrackingThumb = false; // Track if thumb is moving the circle

function preload() {
  // Initialize HandPose model with flipped video input
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  console.log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, { flipped: true });
  video.hide();

  // Start detecting hands
  handPose.detectStart(video, gotHands);
}

function draw() {
  image(video, 0, 0);

  // Draw the circle
  fill(255, 0, 0); // Red color
  noStroke();
  ellipse(circleX, circleY, circleSize);

  // Ensure at least one hand is detected
  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {
        // Get the positions of the index finger tip (keypoint 8) and thumb tip (keypoint 4)
        let indexFinger = hand.keypoints[8];
        let thumb = hand.keypoints[4];

        // Check if the index finger is touching the circle
        let distanceToCircleIndex = dist(indexFinger.x, indexFinger.y, circleX, circleY);
        if (distanceToCircleIndex < circleSize / 2) {
          // Move the circle to follow the index finger
          if (!isTrackingThumb) { // Only move with index if thumb is not tracking
            stroke(255, 0, 0); // Red color for index finger
            line(circleX, circleY, indexFinger.x, indexFinger.y); // Draw red trajectory
            circleX = indexFinger.x;
            circleY = indexFinger.y;
            isTrackingIndex = true;
          }
        } else {
          isTrackingIndex = false;
        }

        // Check if the thumb is touching the circle
        let distanceToCircleThumb = dist(thumb.x, thumb.y, circleX, circleY);
        if (distanceToCircleThumb < circleSize / 2) {
          // Move the circle to follow the thumb
          if (!isTrackingIndex) { // Only move with thumb if index is not tracking
            stroke(0, 255, 0); // Green color for thumb
            line(circleX, circleY, thumb.x, thumb.y); // Draw green trajectory
            circleX = thumb.x;
            circleY = thumb.y;
            isTrackingThumb = true;
          }
        } else {
          isTrackingThumb = false;
        }

        // Draw lines connecting specific keypoints
        stroke(0, 255, 0); // Set line color
        strokeWeight(2);

        // Connect keypoints 0 to 4
        for (let i = 0; i < 4; i++) {
          line(
            hand.keypoints[i].x, hand.keypoints[i].y,
            hand.keypoints[i + 1].x, hand.keypoints[i + 1].y
          );
        }

        // Connect keypoints 5 to 8
        for (let i = 5; i < 8; i++) {
          line(
            hand.keypoints[i].x, hand.keypoints[i].y,
            hand.keypoints[i + 1].x, hand.keypoints[i + 1].y
          );
        }

        // Connect keypoints 9 to 12
        for (let i = 9; i < 12; i++) {
          line(
            hand.keypoints[i].x, hand.keypoints[i].y,
            hand.keypoints[i + 1].x, hand.keypoints[i + 1].y
          );
        }

        // Connect keypoints 13 to 16
        for (let i = 13; i < 16; i++) {
          line(
            hand.keypoints[i].x, hand.keypoints[i].y,
            hand.keypoints[i + 1].x, hand.keypoints[i + 1].y
          );
        }

        // Connect keypoints 16 to 20
        for (let i = 16; i < 20; i++) {
          line(
            hand.keypoints[i].x, hand.keypoints[i].y,
            hand.keypoints[i + 1].x, hand.keypoints[i + 1].y
          );
        }
      }
    }
  }
}

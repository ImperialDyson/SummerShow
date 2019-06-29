// 4D Open Simplex Noise Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/137-4d-opensimplex-noise-loop
// https://youtu.be/3_0Ax95jIrk

int totalFrames = 360;
int counter = 0;
boolean record = false;

int seqIndex = 0;

float increment = 0.03;

float amt = 0.0;
float amtIncrement = 0.04;
color[] colorSequence = {color(204, 102, 0), color(204, 102, 0), color(0, 102, 153), color(23, 233, 122)};
color newColor;

// Just for non-looping demo
float zoff = 0;

OpenSimplexNoise noise;
void setup() {
  size(600, 400);
  noise = new OpenSimplexNoise();
}

void draw() {
  float percent = 0;
  if (record) {
    percent = float(counter) / totalFrames;
  } else {
    percent = float(counter % totalFrames) / totalFrames;
  }
  render(percent);
  if (record) {
    saveFrame("output/gif-"+nf(counter, 3)+".png");
    if (counter == totalFrames-1) {
      exit();
    }
  }
  counter++;
}

void render(float percent) {
  
  float angle = map(percent, 0, 1, 0, TWO_PI);
  float uoff = map(sin(angle), -1, 1, 0, 2);
  float voff = map(sin(angle), -1, 1, 0, 2);

  float xoff = 0;
  
  newColor = lerpColor(colorSequence[seqIndex], colorSequence[seqIndex + 1], amt);
  
  loadPixels();
  for (int x = 0; x < width; x++) {
    float yoff = 0;
    for (int y = 0; y < height; y++) {
      float n;
      if (record) {
        // 4D Open Simplex Noise is very slow!
        n = (float) noise.eval(xoff, yoff, uoff, voff);
      } else {
        // If you aren't worried about looping run this instead for speed!
        n = (float) noise.eval(xoff, yoff, zoff);
      }
      float bright = n > 0 ? map(n, 0, 1, 0, 255) : 0;
      color brightColor = color(bright);
      
      pixels[x + y * width] = blendColor(brightColor, newColor, ADD);
      
      yoff += increment;
    }
    xoff += increment;
  }
  updatePixels();
  print("Amount: " + amt + "\n");
  zoff += increment;
  
  if (amt < 1) {
    // Increment till hits 1
    amt += amtIncrement;
  }
  else if (amt > 1) {
    // It's bigger than 1
    if (seqIndex < (colorSequence.length - 2)) {
      print(colorSequence.length);
      seqIndex += 1;
      amt = 0;
      print("Index: " + seqIndex);
    }
  }
}

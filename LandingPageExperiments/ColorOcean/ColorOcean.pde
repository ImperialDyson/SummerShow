// 4D Open Simplex Noise Loop
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/137-4d-opensimplex-noise-loop
// https://youtu.be/3_0Ax95jIrk

int totalFrames = 360;
int counter = 0;
boolean record = false;

float increment = 0.005;

color[] colors = {#ceecef, #ffe362,#ff4800, #ff4800};
color newColor;

// Just for non-looping demo
float zoff = 0;

OpenSimplexNoise noise;
void setup() {
  size(1000, 800);
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
      float bright = n > 0 ? n : 0;
      //float bright = map(n, -1, 1, 0, 1);
         
      if (bright < 0.33) {
         newColor = lerpColor(colors[0], colors[1], map(bright, 0, 0.33, 0, 1));
      }
      else if (bright < 0.66) {
         newColor = lerpColor(colors[1], colors[2], map(bright, 0.33, 0.66, 0, 1));
      }
      else {
         newColor = lerpColor(colors[2], colors[3], map(bright, 0.66, 1, 0, 1));
      }

      pixels[x + y * width] = newColor;
      
      yoff += increment;
    }
    xoff += increment;
  }
  updatePixels();
  zoff += increment;
 
}

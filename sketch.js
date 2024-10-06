class HoloDot {

  constructor(x, y, MAX_X, MAX_Y, s, rainbow, ran, m_o) {
    this.x = x;
    this.y = y;
    this.inter = map(y, 0, MAX_Y, 0, 1);
    this.shift = random(-50, 70);
    this.size = s;
    this.max_x = MAX_X; 
    this.max_y = MAX_Y;
    this.colors = rainbow;
    this.rect_range = ran;
    this.mouse_offset = m_o;
    this.shift = random(-50, 70);
  }
  
  // Custom method for updating the variables
  update() {
    
    let inter;
    let c = this.colors[0];

    for (let i = 0; i < 7; i++) {
      let min = mouseX + this.mouse_offset + (i-4) * this.rect_range;
      let max = mouseX + this.mouse_offset + (i-3) * this.rect_range;
      let min_color = color(this.colors[i]);
      let max_color = color(this.colors[i+1]);
      if (this.x > min && this.x <= max) {
        // color accordingly
        inter = map(this.x, min, max, 0, 1);
        c = lerpColor(min_color, max_color, inter);
      }
    }

    let max_r = 200;
    let fade_r = 900;
    
    let r = sqrt(pow(mouseX - this.x, 2) + pow(mouseY - this.y, 2));
    if (r > max_r) {
      let bg = color(131, 133, 128);
      let rad = sqrt(pow(mouseX - this.x, 2) + pow(mouseY - this.y, 2));
      inter = map(rad, max_r, max_r + fade_r, 0, 1);
      c = lerpColor(c, bg, inter);
    }

    c = shift_color(c, this.shift);
    this.col = c;
  }
  
  // Custom method for drawing the object
  display() {
    fill(this.col);
    ellipse(this.x, this.y, this.size, this.size);
  }

  // Custom method for shifting the color
  rang() {
    let x_rad = 200;
    let y_rad = 100;
    let x_dig = (pow((x - mouseX), 2)) / pow(x_rad, 2);
    let y_dig = (pow((y - mouseY), 2)) / pow(y_rad, 2);
    let r = x_dig + y_dig;
    
    //float r = sqrt(pow(mouseX - x, 2) + pow(mouseY - y,2));
    return r;
  }
}

















let rainbow = [];
let dots = [];

function setup() {

  createCanvas(windowWidth, windowHeight);
  let MAX_X = width;
  let MAX_Y = height;
  // Define colors
  let rainbow = [
    color(195, 146, 165),
    color(214, 95, 86),
    color(254, 181, 124),
    color(244, 245, 74),
    color(103, 219, 112),
    color(85, 217, 208),
    color(124, 127, 222),
    color(195, 146, 165)
  ]

  let count = 9000;
  dots = [];
  // let size = random(10, 30);
  let size = 18;
  // let gap = random(10, 30);
  let gap = 13;
  
  // let row = int(MAX_X / (size-3));
  // let col = int(MAX_Y / (size-3));
  let x = 0;
  let y = 0;
  let end =false;
  for (let i = 0; i < count; i++) {
    let rect_range = MAX_X / 5;
    let mouse_offset = random(-1 * rect_range, rect_range);
    
    dots.push(new HoloDot(x, y, MAX_X, MAX_Y, size, rainbow, rect_range, mouse_offset));
    x += (gap);
    if (x > MAX_X + size) {
      y += (gap);
      if (y%2 == 0) {
        x = size/2;
      } else {
        x = 0;
      }
    }
    
    //println(x, y);
    if ((x > MAX_X) && (y > MAX_Y )) {
      end = true;
      // print(count);
    }
    if (end) {
      x = int(random(MAX_X));
      y = int(random(MAX_Y));
    }
  }
}

function draw() {
  noStroke();
  background(131, 133, 128);
  
  for (let dot of dots) {
    dot.update();
    dot.display();
  }
  
}

function shift_color(c, shift) {
  let r = red(c);
  let g = green(c);
  let b = blue(c);
  r += shift;
  g += shift;
  b += shift;
  return color(r, g, b);
}

function mouseWheel() {

}

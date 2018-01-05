var config = {
  player: {
    size: 100, //100
    speed: 20, //20
    noClip: false, //false
    colorone: 'orange',
    colortwo: 'blue'
  },
  puck: {
    speed: 17, //17
    color: 'monochrome',
  },
  table: {
    color: 'monochrome'
  },
  debug: false, //false
}



var table;
var puck;
var playerone;
var playertwo;
var scoreboard

function ScoreBoard() {
  this.score = {
    blue: 0,
    red: 0
  }
  this.display = function() {
    fill('black');
    noStroke();
    textSize(32);
    text(`PlayerOne: ${this.score.red} PlayerTwo: ${this.score.blue}`, -100, -360);
  }
}

function Table() {
  this.color = config.puck.color;
  this.goalColor = config.puck.color;
  this.display = function() {
    stroke(this.goalColor)
    strokeWeight(5)
    line(0, -height / 2, 0, height / 2)
    line(-width / 2, 0, width / 2, 0)
    rectMode(CENTER);
    fill(this.goalColor)
    rect(-width / 2, 0, 100, 400)
    rect(width / 2, 0, 100, 400)
    ellipse(0, 0, 130)
    noFill();
    ellipse(0, 0, 230)
  };
}

function Puck() {
  this.pos = createVector(0, 0)
  this.color = config.puck.color;
  this.stroke = config.puck.color;
  this.display = function() {
    stroke(puck.stroke);
    fill(puck.color);
    ellipse(puck.pos.x, puck.pos.y, 100)
  }
  this.momentum = 0;
  this.direction = 0;
  this.move = function() {
    if (Math.sqrt(Math.pow(this.pos.x - playerone.pos.x, 2) + Math.pow(this.pos.y - playerone.pos.y, 2)) < config.player.size) {
      if (this.momentum < 250) this.momentum = 60 * 5;
      this.direction = p5.Vector.sub(this.pos, playerone.pos);
      this.color = randomColor({
        hue: config.player.colorone
      });
      this.stroke = randomColor({
        hue: config.player.colorone
      });
    }
    if (Math.sqrt(Math.pow(this.pos.x - playertwo.pos.x, 2) + Math.pow(this.pos.y - playertwo.pos.y, 2)) < config.player.size) {
      if (this.momentum < 250) this.momentum = 60 * 5;
      this.direction = p5.Vector.sub(this.pos, playertwo.pos);
      this.color = randomColor({
        hue: config.player.colortwo
      });
      this.stroke = randomColor({
        hue: config.player.colortwo
      });
    }
    if (this.pos.x - config.player.size < -width / 2) this.direction.x = -this.direction.x;
    if (this.pos.x + config.player.size > width / 2) this.direction.x = -this.direction.x;
    if (this.pos.y - config.player.size < -height / 2) this.direction.y = -this.direction.y;
    if (this.pos.y + config.player.size > height / 2) this.direction.y = -this.direction.y;

    if (this.pos.x < -30 - width / 2 || this.pos.x > 30 + width / 2 || this.pos.y < -30 - height / 2 || this.pos.y > 30 + height / 2) {
      this.pos.x = 0;
      this.pos.y = 0;
      this.momentum = 0;
    }

    if (this.momentum > 0) {
      var d = this.direction.div(this.direction.mag() / (this.momentum / (100 / config.puck.speed)))
      this.pos = p5.Vector.add(this.pos, d)
      this.momentum--;
    }
    if (this.pos.x + config.player.size / 2 > 850 && (this.pos.y > -200 && this.pos.y < 200)) {
      scoreboard.score.red++
        setup()
    }
    if (this.pos.x - config.player.size / 2 < -850 && (this.pos.y > -200 && this.pos.y < 200)) {
      scoreboard.score.blue++
        setup()
    }
  }
}

function PlayerOne() {
  this.pos = createVector(-width / 2, 0)
  this.color = config.player.colorone;
  this.stroke = config.player.colorone;
  this.display = function() {
    stroke(this.stroke);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, config.player.size)
  }
  this.move = function() {
    if (keyIsDown(87)) this.pos.y -= config.player.speed;
    if (keyIsDown(83)) this.pos.y += config.player.speed;
    if (keyIsDown(65)) this.pos.x -= config.player.speed;
    if (keyIsDown(68)) this.pos.x += config.player.speed;
    //this.pos.y = //mouseY-height/2; //leftHandPos[2]*config.player.speed/6;
    //this.pos.x = //mouseX-width/2; //(leftHandPos[0]-width/16)*config.player.speed/5;
    if (!config.player.noClip) {
      if (this.pos.x < -width / 2) this.pos.x = config.player.size - width / 2;
      if (this.pos.x > 0) this.pos.x = 0 - config.player.size;
      if (this.pos.y < -height / 2) this.pos.y = height / 2;
      if (this.pos.y > height / 2) this.pos.y = -height / 2;
    }
  }
}

function PlayerTwo() {
  this.pos = createVector(width / 2, 0)
  this.color = config.player.colortwo;
  this.stroke = config.player.colortwo;
  this.display = function() {
    stroke(this.stroke);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, config.player.size)
  }
  this.move = function() {
    if (keyIsDown(UP_ARROW)) this.pos.y -= config.player.speed;
    if (keyIsDown(DOWN_ARROW)) this.pos.y += config.player.speed;
    if (keyIsDown(LEFT_ARROW)) this.pos.x -= config.player.speed;
    if (keyIsDown(RIGHT_ARROW)) this.pos.x += config.player.speed;
    //this.pos.y = rightHandPos[2]*config.player.speed/6;
    //this.pos.x = (rightHandPos[0]+width/16)*config.player.speed/5;
    if (!config.player.noClip) {
      if (this.pos.x > width / 2) this.pos.x = -config.player.size + width / 2;
      if (this.pos.x < 0) this.pos.x = 0 + config.player.size;
      if (this.pos.y < -height / 2) this.pos.y = height / 2;
      if (this.pos.y > height / 2) this.pos.y = height / 2;
    }
  }
}

function setup() {
  createCanvas(1800, 800)
  translate(width / 2, height / 2)
  if (typeof scoreboard == "undefined") {
    scoreboard = new ScoreBoard();
  }
  table = new Table();
  table.color = randomColor({
    luminosity: 'light',
    hue: config.table.color
  });
  table.goalColor = randomColor({
    luminosity: 'dark',
    hue: config.table.color
  });
  playerone = new PlayerOne();
  playerone.color = randomColor({
    luminosity: 'dark',
    hue: config.player.colorone
  });
  playerone.stroke = randomColor({
    luminosity: 'light',
    hue: config.player.colorone
  });
  playertwo = new PlayerTwo();
  playertwo.color = randomColor({
    luminosity: 'dark',
    hue: config.player.colortwo
  });
  playertwo.stroke = randomColor({
    luminosity: 'light',
    hue: config.player.colortwo
  });
  puck = new Puck();
  puck.color = randomColor({
    luminosity: 'dark',
    hue: config.puck.color
  });
  puck.stroke = randomColor({
    luminosity: 'light',
    hue: config.puck.color
  });

}

function draw() {
  background(table.color);
  translate(width / 2, height / 2);
  if (config.debug) {
    fill('black');
    noStroke();
    textSize(32);
    text(`mouseX: ${mouseX-width/2}\nmouseY: ${Math.round(mouseY-height/2)}`, -40, 40 - height / 2);
  }
  table.display()
  puck.display();
  playerone.display();
  playertwo.display();
  puck.move()
  playerone.move();
  playertwo.move();
  scoreboard.display();
}

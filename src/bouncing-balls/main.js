// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// 生成随机颜色
function randomColor() {
  const color = 'rgb(' +
                random(0, 255) + ',' +
                random(0, 255) + ',' +
                random(0, 255) + ')';
  return color;
}

//实例化小球构造器
function Ball(x, y, velX, velY, color, size) {
  //坐标的范围从 0（左上角）到浏览器视口的宽和高（右下角）。
  this.x = x;
  this.y = y;
  //水平和竖直速度
  this.velX = velX
  this.velY =velY
  this.color = color
  //半径
  this.size = size
}

//绘制小球函数
Ball.prototype.draw = function() {
  //声明开始
  ctx.beginPath()
  //fillStyle定义颜色
  ctx.fillStyle = this.color
  //arc()方法用来画一段狐，参数为圆心，半径，弧的范围（这里圆是0-2PI）
  ctx.arc(this.x,this.y,this.size,0,2 * Math.PI)
  //声明结束
  ctx.fill()
}

//实例化小球
// let testBall = new Ball(200,200,4,4,'pink',20)
// testBall.draw()

//更新小球

Ball.prototype.update = function() {
  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX)
  }
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX)
  }
  if((this.y - this.size) >= height) {
    this.velY = -(this.velY)
  }
  if((this.y + this.size) <= 0) {
    this.velY = -(this.velY)
  }
  //我们将 velX 的值加到 x 的坐标上，将 velY 的值加到 y 坐标上 —— 每次调用这个方法的时候小球就移动这么多。
  this.x += this.velX
  this.y += this.velY
}

// 定义碰撞检测函数
Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};


// 定义一个数组，生成并保存所有的球

let balls = [];

while(balls.length < 25) {
  const size = random(10,20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-1, 7),
    random(-1, 7),
    randomColor(),
    size
  );
  balls.push(ball);
}


//运动循环,让小球动起来
function loop(){
  //将整个画布的颜色设置成半透明的黑色,以看到小球运动轨迹
  ctx.fillStyle = 'rgba(0,0,0,0.15)';
  //fillRect()（这四个参数分别是起始的坐标、绘制的矩形的宽和高）画出一个填充满整个画布的矩形
  //这是在下一个视图画出来时用来遮住之前的视图的
  ctx.fillRect(0,0,width,height);

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  //window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。
  requestAnimationFrame(loop);
}

loop();
// 定义碰撞检测函数





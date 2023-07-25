

/*
 * 2023年7月20日作业
 * 
 * 在当前代码的基础上，实现Game类。Game职责：
 * 1、管理目前放在全局作用域中的变量和函数；
 * 2、初始化游戏
 * 3、启动游戏
 * 
 * 示例：
 * var game = new Game();
 * game.init();
 * game.start();
 */

// 生成随机数的函数

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num
}

// 生成随机颜色
function randomColor() {
  const color = 'rgb(' +
    random(0, 255) + ',' +
    random(0, 255) + ',' +
    random(0, 255) + ')';
  return color;
}
class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x,
      this.y = y,
      //水平和竖直速度
      //宽为x的正轴，高为y的负轴
      this.velX = velX,
      this.velY = velY,
      this.color = color,
      //半径
      this.size = size
  }


  draw(ctx) {
    //声明开始
    ctx.beginPath()
    //fillStyle定义颜色
    ctx.fillStyle = this.color
    //arc()方法用来画一段狐，参数为圆心，半径，弧的范围（这里圆是0-2PI）
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI)
    //声明结束
    ctx.fill()
  }
  //边缘检测和更新
  update(width,height) {
    if (this.x + this.size >= width) {
      this.velX = -(this.velX)
    }
    if (this.x - this.size < 0) {
      this.velX = -(this.velX)
    }
    if (this.y + this.size >= height) {
      this.velY = -(this.velY)
    }
    if (this.y + this.size < 0) {
      this.velY = -(this.velY)
    }
    this.x = this.x + this.velX
    this.y = this.y + this.velY
  }
  //碰撞检测
  collisionDetect(balls) {
    for (let i = 0; i < balls.length; i++) {
      if (this !== balls[i]) {
        let dx = this.x - balls[i].x
        let dy = this.y - balls[i].y

        let distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < this.size + balls[i].size) {
          let color = randomColor()
          this.color = color
          balls[i].color = color
        }
      }
    }
  }



}

class Game {
  width = window.innerWidth;
  height = window.innerHeight;

  balls = []
  constructor() {
    const canvas = document.querySelector('canvas');
    this.ctx = canvas.getContext('2d');
    canvas.width = this.width
    canvas.height = this.height
  }
  init() {
    const size = random(10, 20)
    while (this.balls.length < 25) {
      let ball = new Ball(
        random(size, this.width - size),
        random(size, this.height - size),
        10,
        1,
        randomColor(),
        size
      )
      this.balls.push(ball)
    }
  }
  loop() {
    //清理画布
    //将整个画布的颜色设置成半透明的黑色,以看到小球运动轨迹
    this.ctx.fillStyle = 'rgba(0,0,0,0.15)';
    //fillRect()（这四个参数分别是起始的坐标、绘制的矩形的宽和高）画出一个填充满整个画布的矩形
    //这是在下一个视图画出来时用来遮住之前的视图的
    this.ctx.fillRect(0, 0, this.width, this.height);
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].draw(this.ctx)
      this.balls[i].update(this.width,this.height)
      this.balls[i].collisionDetect(this.balls)
    }
    requestAnimationFrame(() => this.loop())
  }
  start() {
    this.loop()
  }

}
var gameBegin = new Game()
gameBegin.init()
gameBegin.start()


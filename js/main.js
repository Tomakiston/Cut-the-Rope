const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Composite = Matter.Composite;
const Constraint = Matter.Constraint;

let engine;
let world;
let canvas;

let backgroundImg;
let supportImg;

//On Nom
let omNom = {};
let omNomFrames = [];
let currentFrame = 0;
let frameDelay = 15;

let pinImg;

let rope;
let ropes = [];

let candy;
let candyImg;
let candyCon;
let candyCons = [];

let starImg;
let starDisappearFrames = [];
let starDisappearFrameDelay = 5;
let star = [];
let starFilledImg;
let starEmptyImg;

let bubbleImg;
let bubbleActive = false;
let bubblePopped = false;

let blowerImg;
let blowerFrames = [];
let blowers = [];

let cuts = [];

let restartImg;
let pauseImg;
let playImg;
let nextImg;
let homeImg;
let menuBgImg;

let bgSoundImg;

let speakerImg;
let effectEnable = true;

const musicButton = {x:45,y:45, size:50};
const effectButton = {x:110,y:45, size:50};
const restartButton = {x:0,y:45, size:50};
const pauseButton = {x:0,y:45, size:50};

let restartEndButton;
let homeButton;
let nextButton;

let bgVictoryImg;

let btnMenuImg;
let btnTryAgainImg;

let finalMenuButton;
let finalRetryButton;

let currentLevel = 1;

let level1Img;
let level2Img;
let level3Img;
let levelBlockedImg;

let levels = [
    {
        id: 1,
        unlocked: true,
        img: null,
        x: 250,
        y: 350
    },
    {
        id: 2,
        unlocked: false,
        img: null,
        x: 510,
        y: 350
    },
    {
        id: 3,
        unlocked: false,
        img: null,
        x: 770,
        y: 350
    }
];

let gameMusic;
let breakSound;
let ropeSound;
let star1Sound;
let star3Sound;
let star2Sound;
let winSound;

let musicEnable = true;
let musicStarted = false;
let paused = false;

let gameState = "menu";
let score = 0;

function preload() {
    backgroundImg = loadImage("images/bg-box.jpeg");
    candyImg = loadImage("images/candy.png");
    supportImg = loadImage("images/support1.png");

    starImg = loadImage("images/star-cut-the-rope.png");
    starDisappearFrames.push(loadImage("images/obj_star_disappear_1.png"));
    starDisappearFrames.push(loadImage("images/obj_star_disappear_2.png"));
    starDisappearFrames.push(loadImage("images/obj_star_disappear_3.png"));
    starFilledImg = loadImage("images/estrela-preenchida-cut-the-rope.png");
    starEmptyImg = loadImage("images/estrela-vazada-cut-the-rope.png");

    omNomFrames.push(loadImage("images/om-nom1.png"));
    omNomFrames.push(loadImage("images/om-nom2.png"));
    omNomFrames.push(loadImage("images/om-nom2.png"));
    omNomFrames.push(loadImage("images/om-nom1.png"));
    omNomFrames.push(loadImage("images/om-nom3.png"));
    omNomFrames.push(loadImage("images/om-nom4.png"));
    omNomFrames.push(loadImage("images/om-nom4.png"));
    omNomFrames.push(loadImage("images/om-nom5.png"));
    omNomFrames.push(loadImage("images/om-nom4.png"));
    omNomFrames.push(loadImage("images/om-nom5.png"));
    omNomFrames.push(loadImage("images/om-nom6.png"));

    pinImg = loadImage("images/pino-parede.png");

    bgSoundImg = loadImage("images/bg-sound.png");
    speakerImg = loadImage("images/speaker.png");
    pauseImg = loadImage("images/pause.png");
    restartImg = loadImage("images/restart.png");
    playImg = loadImage("images/play.png");
    homeImg = loadImage("images/home.png");
    nextImg = loadImage("images/next.png");

    menuBgImg = loadImage("images/bg-lvl.png");
    level1Img = loadImage("images/lvl-1.png");
    level2Img = loadImage("images/lvl-2.png");
    level3Img = loadImage("images/lvl-3.png");
    levelBlockedImgImg = loadImage("images/lvl-blocked.png");

    bgVictoryImg = loadImage("images/bg-vitoria.png");
    btnMenuImg = loadImage("images/btn-menu.png");
    btnTryAgainImg = loadImage("images/btn-tentar-de-novo.png");

    blowerImg = loadImage("images/soprador1.png");
    blowerFrames.push(loadImage("images/soprador1.png"));
    blowerFrames.push(loadImage("images/soprador2.png"));
    blowerFrames.push(loadImage("images/soprador3.png"));
    blowerFrames.push(loadImage("images/soprador4.png"));
    blowerFrames.push(loadImage("images/soprador5.png"));
    blowerFrames.push(loadImage("images/soprador6.png"));

    bubbleImg = loadImage("images/bubble.png");

    gameMusic = loadSound("sound/game-music.mp3");
    breakSound = loadSound("sound/candy_break.wav");
    ropeSound = loadSound("sound/rope_get.wav");
    star1Sound = loadSound("sound/star_1.wav");
    star2Sound = loadSound("sound/star_2.wav");
    star3Sound = loadSound("sound/star_3.wav");
    winSound = loadSound("sound/win.wav");
}

function setup() {
    canvas = createCanvas(1028, 680);

    engine = Engine.create();
    world = engine.world;

    restartButton.x = width - 110;
    pauseButton.x = width - 45;

    levels[0].img = level1Img;
    levels[1].img = levelBlockedImg;
    levels[2].img = levelBlockedImg;

    restartEndButton = {x:width/2 - 80, y:430, size:70};
    homeButton = {x:width/2, y:430, size:70};
    nextButton = {x:width/2 + 80, y:430, size:70};

    finalMenuButton = {x:240, y:655, width:245, height:120};
    finalRetryButton = {x:795, y:655, width:245, height:120};
}

function draw() {
    background(255, 0, 0);

    imageMode(CORNER);
    image(backgroundImg, 0,0, width,height);

    if(!paused) {
        Engine.update(engine, deltaTime);
    }

    if(gameState === "menu") {
        drawMenu();
        return;
    }

    drawStars();
    drawPins();

    if(ground) {
        ground.display();
    }
    if(rope) {
        rope.display();
    }

    for(r of ropes) {
        r.display();
    }

    drawCuts();

    imageMode(CENTER);

    if(gameState = "playing") {
        if(currentLevel === 1) {
            drawOnNom();
        }
        else if(currentLevel === 2) {
            drawOnNom2();
        }
        else if(currentLevel === 3) {
            drawOnNom3();
        }
    }

    if(candy) {
        drawCandy();
    }

    checkStars();
    checkWin();
    checkLose();

    drawStarScore();
    drawGameState();

    if(candyCon && candyCon.link && candyCon.link.bodyA && candy) {
        stroke(255);
        line(candyCon.link.bodyA.position.x,candyCon.link.bodyA.position.y, candy.position.x,candy.position.y);
    }
    if(paused) {
        fill(0,180);
        rect(0,0, width,height);
        
        textAlign(CENTER);
        fill(255);
        textSize(60);
        text("Pausado", width/2, height/2);
        
        textSize(22);
        text("Clique no botão JOGAR para continuar.", width/2, height/2 + 50);
    }
}

function keyPressed() {
    if(key === "r" || key === "R") {
        restartLevel();
    }
}

function mousePressed() {
    if(gameState == "win" && currentLevel === 3) {
        if(mouseX > finalMenuButton.x - finalMenuButton.width/2 && mouseX < finalMenuButton.x + finalMenuButton.width/2 &&
           mouseY > finalMenuButton.y - finalMenuButton.height/2 && mouseY < finalMenuButton.y + finalMenuButton.height/2) {
            clearLevel();
            currentLevel = 1;
            gameState = "menu";

            return;
        }

        if(mouseX > finalRetryButton.x - finalRetryButton.width/2 && mouseX < finalRetryButton.x + finalRetryButton.width/2 &&
           mouseY > finalRetryButton.y - finalRetryButton.height/2 && mouseY < finalRetryButton.y + finalRetryButton.height/2) {
            restartLevel();

            return;
        }
    }
}

function mouseDragged() {
    if(paused) return;
    if(gameState !== "playing") return;

    let allRopes = [];

    if(rope) {
        allRopes.push(rope);
    }

    for(let r of ropes) {
        allRopes.push(r);
    }

    for(let r of allRopes) {
        for(let body of r.body.bodies) {
            let d = dist(mouseX,mouseY, body.position.x,body.position.y);
            if(d < 20) {
                playEffect(ropeSound);

                cuts.push({
                    x1: pmouseX,
                    y1: pmouseY,
                    x2: mouseX,
                    y2: mouseY,
                    life: 12
                });

                r.break();

                if(r == rope) {
                    if(candyCon) {
                        candyCon.detach();
                        candyCon = null;
                    }

                    Composite.remove(world, r.body);
                    rope = null;
                } else {
                    let index = ropes.indexOf(r);

                    if(index !== -1) {
                        if(candyCons[index]) {
                            candyCons[index].detach();
                            candyCons.splice(index, 1);
                        }

                        Composite.remove(world, r.body);
                        ropes.splice(index, 1);
                    }
                }

                return;
            }
        }
    }
}

function drawMenu() {
    imageMode(CORNER);
    image(menuBgImg, 0,0, width,height);

    imageMode(CENTER);
    for(let level of levels) {
        image(level.img, level.x, level.y, 180,180);
    }
}

function drawPins() {
    imageMode(CENTER);

    for(let pin of pins) {
        image(pinImg, pin.x,pin.y, pin.size,pin.size);
    }
}

function drawCandy() {
    imageMode(CENTER);
    image(candyImg, candy.position.x,candy.position.y, 50,50);
}

function checkWin() {
    if(!candy) return;

    let d = dist(candy.position.x,candy.position.y, omNom.x,omNom.y);
    if(d < 80) {
        playEffect(winSound);

        gameState = "win";
        World.remove(world, candy);
        candy = null;
    }
}

function checkLose() {
    if(!candy) return;

    if(candy.position.y > height + 50 || candy.position.x < -100 || candy.position.x > width + 100) {
        playEffect(breakSound);

        gameState = "lose";
        World.remove(world, candy);
        candy = null;
    }
}

function drawGameState() {
    if(gameState === "playing") return;

    imageMode(CORNER);
    image(backgroundImg, 0,0, width,height);
    fill(0,0,0,150);
    rect(0,0, width,height);
    imageMode(CENTER);

    const starSize = 60;
    const spacing = 70;

    let startX = width/2 - spacing;

    for(let i = 0; i < 3; i++) {
        let img = (i < score) ? starFilledImg : starEmptyImg;
        image(img, starX + i * spacing,170, starSize,starSize);
    }

    textAlign(CENTER);
    textSize(40);
    fill(255);
    if(gameState == "win") {
        text("Você ganhou!", width/2,290);
    }
    if(gameState == "lose") {
        text("Você perdeu!", width/2,290);
    }

    drawEndButtons();
}

function drawStars() {
    imageMode(CENTER);

    for(let star of stars) {
        if(star.disappearing) {
            let frame = floor(star.disappearFrame / starDisappearFrameDelay);
            if(frame < starDisappearFrames.length) {
                image(starDisappearFrames[frame], star.x,star.y, 80,80);
                star.disappearFrame++;
            } else {
                star.disappearing = false;
            }

            continue;
        }

        push();
        translate(star.x, star.y);

        let scaleX = abs(cos(star.angle));
        scale(scaleX, 1);

        image(starImg, 0,0, 40,40);
        pop();

        star.angle += 0.05;
    }
}

function checkStars() {
    if(!candy) return;

    for(let star of stars) {
        if(star.disappearing) continue;
        if(star.collected) continue;

        let d = dist(candy.position.x,candy.position.y, star.x,star.y)
        if(d < 40) {
            star.collected = true;
            star.disappearing = true;
            star.disappearFrame = 0;
            score++;

            switch(score) {
                case 1:
                    playEffect(star1Sound); 
                    break;

                case 2: 
                    playEffect(star2Sound);
                    break;

                case 3:
                    playEffect(star3Sound); 
                    break;
            }
        }
    } 
}

function drawAudioButtons() {
    imageMode(CENTER);

    if(musicEnable) {
        if(dist(mouseX,mouseY, musicButton.x,musicButton.y) < 25) {
            tint(255, 255);
        } else {
            tint(255, 170);
        }
    } else {
        tint(120, 120);
    }
    image(bgSoundImg, musicButton.x,musicButton.y, musicButton.size,musicButton.size);
    noTint();

    if(effectEnable) {
        if(dist(mouseX,mouseY, effectButton.x,effectButton.y) < 25) {
            tint(255, 255);
        } else {
            tint(255, 170);
        }
    } else {
        tint(120, 120);
    }
    image(speakerImg, effectButton.x,effectButton.y, effectButton.size,effectButton.size);
    noTint();

    if(restartButton) {
        tint(255);
    } else {
        tint(255, 170);
    }
    image(restartImg, restartButton.x,restartButton.y, restartButton.size,restartButton.size);
    noTint();

    if(dist(mouseX,mouseY, pauseButton.x,pauseButton.y) < 25) {
        tint(255);
    } else {
        tint(255, 170);
    }

    if(paused) {
        image(playImg, pauseButton.x,pauseButton.y, pauseButton.size,pauseButton.size);
    } else {
        image(pauseImg, pauseButton.x,pauseButton.y, pauseButton.size,pauseButton.size);
    }
    noTint();
    strokeWeight(3);
    stroke(220,40,40);

    const r = 15;

    if(!effectEnable) {
        line(effectButton.x - r,effectButton.y - r, effectButton.x + r,effectButton.y + r);
        line(effectButton.x + r,effectButton.y - r, effectButton.x - r,effectButton.y + r);
    }
    if(!musicEnable) {
        line(musicButton.x - r,musicButton.y - r, musicButton.x + r,musicButton.y + r);
        line(musicButton.x + r,musicButton.y - r, musicButton.x - r,musicButton.y + r);
    }
    noStroke();
}

function restartLevel() {
    if(candy) {
        World.remove(world, candy);
        candy = null;
    }
    if(candyCon) {
        candyCon.detach();
        candyCon = null;
    }
    for(let con of candyCons) {
        if(con) {
            con.detach();
        }
    }
    candyCons = [];

    if(rope && rope.body) {
        Composite.remove(world, rope.body);
        rope = null;
    }
    for(let r of ropes) {
        if(r && r.body) {
            Composite.remove(world, r.body);
        }
    }
    ropes = [];

    if(ground && ground.body) {
        World.remove(world, ground.body);
        ground = null;
    }

    stars = [];
    score = 0;
    gameState = "playing";

    loadCurrentLevel();
}
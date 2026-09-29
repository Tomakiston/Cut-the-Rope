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
    starDissapearFrames.push(loadImage("images/obj_star_disappear_1"));
    starDissapearFrames.push(loadImage("images/obj_star_disappear_2"));
    starDissapearFrames.push(loadImage("images/obj_star_disappear_3"));
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
}

function setup() {
    canvas = createCanvas(1028, 680);

    engine = Engine.create();
    engine.positionIterations = 12;
    engine.velocityIterations = 10;
    engine.constraintIterations = 8;
    world = engine.world;

    loadLevel1();
}

function draw() {
    background(255, 0, 0);

    imageMode(CORNER);
    image(backgroundImg, 0,0, width,height);
    Engine.update(engine);

    rope.display();
    drawPins();
    drawCandy();

    drawOmNom();
}

function mousePressed() {
    
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
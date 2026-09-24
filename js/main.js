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

function preload() {
    backgroundImg = loadImage("images/bg-box.jpeg");
    candyImg = loadImage("images/candy.png");
    supportImg = loadImage("images/support1.png");

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

    drawOmNom();
    
}

function mousePressed() {
    
}
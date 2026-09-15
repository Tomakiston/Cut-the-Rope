const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;

let engine;
let world;
let canvas;

function preload() {

}

function setup() {
    canvas = createCanvas(1027, 768);

    engine = Engine.create();
    world = engine.world;
}

function draw() {
    background(255, 0, 0);
}
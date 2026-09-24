let pins = [];

function drawOmNom() {
    omNom = {x:514, y:570, size:160};

    if(frameCount % frameDelay === 0) {
        currentFrame++;

        if(currentFrame >= omNomFrames.length) {
            currentFrame = 0;
        }
    }

    imageMode(CENTER);
    image(supportImg, 514,620, 160,160);

    image(omNomFrames[currentFrame], omNom.x,omNom.y, omNom.size,omNom.size);
}

function loadLevel1() {
    score = 0;
    pins = [];

    rope = new Rope(5, {x: width/2, y: 60});

    pins.push({
        x: width / 2,
        y: 70,
        size: 40
    });

    ground = new Ground(width / 2,height + 500, width,20);

    candy = Bodies.circle(width / 2, 320, 25, {
        density: 0.0002,
        restitution: 1,
        friction: 0.2,
        frictionAir: 0.01
    });
    World.add(world, candy);

    candyCon = new Link(rope, candy);
}
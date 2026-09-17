class Ground {
    constructor(x,y, width,height) {
        let properties = {
            isStatic: true
        }

        this.body = Bodies.rectangle(x,y, width,height, properties);
        this.width = width;
        this.height = height;
        World.add(world, this.body);
    }

    display() {
        let pos = this.body.position;

        push();
        rectMode(CENTER);
        fill(0,0);
        noStroke();
        rect(pos.x,pos.y, this.width,this.height);
        pop();
    }
}
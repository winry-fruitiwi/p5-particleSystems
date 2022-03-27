class Particle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = p5.Vector.random2D()
        this.acc = new p5.Vector() // equivalent to p5.Vector(0, 0)

        // particle radius
        this.r = 3
    }


    // modifies the particle's position, velocity, and acceleration
    update() {
        this.pos.add(this.vel)
        this.vel.add(this.acc)
        // the same as this.acc = new p5.Vector()
        this.acc.mult(0)
    }


    // displays the particle as a white dot
    show() {
        fill(0, 0, 100, 80)
        noStroke()

        circle(this.pos.x, this.pos.y, this.r * 2)
    }


    // applies a p5.Vector force to the particle using Newton's Second Law
    applyForce(force) {
        // we're assuming that mass is 1, so the equation goes from f = mass
        // * acc to f = acc
        this.acc.add(force)
    }


    // teleports particle to other edge if it hits an edge
    edges() {
        // if the particle hits the left edge, teleport it to the right
        if (this.pos.x < 0) {
            this.pos.x = width
        }

        // if the particle hits the right edge, teleport it to the left
        if (this.pos.x > width) {
            this.pos.x = 0
        }

        // if the particle hits the top edge, teleport it to the bottom
        if (this.pos.y < 0) {
            this.pos.y = height
        }

        // if the particle hits the bottom edge, teleport it to the top
        if (this.pos.y > height) {
            this.pos.y = 0
        }
    }
}

class Particle {
    constructor(x, y) {
        this.pos = new p5.Vector(x, y)
        this.vel = p5.Vector.random2D()
        this.acc = new p5.Vector() // equivalent to p5.Vector(0, 0)

        // particle radius. I added randomization just to make it look nice.
        this.r = random(3, 6)

        // particle color
        this.hue = random(360)

        // how much longer the particle has to live
        this.lifetime = 100
    }


    // modifies the particle's position, velocity, and acceleration
    update() {
        // when we update, we also update the lifetime.
        this.lifetime -= random(0.1, 2)

        this.pos.add(this.vel)
        this.vel.add(this.acc)
        // the same as this.acc = new p5.Vector()
        this.acc.mult(0)
    }


    // displays the particle as a white dot
    show() {
        fill(this.hue, 80, 90, this.lifetime)

        noStroke()

        if (this.isFinished()) {
            strokeWeight(1)
            stroke(random(360), 100, 100)
            // fill(0, 0, 100)
            // print("lifetime ran out")
            // return
        }

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

    isFinished() {
        return this.lifetime <= 0
    }
}

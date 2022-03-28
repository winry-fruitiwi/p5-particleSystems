/**
 *  @author
 *  @date 2022.03.27
 *
 *
 */
let font
let instructions
let particles


function preload() {
    font = loadFont('data/consola.ttf')
}


function setup() {
    let cnv = createCanvas(600, 300)
    cnv.parent('#canvas')
    colorMode(HSB, 360, 100, 100, 100)
    textFont(font, 14)

    particles = []

    strokeWeight(2)

    for (let i = 0; i < 1; i++) {
        particles.push(new Particle(random(width), random(height)))
    }

    /* initialize instruction div */
    instructions = select('#ins')
    instructions.html(`<pre>
        [1,2,3,4,5] → no function
        z → freeze sketch</pre>`)
}


function draw() {
    background(234, 34, 24)

    particles.push(new Particle(random(width), random(height)))
    particles.push(new Particle(random(width), random(height)))

    // let gravity = new p5.Vector(0, 0.001)

    for (let i = particles.length - 1; i > 0; i--) {
        let particle = particles[i]

        particle.update()
        particle.edges()
        particle.show()
        // particle.applyForce(gravity)

        if (particle.isFinished()) {
            particles.splice(i, 1)
        }
    }

    displayDebugCorner()
}


/** 🧹 shows debugging info using text() 🧹 */
function displayDebugCorner() {
    const LEFT_MARGIN = 10
    const DEBUG_Y_OFFSET = height - 10 /* floor of debug corner */
    const LINE_SPACING = 2
    const LINE_HEIGHT = textAscent() + textDescent() + LINE_SPACING
    fill(0, 0, 100, 100) /* white */
    strokeWeight(0)

    text(`frameCount: ${frameCount}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET - LINE_HEIGHT)
    text(`frameRate: ${frameRate().toFixed(1)}`,
        LEFT_MARGIN, DEBUG_Y_OFFSET)
}


function keyPressed() {
    /* stop sketch */
    if (key === 'z') {
        noLoop()
        instructions.html(`<pre>
            sketch stopped</pre>`)
    }
}
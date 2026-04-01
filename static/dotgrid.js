const canvas = document.getElementById("dotCanvas");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

let mouse = { x: width / 2, y: height / 2 };

window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const spacing = 40;
const dots = [];

for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
        dots.push({ x, y, baseX: x, baseY: y });
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    dots.forEach(dot => {
        let dx = mouse.x - dot.x;
        let dy = mouse.y - dot.y;
        let dist = Math.sqrt(dx * dx + dy * dy);

        let force = Math.max(0, 120 - dist);

        let angle = Math.atan2(dy, dx);

        dot.x = dot.baseX - Math.cos(angle) * force * 0.3;
        dot.y = dot.baseY - Math.sin(angle) * force * 0.3;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 200, 255, ${1 - dist/150})`;
        ctx.fill();
    });

    requestAnimationFrame(draw);
}

draw();
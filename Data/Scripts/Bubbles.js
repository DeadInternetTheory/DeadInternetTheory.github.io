const NUM_NODES = 30;
const MAX_DISTANCE = 200;
const NODE_SIZE = 50;

const canvas = document.getElementById('lineCanvas');
const ctx = canvas.getContext('2d');
const nodes = [];

const imageList = [
    'Data/Images/BubbleIcons/bluesky.png',
    'Data/Images/BubbleIcons/facebook.png',
    'Data/Images/BubbleIcons/github.png',
    'Data/Images/BubbleIcons/hub.png',
    'Data/Images/BubbleIcons/instagram.png',
    'Data/Images/BubbleIcons/reddit.png',
    'Data/Images/BubbleIcons/snapchat.png',
    'Data/Images/BubbleIcons/tiktok.png',
    'Data/Images/BubbleIcons/twitch.png',
    'Data/Images/BubbleIcons/twitter.png',
    'Data/Images/BubbleIcons/wechat.png',
    'Data/Images/BubbleIcons/youtube.png',
];

function createNode(index) {
    const div = document.createElement('div');
    if (index < imageList.length) {
        div.style.backgroundImage = `url('${imageList[index]}')`;
    }
    div.className = 'bubble';

    const x = Math.random() * (window.innerWidth - NODE_SIZE);
    const y = Math.random() * (window.innerHeight - NODE_SIZE);
    const vx = (Math.random() - 0.5) * 1.5;
    const vy = (Math.random() - 0.5) * 1.5;

    document.body.appendChild(div);

    return {
        x, y,
        vx, vy,
        el: div,
    };
}

function updateNodes() {
    for (const node of nodes) {
        // Bounce off edges
        if (node.x <= 0 || node.x >= window.innerWidth - NODE_SIZE) node.vx *= -1;
        if (node.y <= 0 || node.y >= window.innerHeight - NODE_SIZE) node.vy *= -1;

        node.x += node.vx;
        node.y += node.vy;

        // Use transform instead of top/left for better performance
        node.el.style.transform = `translate(${node.x}px, ${node.y}px)`;
    }
}

function drawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = nodes[i].x - nodes[j].x;
            const dy = nodes[i].y - nodes[j].y;
            const distSq = dx * dx + dy * dy;

            if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
                const factor = 1 - Math.sqrt(distSq) / MAX_DISTANCE;
                ctx.beginPath();
                ctx.lineWidth = factor * 4;
                ctx.lineCap = "round";
                ctx.moveTo(nodes[i].x + NODE_SIZE / 2, nodes[i].y + NODE_SIZE / 2);
                ctx.lineTo(nodes[j].x + NODE_SIZE / 2, nodes[j].y + NODE_SIZE / 2);
                ctx.strokeStyle = `rgba(255,255,255,${factor})`;
                ctx.stroke();
            }
        }
    }
}

function animate() {
    updateNodes();
    drawConnections();
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

window.onload = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize nodes
    for (let i = 0; i < NUM_NODES; i++) {
        nodes.push(createNode(i));
    }

    animate();
};
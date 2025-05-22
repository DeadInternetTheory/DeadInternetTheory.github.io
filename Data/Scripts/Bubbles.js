const NUM_NODES = 40;
const NUM_NODES_BACK = 50;
const MAX_DISTANCE = 200;
const NODE_SIZE = 50;

const canvas = document.getElementById('lineCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const nodes = [];
const nodesBack = [];

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

function createNodeElement(className, size, image = '') {
    const div = document.createElement('div');
    div.className = className;

    if (image) div.style.backgroundImage = `url('${image}')`;

    div.style.width = `${size}px`;
    div.style.height = `${size}px`;
    div.style.opacity = className === 'bubbleBack' ? size / 30 : 1;

    document.body.appendChild(div);
    return div;
}

function createNodeData(speedFactor = 1.5, image = '', isBackground = false) {
    const size = isBackground ? (Math.random() * 20 + 10) : NODE_SIZE;
    const x = Math.random() * (window.innerWidth - size);
    const y = Math.random() * (window.innerHeight - size);
    const vx = (Math.random() - 0.5) * speedFactor;
    const vy = (Math.random() - 0.5) * speedFactor;
    const className = isBackground ? 'bubbleBack' : 'bubble';

    return {
        x, y, vx, vy,
        size,
        el: createNodeElement(className, size, image)
    };
}

function updateNode(node) {
    if (node.x <= 0 || node.x >= window.innerWidth - node.size) node.vx *= -1;
    if (node.y <= 0 || node.y >= window.innerHeight - node.size) node.vy *= -1;

    node.x += node.vx;
    node.y += node.vy;

    node.el.style.transform = `translate(${node.x}px, ${node.y}px)`;
}

function updateNodes() {
    [...nodes, ...nodesBack].forEach(updateNode);
}

function drawConnections() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
            const nodeB = nodes[j];
            const dx = nodeA.x - nodeB.x;
            const dy = nodeA.y - nodeB.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
                const factor = 1 - Math.sqrt(distSq) / MAX_DISTANCE;
                ctx.beginPath();
                ctx.lineWidth = factor * 4;
                ctx.lineCap = "round";
                ctx.moveTo(nodeA.x + NODE_SIZE / 2, nodeA.y + NODE_SIZE / 2);
                ctx.lineTo(nodeB.x + NODE_SIZE / 2, nodeB.y + NODE_SIZE / 2);
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
    for (let i = 0; i < NUM_NODES_BACK; i++) {
        nodesBack.push(createNodeData(0.75, '', true));
    }
    for (let i = 0; i < NUM_NODES; i++) {
        nodes.push(createNodeData(1.5, imageList[i] || ''));
    }

    animate();
};

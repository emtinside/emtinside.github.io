const revealElements = document.querySelectorAll('.reveal');
const threshold = 100;

// Custom Cursor Glow Effect
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';

    let isNearReveal = false;

    revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        // Clamp mouse position to the nearest point on the element's bounding box
        const nearestX = Math.max(rect.left, Math.min(mouseX, rect.right));
        const nearestY = Math.max(rect.top, Math.min(mouseY, rect.bottom));

        const distance = Math.sqrt(
            Math.pow(mouseX - nearestX, 2) +
            Math.pow(mouseY - nearestY, 2)
        );

        if (distance < threshold) {
            isNearReveal = true;
            const section = element.closest('.content-section');
            if (section) {
                section.querySelectorAll('.reveal').forEach(el => el.classList.add('appear'));
            }
        }
    });
    if (isNearReveal) {
        cursorGlow.classList.add('near-reveal');
    } else {
        cursorGlow.classList.remove('near-reveal');
    }
});

// Hide/show glow when mouse leaves or enters window
document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
});

// Dynamic Gradient Background based on Scroll Position
function updateGradient() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

    const creamColor = [232, 220, 200];
    const pinkColor = [232, 197, 197];

    const r = Math.round(creamColor[0] + (pinkColor[0] - creamColor[0]) * scrollPercentage);
    const g = Math.round(creamColor[1] + (pinkColor[1] - creamColor[1]) * scrollPercentage);
    const b = Math.round(creamColor[2] + (pinkColor[2] - creamColor[2]) * scrollPercentage);

    document.documentElement.style.backgroundImage =
        `linear-gradient(to bottom, #e8ddc9 0%, rgb(${r}, ${g}, ${b}) 100%)`;
}

window.addEventListener('scroll', updateGradient);
updateGradient();

// Randomize Bokeh Elements
function randomizeBokeh(updateDelay = true) {
    const bokehElements = document.querySelectorAll('.bokeh');

    bokehElements.forEach((bokeh) => {
        const size = Math.random() * 200 + 50;
        const top = Math.random() * 50;
        const left = Math.random() * 80;

        bokeh.style.width = size + 'px';
        bokeh.style.height = size + 'px';
        bokeh.style.top = top + '%';
        bokeh.style.left = left + '%';

        if (updateDelay) {
            const delay = Math.random() * 12;
            bokeh.style.animationDelay = delay + 's';
        }
    });
}

window.addEventListener('load', () => randomizeBokeh(true));
setInterval(() => randomizeBokeh(false), 21000);
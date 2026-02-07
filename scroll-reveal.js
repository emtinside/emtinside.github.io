// Hover-to-Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

revealElements.forEach((element) => {
    element.addEventListener('mouseenter', () => {
        // Find the closest parent section (hero or content-section)
        const section = element.closest('.content-section');
        
        if (section) {
            // Reveal all .reveal elements within this section
            const revealInSection = section.querySelectorAll('.reveal');
            revealInSection.forEach((el) => {
                el.classList.add('appear');
            });
        }
    });
});

// Custom Cursor Glow Effect
const cursorGlow = document.createElement('div');
cursorGlow.classList.add('cursor-glow');
document.body.appendChild(cursorGlow);

let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Move the glow to cursor position
    cursorGlow.style.left = mouseX + 'px';
    cursorGlow.style.top = mouseY + 'px';
    
    // Check proximity to .reveal elements
    let isNearReveal = false;
    const threshold = 250; // Distance in pixels
    
    revealElements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        const distance = Math.sqrt(
            Math.pow(mouseX - elementCenterX, 2) + 
            Math.pow(mouseY - elementCenterY, 2)
        );
        
        if (distance < threshold) {
            isNearReveal = true;
        }
    });
    
    // Update glow color based on proximity
    if (isNearReveal) {
        cursorGlow.classList.add('near-reveal');
    } else {
        cursorGlow.classList.remove('near-reveal');
    }
});

// Hide glow when mouse leaves window
document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
});


// Dynamic Gradient Background based on Scroll Position
function updateGradient() {
    // Calculate scroll percentage (0 to 1)
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
    
    // Cream to Green gradient colors
    const creamColor = [232, 220, 200]; // #e8ddc9
    const pinkColor = [232, 197, 197];  // rgb(232, 197, 197)
    
    // Interpolate between cream and pink
    const r = Math.round(creamColor[0] + (pinkColor[0] - creamColor[0]) * scrollPercentage);
    const g = Math.round(creamColor[1] + (pinkColor[1] - creamColor[1]) * scrollPercentage);
    const b = Math.round(creamColor[2] + (pinkColor[2] - creamColor[2]) * scrollPercentage);
    
    // Update the HTML background with the interpolated color
    document.documentElement.style.backgroundImage = 
        `linear-gradient(to bottom, #e8ddc9 0%, rgb(${r}, ${g}, ${b}) 100%)`;
}

// Update gradient on scroll
window.addEventListener('scroll', updateGradient);


// Initial update
updateGradient();

// Randomize Bokeh Elements
function randomizeBokeh(updateDelay = true) {
    const bokehElements = document.querySelectorAll('.bokeh');
    
    bokehElements.forEach((bokeh) => {
        // Random size
        const size = Math.random() * 200 + 50;
        
        // Random position within viewport
        const top = Math.random() * 50; // 0-50% from top
        const left = Math.random() * 80; // 0-80% from left
        
        // Apply random styles
        bokeh.style.width = size + 'px';
        bokeh.style.height = size + 'px';
        bokeh.style.top = top + '%';
        bokeh.style.left = left + '%';
        
        // Only set animation delay on initial load to avoid disrupting the animation
        if (updateDelay) {
            const delay = Math.random() * 12;
            bokeh.style.animationDelay = delay + 's';
        }
    });
}

// Initialize bokeh on page load with random delays
window.addEventListener('load', () => randomizeBokeh(true));

// Reposition bokeh every 15 seconds (matching the animation duration) without changing delays
setInterval(() => randomizeBokeh(false), 21000);

// Initial update
updateGradient();

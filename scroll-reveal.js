// Scroll-to-Reveal Animation using Intersection Observer API
const revealElements = document.querySelectorAll('.reveal');

const observerOptions = {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger 50px before element is fully in view
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Add a small delay based on element position for staggered effect
            const delay = Array.from(revealElements).indexOf(entry.target) * 100;
            setTimeout(() => {
                entry.target.classList.add('appear');
            }, delay);
        } else {
            // Remove the appear class when scrolling past the element
            entry.target.classList.remove('appear');
        }
    });
}, observerOptions);

// Observe all elements with the .reveal class
revealElements.forEach((element) => {
    observer.observe(element);
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

/****************************************************
 * 1. SCROLL REVEAL SYSTEM
 *    - Adds "visible" class when elements enter viewport
 *    - Uses IntersectionObserver for performance
 ****************************************************/
function reveal() {
  const items = document.querySelectorAll(".reveal");

  // Safety check (prevents errors if no elements exist)
  if (!items.length) return;

  /****************************************************
   * 2. OBSERVER CONFIGURATION
   ****************************************************/
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");

          // Stop observing once revealed (performance optimization)
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  /****************************************************
   * 3. ATTACH OBSERVER TO ELEMENTS
   ****************************************************/
  items.forEach(el => observer.observe(el));
}

/****************************************************
 * 4. WINDOW INITIALIZATION (SAFE BOOT)
 ****************************************************/
document.addEventListener("DOMContentLoaded", () => {
  reveal();
});
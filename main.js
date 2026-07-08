document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const parallaxElements = document.querySelectorAll('.parallax');
  const manifesto = document.getElementById('manifestoText');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking = false;

  function onScroll() {
    const y = window.scrollY;

    // Header scroll state management
    if (header) {
      if (y > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Smooth Parallax Effect
    if (!reduceMotion && parallaxElements.length > 0) {
      const windowHeight = window.innerHeight;

      parallaxElements.forEach(el => {
        const parent = el.parentElement;
        if (!parent) return;

        const rect = parent.getBoundingClientRect();

        // Animate only if the parent container is visible within the viewport
        if (rect.top <= windowHeight && rect.bottom >= 0) {
          const speed = parseFloat(el.getAttribute('data-speed')) || 0.15;
          
          // Calculate displacement relative to the viewport center
          const yPos = (rect.top - windowHeight / 2) * speed;
          
          // Apply transforms appropriately
          if (el.classList.contains('parallax-bg') || el.tagName.toLowerCase() === 'img') {
            el.style.transform = `translateY(${yPos}px) scale(1.15)`;
          } else {
            el.style.transform = `translateY(${yPos}px)`;
          }
        }
      });
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  });

  // Execute once on load to set initial positions
  onScroll();

  // Manifesto Text Intersection Observer (Inicio)
  if (manifesto) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          manifesto.classList.add('visible');
        }
      });
    }, { threshold: 0.3 });
    observer.observe(manifesto);
  }

  // Dynamic Portfolio Category Filters (Proyectos)
  const buttons = document.querySelectorAll('#filters button');
  const tiles = document.querySelectorAll('#mosaic figure');
  const rows = document.querySelectorAll('.index-row');

  if (buttons.length > 0) {
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-cat');

        tiles.forEach(t => {
          const show = cat === 'todos' || t.getAttribute('data-cat') === cat;
          t.style.display = show ? '' : 'none';
        });
        rows.forEach(r => {
          const show = cat === 'todos' || r.getAttribute('data-cat') === cat;
          r.style.display = show ? '' : 'none';
        });
      });
    });
  }
});

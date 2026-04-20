const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section, header");
const reveals = document.querySelectorAll(".reveal");
const skillBars = document.querySelectorAll(".bar");
const tiltCards = document.querySelectorAll(".tilt-card");
const parallaxNodes = document.querySelectorAll("[data-parallax]");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
  });
});

const updateActiveNav = () => {
  let current = "home";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
};

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((el) => revealObserver.observe(el));

const skillsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          const width = bar.dataset.width || 0;
          bar.style.width = `${width}%`;
        });
      }
    });
  },
  { threshold: 0.35 }
);

const aboutSection = document.querySelector("#about");
if (aboutSection) {
  skillsObserver.observe(aboutSection);
}

const supportsFinePointer = window.matchMedia("(pointer: fine)").matches;

if (supportsFinePointer) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const rotateY = ((event.clientX - centerX) / rect.width) * 14;
      const rotateX = ((centerY - event.clientY) / rect.height) * 14;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
      card.style.transition = "transform 0.35s ease";
      window.setTimeout(() => {
        card.style.transition = "";
      }, 350);
    });
  });

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY;
    parallaxNodes.forEach((node) => {
      const speed = Number(node.getAttribute("data-parallax")) || 0;
      node.style.transform = `translate3d(0, ${scrolled * speed}px, 0)`;
    });
  });
}

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

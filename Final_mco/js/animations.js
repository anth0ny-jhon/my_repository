(() => {
  const initArcadeAnimations = () => {
    // Inject arcade keyframe & hover styling without touching existing CSS files
    const style = document.createElement("style");
    style.id = "arcade-animations-style";
    style.textContent = `
      @keyframes arcadeFloat {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-6px);
        }
      }

      @keyframes arcadePulse {
        0%, 100% {
          box-shadow: 0 0 0 0 rgba(255, 217, 0, 0.66), 0 6px 16px rgba(0, 0, 0, 0.35);
        }
        50% {
          box-shadow: 0 0 14px 3px rgba(255, 217, 0, 0.74), 0 8px 20px rgba(0, 0, 0, 0.45);
        }
      }

      @keyframes arcadeSnap {
        0% {
          transform: translateY(0) scale(1);
        }
        40% {
          transform: translateY(-4px) scale(1.06);
        }
        100% {
          transform: translateY(-3px) scale(1.04);
        }
      }

      /* Navigation & Menu Links */
      .arcade-nav-target {
        display: inline-block;
        transition: transform 0.14s steps(3, end), color 0.14s ease, text-shadow 0.14s ease;
        will-change: transform;
      }

      .arcade-nav-target:hover,
      .arcade-nav-target:focus-visible {
        animation: arcadeSnap 0.24s steps(3, end) forwards;
        color: #ffe600 !important;
        text-shadow: 2px 2px 0px #ff1e27, -1px -1px 0px #0022ff;
      }

      /* Buttons (.get and .add-to-cart-btn) */
      .arcade-btn-target {
        transition: transform 0.12s steps(3, end), filter 0.12s ease, box-shadow 0.12s ease;
        will-change: transform;
      }

      .arcade-btn-target:hover,
      .arcade-btn-target:focus-visible {
        transform: translateY(-3px) scale(1.04);
        filter: brightness(1.12);
        box-shadow: 0 0 14px rgba(255, 0, 0, 0.83), 0 6px 14px rgba(0, 0, 0, 0.4) !important;
      }

      .arcade-btn-target:active,
      .arcade-btn-pressed {
        transform: translateY(2px) scale(0.96) !important;
        filter: brightness(0.92);
      }

      /* Highlights (.box) & Product Cards (.product-card) */
      .arcade-highlight-target {
        transition: transform 0.16s steps(4, end), box-shadow 0.16s ease, border-color 0.16s ease;
        will-change: transform;
      }

      .arcade-highlight-target:hover {
        transform: translateY(-6px) scale(1.015);
        box-shadow: 0 10px 24px rgba(0, 34, 255, 0.71), 0 0 12px rgba(255, 30, 39, 0.35) !important;
      }

      /* Gentle continuous float for Characters, Voice Actor cards (.content-card), and Images */
      .arcade-float-card {
        animation: arcadeFloat 3.4s ease-in-out infinite;
        transition: transform 0.16s steps(4, end), box-shadow 0.16s ease;
        will-change: transform;
      }

      .arcade-float-card:hover {
        animation-play-state: paused;
        transform: translateY(-9px) scale(1.015);
        box-shadow: 0 14px 28px rgba(0, 34, 255, 0.71), 0 0 14px rgba(255, 230, 0, 0.55) !important;
      }

      .arcade-float-img {
        animation: arcadeFloat 2.8s ease-in-out infinite;
        transition: transform 0.15s steps(3, end);
        will-change: transform;
      }

      .arcade-float-img:hover {
        animation-play-state: paused;
        transform: translateY(-4px) scale(1.05);
      }
    `;
    document.head.appendChild(style);

    // 1. Navigation links (.nav-list a and .nav-menu a)
    const navLinks = document.querySelectorAll(".nav-list a, .nav-menu a");
    navLinks.forEach((link, idx) => {
      link.classList.add("arcade-nav-target");
      link.style.animationDelay = `${(idx % 5) * 0.04}s`;
    });

    // 2. Buttons (.get and .add-to-cart-btn)
    const buttons = document.querySelectorAll(".get, .add-to-cart-btn");
    buttons.forEach((btn) => {
      btn.classList.add("arcade-btn-target");

      btn.addEventListener("pointerdown", () => {
        btn.classList.add("arcade-btn-pressed");
      });

      const releasePress = () => {
        btn.classList.remove("arcade-btn-pressed");
      };

      btn.addEventListener("pointerup", releasePress);
      btn.addEventListener("pointerleave", releasePress);
      btn.addEventListener("pointercancel", releasePress);
    });

    // 3. Highlights (.box) and Product Cards (.product-card)
    const highlightBoxes = document.querySelectorAll(".box, .product-card");
    highlightBoxes.forEach((el) => {
      el.classList.add("arcade-highlight-target");
    });

    // 4. Characters & Voice Actors (.content-card and character cards in character.html)
    const characterCards = document.querySelectorAll(
      [
        ".content-card",
        ".sonic-card",
        ".tails-card",
        ".knuckles-card",
        ".sara-card",
        ".oldman-card",
        ".pres-card",
        ".presaide-card",
        ".egg-card",
        ".metal-card"
      ].join(", ")
    );

    characterCards.forEach((card, idx) => {
      card.classList.add("arcade-float-card");
      card.style.animationDelay = `${(idx % 6) * 0.35}s`;
    });

    // 5. Subtle float on character & voice actor images inside those cards
    const characterImages = document.querySelectorAll(
      [
        ".content-card .image-row img",
        ".sonic-img",
        ".tails-img",
        ".knuckles-img",
        ".sara-img",
        ".oldman-img",
        ".pres-img",
        ".presaide-img",
        ".egg-img",
        ".metal-img"
      ].join(", ")
    );

    characterImages.forEach((img, idx) => {
      img.classList.add("arcade-float-img");
      img.style.animationDelay = `${(idx % 6) * 0.25}s`;
    });
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initArcadeAnimations);
  } else {
    initArcadeAnimations();
  }
})();
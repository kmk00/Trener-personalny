/**
 * =================================
 *    HERO SECTION ANIMATION
 * ================================
 */

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

const heroTitle = document.querySelector(".hero__title");
const heroName = document.querySelector(".hero__name");
const heroBorderTop = document.querySelector(".hero__border--top");
const heroBorderBottom = document.querySelector(".hero__border--bottom");
const heroMovie = document.querySelector(".hero__movie");

gsap.fromTo(
  heroBorderTop,
  { y: -400, opacity: 0, ease: "power1.inOut" },
  {
    duration: 0.8,
    y: 0,
    opacity: 1,
  }
);

gsap.fromTo(
  heroBorderBottom,
  { y: 400, opacity: 0, ease: "power1.inOut" },
  {
    duration: 0.8,
    y: 0,
    opacity: 1,
  }
);

gsap.fromTo(
  heroMovie,
  { webkitFilter: "brightness(1)", filter: "brightness(1)" },
  {
    delay: 0.4,
    webkitFilter: "brightness(0.3)",
    filter: "brightness(0.3)",
  }
);

gsap.fromTo(
  heroTitle,
  { y: -400, opacity: 0, ease: "power1.inOut" },
  {
    delay: 0.8,
    duration: 0.4,
    y: 0,
    opacity: 1,
  }
);

gsap.fromTo(
  heroName,
  { x: 1200, opacity: 0, ease: "power1.inOut" },
  {
    delay: 0.8,
    duration: 0.4,
    x: 0,
    opacity: 1,
  }
);

/**
 * =================================
 *    NAVIGATION SECTION ANIMATION
 * ================================
 */
const navigationLinks = document.querySelectorAll(".navigation__link");
navigationLinks.forEach((link) => {
  const textWrapper = document.createElement("div");
  textWrapper.className = "navigation__text";
  textWrapper.textContent = link.textContent;
  link.textContent = "";
  link.appendChild(textWrapper);

  // Ustaw początkowy stan
  gsap.set(link, {
    y: 200,
    opacity: 0,
    backgroundColor: "white",
  });
  gsap.set(textWrapper, {
    x: () => -(link.offsetWidth - textWrapper.offsetWidth - 80), // 80 to padding-inline (4rem * 2)
    color: "black",
  });

  // Stwórz timeline dla scroll animation
  const scrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: link,
      start: "top bottom +=100",
      toggleActions: "play none none none",
    },
  });

  // Krok 1: Pokaż link (wjazd od dołu z białym tłem i czarnym tekstem po lewej)
  scrollTl
    .to(link, {
      duration: 0.4,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    })
    // Krok 2: Przesuń tekst do prawej i zmień kolory jednocześnie
    .to(
      textWrapper,
      {
        duration: 0.5,
        x: 0,
        color: "white",
        ease: "power2.inOut",
      },
      "-=0.1"
    )
    .to(
      link,
      {
        duration: 0.2,
        backgroundColor: "black",
        ease: "power2.inOut",
      },
      "<"
    );

  // Stwórz timeline dla hover animation
  const hoverTl = gsap.timeline({ paused: true });

  hoverTl
    .to(link, {
      duration: 0.2,
      backgroundColor: "white",
      ease: "power2.inOut",
    })
    .to(
      textWrapper,
      {
        duration: 0.5,
        x: () => -(link.offsetWidth - textWrapper.offsetWidth - 80),
        color: "black",
        ease: "power2.inOut",
      },
      "<"
    );

  // Event listeners dla hover
  link.addEventListener("mouseenter", () => {
    hoverTl.play();
  });

  link.addEventListener("mouseleave", () => {
    hoverTl.reverse();
  });
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const target = link.getAttribute("data-target");
    const scrollConfig =
      target === "#contact-me"
        ? { y: target, offsetY: 100 } // Offset w górę o 200px
        : target;

    gsap.to(window, {
      duration: 0.7,
      scrollTo: scrollConfig,
      ease: "expo.out",
    });
  });
});

/**
 * =================================
 *    INSPIRATION SECTION ANIMATION
 * ================================
 */

const inspiration = document.querySelector(".inpiration__quote-container");
const [leftText, rightText] = document.querySelectorAll(".inspiration__text");
const inspirationCaption = document.querySelector(
  ".inspiration__text--caption"
);

gsap.set(leftText, { x: -200, opacity: 0 });
gsap.set(rightText, { x: 200, opacity: 0 });
gsap.set(inspiration, {
  backdropFilter: "blur(0px)",
  backgroundColor: "rgba(255, 255, 255, 0)",
});
gsap.set(inspirationCaption, {
  opacity: 0,
  y: 5,
});

const inspirationTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: inspiration,
    start: "top 70%",
    toggleActions: "play none none none",
  },
});

inspirationTimeline
  .to(inspiration, {
    duration: 0.6,
    backdropFilter: "blur(10px)",
    // webkitBackdropFilter: "blur(10px)",
    backgroundColor: "rgba(255, 255, 255, 0.034)",
    ease: "power2.inOut",
  })
  .to(
    leftText,
    {
      duration: 0.6,
      x: 0,
      opacity: 1,
      ease: "power2.out",
    },
    "<0.5"
  )
  .to(
    rightText,
    {
      duration: 0.6,
      x: 0,
      opacity: 1,
      ease: "power2.out",
    },
    "<0.2" // Zaczyna 0.2s po poprzedniej animacji
  )
  .to(
    inspirationCaption,
    {
      duration: 0.2,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    },
    "<0.2" // Zaczyna 0.2s po poprzedniej animacji
  );

/**
 * =================================
 *    PERSONAL TRAINING SECTION ANIMATION
 * ================================
 */

const personalTraining = document.querySelector(".personal-training");
const personalTrainingGridList = document.querySelector(
  ".personal-training__grid-list"
);
const personalTrainingGridDetails = document.querySelector(
  ".personal-training__grid-details"
);
const personalTrainingGridContact = document.querySelector(
  ".personal-training__grid-contact"
);
const personalTrainingGridImageContainer = document.querySelector(
  ".personal-training__grid-image-container"
);

const personalTrainingTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: personalTraining,
    start: "top 30%",
    toggleActions: "play none none none",
  },
});

const gridTimeline = gsap.timeline();

gsap.set(personalTrainingGridImageContainer, { y: 100, opacity: 0 });
gsap.set(personalTrainingGridList, { x: -100, opacity: 0 });
gsap.set(personalTrainingGridDetails, { y: -100, opacity: 0 });
gsap.set(personalTrainingGridContact, { x: 100, opacity: 0 });

gridTimeline
  .to(personalTrainingGridImageContainer, {
    duration: 0.6,
    y: 0,
    opacity: 1,
    ease: "power2.out",
  })
  .to(
    personalTrainingGridList,
    {
      duration: 0.6,
      x: 0,
      opacity: 1,
      ease: "power2.out",
    },
    "<"
  )
  .to(
    personalTrainingGridDetails,
    {
      duration: 0.6,
      y: 0,
      opacity: 1,
      ease: "power2.out",
    },
    "<"
  )
  .to(
    personalTrainingGridContact,
    {
      duration: 0.6,
      x: 0,
      opacity: 1,
      ease: "power2.out",
    },
    "<"
  );

personalTrainingTimeline.add(gridTimeline, 0);

// Contact icon

const contactIcon = document.querySelector(
  ".personal-training__grid-contact-icon"
);

gsap.set(contactIcon, { rotate: 0 });

const shakeAnimation = gsap.timeline({ repeat: -1, repeatDelay: 2 });

shakeAnimation
  .to(contactIcon, {
    scale: 1.2,
    duration: 0.05,
    ease: "power2.inOut",
  })
  .to(contactIcon, {
    duration: 0.05,
    rotate: 10,
    repeat: 4,
    yoyo: true,
    ease: "power2.inOut",
  })
  .to(contactIcon, {
    duration: 0.05,
    rotate: 0, // Reset do 0
    ease: "power2.inOut",
  })
  .to(contactIcon, {
    scale: 1,
    duration: 0.05,
    ease: "power2.inOut",
  });

personalTrainingTimeline.add(shakeAnimation, 1);

/**
 * =================================
 *    TRAINING PLAN SECTION ANIMATION
 * ================================
 */

const orangeText = document.querySelector(".text-orange");

gsap.fromTo(
  orangeText,
  {
    color: "var(--secondary-color)",
  },
  {
    duration: 0.2,
    color: "orange",
    // padding: "0.5rem 1rem",
    ease: "power2.out",
    scrollTrigger: {
      trigger: orangeText,
      start: "top 60%",
      toggleActions: "play none none none",
    },
  }
);

/**
 * =================================
 *    CONTACT ME SECTION ANIMATION
 * ================================
 */

const planDetailsElements = document.querySelectorAll(".plan-details__element");

const paddingConfig = [
  { paddingRight: "18%" },
  { paddingLeft: "22%" },
  { paddingRight: "16%" },
  { paddingLeft: "12%" },
];

planDetailsElements.forEach((element, index) => {
  gsap.set(element, {
    paddingLeft: "3rem",
    paddingRight: "3rem",
    textAlign: "center",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      toggleActions: "play none none none",
    },
  });

  tl.to(element, {
    ...paddingConfig[index],
    duration: 0.8,
    ease: "power2.out",
  });
});

/**
 * =================================
 *    ABOUT ME SECTION ANIMATION
 * ================================
 */

const aboutMeImage = document.querySelector(".about-me__image");
const aboutMeTextContainers = document.querySelectorAll(
  ".about-me__text-container"
);

// Ustaw początkowy stan - obrazek ukryty
gsap.set(aboutMeImage, {
  clipPath: "inset(50% 0% 50% 0%)",
});

// Animacja odsłaniania
gsap.to(aboutMeImage, {
  clipPath: "inset(0% 0% 0% 0%)",
  duration: 0.4,
  ease: "power2.out",
  scrollTrigger: {
    trigger: aboutMeImage,
    start: "top center",
    toggleActions: "play none none none",
  },
});

// Użyj gsap.from zamiast timeline + to
aboutMeTextContainers.forEach((textContainer, index) => {
  const activation = index === 0 ? "bottom 70%" : "top 70%";

  gsap.fromTo(
    textContainer,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: textContainer,
        start: activation,
        toggleActions: "play none none none",
      },
    }
  );
});

const map = document.querySelector(".about-me__map-video");
const mapSplash = document.querySelector(".about-me__map-splash");

const mapTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: map,
    start: "top 30%",
    toggleActions: "play none none none",
  },
});

gsap.set(map, { opacity: 0 });
gsap.set(mapSplash, { opacity: 0 });

mapTimeline
  .to(map, {
    opacity: 1,
    duration: 0.4,
    ease: "power2.out",
  })
  .to(
    mapSplash,
    {
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
    },
    "<1"
  );

/**
 * =================================
 *    CONTACT SECTION ANIMATION
 * ================================
 */

const socialMedia = document.querySelectorAll(".contact-me__social-media");
const title = document.querySelector(".contact-me__title-wrappe");
const form = document.querySelector(".contact-me__form");

gsap.from(socialMedia, {
  x: -100,
  opacity: 0,
  duration: 0.4,
  ease: "power2.out",
  scrollTrigger: {
    trigger: socialMedia,
    start: "top 50%",
    toggleActions: "play none none none",
  },
});

gsap.from(form, {
  x: 100,
  opacity: 0,
  duration: 0.4,
  ease: "power2.out",
  scrollTrigger: {
    trigger: socialMedia,
    start: "top 50%",
    toggleActions: "play none none none",
  },
});

/**
 * =================================
 *    FOOTER SECTION ANIMATION
 * ================================
 */

const footer = document.querySelector(".footer");
const footerContent = document.querySelector(".footer__content");
const footerBottom = document.querySelector(".footer-bottom");

gsap.from(footerContent, {
  y: 200,
  duration: 1,
  ease: "power2.out",
  scrollTrigger: {
    trigger: footer,
    start: "top bottom",
    toggleActions: "play none none none",
    // markers: true,
  },
});

const themeToggle = document.getElementById("themeToggle");
const loadingScreen = document.querySelector("[data-loading-screen]");
const loadingBar = document.querySelector("[data-loading-bar]");
const loadingPercent = document.querySelector("[data-loading-percent]");
const loadingStatus = document.querySelector("[data-loading-status]");

const loadingMessages = [
  "Calibrating tiny neon portals",
  "Convincing Unity to behave",
  "Bribing shaders with strawberry milk",
  "Teaching pixels to look cute",
  "Summoning VRChat world snacks",
  "Polishing bento boxes at unsafe speeds",
  "Opening MeiSter-WorkShop doors"
];

if (loadingScreen) {
  document.body.classList.add("is-loading");

  let fakeProgress = 0;
  let loadingMessageIndex = 0;
  const loadingStartedAt = Date.now();

  const setLoadingProgress = (value) => {
    fakeProgress = Math.min(value, 100);
    if (loadingBar) loadingBar.style.width = `${fakeProgress}%`;
    if (loadingPercent) loadingPercent.textContent = `${Math.round(fakeProgress)}%`;

    const nextMessageIndex = Math.min(
      loadingMessages.length - 1,
      Math.floor((fakeProgress / 100) * loadingMessages.length)
    );

    if (nextMessageIndex !== loadingMessageIndex) {
      loadingMessageIndex = nextMessageIndex;
      if (loadingStatus) loadingStatus.textContent = loadingMessages[loadingMessageIndex];
    }
  };

  const loadingTimer = window.setInterval(() => {
    const drift = fakeProgress < 72 ? 9 : fakeProgress < 92 ? 4 : 1.4;
    setLoadingProgress(fakeProgress + Math.random() * drift);
  }, 120);

  const finishLoading = () => {
    const elapsed = Date.now() - loadingStartedAt;
    const remainingTime = Math.max(0, 3000 - elapsed);

    window.setTimeout(() => {
      window.clearInterval(loadingTimer);
      setLoadingProgress(100);
      if (loadingStatus) loadingStatus.textContent = "Welcome back";

      window.setTimeout(() => {
        loadingScreen.classList.add("is-finishing");
        document.body.classList.remove("is-loading");
      }, 260);

      window.setTimeout(() => {
        loadingScreen.remove();
      }, 1100);
    }, remainingTime);
  };

  if (document.readyState === "complete") {
    finishLoading();
  } else {
    window.addEventListener("load", finishLoading, { once: true });
  }
}

const applyThemeLabel = () => {
  if (!themeToggle) return;
  const isLight = document.body.classList.contains("light-mode");
  themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
  themeToggle.setAttribute("title", isLight ? "Switch to dark mode" : "Switch to light mode");
};

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  document.body.classList.add("light-mode");
}

applyThemeLabel();

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  const isLight = document.body.classList.contains("light-mode");
  localStorage.setItem("theme", isLight ? "light" : "dark");

  applyThemeLabel();
});

const revealCards = document.querySelectorAll(".reveal-card");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });

  revealCards.forEach((card) => revealObserver.observe(card));
} else {
  revealCards.forEach((card) => card.classList.add("is-visible"));
}

const panelPages = Array.from(document.querySelectorAll("[data-panel-page]"));
const panelDots = Array.from(document.querySelectorAll("[data-panel-dot]"));
const prevPanelButton = document.querySelector("[data-panel-prev]");
const nextPanelButton = document.querySelector("[data-panel-next]");
const techSection = document.querySelector(".tech-section");
let activePanelIndex = 0;
let panelTimer = null;

const showPanelPage = (index) => {
  if (!panelPages.length) return;

  activePanelIndex = (index + panelPages.length) % panelPages.length;

  panelPages.forEach((page, pageIndex) => {
    const isActive = pageIndex === activePanelIndex;
    page.classList.toggle("is-active", isActive);
    page.setAttribute("aria-hidden", isActive ? "false" : "true");
  });

  panelDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activePanelIndex);
  });
};

const startPanelAutoPlay = () => {
  if (panelPages.length <= 1) return;
  stopPanelAutoPlay();
  panelTimer = window.setInterval(() => {
    showPanelPage(activePanelIndex + 1);
  }, 5200);
};

const stopPanelAutoPlay = () => {
  if (panelTimer) {
    window.clearInterval(panelTimer);
    panelTimer = null;
  }
};

panelDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const targetIndex = Number(dot.dataset.panelDot);
    showPanelPage(targetIndex);
    startPanelAutoPlay();
  });
});

prevPanelButton?.addEventListener("click", () => {
  showPanelPage(activePanelIndex - 1);
  startPanelAutoPlay();
});

nextPanelButton?.addEventListener("click", () => {
  showPanelPage(activePanelIndex + 1);
  startPanelAutoPlay();
});

techSection?.addEventListener("mouseenter", stopPanelAutoPlay);
techSection?.addEventListener("mouseleave", startPanelAutoPlay);

showPanelPage(0);
startPanelAutoPlay();

const setupLoopingSlides = (selector, interval = 3000) => {
  const slides = Array.from(document.querySelectorAll(selector));
  let activeIndex = 0;

  if (slides.length <= 1) return;

  window.setInterval(() => {
    slides[activeIndex]?.classList.remove("is-active");
    activeIndex = (activeIndex + 1) % slides.length;
    slides[activeIndex]?.classList.add("is-active");
  }, interval);
};

setupLoopingSlides(".ntut-feature-slide", 3200);

const demoDetails = {
  "maple-kitchen": {
    kicker: "VRCHAT WORLD / IDLE COOKING ADVENTURE",
    title: "Maple Idle Kitchen",
    media: {
      type: "carousel",
      note: "Maple Idle Kitchen gameplay and system previews",
      images: [
        "/assets/images/IdleKitchen_Preview/VRChat_2026-06-07_21-54-47.196_3840x2160.png",
        "/assets/images/IdleKitchen_Preview/VRChat_2026-07-07_00-09-31.409_3840x2160.png",
        "/assets/images/IdleKitchen_Preview/VRChat_2026-07-07_00-10-45.438_3840x2160.png",
        "/assets/images/IdleKitchen_Preview/螢幕擷取畫面 2026-07-07 002723.png",
        "/assets/images/IdleKitchen_Preview/螢幕擷取畫面 2026-07-07 002848.png",
        "/assets/images/IdleKitchen_Preview/螢幕擷取畫面 2026-07-07 002911.png",
        "/assets/images/IdleKitchen_Preview/螢幕擷取畫面 2026-07-07 003156.png",
        "/assets/images/IdleKitchen_Preview/螢幕擷取畫面 2026-07-07 003243.png",
        "/assets/images/IdleKitchen_Preview/螢幕擷取畫面 2026-07-07 003349.png",
        "/assets/images/IdleKitchen_Preview/螢幕擷取畫面 2026-07-07 003532.png"
      ]
    },
    description: "一款發生在天空中的放置型料理冒險。玩家可以在前往 Orbis 的飛行船上狩獵怪物、收集食材、製作美味料理，也可以和朋友一起放鬆聊天。支援 PC 與 Quest 平台。",
    systems: [
      "Idle Cooking Loop：以素材收集、料理製作與角色成長形成輕鬆可重複遊玩的循環。",
      "Monster & Ingredient Flow：透過狩獵怪物取得食材，將戰鬥與料理系統自然串接。",
      "World Records：2026/6 發行後累計 180k Visits / 7.5k Likes，持續增長中。",
      "Ranking：VRChat 世界 2026/6 月底 Popular 第一名。"
    ],
    actions: [
      { label: "World Link", href: "https://vrchat.com/home/world/wrld_0e9eef0b-f261-45c8-8225-9c9880c5dbbd/info" }
    ]
  },
  "cross-party": {
    kicker: "GAMEPLAY DEMO / PARTY WORLD",
    title: "MapleStory in VRChat Cross Party",
    media: {
      type: "youtube",
      embedUrl: "https://www.youtube.com/embed/zz4pvjd8z8s",
      title: "MapleStory in VRChat Cross Party demo video"
    },
    description: "受 MapleStory 啟發的粉絲製多人動作 RPG，也是 MapleStory-in-VRChat project 的第二部作品。MSV Cross Party 專為合作與組隊玩法打造，玩家可以組隊挑戰關卡、擊敗 Boss，並體驗圍繞多人協作與共享成長設計的副本內容。",
    systems: [
      "Co-op Stage Flow：以隊伍推進、關卡清除與戰鬥節奏為核心，強化多人共同攻略的感覺。",
      "Boss & Dungeon Content：設計 Boss 戰與副本流程，讓玩家需要協作、分工與共享目標。",
      "World Records：2025/12 發行後累計 30k Visits / 2.7k Likes。",
      "Release Record：釋出時進入 VRChat 世界 Popular 排名前段。"
    ],
    actions: [
      { label: "Watch Demo", href: "https://www.youtube.com/watch?v=zz4pvjd8z8s" },
      { label: "World Link", href: "https://vrchat.com/home/world/wrld_ebf8c3d6-ae75-4ce4-9531-23f29e4bae02/info" }
    ]
  },
  "exploration": {
    kicker: "LOCAL ACTION RPG / EXPLORATION",
    title: "MapleStory in VRChat Exploration",
    media: {
      type: "youtube",
      embedUrl: "https://www.youtube.com/embed/Khcf9dyn0eM",
      title: "MapleStory in VRChat Exploration demo video"
    },
    description: "MapleStory in VRChat 是一款帶有 MapleStory 線框風格的粉絲製動作 RPG，支援 VR 與 PC 模式。所有玩法系統皆為本地運算，提供流暢且放鬆的單人體驗，重點放在探索、戰鬥練習與角色成長。",
    systems: [
      "Local Gameplay Systems：玩法邏輯以本地端運作，讓單人探索與練習更穩定順暢。",
      "VR / PC Compatibility：同時支援 VR 與 PC 模式，兼顧沉浸操作與桌面遊玩。",
      "World Records：2025/1 發行後累計 29k Visits / 3.5k Likes。",
      "Release Record：釋出時進入 VRChat 世界 Popular 排名前段。"
    ],
    actions: [
      { label: "Watch Demo", href: "https://www.youtube.com/watch?v=Khcf9dyn0eM" },
      { label: "World Link", href: "https://vrchat.com/home/world/wrld_a94baf7b-00d2-4bc3-a399-a99cd7fc661b/info" }
    ]
  },
  "avatar-commission": {
    kicker: "AVATAR COMMISSION / 3D CHARACTER MODEL",
    title: "Avatar 改模與自訂義身型委託",
    media: {
      type: "carousel",
      note: "Avatar style previews and commissioned model showcases",
      images: [
        "/assets/images/Avatar_Preview/VRChat_2026-07-07_18-57-32.646_3840x2160.png",
        "/assets/images/Avatar_Preview/VRChat_2026-07-07_19-00-05.619_3840x2160.png",
        "/assets/images/Avatar_Preview/VRChat_2026-07-07_19-04-10.170_3840x2160.png",
        "/assets/images/Avatar_Preview/VRChat_2026-07-07_19-11-00.978_3840x2160.png"
      ]
    },
    description: "接取 Avatar 改模、自訂義身型與進階角色 3D 模型委託，協助整理角色外觀、材質色調、配件搭配與整體風格呈現。",
    systems: [
      "Commission：Avatar 改模、自訂義身型、進階角色 3D 模型製作與展示整理。",
      "Style Tags：Cute / Pastel Sweets / Mass-Produced Style / Jirai Kei。",
      "Model Editing Experience：Karin / Chiffon / Plum / Sio / Kipfel / Siska / Ririka。"
    ],
    actions: []
  },
  "ntut-exhibition": {
    kicker: "VIRTUAL EXHIBITION / WORLD RECORD",
    title: "NTUT_IXD Virtual Exhibition",
    media: {
      type: "youtube",
      embedUrl: "https://www.youtube.com/embed/8UopvzuZT6o",
      title: "NTUT IXD virtual exhibition preview video"
    },
    description: "畢業製作虛擬展場創作紀錄，將實體展覽的空間感、作品展示動線與線上觀展體驗整理成可瀏覽的虛擬展場。",
    systems: [
      "Exhibition Flow：規劃線上展覽動線，讓觀展者能依序瀏覽作品與展區內容。",
      "World Presentation：以 VRChat 世界形式呈現展場空間、作品區塊與觀展節奏。",
      "Record Note：作為台北科技大學互動設計系畢業製作虛擬展場的世界創作紀錄。"
    ],
    actions: [
      { label: "Watch Video", href: "https://www.youtube.com/watch?v=8UopvzuZT6o" },
      { label: "World Link", href: "https://vrchat.com/home/world/wrld_f926447a-ef68-4f52-823d-b01fb2cfe3d3/info" },
    ]
  }
};
const demoModal = document.querySelector("[data-demo-modal]");
const demoModalMedia = document.querySelector("[data-demo-modal-media]");
const demoModalKicker = document.querySelector("[data-demo-modal-kicker]");
const demoModalTitle = document.querySelector("[data-demo-modal-title]");
const demoModalDescription = document.querySelector("[data-demo-modal-description]");
const demoModalSystems = document.querySelector("[data-demo-modal-systems]");
const demoModalActions = document.querySelector("[data-demo-modal-actions]");
let lastFocusedDemoButton = null;
let modalCarouselTimer = null;

const resolveAssetPath = (path) => {
  if (!path.startsWith("/")) return path;
  const basePath = window.location.pathname.includes("/assets/") ? "" : "";
  return `${basePath}${path}`;
};

const stopModalCarousel = () => {
  if (modalCarouselTimer) {
    window.clearInterval(modalCarouselTimer);
    modalCarouselTimer = null;
  }
};

const renderDemoMedia = (detail) => {
  if (!demoModalMedia) return;

  stopModalCarousel();
  demoModalMedia.innerHTML = "";

  if (detail.media?.type === "youtube") {
    const iframe = document.createElement("iframe");
    iframe.src = detail.media.embedUrl;
    iframe.title = detail.media.title;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.allowFullscreen = true;
    iframe.loading = "lazy";
    demoModalMedia.appendChild(iframe);
    return;
  }

  if (detail.media?.type === "carousel") {
    const carousel = document.createElement("div");
    carousel.className = "modal-media-carousel";
    const stage = document.createElement("div");
    stage.className = "modal-carousel-stage";

    detail.media.images.forEach((imagePath, imageIndex) => {
      const image = document.createElement("img");
      image.src = resolveAssetPath(imagePath);
      image.alt = `${detail.title} screenshot ${imageIndex + 1}`;
      image.classList.toggle("is-active", imageIndex === 0);
      stage.appendChild(image);
    });

    carousel.appendChild(stage);

    if (detail.media.note) {
      const note = document.createElement("span");
      note.className = "modal-media-note";
      note.textContent = detail.media.note;
      carousel.appendChild(note);
    }

    demoModalMedia.appendChild(carousel);

    const images = Array.from(stage.querySelectorAll("img"));
    let currentIndex = 0;
    modalCarouselTimer = window.setInterval(() => {
      images[currentIndex]?.classList.remove("is-active");
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex]?.classList.add("is-active");
    }, 3200);
  }
};

const openDemoModal = (demoId, trigger) => {
  const detail = demoDetails[demoId];
  if (!detail || !demoModal) return;

  lastFocusedDemoButton = trigger;
  demoModal.dataset.activeDemo = demoId;
  renderDemoMedia(detail);

  if (demoModalKicker) demoModalKicker.textContent = detail.kicker;
  if (demoModalTitle) demoModalTitle.textContent = detail.title;
  if (demoModalDescription) demoModalDescription.textContent = detail.description;

  if (demoModalSystems) {
    demoModalSystems.innerHTML = detail.systems.map((item) => `<span>${item}</span>`).join("");
  }

  if (demoModalActions) {
    demoModalActions.innerHTML = detail.actions
      .map((action) => `<a href="${action.href}" target="_blank" rel="noopener noreferrer">${action.label}</a>`)
      .join("");
  }

  demoModal.classList.add("is-open");
  demoModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-lock");
  demoModal.querySelector(".modal-close-button")?.focus();
};

const closeDemoModal = () => {
  if (!demoModal) return;

  demoModal.classList.remove("is-open");
  demoModal.setAttribute("aria-hidden", "true");
  delete demoModal.dataset.activeDemo;
  document.body.classList.remove("modal-lock");
  stopModalCarousel();
  if (demoModalMedia) demoModalMedia.innerHTML = "";
  lastFocusedDemoButton?.focus();
};

document.querySelectorAll("[data-demo-open]").forEach((button) => {
  button.addEventListener("click", () => {
    openDemoModal(button.dataset.demoOpen, button);
  });
});

document.querySelectorAll("[data-featured-demo-open]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const demoId = link.dataset.featuredDemoOpen;
    const target = document.querySelector(link.getAttribute("href"));

    target?.scrollIntoView({ behavior: "auto", block: "center" });
    window.setTimeout(() => openDemoModal(demoId, link), 120);
  });
});


document.querySelectorAll("[data-demo-close]").forEach((button) => {
  button.addEventListener("click", closeDemoModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && demoModal?.classList.contains("is-open")) {
    closeDemoModal();
  }
});

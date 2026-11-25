const months = {
  1: { meaning: "새로운 시작", meaningEn: "A New Beginning", title: "새해와 나", titleEn: "The New Year and Me", description: "새해에 담고 싶은 글자와 색을 고르며 한 해의 첫 장면을 엽니다.", descriptionEn: "Choose words and colors for the new year and open the first scene of the year." },
  2: { meaning: "함께 나누는 문화", meaningEn: "Culture We Share", title: "설날과 음식", titleEn: "Lunar New Year and Food", description: "설날의 문양과 음식을 떠올리며 익숙한 기억을 색과 형태로 나눕니다.", descriptionEn: "Recall Lunar New Year patterns and foods, and share familiar memories through color and form." },
  3: { meaning: "피어남", meaningEn: "Blooming", title: "봄과 새싹", titleEn: "Spring and Sprouts", description: "꽃과 새싹의 형태와 색을 관찰하며 봄이 피어나는 장면을 표현합니다.", descriptionEn: "Observe the forms and colors of flowers and sprouts to express a scene of spring coming into bloom." },
  4: { meaning: "성장", meaningEn: "Growth", title: "꽃과 정원", titleEn: "Flowers and Garden", description: "꽃이 모이고 자라는 풍경을 평면, 조형, 공예와 작품 탐구로 확장합니다.", descriptionEn: "Expand scenes of gathering and growing flowers through flat expression, sculpture, craft, and artwork study." },
  5: { meaning: "관계", meaningEn: "Connection", title: "가족과 감사", titleEn: "Family and Gratitude", description: "소중한 사람과 감사의 마음을 손글씨, 꽃과 선물의 형태로 표현합니다.", descriptionEn: "Express gratitude for loved ones through handwriting, flowers, and the form of a gift." },
  6: { meaning: "손의 감각", meaningEn: "Tactile Sense", title: "단오와 손작업", titleEn: "Dano and Handwork", description: "반복되는 문양과 엮고 찍는 손작업을 통해 손의 감각을 깨웁니다.", descriptionEn: "Awaken the senses of the hands through repeated patterns, weaving, and printing." },
  7: { meaning: "놀이", meaningEn: "Play", title: "여름과 바람", titleEn: "Summer and Wind", description: "바람과 물결의 움직임을 선과 색, 작은 생활 소품으로 표현합니다.", descriptionEn: "Express the movement of wind and waves through lines, colors, and small everyday objects." },
  8: { meaning: "창작", meaningEn: "Creation", title: "생활소품과 공예", titleEn: "Everyday Objects and Craft", description: "일상에서 사용하는 물건의 형태를 관찰하고 나만의 쓰임과 장식을 더합니다.", descriptionEn: "Observe the forms of everyday objects and add your own function and decoration." },
  9: { meaning: "풍요", meaningEn: "Abundance", title: "추석과 보름달", titleEn: "Chuseok and the Full Moon", description: "보름달과 가을 풍경을 겹치고 비추며 풍요로운 한가위를 표현합니다.", descriptionEn: "Layer the full moon and autumn scenery to express the abundance of Chuseok." },
  10: { meaning: "결실", meaningEn: "Harvest", title: "수확과 장날", titleEn: "Harvest and Market Day", description: "가을 열매와 장터의 활기를 색, 간판과 생활 공예로 담아냅니다.", descriptionEn: "Capture autumn produce and the energy of a market through color, signs, and everyday craft." },
  11: { meaning: "공동체", meaningEn: "Community", title: "김장과 나눔", titleEn: "Kimjang and Sharing", description: "함께 담그고 나누는 김장 문화를 떠올리며 공동체의 기억을 작품으로 만듭니다.", descriptionEn: "Recall the culture of making and sharing kimchi together, and turn communal memories into artwork." },
  12: { meaning: "마무리", meaningEn: "Closing", title: "기록과 작품", titleEn: "Records and Artworks", description: "한 해 동안 만든 작품을 돌아보고 작은 전시와 기록으로 마무리합니다.", descriptionEn: "Look back on a year of artworks and close with a small exhibition and record." },
};

const tabs = [...document.querySelectorAll("[data-month]")];
const monthPanel = document.querySelector("#month-panel");
const number = document.querySelector("#month-number");
const meaning = document.querySelector("#month-meaning");
const meaningEn = document.querySelector("#month-meaning-en");
const title = document.querySelector("#month-title");
const titleEn = document.querySelector("#month-title-en");
const description = document.querySelector("#month-description");
const descriptionEn = document.querySelector("#month-description-en");

const videoMonth = document.querySelector("#activity-video-month");
const videoMonthEn = document.querySelector("#activity-video-month-en");
const videoCards = [...document.querySelectorAll("[data-video-week]")];
const videoDialog = document.querySelector("#activity-video-dialog");
const videoContext = document.querySelector("#activity-video-context");
const videoTitle = document.querySelector("#activity-video-title");
const videoTitleEn = document.querySelector("#activity-video-title-en");
const videoPlaceholder = document.querySelector("#activity-video-placeholder");
const videoPlayer = document.querySelector("#activity-video-player");

const monthNames = new Intl.DateTimeFormat("en", { month: "long", timeZone: "UTC" });
const aprilActivityNames = [
  { title: "꽃이 모이는 정원", titleEn: "A Garden of Gathered Flowers" },
  { title: "꽃이 가득한 정원 액자", titleEn: "A Garden Full of Flowers Frame" },
  { title: "작은 정원 테라리움", titleEn: "A Small Garden Terrarium" },
  { title: "정원의 색 화병", titleEn: "A Vase in the Colors of the Garden" },
];

// Add an MP4 URL by month and week when a video is available.
const videoSources = {};

let activeMonth;

function selectMonth(tab) {
  activeMonth = Number(tab.dataset.month);
  const content = months[activeMonth];
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
  });
  monthPanel.setAttribute("aria-labelledby", tab.id);
  number.textContent = String(activeMonth).padStart(2, "0");
  meaning.textContent = content.meaning;
  meaningEn.textContent = content.meaningEn;
  title.textContent = content.title;
  titleEn.textContent = content.titleEn;
  description.textContent = content.description;
  descriptionEn.textContent = content.descriptionEn;

  const englishMonth = monthNames.format(new Date(Date.UTC(2026, activeMonth - 1)));
  videoMonth.textContent = `${activeMonth}월호 · ${content.title}`;
  videoMonthEn.textContent = `${englishMonth} · ${content.titleEn}`;
  videoCards.forEach((card) => {
    const source = videoSources[activeMonth]?.[card.dataset.videoWeek];
    card.querySelector(".activity-video-status").textContent = source ? "영상 보기" : "영상 준비 중";
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectMonth(tab));
  tab.addEventListener("keydown", (event) => {
    const nextIndex = {
      ArrowLeft: (index - 1 + tabs.length) % tabs.length,
      ArrowRight: (index + 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key];
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectMonth(tabs[nextIndex]);
    tabs[nextIndex].focus();
  });
});

selectMonth(tabs.find((tab) => tab.getAttribute("aria-selected") === "true"));

videoCards.forEach((card) => {
  card.addEventListener("click", () => {
    const week = Number(card.dataset.videoWeek);
    const weekTitle = card.querySelector("strong");
    const activity = activeMonth === 4 ? aprilActivityNames[week - 1] : null;
    const source = videoSources[activeMonth]?.[week];

    videoContext.textContent = `${videoMonth.textContent} · ${week}주차`;
    videoTitle.textContent = activity?.title ?? weekTitle.firstChild.textContent;
    videoTitleEn.textContent = activity?.titleEn ?? weekTitle.querySelector("small").textContent;
    videoPlaceholder.hidden = Boolean(source);
    videoPlayer.hidden = !source;
    if (source) videoPlayer.src = source;
    videoDialog.showModal();
  });
});

videoDialog.addEventListener("click", (event) => {
  if (event.target === videoDialog) videoDialog.close();
});
videoDialog.addEventListener("close", () => {
  if (!videoPlayer.hasAttribute("src")) return;
  videoPlayer.pause();
  videoPlayer.removeAttribute("src");
  videoPlayer.load();
});

const menuToggle = document.querySelector("#menu-toggle");
const siteNav = document.querySelector("#site-nav");

function isSiteMenuOpen() {
  return menuToggle.getAttribute("aria-expanded") === "true";
}

function setSiteMenuOpen(open) {
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
}

menuToggle.addEventListener("click", () => setSiteMenuOpen(!isSiteMenuOpen()));

document.addEventListener("click", (event) => {
  if (!isSiteMenuOpen() || menuToggle.contains(event.target)) return;
  if (!siteNav.contains(event.target) || event.target.closest("a")) setSiteMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !isSiteMenuOpen()) return;
  event.preventDefault();
  setSiteMenuOpen(false);
  menuToggle.focus();
});

window.matchMedia("(max-width: 900px)").addEventListener?.("change", () => setSiteMenuOpen(false));

const backToTop = document.querySelector("#back-to-top");

function updateBackToTop() {
  backToTop.hidden = window.scrollY < 360;
}

window.addEventListener("scroll", updateBackToTop, { passive: true });
updateBackToTop();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const dialog = document.querySelector("#inquiryDialog");
document.querySelectorAll("[data-inquiry]").forEach((button) => {
  button.addEventListener("click", () => {
    dialog.showModal();
  });
});
document.querySelector("#closeInquiry").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

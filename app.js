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

const tabs = document.querySelectorAll("[data-month]");
const number = document.querySelector("#month-number");
const meaning = document.querySelector("#month-meaning");
const meaningEn = document.querySelector("#month-meaning-en");
const title = document.querySelector("#month-title");
const titleEn = document.querySelector("#month-title-en");
const description = document.querySelector("#month-description");
const descriptionEn = document.querySelector("#month-description-en");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const month = Number(tab.dataset.month);
    const content = months[month];
    tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
    number.textContent = String(month).padStart(2, "0");
    meaning.textContent = content.meaning;
    meaningEn.textContent = content.meaningEn;
    title.textContent = content.title;
    titleEn.textContent = content.titleEn;
    description.textContent = content.description;
    descriptionEn.textContent = content.descriptionEn;
  });
});

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

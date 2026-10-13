const months = {
  1: { meaning: "새로운 시작", title: "새해와 나", description: "새해에 담고 싶은 글자와 색을 고르며 한 해의 첫 장면을 엽니다." },
  2: { meaning: "함께 나누는 문화", title: "설날과 음식", description: "설날의 문양과 음식을 떠올리며 익숙한 기억을 색과 형태로 나눕니다." },
  3: { meaning: "피어남", title: "봄과 새싹", description: "꽃과 새싹의 형태와 색을 관찰하며 봄이 피어나는 장면을 표현합니다." },
  4: { meaning: "성장", title: "꽃과 정원", description: "꽃이 모이고 자라는 풍경을 평면, 조형, 공예와 작품 탐구로 확장합니다." },
  5: { meaning: "관계", title: "가족과 감사", description: "소중한 사람과 감사의 마음을 손글씨, 꽃과 선물의 형태로 표현합니다." },
  6: { meaning: "손의 감각", title: "단오와 손작업", description: "반복되는 문양과 엮고 찍는 손작업을 통해 손의 감각을 깨웁니다." },
  7: { meaning: "놀이", title: "여름과 바람", description: "바람과 물결의 움직임을 선과 색, 작은 생활 소품으로 표현합니다." },
  8: { meaning: "창작", title: "생활소품과 공예", description: "일상에서 사용하는 물건의 형태를 관찰하고 나만의 쓰임과 장식을 더합니다." },
  9: { meaning: "풍요", title: "추석과 보름달", description: "보름달과 가을 풍경을 겹치고 비추며 풍요로운 한가위를 표현합니다." },
  10: { meaning: "결실", title: "수확과 장날", description: "가을 열매와 장터의 활기를 색, 간판과 생활 공예로 담아냅니다." },
  11: { meaning: "공동체", title: "김장과 나눔", description: "함께 담그고 나누는 김장 문화를 떠올리며 공동체의 기억을 작품으로 만듭니다." },
  12: { meaning: "마무리", title: "기록과 작품", description: "한 해 동안 만든 작품을 돌아보고 작은 전시와 기록으로 마무리합니다." },
};

const tabs = document.querySelectorAll("[data-month]");
const number = document.querySelector("#month-number");
const meaning = document.querySelector("#month-meaning");
const title = document.querySelector("#month-title");
const description = document.querySelector("#month-description");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const month = Number(tab.dataset.month);
    const content = months[month];
    tabs.forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
    number.textContent = String(month).padStart(2, "0");
    meaning.textContent = content.meaning;
    title.textContent = content.title;
    description.textContent = content.description;
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
const dialogTitle = document.querySelector("#dialog-title");
const dialogDescription = document.querySelector("#dialog-description");

document.querySelectorAll("[data-inquiry]").forEach((button) => {
  button.addEventListener("click", () => {
    dialogTitle.textContent = "구독 문의";
    dialogDescription.textContent = "월간 활동북과 패키지 구독을 안내드리겠습니다.";
    dialog.showModal();
  });
});
document.querySelector("#closeInquiry").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

/**
 * [날짜 및 요일 렌더링]
 */

let currentViewDate = new Date();

function renderDate() {
  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth() + 1;
  const date = currentViewDate.getDate();

  const dayList = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  const currentDayName = dayList[currentViewDate.getDay()];

  document.getElementById("today-date").textContent =
    `${year}년 ${month}월 ${date}일`;
  document.getElementById("today-day").textContent = currentDayName;
}

renderDate();

/**
 * [날짜 이동 기능]
 */
function moveToPrevDay() {
  currentViewDate.setDate(currentViewDate.getDate() - 1);
  renderDate();
  renderTodo();
}

function moveToNextDay() {
  currentViewDate.setDate(currentViewDate.getDate() + 1);
  renderDate();
  renderTodo();
}

document.getElementById("prev-btn").addEventListener("click", moveToPrevDay);
document.getElementById("next-btn").addEventListener("click", moveToNextDay);
todoForm.addEventListener("submit", addTodo);

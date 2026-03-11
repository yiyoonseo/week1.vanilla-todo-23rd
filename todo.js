/* --- 1. 데이터 및 기준 변수 관리 --- */
let currentViewDate = new Date();
let todoData = JSON.parse(localStorage.getItem("todoData")) || {};

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoListElement = document.getElementById("todo-list");
const countElement = document.getElementById("todo-count");

/* --- 2. 유틸리티 함수 (중복 로직 분리) --- */

// 현재 보고 있는 날짜를 'YYYY-MM-DD' 형식의 키로 반환하는 함수
function getCurrentDateKey() {
  const year = currentViewDate.getFullYear();
  const month = currentViewDate.getMonth() + 1;
  const date = currentViewDate.getDate();
  return `${year}-${month}-${date}`;
}

// 로컬 스토리지에 현재 데이터 상태 저장
function saveTodo() {
  localStorage.setItem("todoData", JSON.stringify(todoData));
}

/* --- 3. 렌더링 함수 (화면 그리기) --- */

function renderDate() {
  const dayList = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  document.getElementById("today-date").textContent =
    `${currentViewDate.getFullYear()}년 ${currentViewDate.getMonth() + 1}월 ${currentViewDate.getDate()}일`;
  document.getElementById("today-day").textContent =
    dayList[currentViewDate.getDay()];
}

function renderTodo() {
  const dateKey = getCurrentDateKey();
  const currentTodos = todoData[dateKey] || [];

  // 남은 할 일 개수 계산 (전체 개수를 원하면 .length만 사용)
  const remainingTodos = currentTodos.filter((todo) => !todo.completed);
  countElement.textContent = `남은 할 일 ${remainingTodos.length}개`;

  todoListElement.innerHTML = "";

  currentTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
      <div class="todo-left">
        <label class="checkbox-container">
          <input type="checkbox" ${todo.completed ? "checked" : ""} onclick="toggleTodo(${index})">
          <span class="custom-checkbox"></span>
        </label>
        <span class="todo-text"></span> 
      </div>
      <button class="delete-btn" onclick="deleteTodo(${index})">삭제</button>
    `;

    li.querySelector(".todo-text").textContent = todo.text;
    todoListElement.appendChild(li);
  });
}

/* --- 4. 기능 함수 (데이터 수정) --- */

function addTodo(event) {
  event.preventDefault();
  const taskText = todoInput.value.trim();
  if (!taskText) return;

  const dateKey = getCurrentDateKey(); // 함수 실행 시점의 날짜 키 가져오기
  if (!todoData[dateKey]) todoData[dateKey] = [];

  todoData[dateKey].push({ text: taskText, completed: false });

  saveTodo();
  todoInput.value = "";
  renderTodo();
}

function toggleTodo(index) {
  const dateKey = getCurrentDateKey();
  todoData[dateKey][index].completed = !todoData[dateKey][index].completed;
  saveTodo();
  renderTodo();
}

function deleteTodo(index) {
  const dateKey = getCurrentDateKey();
  todoData[dateKey].splice(index, 1);
  saveTodo();
  renderTodo();
}

/* --- 5. 날짜 이동 및 이벤트 연결 --- */

function moveDay(offset) {
  currentViewDate.setDate(currentViewDate.getDate() + offset);
  renderDate();
  renderTodo();
}

document
  .getElementById("prev-btn")
  .addEventListener("click", () => moveDay(-1));
document.getElementById("next-btn").addEventListener("click", () => moveDay(1));
todoForm.addEventListener("submit", addTodo);

/* --- 6. 테마 변경 --- */
const themeToggle = document.getElementById("theme-btn");

function updateThemeUI(theme) {
  if (theme === "blueberry") {
    document.body.classList.add("blueberry-mode");
    themeToggle.textContent = "🫐";
  } else {
    document.body.classList.remove("blueberry-mode");
    themeToggle.textContent = "🍑";
  }
}

// 초기 테마 설정
updateThemeUI(localStorage.getItem("theme"));

themeToggle.addEventListener("click", () => {
  const isBlueberry = document.body.classList.toggle("blueberry-mode");
  const theme = isBlueberry ? "blueberry" : "peach";
  localStorage.setItem("theme", theme);
  updateThemeUI(theme);
});

// 첫 실행
renderDate();
renderTodo();

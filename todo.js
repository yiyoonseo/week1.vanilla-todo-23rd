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

/**
 * [변수 및 데이터 관리]
 */
let todoData = JSON.parse(localStorage.getItem("todoData")) || {};

const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoListElement = document.getElementById("todo-list");
const countElement = document.getElementById("todo-count");

const dateKey = `${currentViewDate.getFullYear()}-${currentViewDate.getMonth() + 1}-${currentViewDate.getDate()}`;

document.getElementById("prev-btn").addEventListener("click", moveToPrevDay);
document.getElementById("next-btn").addEventListener("click", moveToNextDay);
todoForm.addEventListener("submit", addTodo);

/**
 * [할 일 목록 및 개수 렌더링]
 */
function renderTodo() {
  const dateKey = `${currentViewDate.getFullYear()}-${currentViewDate.getMonth() + 1}-${currentViewDate.getDate()}`;
  const currentTodos = todoData[dateKey] || [];

  // 1. 개수 업데이트
  countElement.textContent = `${currentTodos.length}개`;

  // 2. 리스트 업데이트
  todoListElement.innerHTML = "";

  currentTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.className = "todo-item";
    if (todo.completed) li.classList.add("completed");

    li.innerHTML = `
    <div class="todo-left">
      <label class="checkbox-container">
        <input type="checkbox">
        <span class="custom-checkbox"></span>
      </label>
      <span class="todo-text"></span> </div>
    <button class="delete-btn">삭제</button>
  `;

    li.querySelector(".todo-text").textContent = todo.text;
    todoListElement.appendChild(li);
  });
}

function saveTodo() {
  localStorage.setItem("todoData", JSON.stringify(todoData));
}

/**
 * [할 일 추가 기능]
 */
function addTodo(event) {
  event.preventDefault();
  const taskText = todoInput.value.trim();
  if (!taskText) return;
  if (!todoData[dateKey]) {
    todoData[dateKey] = [];
  }

  // 텍스트와 완료 여부를 객체로 저장
  todoData[dateKey].push({ text: taskText, completed: false });

  saveTodo();
  todoInput.value = "";
  renderTodo();
}

renderTodo();

/**
 * [완료 체크 기능]
 */
function toggleTodo(index) {
  todoData[dateKey][index].completed = !todoData[dateKey][index].completed;
  saveTodo();
  renderTodo();
}

/**
 * [삭제 기능]
 */
function deleteTodo(index) {
  todoData[dateKey].splice(index, 1);
  saveTodo();
  renderTodo();
}

const button = document.querySelector("button");
const container = document.getElementById("container");
const input = document.querySelector("input");
const form = document.querySelector("form");
const tasksHeader = document.getElementById("tasks-header");

document.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    container.innerHTML += task;
  });
  toggleHeaderVisibility();
});

container.addEventListener("click", (eo) => {
  if (eo.target.classList.contains("icon-trash")) {
    eo.target.parentElement.parentElement.remove();
    updateLocalStorage();
    toggleHeaderVisibility();
  } else if (eo.target.classList.contains("icon-angry2")) {
    eo.target.classList.add("dn");
    const heart = `<span class="icon-heart"></span>`;

    eo.target.parentElement.parentElement
      .getElementsByClassName("text")[0]
      .classList.add("finish");

    eo.target.parentElement.innerHTML += heart;
    updateLocalStorage();
  } else if (eo.target.classList.contains("icon-heart")) {
    eo.target.parentElement.parentElement
      .getElementsByClassName("text")[0]
      .classList.remove("finish");
    eo.target.classList.add("dn");
    const angry2 = `<span class="icon icon-angry2"></span>`;
    eo.target.parentElement.innerHTML += angry2;
    updateLocalStorage();
  } else if (eo.target.classList.contains("icon-star")) {
    if (eo.target.classList.contains("orange")) {
      eo.target.classList.remove("orange");
    } else {
      eo.target.classList.add("orange");
      container.prepend(eo.target.parentElement);
    }
    updateLocalStorage();
  }
});

form.addEventListener("submit", (eo) => {
  eo.preventDefault();

  if (input.value.trim() === "") {
    return; 
  }

  const task = `
    <div class="task">
      <span class="icon icon-star"></span>
      <p class="text">  ${input.value}    </p>
      <div>
        <span class="icon icon-trash"></span>
        <span class="icon icon-angry2"></span>
      </div>
    </div>
  `;

  container.innerHTML += task;
  input.value = "";
  updateLocalStorage();
  toggleHeaderVisibility();
});

function updateLocalStorage() {
  const tasks = Array.from(container.children).map((task) => task.outerHTML);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function toggleHeaderVisibility() {
  if (container.children.length > 0) {
    tasksHeader.style.display = "block";
  } else {
    tasksHeader.style.display = "none";
  }
}

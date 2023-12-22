document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");

  setTimeout(() => title.classList.add("text-dark/100"), 600);

  const left = document.getElementById("left");
  const top = document.getElementById("top");
  const right = document.getElementById("right");

  const rightContent = document.getElementById("right-content");
  const leftContent = document.getElementById("left-content");
  const topContent = document.getElementById("top-content");

  document
    .getElementById("right-pannel")
    .addEventListener("click", (e) => expandPannel(right, rightContent));

  document
    .getElementById("close-right")
    .addEventListener("click", (e) => closePannel(right, rightContent));

  document
    .getElementById("left-pannel")
    .addEventListener("click", (e) => expandPannel(left, leftContent));

  document
    .getElementById("close-left")
    .addEventListener("click", (e) => closePannel(left, leftContent));

  const topPannel = document.getElementById("top-pannel");

  topPannel.addEventListener("click", (e) => {
    top.classList.add("h-screen");
    top.classList.add("w-screen");
    top.classList.remove("h-0");

    setTimeout(() => {
      topContent.classList.remove("hidden");
    }, 500);
  });

  document.getElementById("close-top").addEventListener("click", (e) => {
    top.classList.add("h-0");
    top.classList.remove("h-screen");
    topContent.classList.add("hidden");

    setTimeout(() => {
      top.classList.remove("w-screen");
    }, 500);
  });

  function expandPannel(panel, content) {
    panel.classList.add("h-screen");
    panel.classList.add("w-screen");
    panel.classList.remove("w-0");

    setTimeout(() => {
      content.classList.remove("hidden");
    }, 500);
  }

  function closePannel(panel, content) {
    panel.classList.add("w-0");
    panel.classList.remove("w-screen");
    content.classList.add("hidden");

    setTimeout(() => {
      panel.classList.remove("h-screen");
    }, 500);
  }
});

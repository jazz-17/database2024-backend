
let proyectos = [];
async function fetchData() {
  try {
    const response = await fetch("/api/proyectos");
    const listContainer = document.getElementById("item-list");
    proyectos = await response.json();
    renderList(proyectos, listContainer);
  } catch (error) {
    console.error("Error fetching data:", error);
    listContainer.textContent = "Error fetching data";
  }
}
function renderList(proyectos, listContainer) {
  listContainer.innerHTML = ""; // Clear any existing content
  proyectos.forEach((proyecto, index) => {
    const listItem = document.createElement("div");
    
    listItem.classList.add( "justify-evenly", "flex", "gap-2", "border", "border-gray-300", "p-2", "rounded-md")
    for (let key of proyecto) {
      const item = document.createElement("span");
      item.textContent = key;
      listItem.appendChild(item);
    }
    listContainer.appendChild(listItem);
  });
}

window.onload = fetchData;

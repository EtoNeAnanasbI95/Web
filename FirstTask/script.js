const cloneData = Array.from(document.getElementsByClassName("clone-data"))
Array.from(document.getElementsByClassName("clone-btn")).forEach((btn, index) => {btn.addEventListener("click", () => {cloneData[index].after(cloneData[index].cloneNode(true))})})

document.getElementById('append-btn').addEventListener('click', (e) => {
    const horseContainer = document.getElementById("horse-container")
    if (horseContainer.lastElementChild.id === 'horse1') horseContainer.append(document.getElementById("horse2").cloneNode(true));
    else horseContainer.append(document.getElementById("horse1").cloneNode(true))
})
document.getElementById('delete-btn').addEventListener('click', (e) => {
    const horseContainer = document.getElementById("horse-container")
    horseContainer.removeChild(horseContainer.lastElementChild)
})
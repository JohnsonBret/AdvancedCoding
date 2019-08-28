console.log("Dwarves JS Online");

const createDwarf = async()=>{
    let root = document.getElementById("root");

    let card = document.createElement("div");
    let image = document.createElement("img");
    let foodLevel = document.createElement("p");
    let buttonDiv = document.createElement("div");
    let feedButton = document.createElement("button");
    let slayButton = document.createElement("button");

    feedButton.innerHTML = "Feed";
    slayButton.innerHTML = "Slay";

    image.setAttribute("src", "Gimli.jpg");
    feedButton.setAttribute("id", "feed");
    slayButton.setAttribute("id", "slay");

    card.classList.add("card");

    card.appendChild(image);
    card.appendChild(foodLevel);
    card.appendChild(buttonDiv);

    buttonDiv.appendChild(feedButton);
    buttonDiv.appendChild(slayButton);

    root.appendChild(card);

    const rawResponse = await fetch('/dwarf/create', {
        method: 'GET',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
    });

    const responseJson = await rawResponse.json();

    console.log(`Our id is ${responseJson.dwarf._id}`);

    card.setAttribute("data-id", responseJson.dwarf._id);

    feedButton.addEventListener("click", async ()=>{
        console.log("Feed button clicked on Dwarf");

        const rawResponse = await fetch(`/feed/${responseJson.dwarf._id}`, {
            method: 'PATCH',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        });

        const patchedJson = await rawResponse.json();
        console.log(patchedJson.updatedDwarf.foodLevel);

        let foodText = `Food Level: ${patchedJson.updatedDwarf.foodLevel}`
        foodLevel.innerHTML = foodText;

        let foodNumber = parseInt(patchedJson.updatedDwarf.foodLevel);

        if(foodNumber == 10)
        {
            image.setAttribute("src", "fat_dwarf.gif");
            let fatText = document.createElement("p");
            card.appendChild(fatText);
            fatText.innerHTML = "Fat Boi";
        }

    });

    slayButton.addEventListener("click", async()=>{
        console.log("Slay button clicked");

        const rawResponse = await fetch(`/slay/${responseJson.dwarf._id}`, {
            method: 'DELETE',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        });

        const deletedJson = await rawResponse.json();

        console.log(`Dwarf is alive ${deletedJson.deletedDwarf.isAlive}`); 
        image.setAttribute("src", "gimli_dead.jpg");
    });

    setInterval(async ()=>{
        console.log("Send Ajax");

        const rawResponse = await fetch(`/hunger/${responseJson.dwarf._id}`, {
            method: 'PATCH',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        });

        const patchedJson = await rawResponse.json();
        console.log(patchedJson.updatedDwarf.foodLevel);
        foodLevel.innerHTML = patchedJson.updatedDwarf.foodLevel;

    }, 10000);
}    

let createDwarfButton = document.getElementById("create");

createDwarfButton.addEventListener("click", ()=>{
    console.log("Clicked Create Dwarf");
    createDwarf();
});
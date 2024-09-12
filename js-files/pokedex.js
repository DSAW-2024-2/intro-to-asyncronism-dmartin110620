const pokeList = document.querySelector("#pokeList");
const headerButtons = document.querySelector(".btn-header");

let URL = "https://pokeapi.co/api/v2/pokemon/";

const pikaURL = "https://pokeapi.co/api/v2/pokemon/25";
const bulbaURL = "https://pokeapi.co/api/v2/pokemon/1";
const charURL = "https://pokeapi.co/api/v2/pokemon/4";
const squirtURL = "https://pokeapi.co/api/v2/pokemon/7";


for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => showPokemon(data))
        .catch(error => console.error("Error fetching data:", error));
}

function showPokemon(poke) {
    let primaryType = poke.types[0].type.name;
    let secondaryTypeColor = `var(--${primaryType}-type)`;

    let pokeId = poke.id.toString();
    if (pokeId.length === 1 ) {
        pokeId = "00" +pokeId;
    } else if (pokeId.length ===2) {
        pokeId = "0" + pokeId
    }

    let types = poke.types.map((type) => `<p class="${type.type.name} type" ">${type.type.name}</p>`);
    types = types.join('');

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.style.backgroundColor = `var(--${primaryType})`;
    div.innerHTML = `
            <p class="poke-id-back">#${pokeId}</p>
            <div class="poke-img">
                <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
            </div>
            <div class="poke-info">
                <div class="id-name">
                    <p class="poke-id">#${pokeId}</p>
                    <h1 class="poke-name">${poke.name}</h1>
                </div>
                <div class="poke-type">
                    ${types}
                </div>
                <div class="poke-stats">
                    <p class="info-stat">Height: ${poke.height/10}m</p>
                    <p class="info-stat">Weight: ${poke.weight/10}kg</p>
                </div>
            </div>
    `;

    pokeList.append(div);
}

headerButtons.forEach(button => button.addEventListener("click", (ev) => {
    const buttonId = ev.currentTarget.id;

    pokeList.innerHTML = "";

    for (let i = 1; i <= 151; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => {
            console.log(data.types.map(type => type.type.name));
            
            if (buttonId === "see-all") {
                showPokemon(data);
            } else {
                const types = data.types.map(type => type.type.name);
                if (types.some(type => type.includes(buttonId))) {
                showPokemon(data);
                }
            }
        })
    }
}))

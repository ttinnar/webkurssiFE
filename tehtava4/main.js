document.addEventListener("DOMContentLoaded", function () {
    function createCard(entry) {
        const card = document.createElement("div");
        card.classList.add("card");

        const day = document.createElement("h3");
        day.textContent = entry.day || entry.name; // Otetaan huomioon sekä "day" että "name"

        const description = document.createElement("p");
        description.textContent = entry.description;

        const image = document.createElement("img");
        image.src = entry.address;
        image.alt = day.textContent;

        card.appendChild(day);
        card.appendChild(description);
        card.appendChild(image);

        return card;
    }

    function fetchDataAndCreateCards() {
        fetch("diary.json")
            .then(response => response.json())
            .then(data => {
                const diaryCardsContainer = document.getElementById("diaryCards");
                diaryCardsContainer.innerHTML = "";

                data.forEach(entry => {
                    const card = createCard(entry);
                    diaryCardsContainer.appendChild(card);
                });
            })
            .catch(error => console.error("Virhe tiedon hakemisessa:", error));
    }

    const fetchDataBtn = document.getElementById("fetchDataBtn");
    fetchDataBtn.addEventListener("click", fetchDataAndCreateCards);
});

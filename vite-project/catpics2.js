export function showCats(element) {
    async function getCats() {
        console.log('haetaa kuvat');

        try {
            //fetch
            const response = await fetch('catpics.json');
            if (!response.ok) throw new Error('INVALIIDI lol');
            const images = await response.json();

            images.forEach((item) => {
                console.log(`Nimi: ${item.name}`);
            });
            console.log(images);

            const random = Math.floor(Math.random() * images.length);
 
            console.log(images)
            const alt = images[random].name;     // the 'name' property of the second object in the 'images' array
            const figurecap = images[random].description; // 'description' property of the second object object in the 'images' array
            const imagesrc = images[random].address;

            //luodaan yks figure
            const cards = document.querySelector('#cards');
            // console.log(cards);

            if (!cards) {
                console.error("Element with ID 'cards' not found");
                return;
            }

            cards.innerHTML = '';

            const figure = document.createElement('figure');
            cards.appendChild(figure);

            const image = document.createElement('img');
            image.src = imagesrc;
            image.alt = alt;
            figure.appendChild(image);

            const figurecaption = document.createElement('figcaption'); // Corrected 'figcap' to 'figcaption'
            const node = document.createTextNode(figurecap);
            figurecaption.appendChild(node);
            figure.appendChild(figurecaption);

        } catch (error) {
            console.log(error);
        }
    }
    console.log(element);
    element.addEventListener('click', () => getCats());
}
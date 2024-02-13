export function showPics(element) {

    async function getPics() {
        console.log('haetaa kuvat');

        try {
            //fetch
            const response = await fetch('catpics.json');
            if (!response.ok) throw new Error('INVALIIDI lol');
            const images = await response.json();

            const random = Math.floor(Math.random() * images.lenght); 
            console.log(images)
            const alt = images[random].name;     // the 'name' property of the second object in the 'images' array
            const figurecap = images[random].description; // 'description' property of the second object object in the 'images' array
            const imagesrc = images[random].address;

            // haetaan kuvaelementti html:stä
            const kuva = document.querySelector('img');
            kuva.src = imagesrc;
            kuva.alt = alt;

            // haetaan kuvateksti
            const kuvateksti = document.querySelector('figcaption');
            kuvateksti.innerText = figurecap;
        } catch (error) {
            console.log(error);
        }
    }
    console.log(element);
    element.addEventListener('click', () => getPics());
}
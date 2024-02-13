export function showJoke(element) {
    async function getJoke() {
        console.log('Moiccu moi');
        
        try {
            // yritet채채 hakee
            const response = await fetch('https://api.chucknorris.io/jokes/random');
            console.log(response)
            if(!response.ok) throw new Error('INVALIIDI lol');

            const jokes = await response.json();
            console.log(jokes.value)

            // heitet채채 html puolelle
            document.querySelector('.show_joke').innerHTML = jokes.value;

        } catch (error) {
            // errorii jos ei onnistu
            console.log(error);
        }
    }
    
    console.log(element);
    element.addEventListener('click', () => getJoke());
}

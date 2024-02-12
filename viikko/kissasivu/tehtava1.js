height = screen.height;
width = screen.width;
document.getElementById("height").innerHTML = "Screen height: " + height + "px";
document.getElementById("width").innerHTML = "Screen width: " + width + "px";

let language = window.navigator.language;
document.getElementById("lang").innerHTML = "Browser language: " + language;

let w = innerWidth;
let h = innerHeight;
document.getElementById("w").innerHTML = "Browser Width: " + w + "px";
document.getElementById("h").innerHTML = "Browser Height: " + h + "px"


document.addEventListener('DOMContentLoaded', function () {
    // Funktio, joka muuntaa kuukauden numeron suomenkieliseksi nimeksi
    function haeSuomalainenKuukausi(nro) {
        const kuukaudet = ['tammikuuta', 'helmikuuta', 'maaliskuuta', 'huhtikuuta', 'toukokuuta', 'kesäkuuta', 'heinäkuuta', 'elokuuta', 'syyskuuta', 'lokakuuta', 'marraskuuta', 'joulukuuta'];
        return kuukaudet[nro];
    }

    // Funktio, joka palauttaa päivämäärän suomalaisessa muodossa
    function haeSuomalainenPvm() {
        const nyt = new Date();

        const paiva = nyt.getDate();
        const kuukausi = haeSuomalainenKuukausi(nyt.getMonth());
        const vuosi = nyt.getFullYear();

        return `${paiva}. ${kuukausi} ${vuosi}`;
    }

    // Funktio, joka palauttaa ajan tuntien ja minuuttien tarkkuudella
    function haeSuomalainenAika() {
        const nyt = new Date();

        const tunnit = nyt.getHours();
        const minuutit = nyt.getMinutes();

        return `${tunnit}:${minuutit}`;
    }

    // Hae päivämäärä ja aika
    const suomalainenPvm = haeSuomalainenPvm();
    const suomalainenAika = haeSuomalainenAika();

    // Yhdistä päivämäärä ja aika ja päivitä sivulle
    const aikaJaPvmElementti = document.getElementById('aikaJaPvm');
    aikaJaPvmElementti.textContent = `Nykyinen päivämäärä: ${suomalainenPvm}, Aika: ${suomalainenAika}`;
});
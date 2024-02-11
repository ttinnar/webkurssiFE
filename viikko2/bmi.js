'use strict';

let lowBmi = `Jos painoindeksi on alle 18,5, se merkitsee liiallista laihuutta. 
Sen syynä voi olla jokin pitkällinen sairaus tai 
laihuushäiriö eli anoreksia. Jos varsinaista 
sairautta ei ole, mutta painoindeksi on laskenut 
alle 18,5:n, pitää hakeutua lääkäriin. Jos paino 
muutamassa kuukaudessa on laskenut yli 20:n tasolta 
reilusti, on varminta mennä lääkäriin jo 
painoindeksin lähestyessä 19:ää.`;

let normalBmi = `Normaaliksi on valittu se painoindeksin alue, 
jossa ihmisen terveys on parhaimmillaan. 
Normaali painoindeksin alue on välillä 18,5-25. 
Jos painoindeksi on pienempi kuin 18,5 tai suurempi 
kuin 25, sairauksien vaara suurenee. Painoindeksiä 
voidaan käyttää 18 vuoden iästä lähtien.`;

let highBmi = `Kun painoindeksi ylittää 25, 
ollaan liikapainon puolella. Liikakilojen määrä voi 
vaihdella erittäin paljon, muutamasta kilosta moniin 
kymmeniin kiloihin. Siksi on hyödyllistä täsmentää, 
kuinka suuresta ylipainosta on kyse.`;



// BOM tiedot

//let age = 14;
//let teksti = 'MOOOOOOOI oon lol ' + age + ' vuoden ikäinen';
//console.log(teksti);
//let teksti2 = `MOI lol oon ${age} `;
//console.log(teksti2)



//tiedonhakua 
const analysis = document.querySelector('.analysis');
console.log(analysis.innerText);


//haetaan kaikki p elementit
const allP = document.querySelectorAll('p');
console.log(allP);


//käydään läpi for loopin avulla
for (const p of allP) {
    console.log('P elementin korkeus');
    console.log(p.offsetHeight);
}

// eventit!!!

//document.addEventListener( MIT KUUNNELLAAN JA TEHDÄÄN???);

document.addEventListener('keydown', function(e) {
    //console.log(e);
    console.log(e.key);
});


const button = document.querySelector('.calculate');
button.addEventListener('click', function (evt) {

    console.log('Nappulaa klikattiin');
    console.log(evt);



// Yleensä kun UI:sta saadaan aro niin se on lähtökohtaisesti
// STRING muotoinen
    const weight = Number(document.getElementById('weight').value);
    console.log(weight);

    const height = Number(document.getElementById('height').value);
    console.log(height)

    let yht = weight + height;
    console.log(yht)
    
    

    if (!weight || !height) {
        analysis.textContent = 
        'muista lisätä numerot';
    } else {
        resetfunktio();
        bmiLaskuri(weight, height);
    } 
});


var alhaisinBMI = null;



function bmiLaskuri(weight, height) {
    console.log('lasketaan bmi');
    let bmi = (weight / ((height * height) / 10000)).toFixed(1);
    console.log(bmi);
    document.querySelector('.bmi-score').textContent = bmi;
    //document.querySelector('.highscore').textContent = alhaisinBMI;

  
    if (alhaisinBMI === null || bmi < alhaisinBMI) {
        alhaisinBMI = bmi;
        document.querySelector('.highscore').textContent = alhaisinBMI;
    }
    

    if(bmi < 19) {
        document.querySelector('.analysis').textContent = lowBmi;
        document.querySelector('.bmi0-19').style.color = 'black'; 
        document.querySelector('.bmi0-19').classList.add('lowBmi');
    } 
    if (bmi > 25) {
        document.querySelector('.analysis').textContent = highBmi;
        document.querySelector('.bmi25-30').style.color = 'black'; 
        document.querySelector('.bmi25-30').classList.add('highBmi');
    } 
    if (bmi >= 19 && bmi <= 25) {
        document.querySelector('.analysis').textContent = normalBmi;
        document.querySelector('.bmi19-25').style.color = 'black'; 
        document.querySelector('.bmi19-25').classList.add('normalBmi');
    }
}



function resetfunktio() {
    // Hae kaikki elementit, joilla on luokka
    var elementsWithClass = document.querySelectorAll('.lowBmi, .normalBmi, .highBmi');

    // Käy läpi jokainen elementti ja poista kaikki luokat
    elementsWithClass.forEach(function(element) {
        element.classList.remove('lowBmi', 'normalBmi', 'highBmi');
        element.style.color = ''; // Nollaa mahdolliset värit
    });

    // Aseta koko sivun tyylit tyhjäksi merkkijonoksi
    document.body.style = '';
}

bmiLaskuri(weight, height);
export class rosario {
    constructor(){}

    misterios = [
        {
            name: 'Gozosos',
            days: [1,6],
            title: [
                'La Encarnación del Hijo de Dios',
                'La Visitación de Nuestra Señora a su prima santa Isabel',
                'El Nacimiento del Hijo de Dios.',
                'La Presentación de Jesús en el templo.'
            ]
        },
        {
            name: 'Gloriosos',
            days: [3,7],
            title: [
                'La Resurrección del Hijo de Dios.',
                'La Ascensión del Señor a los Cielos',
                'La Venida del Espíritu Santo sobre los Apóstoles.',
                'La Asunción de nuestra Señora a los Cielos.',

            ]
        },
        {
            name: 'Dolorosos ',
            days: [2,5],
            title: [
                'La Oración de Jesús en el huerto.',
                'La Flagelación del Señor.',
                'La Coronación de espinas.',
                ' Jesús con la Cruz a cuestas, camino del Calvario.'
            ]
        },
        {
            name: 'Luminosos',
            days: [4],
            title: [
                'El Bautismo de Jesús en el Jordán.',
                'La autorrevelación de Jesús en las bodas de Caná.',
                'El anuncio del Reino de Dios invitando a la conversión.',
                'La Transfiguración.'
            ]
        },
    ];

    getMisterio() {
        const today = new Date().getDay();
        return Object.values(this.misterios).find(m => m.days.join().includes(today));
    };

    drawMisterio(){
        const title = document.querySelector('.misterio h3');
        const paragraph = document.querySelector('.misterio p');
        const misterioObj = this.getMisterio();
        console.log({ misterioObj})
        title.innerHTML=`Misterios ${misterioObj.name}`;
        paragraph.innerHTML = misterioObj.title[0];
    }

    /**
     * @todo terminar secuencia de rosario
     */
    bodyRosario(){
        const pasos = [
            {inicio:[
                'Acto de contrición',
            ]},
            {repeat:[
                'N misterio',
                'Padrenuestro',
                'Ave María x10',
                'Gloria',
                'María, Madre de gracia...',
                'Oh Jesús mío',
                'Música',
            ]},
            {end:[
                'Letanías',
                'Cordero de Dios',
                'Oración',
                'Ave María',
                'Gloria',
                'Salve'
            ]}

        ]
    }
};

export class drawRosario {

    constructor(ballsNum){
        this.init(ballsNum)
    }

    createPasos(element) {
        const pasoEl = document.createElement('span');
        pasoEl.classList.add('pasos');
        element.appendChild(pasoEl);
    }

    createContainers(element, pasosQty) {
        const pasosContainerEl = document.createElement('div');
        pasosContainerEl.classList.add('pasos-container');
        element.appendChild(pasosContainerEl);

        for (let paso = 0; paso < pasosQty; paso++) {
            this.createPasos(pasosContainerEl)
        }
    }

    createRosario(numberSteps) {
        const rosarioEl = document.querySelector('#rosario');
        const isContainerDouble = numberSteps > 5 ? 2 : 1;

        for (let i = 0; i < isContainerDouble; i++) {
            this.createContainers(
                rosarioEl,
                (numberSteps / isContainerDouble)
            );
        }
    }

    handleRosario(maxBalls = 9) {
        const ballsEl = document.querySelectorAll('.pasos');
        let indexBall = 0;

        const removeAllClass = () => {
            ballsEl.forEach(ball => ball.classList.remove('picked'))
        };

        const actionKey = (keyNum, maxQty) => {
            let movement = keyNum === 'ArrowRight' ?
                indexBall + 1 : keyNum === 'ArrowLeft' ?
                    indexBall - 1 : 0;

            indexBall = movement < 1 ? 0 : movement > maxQty ? maxQty : movement;
            removeAllClass();
            ballsEl[indexBall].classList.add('picked');
        };

        document.addEventListener('keydown', evt => actionKey(evt.key, maxBalls));
        actionKey(null, maxBalls);
    }

    init(balls) {
        this.createRosario(balls);
        this.handleRosario(balls - 1);
    }

}
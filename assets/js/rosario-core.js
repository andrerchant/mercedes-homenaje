export class rosario {
    graphRosario=null;
    constructor(){
        this.graphRosario = new drawRosario();
    }

    indexRosario = 0;

    secuencia = [
        'Primer',
        'Segundo',
        'Tercero',
        'Cuarto',
        'Quinto'
    ];

    misterios = [
        {
            name: 'Gozosos',
            days: [1,6],
            title: [
                'La encarnación del hijo de Dios',
                'La visitación de nuestrasSeñora a su prima santa Isabel',
                'El nacimiento del hijo de Dios.',
                'La presentación de Jesús en el templo.',
                'El niño Jesús perdido y hallado en el templo.'
            ]
        },
        {
            name: 'Gloriosos',
            days: [3,7],
            title: [
                'La resurrección del hijo de Dios.',
                'La ascensión del señor a los cielos',
                'La venida del Espíritu santo sobre los apóstoles.',
                'La asunción de nuestra señora a los cielos.',
                'La coronación de la Santísima Virgen como reina de cielos y tierra.'
            ]
        },
        {
            name: 'Dolorosos ',
            days: [2,5],
            title: [
                'La oración de Jesús en el huerto.',
                'La flagelación del Señor.',
                'La Coronación de espinas.',
                'Jesús con la cruz a cuestas, camino del calvario.',
                'La crucifixión y muerte de nuestro señor.'
            ]
        },
        {
            name: 'Luminosos',
            days: [4],
            title: [
                'El bautismo de Jesús en el Jordán.',
                'La autorrevelación de Jesús en las bodas de Caná.',
                'El anuncio del reino de Dios invitando a la conversión.',
                'La transfiguración.',
                'La institución de la eucaristía.'
            ]
        },
    ];

    pasos = [
        {
            inicio: [
                'Acto de contrición',
            ]
        },
        {
            repeat: [
                'N misterio',
                'Padrenuestro',
                'Ave María x10',
                'Gloria',
                'María, madre de gracia...',
                'Oh Jesús mío',
                'Música',
            ]
        },
        {
            end: [
                'Letanías',
                'Cordero de Dios',
                'Oración',
                'Ave María',
                'Gloria',
                'Salve'
            ]
        }

    ];

    getMisterio() {
        const today = new Date().getDay();
        return Object.values(this.misterios).find(m => m.days.join().includes(today));
    };

    drawMisterio(){
        const title = document.querySelector('.misterio h3');
        // const paragraph = document.querySelector('.misterio p');
        const misterioObj = this.getMisterio();
        title.innerHTML=`Misterios ${misterioObj.name}`;
        // paragraph.innerHTML = misterioObj.title[0];
    }

    duplicateArray = (_array,times) => {
        const bigArray = [];
        for(let i = 0; i < times; i++){
            const _newArray = _array.slice(0);
            const misterioIndex = _newArray.findIndex(text => text.includes('N misterio'));
            _newArray[misterioIndex] = `${this.secuencia[i]} misterio: ${this.getMisterio().title[i]}`
            bigArray.push(_newArray);
        }
        return bigArray.flat()
    }
    
    renderRosario = () => 
        Object.values(this.pasos)
            .map(paso => {
                if (Object.keys(paso).includes('repeat')) return this.duplicateArray(paso.repeat,5);
                return Object.values(paso);
            }).flat(2)
    ;
    
    emulate = (action)=>{
        const processEl = document.querySelector('.in-process');
        const rosarioParts = this.renderRosario();
        
        if (action === 'start') { this.indexRosario = 0}
        if (action === 'next') { this.indexRosario ++}
        if (action === 'before' && this.indexRosario > 0) { this.indexRosario --}

        console.log({ rosarioIndex:this.indexRosario, action})
        processEl.innerText = rosarioParts[this.indexRosario];
        
        this.manageRosario(this.indexRosario, rosarioParts);
    }

    manageRosario(index, rosarioParts){
        if (rosarioParts[index].includes('Ave María x10')){
            this.graphRosario.init(10);
            this.graphRosario.handleRosario();
        } else this.graphRosario.removeRosario()
    }
};

class drawRosario {

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

    removeRosario(){
        const rosarioEl = document.querySelector('#rosario');
        const containersEls = document.querySelectorAll('.pasos-container');
        containersEls.forEach(containerEl => rosarioEl.removeChild(containerEl) )
    }

}
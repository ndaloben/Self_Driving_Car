const carCanvas=document.getElementById("carCanvas");
carCanvas.width=200;


const carCtx = carCanvas.getContext("2d");

const road = new Road(carCanvas.width/2,carCanvas.width*.92);

const N=1;
const cars = generateCars(N);
let bestCar = cars[0];
if(localStorage.getItem("bestBrain")){
    for(let i=0;i<cars.length;i++){
    cars[i].brain=JSON.parse(
        localStorage.getItem("bestBrain"));
        if(i!=0){
            NeuralNetwork.mutate(cars[i].brain,0.1);
        }
    }
}

const traffic=[
    new Car(road.getLaneCenter(2),-100,30,50,"DUMMY",9,getRandomColor()),
    new Car(road.getLaneCenter(2),3000,30,50,"DUMMY",12.7,getRandomColor()),
    new Car(road.getLaneCenter(0),500,30,50,"DUMMY",12.2,getRandomColor()),
    new Car(road.getLaneCenter(1),500,30,50,"DUMMY",12.38,getRandomColor()),
    new Car(road.getLaneCenter(0),1900,30,50,"DUMMY",12.5,getRandomColor()),
    new Car(road.getLaneCenter(0),-100,30,50,"DUMMY",9.2,getRandomColor()),
    new Car(road.getLaneCenter(1),-400,30,50,"DUMMY",9.4,getRandomColor()),
    new Car(road.getLaneCenter(0),-700,30,50,"DUMMY",9.6,getRandomColor()),
    new Car(road.getLaneCenter(1),-1000,30,50,"DUMMY",9.8,getRandomColor()),
    new Car(road.getLaneCenter(2),-1300,30,50,"DUMMY",10,getRandomColor()),
    new Car(road.getLaneCenter(2),-1600,30,50,"DUMMY",10.2,getRandomColor()),
    new Car(road.getLaneCenter(0),-1900,30,50,"DUMMY",10.4,getRandomColor()),
    new Car(road.getLaneCenter(1),-2100,30,50,"DUMMY",10.6,getRandomColor()),
    new Car(road.getLaneCenter(2),-2400,30,50,"DUMMY",10.8,getRandomColor()),
    new Car(road.getLaneCenter(1),-2700,30,50,"DUMMY",11,getRandomColor()),
    new Car(road.getLaneCenter(0),-3000,30,50,"DUMMY",11.2,getRandomColor()),
    new Car(road.getLaneCenter(2),-3300,30,50,"DUMMY",11.4,getRandomColor()),
    new Car(road.getLaneCenter(1),-3600,30,50,"DUMMY",11.4,getRandomColor()),
    new Car(road.getLaneCenter(2),-3900,30,50,"DUMMY",11.4,getRandomColor()),
    new Car(road.getLaneCenter(0),-4200,30,50,"DUMMY",11.3,getRandomColor()),
    new Car(road.getLaneCenter(2),-4500,30,50,"DUMMY",11.5,getRandomColor()),
    new Car(road.getLaneCenter(1),-4800,30,50,"DUMMY",11.2,getRandomColor()),
    new Car(road.getLaneCenter(0),-5100,30,50,"DUMMY",11.4,getRandomColor()),
    new Car(road.getLaneCenter(2),-5400,30,50,"DUMMY",11.4,getRandomColor()),
    new Car(road.getLaneCenter(1),-5600,30,50,"DUMMY",11.6,getRandomColor()),
    new Car(road.getLaneCenter(1),5600,30,50,"DUMMY",16,getRandomColor()), 
    new Car(road.getLaneCenter(0),6800,30,50,"DUMMY",18,getRandomColor()), 
    new Car(road.getLaneCenter(2),15800,30,50,"DUMMY",22,getRandomColor()), 
    new Car(road.getLaneCenter(0),15000,30,50,"DUMMY",20,getRandomColor()), 
    new Car(road.getLaneCenter(0),16000,30,50,"DUMMY",17,getRandomColor()), 
    new Car(road.getLaneCenter(0),15000,30,50,"DUMMY",14,getRandomColor()), 
    new Car(road.getLaneCenter(2),15000,30,50,"DUMMY",15,getRandomColor()), 
];

animate();

function save(){
    localStorage.setItem("bestBrain",
          JSON.stringify(bestCar.brain)
    );
}

function discard(){
    localStorage.removeItem("bestBrain");
}

function generateCars(N){
    const cars=[];
    for(let i=1;i<=N;i++){
        cars.push(new Car(road.getLaneCenter(1),100,30,50,"AI"));
    }
    return cars;
}

function animate(){
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    for(let i=0;i<cars.length;i++){
        cars[i].update(road.borders,traffic);
    }

    bestCar=cars.find(
        c=>c.y==Math.min(
            ...cars.map(c=>c.y)
        ));

    carCanvas.height=window.innerHeight; 


    carCtx.save();
    carCtx.translate(0,-bestCar.y+carCanvas.height*.7);

    road.draw(carCtx);
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(carCtx,"black");
    }
    carCtx.globalAlpha=0.2;
    for(let i=0;i<cars.length;i++){
        cars[i].draw(carCtx,"blue");
    }
    carCtx.globalAlpha=1;
    bestCar.draw(carCtx,"blue",true);


    carCtx.restore();

    requestAnimationFrame(animate);
}

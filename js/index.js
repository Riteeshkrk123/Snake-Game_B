//Game Constants & Variables
let inpDir={x:0, y:0};
const foodMusic=new Audio("../music/food.mp3");
const gameoverMusic=new Audio("../music/gameover.mp3")
const moveMusic=new Audio("../music/move.mp3");
const gameMusic=new Audio("../music/music.mp3");
let speed=14;
let lastPaintTime=0;
let snakeArr=[{
    x:3, y:6
}]
let score=0;
food={ x:6, y:7};


//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if(((ctime-lastPaintTime)/1000< 1/speed))
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();
   

}

function isCollide(sarr)
{
    //If snake bumps into itself
    for(let i=1; i<sarr.length; i++)
    {
        if(sarr[0].x===sarr[i].x && sarr[0].y===sarr[i].y)
        return true;
    }
    //If snakes collides with the wall
        if(sarr[0].x >=18 || sarr[0].x <=0 || sarr[0].y >=18 || sarr[0].y <=0 )
        return true;
    
}
function gameEngine(){
  
gameMusic.play();

    if(isCollide(snakeArr)){
        gameoverMusic.play();
        gameMusic.pause();
        inpDir={x:0, y:0};
        alert("Game Over. Press Any key to play again");
        snakeArr=[{
            x:3, y:6
        }]
       // gameMusic.play();
        score=0;

    }

    //If snake ate the food, then increment the score and give new food position
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
        score+=1;
        scorebox.innerHTML=`Score : ${score}`;
        if(score>highscoreval){
            highscoreval = score;
            localStorage.setItem("highscore", JSON.stringify(highscoreval));
            highscorebox.innerHTML = "High Score: " + highscoreval;
        }
        
        foodMusic.play();
        snakeArr.unshift({x:snakeArr[0].x+inpDir.x,y:snakeArr[0].y+inpDir.y})
        let a=2;
        let b=16;
        food={x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random())}
        for(let i=i; i<snakeArr.length; i++)
        {
            if(snakeArr[i].y===food.y &&  snakeArr[i].x===food.x)
            {
                let indy=1;
                let indx=1;
            while(!(indx && indy))
            {
                indy=snakeArr[i].y===food.y;            
                indx=snakeArr[i].x===food.x;
                food={x: Math.round(a+(b-a)* Math.random()), y: Math.round(a+(b-a)* Math.random())}
            }
        }

        }
    }


    //Moving the Snake 

    for(let i=snakeArr.length-2; i>=0; i--)
    {

        snakeArr[i+1]={...snakeArr[i]};
    }

    snakeArr[0].x += inpDir.x;
    snakeArr[0].y += inpDir.y;

    //Display snake and food 
    board.innerHTML="";
    snakeArr.forEach((e, index)=>{
        let snakeElement=document.createElement("div");
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0){
            snakeElement.classList.add("head");
        }
        else{
        snakeElement.classList.add("snakeBody");
        }
        board.appendChild(snakeElement)
    });

    foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

let highscore = localStorage.getItem("highscore");
if(highscore === null){
    highscoreval = 0;
    localStorage.setItem("highscore", JSON.stringify(highscoreval))
}
else{
    highscoreval = JSON.parse(highscore);
    highscorebox.innerHTML = "High Score: " + highscore;
}

//Logic
window.requestAnimationFrame(main);
window.addEventListener("keydown", e =>{
    inpDir={x:0, y:1};
    moveMusic.play();
    switch(e.key)
    {
            case "ArrowUp": 
            inpDir.x=0;
            inpDir.y=-1;
            //console.log("ArrowUp");
            break;

            case "ArrowDown": 
            inpDir.x=0;
            inpDir.y=1;
           // console.log("ArrowDown");
            break;

            case "ArrowLeft": 
            inpDir.x=-1;
            inpDir.y=0;
            //console.log("ArrowLeft");
            break;

            case "ArrowRight": 
            inpDir.x=1;
            inpDir.y=0;
            //console.log("ArrowRight");
            break;

            default:
                break;
    }
})

// // Game Constants & Variables
// let inputDir = {x: 0, y: 0}; 
// const foodSound = new Audio('music/food.mp3');
// const gameOverSound = new Audio('music/gameover.mp3');
// const moveSound = new Audio('music/move.mp3');
// const musicSound = new Audio('music/music.mp3');
// let speed = 19;
// let score = 0;
// let lastPaintTime = 0;
// let snakeArr = [
//     {x: 13, y: 15}
// ];

// food = {x: 6, y: 7};

// // Game Functions
// function main(ctime) {
//     window.requestAnimationFrame(main);
//     // console.log(ctime)
//     if((ctime - lastPaintTime)/1000 < 1/speed){
//         return;
//     }
//     lastPaintTime = ctime;
//     gameEngine();
// }

// function isCollide(snake) {
//     // If you bump into yourself 
//     for (let i = 1; i < snakeArr.length; i++) {
//         if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
//             return true;
//         }
//     }
//     // If you bump into the wall
//     if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
//         return true;
//     }
        
//     return false;
// }

// function gameEngine(){
//     // Part 1: Updating the snake array & Food
//     if(isCollide(snakeArr)){
//         gameOverSound.play();
//         musicSound.pause();
//         inputDir =  {x: 0, y: 0}; 
//         alert("Game Over. Press any key to play again!");
//         snakeArr = [{x: 13, y: 15}];
//         musicSound.play();
//         score = 0; 
//     }

//     // If you have eaten the food, increment the score and regenerate the food
//     if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
//         foodSound.play();
//         score += 1;
//         if(score>highscoreval){
//             highscoreval = score;
//             localStorage.setItem("highscore", JSON.stringify(highscoreval));
//             highscoreBox.innerHTML = "highscore: " + highscoreval;
//         }
//         scoreBox.innerHTML = "Score: " + score;
//         snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
//         let a = 2;
//         let b = 16;
//         food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
//     }

//     // Moving the snake
//     for (let i = snakeArr.length - 2; i>=0; i--) { 
//         snakeArr[i+1] = {...snakeArr[i]};
//     }

//     snakeArr[0].x += inputDir.x;
//     snakeArr[0].y += inputDir.y;

//     // Part 2: Display the snake and Food
//     // Display the snake
//     board.innerHTML = "";
//     snakeArr.forEach((e, index)=>{
//         snakeElement = document.createElement('div');
//         snakeElement.style.gridRowStart = e.y;
//         snakeElement.style.gridColumnStart = e.x;

//         if(index === 0){
//             snakeElement.classList.add('head');
//         }
//         else{
//             snakeElement.classList.add('snake');
//         }
//         board.appendChild(snakeElement);
//     });
//     // Display the food
//     foodElement = document.createElement('div');
//     foodElement.style.gridRowStart = food.y;
//     foodElement.style.gridColumnStart = food.x;
//     foodElement.classList.add('food')
//     board.appendChild(foodElement);


// }


// // Main logic starts here
// musicSound.play();
// let highscore = localStorage.getItem("highscore");
// if(highscore === null){
//     highscoreval = 0;
//     localStorage.setItem("highscore", JSON.stringify(highscoreval))
// }
// else{
//     highscoreval = JSON.parse(highscore);
//     highscoreBox.innerHTML = "highscore: " + highscore;
// }

// window.requestAnimationFrame(main);
// window.addEventListener('keydown', e =>{
//     inputDir = {x: 0, y: 1} // Start the game
//     moveSound.play();
//     switch (e.key) {
//         case "ArrowUp":
//             console.log("ArrowUp");
//             inputDir.x = 0;
//             inputDir.y = -1;
//             break;

//         case "ArrowDown":
//             console.log("ArrowDown");
//             inputDir.x = 0;
//             inputDir.y = 1;
//             break;

//         case "ArrowLeft":
//             console.log("ArrowLeft");
//             inputDir.x = -1;
//             inputDir.y = 0;
//             break;

//         case "ArrowRight":
//             console.log("ArrowRight");
//             inputDir.x = 1;
//             inputDir.y = 0;
//             break;
//         default:
//             break;
//     }

// });
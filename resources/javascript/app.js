const pad = document.querySelector('.sketch-pad');
const clearPad = document.querySelector('#clear');
const btns = document.querySelectorAll('button');
let currentColor = [200, 159, 34, 1];
let rainbowPenActive = false;

createGrid(16);

function createGrid(num){
    for(let row = 0; row < num; row++){
        const div = document.createElement('div');
        div.classList.add('sketch-row');
        pad.appendChild(div);
        for(let col = 0; col < num; col++){
            const content = document.createElement('div');
            content.classList.add('sketch-block');
            content.style.width = 500/num + "px";
            content.style.height = 500/num + "px";
            div.appendChild(content);
            content.addEventListener('mouseover', e => {
                e.target.style.background = `rgba(${currentColor})`;
                if(rainbowPenActive){
                    rainbowPen();
                }
            });
        }
    }
}

btns.forEach(btn => {
    btn.addEventListener('click', e => {
        if (e.target.id == "rainbow")
            rainbowPenActive = rainbowPenActive ? false : true;
        else if (e.target.id == "clear")
            clear();
    });
});

function clear(){
    const blocks = document.querySelectorAll('.sketch-block');
    blocks.forEach(block => {
        block.style = 'background-color: white';
    });
    createGrid(16);
}

function rainbowPen(){
    const blocks = document.querySelector('.sketch-block');
    let red = (Math.floor(Math.random()*155)+100);
    let green = (Math.floor(Math.random()*255)+000);
    let blue = Math.floor(Math.random() * 0);
    let alpha = (0.5 * Math.random() + 0.2);
    currentColor = [red, green, blue, alpha];
    blocks.forEach(block =>{
        block.style.background = `rgba(${currentColor})`;
    });
    
}


const pad = document.querySelector('.sketch-pad');
const clearPad = document.querySelector('#clear');
const btns = document.querySelectorAll('button');
const colorPicker = document.querySelector('#pen-color');
const slider = document.querySelector('#canvas-size');
let currentColor = [245, 222, 179, 1];
let rainbowPenActive = false;
let grayScaleActive = false;

createGrid(16); //create initial grid

//creates grid
/* Explanation:
 * 
 *  The first for loop creates the amount of rows needed on
 *  the canvas based on the num passed to the function. It 
 *  creates the divs, gives them the class name, and appends
 *  them to the parent div '(.sketch-pad)'.
 * 
 *  After a single row has been added, the next for loop is executed--
 *  adding individual div blocks (or the pixels on the canvas) based on
 *  the total size of the canvas. Because the canvas' size is 500px x 500px
 *  we divide that by the total num passed into the function to get the 
 *  correct amount of rows and columns within 500px.
 * 
 *  Since a dynamically created div does not respond to an 'addEventListener',
 *  I added an event listener to each created div so that it is available upon 
 *  creation. 
 *   
 *  It will also check if the rainbow pen is active, and provide the correct
 *  currentColor
 */
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
                if(rainbowPenActive)
                    rainbowPen();
                else if(grayScaleActive)
                    grayScale(e);
                else if(!grayScaleActive)
                    e.target.style.opacity = 1;
                e.target.style.background = `rgba(${currentColor})`;
            });
        }
    }
}

//convert color picker's hex value to rgb format
    /*  The way to convert hex to rgb is to grab the
     *  first two characters, and turn them into an integer
     *  of the specified base in mathematical numeral systems (16)
     *  **NOTE that this does not work with hex shortcuts like #fff
     *  but since the color picker does not use shortcuts, we could use
     *  this here.
     */
function hexToRGB(hex){
    let color = [];
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    return color = [r, g, b];
}

//get each block div, turn them white, and reset the grid.
function clear(){
    const blocks = document.querySelectorAll('.sketch-block');
    blocks.forEach(block => {
        block.style = 'background-color: yellow';
    });
    createGrid(slider.value);
}

//randomize the red, green, blue, and alpha values to the currentColor
function rainbowPen(){
    grayScaleActive = false;
    let red = (Math.floor(Math.random()*155)+100);
    let green = (Math.floor(Math.random()*255)+000);
    let blue = Math.floor(Math.random() * 0);
    let alpha = (0.5 * Math.random() + 0.2);
    currentColor = [red, green, blue, alpha];
}

//make the cursor produce white pixels instead of erasing the divs
function eraser(){
    rainbowPenActive = false;
    grayScaleActive = false;
    currentColor = [255,255,255,0];
}

//make the curson produce black pixels
function blackPen(){
    rainbowPenActive = false;
    grayScaleActive = false;
    currentColor = [0,0,0,1];
}

function grayScale(e){
    rainbowPenActive = false;
    let that = e.target;
    if(parseFloat(that.style.opacity) <= 0.9){
        that.style.background = `rgba(${currentColor = [0, 0, 0,]})`;
        that.style.opacity = parseFloat(that.style.opacity) + 0.1;
    }   
    
    else if((parseFloat(that.style.opacity) == 1) && (that.style.background == "rgb(0, 0, 0)"))
        return;

    else{
        that.style.background = `rgba(${currentColor = [0, 0, 0,]})`;
        that.style.opacity = 0.2;
    }
}

//Event Listeners

//calls the clear method to erase the canvas, and create a new
//grid based on the slider's value.
slider.addEventListener('mouseup', e => {
    clear();
});

//check each button corresponding to the user's pen option & excute function
btns.forEach(btn => {
    btn.addEventListener('click', e => {
        if (e.target.id == "rainbow")
            rainbowPenActive = true;
        else if (e.target.id == "clear")
            clear();
        else if (e.target.id == "eraser")
            eraser();
        else if (e.target.id == "black")
            blackPen();
        else if(e.target.id == "gray")
            grayScaleActive = true;
    });
});

//get the hex value of the color picker input and convert it to RGB
colorPicker.addEventListener('input', e => {
    grayScaleActive = false;
    rainbowPenActive = false;
    const hex = e.target.value;
    currentColor = hexToRGB(hex);
});

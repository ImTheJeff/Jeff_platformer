<<<<<<< HEAD:Objects/Player/controls.js
class Controls {
    static keys = { 
        'left':false, //default, when the keys aren't pressed 
        'right':false,
        'up':false,
        'down':false
    };

    static keyDown(key) { //sets the value required for the move() function to work when a key is held down
        if (['a', 'ArrowLeft'].includes(key)) Controls.keys['Left'] = true;
        if (['d', 'ArrowRight'].includes(key)) Controls.keys['Right'] = true;
        if (['w', 'ArrowUp', ' '].includes(key)) Controls.keys['Up'] = true;
        if (['s', 'ArrowDown'].includes(key)) Controls.keys['Down'] = true;
        console.log(key);
    }

    static keyUp(key) { //sets the value back to false so the player stops when releasing a key 
        if (['a', 'ArrowLeft'].includes(key)) Controls.keys['Left'] = false;
        if (['d', 'ArrowRight'].includes(key)) Controls.keys['Right'] = false;
        if (['w', 'ArrowUp', ' '].includes(key)) Controls.keys['Up'] = false;
        if (['s', 'ArrowDown'].includes(key)) Controls.keys['Down'] = false;
    }
}

document.addEventListener('keydown', (e) => Controls.keyDown(e.key)); //checks if a key is held down 
document.addEventListener('keyup', (e) => Controls.keyUp(e.key)); 

=======
class Controls {
    static keys = {
        'left':false,
        'right':false,
        'up':false,
        'down':false
    };

    static keyDown(key) {
        if (['a', 'ArrowLeft'].includes(key)) Controls.keys['Left'] = true;
        if (['d', 'ArrowRight'].includes(key)) Controls.keys['Right'] = true;
        if (['w', 'ArrowUp', ' '].includes(key)) Controls.keys['Up'] = true;
        if (['s', 'ArrowDown'].includes(key)) Controls.keys['Down'] = true;
        console.log(key);
    }

    static keyUp(key) {
        if (['a', 'ArrowLeft'].includes(key)) Controls.keys['Left'] = false;
        if (['d', 'ArrowRight'].includes(key)) Controls.keys['Right'] = false;
        if (['w', 'ArrowUp', ' '].includes(key)) Controls.keys['Up'] = false;
        if (['s', 'ArrowDown'].includes(key)) Controls.keys['Down'] = false;
    }
}

document.addEventListener('keydown', (e) => Controls.keyDown(e.key));
document.addEventListener('keyup', (e) => Controls.keyUp(e.key));

>>>>>>> parent of 38f6c1a (notes and some fixing):controls.js

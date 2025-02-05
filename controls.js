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


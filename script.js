// Star Mouse Trail
const starSize = 0.5; // Star scale
function mouseTrail() {
    let x1 = 0, y1 = 0;
    const vh = Math.max(document.documentElement.scrollHeight || 0, window.innerHeight || 0);
    const dist_to_draw = 50, delay = 1000;
    const fsize = [
        `${0.8 * starSize}rem`,
        `${1.1 * starSize}rem`,
        `${1.4 * starSize}rem`,
        `${1.7 * starSize}rem`
    ];
    const colors = ['#F9F3EE', '#E1F8DC', '#B8AFE6', '#AEE1CD', '#5EB0E5'];

    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const selRand = o => o[rand(0, o.length - 1)];

    const addStr = (x, y) => {
        const str = document.createElement("div");
        str.innerHTML = '&#10022;';
        str.className = 'star';
        str.style.top = `${y + rand(-20, 20)}px`;
        str.style.left = `${x}px`;
        str.style.color = selRand(colors);
        str.style.fontSize = selRand(fsize);
        document.body.appendChild(str);

        const fs = 10 + 5 * parseFloat(getComputedStyle(str).fontSize);

        str.animate({
            translate: `0 ${(y + fs) > vh ? vh - y : fs}px`,
            opacity: 0,
            transform: `rotateX(${rand(1, 500)}deg) rotateY(${rand(1, 500)}deg)`
        }, { duration: delay, fill: 'forwards' });

        setTimeout(() => str.remove(), delay);
    };

    addEventListener("mousemove", e => {
        const { clientX, pageY } = e;
        if (Math.hypot(clientX - x1, pageY - y1) >= dist_to_draw) {
            addStr(clientX, pageY);
            x1 = clientX;
            y1 = pageY;
        }
    });
}
mouseTrail();
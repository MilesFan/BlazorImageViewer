let mousemove = function (event) {
    const style = window.getComputedStyle(this.element);
    this.offsetX += event.movementX;
    this.offsetY += event.movementY;
    this.element.style['background-position-x'] = `calc(50% + ${this.offsetX}px)`;
    this.element.style['background-position-y'] = `calc(50% + ${this.offsetY}px)`;
};
let mouseuporleave = function (event) {
    document.body.removeEventListener('mousemove', this.mousemoveFunc);
    ['mouseup', 'mouseleave'].forEach(evt => {
        document.body.removeEventListener(evt, this.mouseuporleaveFunc);
    });
};

export async function initializeImageViewer(element) {
    let info = {
        element : element,
        offsetX: 0,
        offsetY: 0,
        mousemoveFunc: null,
        mouseuporleaveFunc: null,
        scale: 100
    }
    info.mousemoveFunc = mousemove.bind(info);
    info.mouseuporleaveFunc = mouseuporleave.bind(info);

    element.addEventListener('mousedown', function (event) {
        document.body.addEventListener('mousemove', info.mousemoveFunc);
        ['mouseup', 'mouseleave'].forEach(evt => {
            document.body.addEventListener(evt, info.mouseuporleaveFunc);
        });
    });
    element.addEventListener('mousewheel', function (event) {
        if (event.deltaY > 0 && info.scale < 20) return;
        if (event.deltaY < 0 && info.scale > 1000) return;
        info.scale -= event.deltaY / 10;
        element.style.backgroundSize = `${info.scale}%`;
    });

}

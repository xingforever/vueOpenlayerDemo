class Drag {
    //构造函数
    constructor(el) {
        this.el = el;
        //鼠标摁下时的元素位置
        this.startOffset = {};
        //鼠标摁下时的鼠标位置
        this.startPoint = {};
        let move = (e) => {
            this.move(e);
        };
        let end = (e) => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", end);
        };
        el.addEventListener("mousedown", (e) => {
            this.start(e);
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", end);
        })
    }
    //摁下时的处理函数
    start(e) {
        let { el } = this;
        this.startOffset = {
            x: el.offsetLeft,
            y: el.offsetTop
        }
        this.startPoint = {
            x: e.clientX,
            y: e.clientY
        }
    }
    //鼠标移动时的处理函数
    move(e) {
        let { el, startOffset, startPoint } = this;
        let newPoint = {
            x: e.clientX,
            y: e.clientY
        }
        let dis = {
            x: newPoint.x - startPoint.x,
            y: newPoint.y - startPoint.y,
        }
        el.style.left = dis.x + startOffset.x + "px";
        el.style.top = dis.y + startOffset.y + "px";
    }
}


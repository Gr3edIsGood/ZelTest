let images = [...document.querySelectorAll('.data-img')];
window.addEventListener('mousemove', e => {
    images.forEach(i => {
        let hw = i.clientWidth/2;
        let hh = i.clientHeight/2;
        let x = i.offsetLeft + hw - e.clientX;
        let y = i.offsetTop + hh - e.clientY;
        if (Math.abs(x)>hw || Math.abs(y)>hh)
            return;
        i.style.backgroundPosition = (50-x/5) + "% " + (50-y/2) + "%"
    });
});


$(function(){

    $('.drag').dragscroll();

});

$('.drag').dragscroll({

    direction:'scrollLeft'

});

$('.drag').dragscroll({

    direction:'scrollTop'

});

$('.drag').dragscroll({

    onStart:function($this) {
        console.log($this);

    },

    onMove:function($this) {

        console.log($this);

    },

    onEnd:function($this) {
        console.log($this);

    }
});


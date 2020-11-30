

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


/*
 * jquery.dragscroll v1.0.0
 * author 735126858@qq.com
 * https://github.com/YuTingtao/dragscroll.js
 */
!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"undefined"!=typeof exports?module.exports=t(require("jquery")):t(jQuery)}(function(f){var o={init:function(t){var a=f.extend({},{direction:null,onStart:function(){},onMove:function(){},onEnd:function(){}},t);return this.each(function(){var n,i,r,l,c=f(this),s=a.direction,o=a.onStart,t=a.onMove,e=a.onEnd,u=!1;c.on("mousedown",function(t){t.preventDefault();t=t||window.event;u=!0,r=t.clientX,l=t.clientY,n=f(this).parent().scrollLeft(),i=f(this).parent().scrollTop(),o&&o.call(this,c)}),c.on("mousemove",function(e){e.preventDefault();e=e||window.event;u&&(setTimeout(function(){var t=parseInt(e.clientX-r),o=parseInt(e.clientY-l);"scrollLeft"==s?c.parent().scrollLeft(n-t):("scrollTop"==s||c.parent().scrollLeft(n-t),c.parent().scrollTop(i-o))},30),t&&t.call(this,c))}),c.on("mouseup mouseleave",function(){u&&e&&e.call(this,c),u=!1}),c.on("touchstart",function(t){t=t.originalEvent.targetTouches[0];u=!0,r=t.clientX,l=t.clientY,n=f(this).parent().scrollLeft(),i=f(this).parent().scrollTop(),o&&o.call(this,c)}),c.on("touchmove",function(e){e.stopPropagation();e=e.originalEvent.targetTouches[0];u&&(setTimeout(function(){var t=parseInt(e.clientX-r),o=parseInt(e.clientY-l);"scrollLeft"==s?c.parent().scrollLeft(n-t):("scrollTop"==s||c.parent().scrollLeft(n-t),c.parent().scrollTop(i-o))},30),t&&t.call(this,c))}),c.on("touchend",function(t){u&&e&&e.call(this,c),u=!1})})},destroy:function(){return f(this).each(function(){var t=f(this);t.off("mousedown mousemove mouseup mouseleave"),t.off("touchstart touchmove touchend")})}};f.fn.dragscroll=function(t){return o[t]?o[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void f.error("method "+t+" does not exist on jquery.dragscroll.js"):o.init.apply(this,arguments)}});



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


const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

function circlemousefollower (xscale, yscale) {
    window.addEventListener("mousemove", function(dets){
        document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    })
}

circlemousefollower(); 
firstpageAnim();
circlechapta();
var timeout;

function firstpageAnim() {
    var tl = gsap.timeline();

    tl.from('#nav', {
        y: '-10',
        opacity: 0,
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to('.boundingelem', {
        y: 0,
        ease: Expo.easeInOut,
        duration: 2,
        delay: -1,
        stagger: .2
    })
    .from('#herofooter', {
        y: -10,
        opacity: 0,
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    })
}



function circlechapta(){
    var xscale = 1;
    var yscale = 1;
    var xprev = 0;
    var yprev = 0;
    window.addEventListener("mousemove", function(dets) {
        clearTimeout(timeout);
        xscale = gsap.utils.clamp(.8,1,.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8,1,.2, dets.clientY - yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        circlemousefollower(xscale, yscale);
        setTimeout(function(){
            timeout = document.querySelector('#minicircle').style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale( 1 , 1 )`;


        }, 100)
    })
}

document.querySelectorAll(".elem").forEach(function(elem) {
    var rotate = 0;
    var difference = 0;

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
          opacity: 0,
          ease: Power3,
          duration: 0.5,
        });
      });


    elem.addEventListener("mousemove", function(dets) {
       var diff =  dets.clientY - elem.getBoundingClientRect().top;
       difference = dets.clientX - rotate;
       rotate = dets.clientX;
        gsap.to(elem.querySelector("img"), {
            opacity: 1,
            ease: Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20, difference * 0.5)
        })
    });
});

/*====================================================
        INVITATION SPA PREMIUM
=====================================================*/

/*-------------------------------
    ELEMENTS
--------------------------------*/

const envelope = document.querySelector(".envelope");
const intro = document.getElementById("intro");
const invitation = document.getElementById("invitation");
const success = document.getElementById("success");

const yesBtn = document.getElementById("yes");
const noBtn = document.getElementById("no");

const petals = document.getElementById("petals");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

/*-------------------------------
    CANVAS
--------------------------------*/

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

/*====================================================
        OUVERTURE DE L'ENVELOPPE
=====================================================*/

envelope.addEventListener("click", () => {

    envelope.classList.add("open");

    setTimeout(() => {

        intro.style.display = "none";

        invitation.style.display = "flex";

        invitation.classList.add("fadeIn");

    }, 1700);

});

/*====================================================
        COMPTE A REBOURS
=====================================================*/

const targetDate = new Date("August 1, 2026 11:30:00").getTime();

function updateCountdown() {

    const now = new Date().getTime();

    const distance = targetDate - now;

    if (distance <= 0) {

        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";

        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days;
    document.getElementById("hours").textContent = hours;
    document.getElementById("minutes").textContent = minutes;
    document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

setInterval(updateCountdown,1000);

/*====================================================
        PETALES
=====================================================*/

function createPetal(){

    const petal=document.createElement("div");

    petal.innerHTML="🌸";

    petal.style.position="fixed";

    petal.style.left=Math.random()*100+"vw";

    petal.style.top="-40px";

    petal.style.fontSize=(18+Math.random()*18)+"px";

    petal.style.opacity=.8;

    petal.style.pointerEvents="none";

    petal.style.zIndex="5";

    petal.style.transition="transform linear";

    petals.appendChild(petal);

    const duration=7000+Math.random()*4000;

    petal.animate([

        {
            transform:"translate(0,0) rotate(0deg)"
        },

        {
            transform:`translate(${Math.random()*250-125}px,110vh)
            rotate(${360+Math.random()*360}deg)`
        }

    ],{

        duration:duration,

        easing:"linear"

    });

    setTimeout(()=>{

        petal.remove();

    },duration);

}

setInterval(createPetal,400);
/*====================================================
        BOUTON "NON" QUI S'ÉCHAPPE
=====================================================*/

function moveNoButton() {

    const container = document.querySelector(".buttons");

    const containerRect = container.getBoundingClientRect();

    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = container.clientWidth - btnWidth;
    const maxY = container.clientHeight - btnHeight;

    const x = Math.random() * maxX;
    const y = Math.random() * maxY;

    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";

}

function escapeButton(e){

    const rect = noBtn.getBoundingClientRect();

    const distance = Math.sqrt(

        Math.pow(e.clientX - (rect.left + rect.width/2),2)+
        Math.pow(e.clientY - (rect.top + rect.height/2),2)

    );

    if(distance < 120){

        moveNoButton();

    }

}

document.addEventListener("mousemove",escapeButton);

/* Compatible téléphone */

noBtn.addEventListener("touchstart",(e)=>{

    e.preventDefault();

    moveNoButton();

});

/*====================================================
        CONFETTIS
=====================================================*/

let confettis=[];

function createConfetti(){

    confettis=[];

    for(let i=0;i<220;i++){

        confettis.push({

            x:Math.random()*canvas.width,

            y:-20-Math.random()*canvas.height,

            size:5+Math.random()*10,

            speed:2+Math.random()*6,

            angle:Math.random()*360,

            rotate:Math.random()*10,

            color:[
                "#d8b36b",
                "#ff6fa5",
                "#ffffff",
                "#f4d35e",
                "#9ad3bc"
            ][Math.floor(Math.random()*5)]

        });

    }

}

function drawConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    confettis.forEach(c=>{

        ctx.save();

        ctx.translate(c.x,c.y);

        ctx.rotate(c.angle);

        ctx.fillStyle=c.color;

        ctx.fillRect(

            -c.size/2,

            -c.size/2,

            c.size,

            c.size

        );

        ctx.restore();

        c.y+=c.speed;

        c.angle+=0.05;

    });

    confettis=confettis.filter(c=>c.y<canvas.height+30);

    if(confettis.length){

        requestAnimationFrame(drawConfetti);

    }else{

        ctx.clearRect(0,0,canvas.width,canvas.height);

    }

}




<div class="background">
    <div class="wave-pattern wave1" />
    <div class="wave-pattern wave2" />
    <div class="wave-pattern wave3" />
</div>

<style>
    .background {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: -1;
        background: linear-gradient(45deg, #000509, #01142b, #061b2c);
        animation: movementAnimation 60s infinite linear;
        overflow: hidden;
    }

    .wave-pattern {
        position: absolute;
        width: 100%;
        opacity: 0.2;
        transform: skewY(-12deg);
        animation: waveAnimation 240s infinite linear;
    }

    .wave1 {
        height: 10%;
        background: repeating-linear-gradient(
            90deg,
            #000305,
            #000305 120px,
            #2f5277 120px,
            #010b16 200px
        );
        top: 25%;
        animation-delay: 0s;
    }

    .wave2 {
        height: 40%;
        background: repeating-linear-gradient(
            90deg,
            #000305,
            #000305 120px,
            #2f5277 120px,
            #010b16 200px
        );
        top: 40%;
        animation-delay: -40s; /* Adjust the delay for the second wave */
    }

    .wave3 {
        height: 80%;
        background: repeating-linear-gradient(
            90deg,
            #000305,
            #000305 120px,
            #2f5277 120px,
            #010b16 200px
        );
        top: 60%;
        animation-delay: -80s; /* Adjust the delay for the third wave */
    }

    @keyframes movementAnimation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }

    @keyframes waveAnimation {
        0% {
            transform: skewY(-12deg) translateX(100%);
        }
        100% {
            transform: skewY(-12deg) translateX(-100%);
        }
    }
</style>

<div class="elaborate-background">
    <div class="wave-pattern" />
</div>

<style>
    .elaborate-background {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: -1;
        background: linear-gradient(
            45deg,
            #003366,
            #006699,
            #003366
        ); /* Dark blue color with blueish gradient */
        animation: movementAnimation 30s infinite linear;
        overflow: hidden;
    }

    .wave-pattern {
        position: absolute;
        width: 100%;
        height: 100%;
        background: repeating-linear-gradient(
            90deg,
            #002147,
            #002147 10px,
            #003366 10px,
            #003366 20px
        );
        opacity: 0.2;
        transform: skewY(-12deg);
        animation: waveAnimation 10s infinite linear;
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
            transform: skewY(-12deg) translateX(0);
        }
        100% {
            transform: skewY(-12deg) translateX(-50%);
        }
    }
</style>

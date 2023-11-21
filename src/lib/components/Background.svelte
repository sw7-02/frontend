<div class="animated-background" />

<style>
    .animated-background {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: -1;
        animation: gradientAnimation var(--animation-speed, 20s) infinite linear;
        background: linear-gradient(
            to right,
            rgb(34, 193, 195),
            /* Turquoise color */ rgb(253, 187, 45) /* Yellow color */
        );
        background-size: 200% 100%;
        animation-timing-function: ease-in-out;
        overflow: hidden;
    }

    .animated-background::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: radial-gradient(
            ellipse at center,
            rgba(0, 0, 0, 0.3) 0%,
            /* Adjusted opacity */ rgba(0, 0, 0, 0.7) 100%
                /* Adjusted opacity */
        );
        z-index: -1;
    }

    @keyframes gradientAnimation {
        0%,
        100% {
            background-position: 100% 50%;
        }
        50% {
            background-position: 0% 50%;
        }
    }
</style>

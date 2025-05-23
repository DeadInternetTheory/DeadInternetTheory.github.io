const follow = document.getElementById("FollowMouse");

document.body.onpointermove = event => {
    const { clientX, clientY } = event;
    follow.animate({
        left: `${clientX}px`,
        top: `${clientY}px`
    }, { duration: 1000, fill: "forwards" })
}
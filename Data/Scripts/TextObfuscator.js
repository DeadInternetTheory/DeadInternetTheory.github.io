const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lettersObfuscatable = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const numbers = "0123456789";
const punctuation = ".,;:!@#$%^&*";

function Obfuscate(eventTarget) {
    if (eventTarget.dataset.animating === "true") return;
    eventTarget.dataset.animating = "true";

    let iterations = 0;
    let innerText = eventTarget.innerText;
    const interval = setInterval(() => {
        eventTarget.innerText = eventTarget.innerText
            .split("")
            .map((letter, index) => {
                if (index < iterations) {
                    return innerText[index];
                }
                if (lettersObfuscatable.includes(letter)) {
                    return letters[Math.floor(Math.random() * letters.length)];
                }
                if (numbers.includes(letter)) {
                    return numbers[Math.floor(Math.random() * numbers.length)];
                }
                if (punctuation.includes(letter)) {
                    return punctuation[Math.floor(Math.random() * punctuation.length)];
                }
                return innerText[index];
            })
            .join("");

        if (iterations >= innerText.length) {
            clearInterval(interval);
            eventTarget.dataset.animating = "false";
        }
        iterations += 1 / 4;
    }, 500 / eventTarget.innerText.length);
}

document.querySelectorAll(".Obfuscate").forEach((header) => {
    header.addEventListener('InViewEvent', function (e) {
        Obfuscate(e.target);
    });
});
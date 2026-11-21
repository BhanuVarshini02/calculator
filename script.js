const display = document.getElementById("display");

function appendValue(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    const expression = display.value;

    if (!expression) {
        return;
    }

    if (!/^[0-9+\-*/%.() ]+$/.test(expression)) {
        display.value = "Error";
        return;
    }

    try {
        const result = Function(
            '"use strict"; return (' + expression + ')'
        )();

        if (typeof result !== "number" || !Number.isFinite(result)) {
            display.value = "Error";
        } else {
            display.value = Number(result.toPrecision(12)).toString();
        }
    } catch {
        display.value = "Error";
    }
}

document.addEventListener("keydown", function(event) {
    if (/^[0-9.+\-*/%()]$/.test(event.key)) {
        appendValue(event.key);
    } else if (event.key === "Enter" || event.key === "=") {
        event.preventDefault();
        calculate();
    } else if (event.key === "Backspace") {
        deleteLast();
    } else if (event.key === "Escape") {
        clearDisplay();
    }
});
const result = document.querySelector('#result'),
        copyBtn = document.querySelector('.result-copy'),
        length = document.querySelector('#length'),
        uppercase = document.querySelector('#uppercase'),
        lowercase = document.querySelector('#lowercase'),
        numbers = document.querySelector('#numbers'),
        symbols = document.querySelector('#symbols'),
        generate = document.querySelector('#generate'),
        message = document.querySelector('.message');

function showMessage(text, isSuccess = true) {
        message.textContent = text;
        message.classList.toggle('message-success', isSuccess);
        message.classList.toggle('message-error', !isSuccess);
        setTimeout(() => {
                message.textContent = '';
        }, 2000);
}

function getRandomUppercase() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomLowercase() {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
        return Math.floor(Math.random() * 10).toString();
}

function getRandomSymbol() {
        const str = "!@#$%^&*()_+<>{}?:";
        return str[Math.floor(Math.random() * str.length)];
}

function generateRandomCharacter() {
        const functions = [];

        if (uppercase.checked) {
                functions.push(getRandomUppercase);
        }
        if (lowercase.checked) {
                functions.push(getRandomLowercase);
        }
        if (numbers.checked) {
                functions.push(getRandomNumber);
        }
        if (symbols.checked) {
                functions.push(getRandomSymbol);
        }

        if (functions.length === 0) {
                alert("Debe seleccionar al menos una opción", false);
                return "";
        }

        return functions[Math.floor(Math.random() * functions.length)]();
}

generate.addEventListener('click', function (e) {
        e.preventDefault();
        let passwordLength = length.value;
        if (passwordLength > 4 && passwordLength <= 25) {
                let password = '';
                for (let i = 0; i < passwordLength; i++) {
                        password += generateRandomCharacter();
                }
                result.value = password;
                console.log('Contraseña generada exitosamente.');
        } else {
                alert('Seleccione una longitud entre 5 y 25.', false);
                result.value = '';
        }
});

copyBtn.addEventListener('click', function () {
        const textarea = document.createElement('textarea');
        const password = result.value;

        if (!password) {
                alert('No hay ninguna contraseña para copiar.', false);
                return;
        }

        textarea.value = password;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
        alert('Contraseña copiada al portapapeles.');
});
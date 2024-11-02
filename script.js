document.addEventListener("DOMContentLoaded", () => {
    const weatherData = {
        temperature: 32,
        conditions: "tormenta",
    };

    displayWeather(weatherData);
    provideRecommendations(weatherData);
    setupQuiz();
    setupImageSlider();
});

function displayWeather(data) {
    document.getElementById('data').innerHTML = `Temperatura: ${data.temperature}°C<br>Condiciones: ${data.conditions}`;
}

function provideRecommendations(data) {
    let advice = '';
    if (data.temperature > 30) {
        advice = '¡Alerta de ola de calor! Bebe mucha agua y evita salir en las horas más calurosas.';
    } else if (data.conditions.includes("tormenta")) {
        advice = 'Se espera una tormenta. Busca refugio y evita áreas abiertas.';
    } else if (data.conditions.includes("inundación")) {
        advice = 'Inundaciones reportadas. Mantente en lugares elevados y sigue las instrucciones de las autoridades.';
    } else {
        advice = 'Las condiciones son favorables. ¡Disfruta del día!';
    }
    document.getElementById('advice').innerText = advice;
}

function setupQuiz() {
    const questions = [
        {
            question: "¿Qué hacer en caso de una tormenta eléctrica?",
            options: ["a) Buscar refugio en un lugar abierto.", "b) Buscar refugio en un lugar cerrado.", "c) Usar el teléfono móvil.", "d) Salir a la calle."],
            answer: "b",
            color: "#005f73"
        },
        {
            question: "¿Cómo prepararse para una ola de calor?",
            options: ["a) Mantenerse hidratado.", "b) Hacer ejercicio al aire libre.", "c) Cerrar las ventanas.", "d) Usar ropa oscura."],
            answer: "a",
            color: "#00796b"
        },
        {
            question: "¿Qué hacer si hay una alerta de inundación?",
            options: ["a) Buscar terrenos elevados.", "b) Ignorar la alerta.", "c) Ir a la playa.", "d) Estar en casa."],
            answer: "a",
            color: "#005f73"
        },
        {
            question: "¿Cuál es la forma más efectiva de comunicarse durante una emergencia?",
            options: ["a) Usar mensajes de texto.", "b) Llamar a todos.", "c) Publicar en redes sociales.", "d) Hablar en persona."],
            answer: "a",
            color: "#00796b"
        },
        {
            question: "¿Qué hacer si se corta el suministro eléctrico durante una tormenta?",
            options: ["a) Mantener la calma y no usar velas.", "b) Usar linternas.", "c) Salir de casa.", "d) Llamar a un amigo."],
            answer: "a",
            color: "#005f73"
        },
        // Añade más preguntas aquí si es necesario
    ];

    let score = 0;
    let currentQuestionIndex = 0;
    let lives = 2;

    document.getElementById('spin').addEventListener('click', () => {
        const wheel = document.getElementById('wheel');
        wheel.style.transform = `rotate(${Math.floor(Math.random() * 360) + 360}deg)`;

        setTimeout(() => {
            const color = getColorFromRotation(wheel.style.transform);
            const selectedQuestion = questions.find(q => q.color === color);
            displayOverlay(selectedQuestion);
        }, 4000); // Esperar a que la ruleta termine de girar
    });

    document.getElementById('submit').addEventListener('click', () => {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption) {
            const userAnswer = selectedOption.value;
            const correctAnswer = document.getElementById('currentAnswer').value;
            if (userAnswer === correctAnswer) {
                score++;
                alert('¡Correcto! +1 punto.');
                currentQuestionIndex++; // Avanzar a la siguiente pregunta automáticamente
                if (currentQuestionIndex < questions.length) {
                    const nextQuestion = questions[currentQuestionIndex];
                    displayOverlay(nextQuestion);
                } else {
                    document.getElementById('overlay-question').innerText = 'Fin del juego. Tu puntaje: ' + score;
                    document.getElementById('submit').disabled = true; // Deshabilitar el botón de enviar
                }
            } else {
                lives--;
                alert(`Incorrecto. La respuesta correcta es: ${correctAnswer}`);
                if (lives === 0) {
                    alert("Se acabaron las oportunidades. Fin del juego.");
                    document.getElementById('overlay').classList.add('hidden');
                    return;
                }
            }

            // Actualizar corazones
            document.getElementById('hearts').innerHTML = '❤️'.repeat(lives);
            document.getElementById('score').innerText = 'Puntaje total: ' + score;
            document.getElementById('score').classList.remove('hidden');
            document.getElementById('overlay').classList.add('hidden'); // Ocultar overlay después de responder
        } else {
            alert('Por favor, selecciona una respuesta.');
        }
    });
}

function getColorFromRotation(transform) {
    const rotation = parseInt(transform.match(/rotate\(([^d]*)deg\)/)[1]) % 360;
    return rotation < 180 ? "#005f73" : "#00796b"; // Azul oscuro o más claro
}

function displayOverlay(question) {
    if (question) {
        document.getElementById('overlay-question').innerText = question.question;
        document.getElementById('currentAnswer').value = question.answer; // Guardar respuesta correcta

        const optionsContainer = document.getElementById('answer-options');
        optionsContainer.innerHTML = ''; // Limpiar opciones anteriores

        question.options.forEach(option => {
            const optionHtml = `<label><input type="radio" name="answer" value="${option.charAt(0)}"> ${option}</label><br>`;
            optionsContainer.innerHTML += optionHtml; // Agregar las opciones de respuesta
        });

        // Mostrar corazones
        document.getElementById('hearts').innerHTML = '❤️❤️'; 
        document.getElementById('overlay').classList.remove('hidden'); // Mostrar overlay
    }
}

function setupImageSlider() {
    const slides = document.querySelectorAll('.slides img');
    let currentIndex = 0;
    const totalSlides = slides.length;

    setInterval(() => {
        slides[currentIndex].style.display = 'none'; // Ocultar la imagen actual
        currentIndex = (currentIndex + 1) % totalSlides; // Avanzar al siguiente índice
        slides[currentIndex].style.display = 'block'; // Mostrar la nueva imagen
    }, 3000); // Cambiar cada 3 segundos

    // Inicializar la primera imagen como visible
    slides.forEach((slide, index) => {
        slide.style.display = index === 0 ? 'block' : 'none';
    });
}

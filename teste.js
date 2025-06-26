// Texto padrão para digitação
const textToType = "A digitação é uma habilidade importante que melhora com a prática. Quanto mais você digitar, mais rápido se torna.";

// Variáveis para o tempo e contagem de acertos
let startTime;
let totalCharacters = 0;
let correctCharacters = 0;

// Setando o texto inicial
document.getElementById("text-to-type").textContent = textToType;

// Bloquear a colagem de texto
document.getElementById("input-field").addEventListener("paste", function(event) {
    event.preventDefault();  // Impede a ação de colar
    alert("Colar não é permitido!"); // Opcional: mensagem para o usuário
});

// Função para verificar a entrada do usuário
function checkInput() {
    const inputField = document.getElementById("input-field");
    const typedText = inputField.value;

    // Inicia o timer quando o usuário começa a digitar
    if (!startTime) {
        startTime = new Date();
    }

    // Criar um array de letras para o texto original e para o texto digitado
    const originalText = textToType.split("");
    const typedTextArray = typedText.split("");

    // Inicializar variáveis para contagem de acertos e total de caracteres
    totalCharacters = typedText.length;
    correctCharacters = 0;

    // Gerar o texto com letras erradas destacadas
    const highlightedText = originalText.map((char, index) => {
        // Se o caractere digitado estiver correto
        if (typedTextArray[index] === char) {
            correctCharacters++;
            return `<span class="correct">${char}</span>`; // Letra correta
        } else if (typedTextArray[index] === undefined) {
            return `<span class="not-typed">${char}</span>`; // Letra não digitada ainda
        } else {
            return `<span class="error-letter">${char}</span>`; // Letra errada
        }
    }).join("");

    // Atualiza o texto com as letras destacadas
    document.getElementById("text-to-type").innerHTML = highlightedText;

    // Atualiza feedback de precisão e velocidade
    updateFeedback();
}

// Função para calcular e exibir velocidade e precisão
function updateFeedback() {
    const inputField = document.getElementById("input-field");
    const typedText = inputField.value;

    // Calcular a precisão (percentual de acertos)
    const accuracy = (correctCharacters / totalCharacters) * 100 || 100;

    // Calcular a velocidade em palavras por minuto (WPM)
    const elapsedTime = (new Date() - startTime) / 1000; // Tempo em segundos
    const wordsPerMinute = Math.round((totalCharacters / 5) / (elapsedTime / 60));

    // Exibir os resultados no DOM
    document.getElementById("speed").textContent = wordsPerMinute;
    document.getElementById("accuracy").textContent = accuracy.toFixed(2) + "%";
}

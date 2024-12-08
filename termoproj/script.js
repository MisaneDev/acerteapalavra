// Lista de palavras possíveis para o jogo
const words = ["AMIGO", "ROSAS", "CANTO", "MANGA", "FERRO", "LIMAO", "MELAO", "PONTA", "COCOS", "CACTO"];

// Escolher uma palavra aleatória da lista
let word = words[Math.floor(Math.random() * words.length)];

let attempts = 0;

// Função para processar a tentativa
function processGuess() {
  const guessInput = document.getElementById("guess");
  const guess = guessInput.value.toUpperCase();

  // Validação: Apenas palavras com 5 letras são aceitas
  if (guess.length !== 5) {
    alert("Digite uma palavra com 5 letras!");
    return;
  }

  const grid = document.getElementById("grid");
  const row = document.createElement("div");
  row.classList.add("row");

  // Array para rastrear letras já verificadas na palavra secreta
  const checked = Array(5).fill(false);

  // Primeira verificação: Letras corretas na posição correta (verde)
  for (let i = 0; i < 5; i++) {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.textContent = guess[i];

    if (guess[i] === word[i]) {
      tile.classList.add("green");
      checked[i] = true; // Marca a posição como usada
    }

    row.appendChild(tile);
  }

  // Segunda verificação: Letras presentes na palavra, mas em posição errada (amarelo)
  for (let i = 0; i < 5; i++) {
    const tile = row.children[i];

    if (!tile.classList.contains("green")) {
      const letter = guess[i];
      let found = false;

      for (let j = 0; j < 5; j++) {
        if (letter === word[j] && !checked[j] && j !== i) {
          found = true;
          checked[j] = true;
          break;
        }
      }

      if (found) {
        tile.classList.add("yellow");
      } else {
        tile.classList.add("gray");
      }
    }
  }

  grid.appendChild(row);
  attempts++;

  // Condições de vitória ou derrota
  const message = document.getElementById("message");
  if (guess === word) {
    message.textContent = `🎉 Parabéns! Você acertou em ${attempts} tentativa(s)! 🎉`;
    message.style.display = "block";
    document.getElementById("submit").disabled = true; // Desativa o botão
    guessInput.disabled = true; // Desativa o input
  } else if (attempts === 6) {
    message.textContent = `😢 Game Over! A palavra era "${word}". 😢`;
    message.style.display = "block";
    document.getElementById("submit").disabled = true; // Desativa o botão
    guessInput.disabled = true; // Desativa o input
  }

  // Limpa o campo de entrada para a próxima tentativa
  guessInput.value = "";
  guessInput.focus(); // Foca no input para facilitar a próxima tentativa
}

// Evento para o botão "Enviar"
document.getElementById("submit").addEventListener("click", processGuess);

// Evento para pressionar "Enter" no campo de entrada
document.getElementById("guess").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    processGuess();
  }
});
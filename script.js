document.addEventListener("DOMContentLoaded", () => {
  const flagImg = document.getElementById("flag");
  const countryGuess = document.getElementById("countryGuess");
  const submitBtn = document.getElementById("submitBtn");
  const passBtn = document.getElementById("passBtn");
  const feedback = document.getElementById("feedback");
  const scoreDisplay = document.getElementById("score");
  const restartBtn = document.getElementById("restartBtn");

  let score = 0;
  let currentCountry = {};
  let countries = "";

  async function fetchCountry() {
    if (!countries) {
      try {
        //const response = await fetch("https://restcountries.com/v3.1/all");
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,flags"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        countries = await response.json();
      } catch (error) {
        console.error("Error fetching country data:", error);
        feedback.textContent =
          "Failed to fetch country data. Please try again later.";
        feedback.style.color = "red";
      }
    }

    const randomCountry =
      countries[Math.floor(Math.random() * countries.length)];
    currentCountry = randomCountry;
    flagImg.src = randomCountry.flags.png;
  }

  submitBtn.addEventListener("click", () => {
    const userGuess = countryGuess.value.trim().toLowerCase();
    const correctAnswer = currentCountry.name.common.toLowerCase();

    if (userGuess === correctAnswer) {
      feedback.textContent = "Correct!";
      feedback.style.color = "green";
      score++;
    } else {
      feedback.textContent = `Wrong! The correct answer is ${correctAnswer}.`;
      feedback.style.color = "red";
      score--;
    }

    fetchCountry();

    scoreDisplay.textContent = score;
    countryGuess.value = "";
  });

  passBtn.addEventListener("click", () => {
    const correctAnswer = currentCountry.name.common.toLowerCase();
    feedback.textContent = `That was ${correctAnswer}.`;
    feedback.style.color = "black";
    fetchCountry();
  });

  restartBtn.addEventListener("click", () => {
    fetchCountry();
    feedback.textContent = "";
    scoreDisplay.textContent = 0;
  });

  fetchCountry();
});

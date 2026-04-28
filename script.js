// Your script here.
// 1. Set the initial text from the textarea into the message object
  msg.text = document.querySelector('[name="text"]').value;

  // 2. Function to populate the voices dropdown
  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  // 3. Function to set the selected voice
  function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle(); // Restart speech when voice changes
  }

  // 4. Function to start/restart speech
  function toggle(startOver = true) {
    speechSynthesis.cancel(); // Stop any current speech
    if (startOver && msg.text.trim() !== "") {
      speechSynthesis.speak(msg);
    }
  }

  // 5. Function to update rate, pitch, and text dynamically
  function setOption() {
    msg[this.name] = this.value;
    toggle();
  }

  // --- Event Listeners ---

  // Voices are loaded asynchronously in some browsers
  speechSynthesis.addEventListener('voiceschanged', populateVoices);

  // Handle voice selection
  voicesDropdown.addEventListener('change', setVoice);

  // Handle sliders and textarea changes
  options.forEach(option => option.addEventListener('change', setOption));

  // Handle Speak and Stop buttons
  speakButton.addEventListener('click', toggle);
  stopButton.addEventListener('click', () => toggle(false));
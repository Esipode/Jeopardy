export const saveGameState = (state: object) => {
  try {
    const encodedState = btoa(JSON.stringify(state));
    const newUrl = `${window.location.origin}?game=${encodedState}`;
    window.history.replaceState(null, "", newUrl);
    localStorage.setItem("jeopardyGameState", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving game state: ", error);
  }
};

export const loadGameState = () => {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedState = urlParams.get("game");

    if (encodedState) {
      return JSON.parse(atob(encodedState));
    }

    const localState = localStorage.getItem("jeopardyGameState");

    if (localState) {
      return JSON.parse(localState);
    }

    return null;
  } catch (error) {
    console.error("Error loading game state: ", error);
    return null;
  }
};

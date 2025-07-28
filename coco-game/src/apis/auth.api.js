const BASE_URL = import.meta.env.VITE_BASE_URL;

//  inscription classique
export const signup = async (values) => {
  try {
    const response = await fetch(`${BASE_URL}/auth`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json",
      },
      //   credentials: "include",
    });
    const userConnected = await response.json();
    return userConnected;
  } catch (error) {
    console.log(error);
  }
};

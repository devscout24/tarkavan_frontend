



import axios from "axios";

const api = axios.create({
  baseURL: "https://tarkavan.thenightowl.team/api",
  withCredentials: true,
});

api.interceptors.request.use(async (config) => {
  let token: string | undefined; 

  if (typeof window === "undefined") {
    // Server side
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    token = cookieStore.get("go_elite_token")?.value;   
  } else {
    // Client side
    token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("go_elite_token="))
      ?.split("=")[1];
 
  } 

  config.params = {
    ...config.params, 
  };

  // Set Content-Type for all requests
  config.headers.set("Content-Type", "application/json");
  config.headers.set("Accept", "application/json");

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  
  return config;
});


export default api;







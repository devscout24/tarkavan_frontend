



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

  // Set Content-Type for all requests unless it's FormData
  if (!(config.data instanceof FormData)) {
    config.headers.set("Content-Type", "application/json");
  }
  config.headers.set("Accept", "application/json");

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }


  return config;
});


// Create Program API
export const createProgram = async (formData: FormData) => {
  try {
    const response = await api.post('/coach/program/add', formData);
    return response.data;
  } catch (error: any) {
    console.error('Create program error:', error?.response?.data || error);
    throw error;
  }
};

export const updateProgram = async ({ program_id, data }: { program_id: string; data: FormData }) => {
  try {
    const response = await api.post(`/coach/program/update/${program_id}`, data);
    return response.data;
  } catch (error: any) {
    console.error('Update program error:', error?.response?.data || error);
    throw error;
  }
};

export default api;







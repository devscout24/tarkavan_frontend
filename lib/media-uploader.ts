import { playerProfileUpdate } from "@/app/(dashboards)/player/profile/action";

export const uploadMediaPLayer = async (
  files: File[],
  fieldName: string, 
) => {
  try {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append(fieldName, file);  
    });

     const res = await playerProfileUpdate(formData) 
    return res;

  } catch (error: unknown) {
    console.error("Upload error:", (error as Error).message);
    throw error;
  }
};
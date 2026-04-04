import { useSearchParams } from "react-router";
import Modal from "./modal";

export default function useModal() {
  const [searchParams, setSearchParams] = useSearchParams();

  const close = (modalId: string, cleanupQueryKeys: string[] = []) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.delete(modalId);
    cleanupQueryKeys.forEach((key) => nextParams.delete(key));
    setSearchParams(nextParams);
  };

  return { close, Modal };
}

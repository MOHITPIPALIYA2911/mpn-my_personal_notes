import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Function to trigger a toast notification
export function triggerNotification(type, text) {
  toast[type](text, {
    position: "bottom-right",
    autoClose: 1000,
  });
  return <></>;
}

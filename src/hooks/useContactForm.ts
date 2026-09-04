import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";

export interface UseContactFormResult {
  values: ContactValues;
  errors: ContactErrors;
  status: ContactStatus;
  handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export type ContactStatus = "idle" | "sending" | "sent" | "error";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * EmailJS credentials — public keys only (safe for the browser,
 * per NFR-09). Replace with your own from https://dashboard.emailjs.com
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export function validateField(field: keyof ContactValues, value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) {
    switch (field) {
      case "name":
        return "Please enter your name.";
      case "email":
        return "Please enter your email address.";
      case "subject":
        return "Please add a subject line.";
      case "message":
        return "Please write a short message.";
    }
  }
  if (field === "email" && trimmed && !EMAIL_PATTERN.test(trimmed)) {
    return "That email address doesn’t look right.";
  }
  return undefined;
}

export function useContactForm(): UseContactFormResult {
  const [values, setValues] = useState<ContactValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<ContactStatus>("idle");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => (prev[name as keyof ContactValues] ? { ...prev, [name]: undefined } : prev));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: ContactErrors = {};
    (Object.keys(values) as (keyof ContactValues)[]).forEach((field) => {
      const error = validateField(field, values[field]);
      if (error) nextErrors[field] = error;
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn(
        "EmailJS credentials are not configured. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY in a .env.local file."
      );
      setStatus("error");
      toast.error("The form isn’t connected yet — please email me directly instead.");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: values.name.trim(),
          reply_to: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("sent");
      setValues({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent! I’ll get back to you soon.");
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
      toast.error("Something went wrong sending your message. Please try again.");
    }
  };

  return { values, errors, status, handleChange, handleSubmit };
}

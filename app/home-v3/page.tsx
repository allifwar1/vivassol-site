"use client";
import { useEffect } from "react";

export default function HomeV3Page() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  useEffect(() => {
    window.location.replace(`${base}/home-v3/preview.html`);
  }, [base]);
  return null;
}

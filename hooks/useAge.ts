"use client";

import { useState } from "react";

const BIRTHDAY = new Date(2004, 5, 21);

export function useAge(): number {
  const [age] = useState(() => {
    const now = new Date();
    let a = now.getFullYear() - BIRTHDAY.getFullYear();
    const m = now.getMonth() - BIRTHDAY.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < BIRTHDAY.getDate())) a--;
    return a;
  });
  return age;
}

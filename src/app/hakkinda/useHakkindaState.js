"use client"
import { useState } from "react";

export function useHakkindaState() {
  const [activeSection, setActiveSection] = useState("genel");
  return { activeSection, setActiveSection };
}
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <main className={`${styles.main} ${inter.className}`}>
        <h1>Homepage</h1>
      </main>
    </>
  );
}

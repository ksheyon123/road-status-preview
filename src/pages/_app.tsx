import type { AppProps } from "next/app";
import React from "react";
import "@/styles/globals.css";
import { HighwayProvider } from "@/contexts/HighwayContext";
import { ModalProvider } from "@/contexts/ModalContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HighwayProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </HighwayProvider>
  );
}

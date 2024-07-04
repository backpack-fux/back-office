"use client";

import { NeynarContextProvider, Theme } from "@neynar/react";
import "@neynar/react/dist/style.css";

export function NeynarProvider({ children }: { children: React.ReactNode }) {
  return (
    <NeynarContextProvider
      settings={{
        clientId: process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID || "",
        defaultTheme: Theme.Dark, // Change to Theme.Light if you prefer
        eventsCallbacks: {
          onAuthSuccess: () => {
            console.log("Authentication successful");
          },
          onSignout: () => {
            console.log("User signed out");
          },
        },
      }}
    >
      {children}
    </NeynarContextProvider>
  );
}
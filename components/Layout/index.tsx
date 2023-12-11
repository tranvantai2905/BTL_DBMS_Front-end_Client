// components/layout.tsx

import Footer from "../Footer";
import Header from "../Header";
import { useState } from "react";
import styles from "./styles.module.css";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): JSX.Element {
  // const [reload, setReload] = useState(false);
  return (
    <>
      <main className={styles.mainLayout}>
        <Header />
        {children}
        <Footer />
      </main>
    </>
  );
}

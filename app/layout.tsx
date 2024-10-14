'use client'
import "../assets/styles/globals.scss";
import styles from './layout.module.scss'

import Navigation from "../widgets/navigation/Navigation";
import TaskModal from "../entities/task/modals/TaskModal";
import { AnimatePresence } from "framer-motion";
import Providers from "./providers/Providers";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  

  return (
    <html lang="en">
      <body>
        <Providers>

          <div className={styles.layout}>

            <Navigation/>

            <div className={styles.center}>
              {children}
            </div>

          </div>
          
          <TaskModal/>

        </Providers>     
      </body>
    </html>
  );
}

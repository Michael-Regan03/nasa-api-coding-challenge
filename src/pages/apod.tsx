import { JSX } from "react";
import styles from "./index.module.css";
import APODForm from "@/components/apod/apodForm";

const HomePage = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8 p mt-4">
          Astronomy Picture of the Day
        </h1>
        <APODForm></APODForm>
      </div>
    </div>
  );
};

export default HomePage;

import { JSX } from "react";
import styles from "./index.module.css";
import APODForm from "@/components/apod/apodForm";

const HomePage = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <APODForm></APODForm>
    </div>
  );
};

export default HomePage;

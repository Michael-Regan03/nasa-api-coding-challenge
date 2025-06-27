import { JSX } from "react";
import styles from "./index.module.css";
import CMEForm from "@/components/cme/cmeForm";

const HomePage = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <CMEForm></CMEForm>
    </div>
  );
};

export default HomePage;

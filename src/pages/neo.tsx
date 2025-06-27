import { JSX } from "react";
import styles from "./index.module.css";
import NeoForm from "@/components/neo/neoForm";

const NeoPage = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <NeoForm></NeoForm>
    </div>
  );
};

export default NeoPage;

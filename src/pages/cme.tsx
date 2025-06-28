import { JSX } from "react";
import styles from "./index.module.css";
import CMEForm from "@/components/cme/cmeForm";

const HomePage = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center mb-8 p mt-4">
          Coronal Mass Ejection
        </h1>
        <div className="w-full max-w-2xl space-y-4">
          {" "}
          {/* Same width as date range form */}
          <p className="text-justify">
            A coronal mass ejection (CME) is a significant ejection of plasma
            mass from the Sun's corona into the heliosphere. CMEs are often
            associated with solar flares and other forms of solar activity, but
            a broadly accepted theoretical understanding of these relationships
            has not been established.
            <a
              href="https://en.wikipedia.org/wiki/Coronal_mass_ejection"
              className="text-blue-500 underline hover:text-blue-700"
            >
              source
            </a>{" "}
          </p>
        </div>
      </div>
      <CMEForm></CMEForm>
    </div>
  );
};

export default HomePage;

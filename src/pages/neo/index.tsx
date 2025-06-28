import { JSX } from "react";
import styles from "../index.module.css";
import NeoForm from "@/components/neo/neoForm";

const NeoPage = (): JSX.Element => {
  return (
    <div className={styles.app}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold text-center mb-8 p mt-4">
          Near Earth Objects
        </h1>
        <div className="w-full max-w-2xl space-y-4">
          {" "}
          {/* Same width as date range form */}
          <p className="text-justify">
            A near-Earth object (NEO) is any small Solar System body orbiting
            the Sun whose closest approach to the Sun (perihelion) is less than
            1.3 times the Earth–Sun distance (astronomical unit, AU).This
            definition applies to the object's orbit around the Sun, rather than
            its current position, thus an object with such an orbit is
            considered an NEO even at times when it is far from making a close
            approach of Earth. If an NEO's orbit crosses the Earth's orbit, and
            the object is larger than 140 meters (460 ft) across, it is
            considered a potentially hazardous object (PHO). Most known PHOs and
            NEOs are asteroids, but about a third of a percent are comets.{" "}
            <a
              href="https://en.wikipedia.org/wiki/Near-Earth_object"
              className="text-blue-500 underline hover:text-blue-700"
            >
              source
            </a>{" "}
          </p>
        </div>
        <NeoForm></NeoForm>
      </div>
    </div>
  );
};

export default NeoPage;

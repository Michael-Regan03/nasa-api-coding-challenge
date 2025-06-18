import { useState, JSX } from "react";
import styles from "./index.module.css";
import { commonExample } from "@/utils/utils.ts";
import { NeoResponseType, NearEarthObject} from "@/typings/types";


const HomePage = (): JSX.Element => {
  const urlWithProxy = `api/v1/neo`;
  const [data, setData] = useState<NeoResponseType | null>(null);
  const [data2, setData2] = useState<NearEarthObject | null>(null);


  commonExample();

  async function getDataFromServer(): Promise<void> {
    const res = await fetch(urlWithProxy, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ startDate: "2003-04-21", endDate: "2023-04-22"  }),
  });
    const data: NeoResponseType = await res.json();
    setData(data);
  }


  async function getDataFromServer2(): Promise<void> {
    const res = await fetch("api/v1/neo/:3542519");
    const data: NearEarthObject = await res.json();
    setData2(data);
  }

  return (
    <div className={styles.app}>
      <img src="/images/nasa-logo.svg" alt="nasa logo" />
      <button className={styles.button} onClick={getDataFromServer}>
        Access server using proxy
      
      
      
      </button>
        <p>data: {data ? data?.element_count : 'No data yet'}</p>
            <button className={styles.button} onClick={getDataFromServer2}>
        Access server using proxy
      </button>
        <p>data: {data2 ? data2?.designation : 'No data yet'}</p>
    </div>
  );
};

export default HomePage;

import { Suspense, JSX } from "react";
import { useRoutes } from "react-router-dom";
import routes from "~react-pages";
import Header from "@/components/header";

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>{useRoutes(routes)}</Suspense>
    </>
  );
}

export default App;

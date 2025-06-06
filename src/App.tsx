import { Route, Routes } from "react-router";
import HomePage from "./components/HomePage";

import { Toaster } from "planet-toast";
import ToastDemo from "./components/ToastDoc";

const App = () => {
  return (
    <>
      <main>
        <ToastDemo />
        <Toaster
          position="top-right"
          reverseOrder={false}
          gutter={8}
          containerStyle={{}}
          toastOptions={{
            duration: 4000,
          }}
        />
      </main>
    </>
  );
};

export default App;

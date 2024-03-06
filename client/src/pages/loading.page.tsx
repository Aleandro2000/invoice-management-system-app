import React, { useEffect, useState } from "react";
import { SpinnerDiamond } from "spinners-react";

export default function LoadingPage() {
  const [show, setShow] = useState(false);

  useEffect(() => setShow(true), []);

  return show ? (
    <div className="fade-in flex flex-col items-center justify-center text-center h-screen duration-300">
      <SpinnerDiamond color="black" />
    </div>
  ) : (
    <>
    </>
  );
}

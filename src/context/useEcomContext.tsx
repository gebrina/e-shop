import { FC, createContext, useContext, useEffect, useState } from "react";

type EcomContextType = {
  isDashboard: boolean;
};

const EcomContext = createContext<EcomContextType>({
  isDashboard: false,
});

export const EcomContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [values, setValues] = useState({ isDashboard: false });

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname.includes("board")) {
      setValues({ ...values, isDashboard: true });
    }
  }, [values]);
  return <EcomContext.Provider value={values}>{children}</EcomContext.Provider>;
};

export const useEcomContext = () => useContext(EcomContext);

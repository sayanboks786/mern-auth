import { createContext, useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";


export const AppContext = createContext();

export const AppContextProvider = (props) => {

      const BackendUri = import.meta.env.VITE_BACKEND_URI;
      const [isLoggedin, setIsLoggedin] = useState(false);
      const [userData, setUserData] = useState(null);
      const toast = useToast();
    
    const getUser = async () => {
      try {
        const response = await axios.get(`${BackendUri}/api/user/data`, {
          withCredentials: true,
        });

        const data = response.data;
        console.log("User data fetched:", data);
        if (data.success) {
          setUserData(data.userData);
          setIsLoggedin(true);
        } else {
          toast({
            title: "Error",
            description: data.message,
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "Fetch Error",
          description: error.response?.data?.message || error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    useEffect(() => {
      getUser();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  const value = {
    BackendUri,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUser,
  };
return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)
}
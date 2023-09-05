import { Box, Button, Flex, Heading, IconButton } from "@radix-ui/themes";
import { useContext, useState } from "react";
import { BsSun } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { AppContext } from "../context/AuthContext";
import { deleteToken } from "../services/storage";
const Header = () => {
  const { setUser, isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const [colorMode, setColorMode] = useState<boolean>(false);
  const toggleColorMode = () => {
    colorMode ? setColorMode(false) : setColorMode(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    deleteToken();
  };

  return (
    <Box className="bg-transparent w-full">
      <Flex className="py-4 w-10/12 container mx-auto flex flex-row justify-between">
        <Heading className="text-2xl font-bold -tracking-tighter">
          TO DO LIST
        </Heading>
        <Flex className="flex flex-row gap-4">
          {isLoggedIn && (
            <Button
              onClick={logout}
              className="bg-slate-600 px-4 rounded-md text-white hover:opacity-60"
            >
              Logout
            </Button>
          )}
          <IconButton onClick={toggleColorMode}>
            {colorMode ? <BsSun /> : <MdDarkMode />}
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

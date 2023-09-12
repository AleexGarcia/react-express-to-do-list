import { Box, Button, Flex, Heading, IconButton } from "@radix-ui/themes";
import { useContext } from "react";
import { BsSun } from "react-icons/bs";
import { MdDarkMode } from "react-icons/md";
import { AppContext } from "../context/AppContext";
import { deleteToken } from "../services/storage";
import { ThemeContext } from "../context/ThemeContext";
const Header = () => {
  const { setUser, isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const {theme, setTheme} = useContext(ThemeContext);
  const toggleColorMode = () => {
     theme === 'dark' ? setTheme('light') : setTheme('dark');
  }
  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    deleteToken();
  };

  return (
    <Box className="bg-transparent w-full">
      <Flex className="p-4 max-w-lg container mx-auto flex flex-row justify-between">
        <Heading className="text-2xl sm:text-4xl font-bold -tracking-tighter text-white">
          TO DO LIST
        </Heading>
        <Flex className="flex flex-row gap-4">
          {isLoggedIn && (
            <Button
              onClick={logout}
              className="button px-4"
            >
              Logout
            </Button>
          )}
          <IconButton onClick={toggleColorMode}>
            {theme === 'light' ? <BsSun /> : <MdDarkMode />}
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;

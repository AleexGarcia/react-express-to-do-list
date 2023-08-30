import { Box, Flex, Heading, IconButton } from "@radix-ui/themes";
import { useState } from "react";
import { BsSun } from 'react-icons/bs'
import {MdDarkMode} from 'react-icons/md'
const Header = () => {
    const [colorMode, setColorMode] = useState<boolean>(false);
    const toggleColorMode = () => {
        colorMode ? setColorMode(false) : setColorMode(true);
    }
    return (
        <Box className="bg-transparent w-full">
            <Flex className="py-4 w-10/12 container mx-auto flex flex-row justify-between">
                <Heading className="text-2xl font-bold -tracking-tighter">TO DO LIST</Heading>
                <IconButton onClick={toggleColorMode}>
                  {colorMode ? <BsSun /> : <MdDarkMode/>}  
                </IconButton>
            </Flex>
        </Box>
    )
}

export default Header;
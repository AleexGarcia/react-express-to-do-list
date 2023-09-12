import { Box, Link, Text } from "@radix-ui/themes";

const Footer = () => {
    return(
        <Box className="p-10 text-center bg-bg-default dark:bg-bg-dark border-t-1 dark:border-none">
            <Text className="text-primary-default dark:text-primary-dark">Desenvolvido por <Link className="text-blue-800" target="_blank" href="https://github.com/AleexGarcia">Aleex Garcia</Link></Text>
        </Box>
    );
}

export default Footer;
import { Box, Link, Text } from "@radix-ui/themes";

const Footer = () => {
    return(
        <Box className="p-10 text-center bg-slate-600">
            <Text>Desenvolvido por <Link href="#">Aleex Garcia</Link></Text>
        </Box>
    );
}

export default Footer;
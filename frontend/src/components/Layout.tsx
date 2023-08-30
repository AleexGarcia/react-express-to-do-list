import Header from "./Header";
import Footer from "./Footer";
import { Box, Flex } from "@radix-ui/themes";
interface Layout {
    children: React.ReactNode;
}
const Layout = ({ children }: Layout) => {
    return (
        <Flex className="h-[100vh] flex flex-col justify-between gap-4">
            <Header />
            <Box className="w-10/12 container mx-auto flex-grow">
                {children}
            </Box>
            <Footer />
        </Flex>
    )
}

export default Layout;
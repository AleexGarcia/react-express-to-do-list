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
      {children}
      <Footer />
    </Flex>
  );
};

export default Layout;

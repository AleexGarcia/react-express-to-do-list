import Header from "./Header";
import Footer from "./Footer";
import { Flex } from "@radix-ui/themes";
interface Layout {
  children: React.ReactNode;
}
const Layout = ({ children }: Layout) => {
  return (
    <Flex
      className="
      dark:bg-bg-dark2
      bg-[url('/assets/bg-mobile-light.jpg')]
      lg:bg-[url('/assets/bg-desktop-light.jpg')]
      dark:bg-[url('/assets/bg-mobile-dark.jpg')]
      dark:lg:bg-[url('/assets/bg-desktop-dark.jpg')]
      bg-no-repeat
      bg-top
      bg-[length:100%_25%]
      min-h-[100vh] 
      flex 
      flex-col 
      justify-between 
      gap-4"
    >
      <Header />
      {children}
      <Footer />
    </Flex>
  );
};

export default Layout;

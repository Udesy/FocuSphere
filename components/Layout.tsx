import MenuTab from "./MenuSelection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen pb-16">
      {" "}
      {/* Add pb-16 to prevent content from being hidden behind the nav */}
      {children}
      <MenuTab />
    </div>
  );
};

export default Layout;

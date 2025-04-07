import { useRouter } from "next/router";
import { menuItem } from "../constant";

const BottomNav = () => {
  const router = useRouter();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {menuItem.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`flex flex-col items-center justify-center flex-1 h-full
                ${
                  router.pathname === item.path
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-400"
                }`}
            >
              <span className="material-icons text-2xl">{item.icon}</span>
              <span className="text-xs mt-1">{item.text}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;

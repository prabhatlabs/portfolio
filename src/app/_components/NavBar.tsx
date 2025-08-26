import { navBarData } from "@/data/data";

const NavBar = () => {
    return (
        <div className="fixed z-10 bottom-0 left-1/2 -translate-x-1/2 w-fit mb-8 rounded-full bg-gradient-to-b from-blue-400 to-90% to-blue-600 flex gap-4 items-center justify-center py-2 px-4">
            {navBarData.map((navItem, i) => (
                <div key={i} className="flex items-center justify-center gap-4">
                    {navItem.map((item, i) => (
                        <a
                            key={i}
                            href={item.url}
                            target={
                                "blank" in item && item.blank
                                    ? "_blank"
                                    : "_self"
                            }
                            rel="noopener noreferrer"
                            className="flex items-center justify-center text-white"
                            title={item.name}
                        >
                            {item.icon}
                        </a>
                    ))}
                    {i < navBarData.length - 1 && (
                        <span className="text-white">|</span>
                    )}
                </div>
            ))}
        </div>
    );
};

export default NavBar;

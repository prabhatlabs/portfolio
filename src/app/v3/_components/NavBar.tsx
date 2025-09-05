"use client";
import GlitchText from "@/components/GlitchText";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";
import Link from "next/link";

function NavTitle() {
    const ROLES = ["Full-Stack", "Frontend", "Backend", "Web Dev"];
    const DURATION = 0.25; // duration of slide
    const PAUSE = 0.5; // pause per role
    const TOTAL = DURATION + PAUSE;

    return (
        <div className="flex gap-2 items-center text-xl w-full">
            <h5>
                <Link href="/">
                    <GlitchText text="Prabhat" />
                </Link>
            </h5>
            {/* <SiGooglegemini className="size-6" /> */}
            <span>•</span>
            <span className="font-light w-28 h-7 relative overflow-hidden">
                {/* Top layer: current text slides up */}
                <motion.span
                    className="absolute inset-0 flex flex-col"
                    initial={{ y: 0 }}
                    animate={{
                        y: ROLES.flatMap((_, i) => [
                            `-${i * 100}%`, // Start position
                            `-${(i + 1) * 100}%`, // End position (holds here for 1 sec)
                        ]).concat(`-${ROLES.length * 100}%`),
                    }}
                    transition={{
                        duration: ROLES.length * (TOTAL + PAUSE),
                        ease: "easeInOut",
                        repeat: Infinity,
                        times: ROLES.flatMap((_, i) => {
                            const stepStart =
                                (i * (TOTAL + PAUSE)) /
                                (ROLES.length * (TOTAL + PAUSE));
                            const stepEnd =
                                (i * (TOTAL + PAUSE) + TOTAL) /
                                (ROLES.length * (TOTAL + PAUSE));
                            return [stepStart, stepEnd];
                        }).concat([1]),
                    }}
                >
                    {ROLES.concat(ROLES[0]).map((role, i) => (
                        <span key={i}>{role}</span>
                    ))}
                </motion.span>

                {/* Bottom layer: next text slides in from bottom */}
                <motion.span
                    className="absolute inset-0 flex flex-col"
                    initial={{ y: "100%" }}
                    animate={{
                        y: ROLES.flatMap((_, i) => [
                            `-${i * 100}%`, // Start position
                            `-${(i + 1) * 100}%`, // End position (holds here for 1 sec)
                        ]).concat(`-${ROLES.length * 100}%`),
                    }}
                    transition={{
                        duration: ROLES.length * (TOTAL + PAUSE),
                        ease: "easeInOut",
                        repeat: Infinity,
                        times: ROLES.flatMap((_, i) => {
                            const stepStart =
                                (i * (TOTAL + PAUSE)) /
                                (ROLES.length * (TOTAL + PAUSE));
                            const stepEnd =
                                (i * (TOTAL + PAUSE) + TOTAL) /
                                (ROLES.length * (TOTAL + PAUSE));
                            return [stepStart, stepEnd];
                        }).concat([1]),
                    }}
                >
                    {ROLES.concat(ROLES[0]).map((role, i) => (
                        <span key={i}>{role}</span>
                    ))}
                </motion.span>
            </span>
        </div>
    );
}

// function NavItem() {
//     const [navItemOpen, setNavItemOpen] = useState<boolean>(false);
//     const [hoverIndex, setHoverIndex] = useState<number | null>(null);

//     const DURATION = 0.25;
//     const STAGGER = 0.03;

//     return (
//         <>
//             <nav className="hidden md:flex items-center justify-end lg:justify-center gap-6 w-full">
//                 {navBarData.map((navItem, i) => {
//                     const hovered = hoverIndex === i;

//                     return (
//                         <div
//                             key={i}
//                             className="relative overflow-hidden h-6 cursor-pointer"
//                             onMouseEnter={() => setHoverIndex(i)}
//                             onMouseLeave={() => setHoverIndex(null)}
//                         >
//                             <Link href={navItem.url} className="block">
//                                 {/* Top layer: current text (0 → -100%) */}
//                                 <span className="absolute inset-0 flex">
//                                     {navItem.name.split("").map((char, idx) => (
//                                         <motion.span
//                                             key={`t-${idx}`}
//                                             className="inline-block"
//                                             initial={{ y: 0 }}
//                                             animate={{
//                                                 y: hovered ? "-100%" : "0%",
//                                             }}
//                                             transition={{
//                                                 duration: DURATION,
//                                                 ease: "easeInOut",
//                                                 delay: idx * STAGGER,
//                                             }}
//                                         >
//                                             {char}
//                                         </motion.span>
//                                     ))}
//                                 </span>

//                                 {/* Bottom layer: next text (100% → 0) */}
//                                 <span className="absolute inset-0 flex">
//                                     {navItem.name.split("").map((char, idx) => (
//                                         <motion.span
//                                             key={`b-${idx}`}
//                                             className="inline-block text-red-500"
//                                             initial={{ y: "100%" }}
//                                             animate={{
//                                                 y: hovered ? "0%" : "100%",
//                                             }}
//                                             transition={{
//                                                 duration: DURATION,
//                                                 ease: "easeInOut",
//                                                 delay: idx * STAGGER,
//                                             }}
//                                         >
//                                             {char}
//                                         </motion.span>
//                                     ))}
//                                 </span>

//                                 {/* Spacer to reserve height */}
//                                 <span className="invisible">
//                                     {navItem.name}
//                                 </span>
//                             </Link>
//                         </div>
//                     );
//                 })}

//                 <ThemeToggle className="block lg:hidden" />
//             </nav>
//             <Button
//                 size={"icon"}
//                 variant={"ghost"}
//                 className="md:hidden"
//                 onClick={() => setNavItemOpen((p) => !p)}
//             >
//                 <Menu className="size-5" />
//             </Button>
//             <motion.div
//                 initial={{ height: 0, opacity: 0 }}
//                 animate={{
//                     height: navItemOpen ? "fit-content" : "0%",
//                     opacity: navItemOpen ? "100%" : "0%",
//                 }}
//                 transition={{
//                     duration: 0.25,
//                 }}
//                 className="absolute overflow-y-hidden flex flex-col md:hidden items-center justify-center top-full right-0 m-4 p-1 bg-background border border-border rounded-md"
//             >
//                 {navBarData.map((navItem, i) => (
//                     <Link href={navItem.url} title={navItem.name} key={i}>
//                         <Button variant={"ghost"} size={"icon"}>
//                             {navItem.icon}
//                         </Button>
//                     </Link>
//                 ))}
//                 <ThemeToggle className="" />
//             </motion.div>
//         </>
//     );
// }

function NavOthers() {
    return (
        <div className="flex items-center justify-end gap-2 w-full">
            <ThemeToggle />
        </div>
    );
}

function NavBar() {
    return (
        <div className="fixed top-0 left-0 right-0 z-50 w-full border-b border-border bg-background">
            <div className="max-w-7xl w-full mx-auto py-2 px-4 flex items-center justify-between gap-2">
                <NavTitle />
                <NavOthers />
            </div>
        </div>
    );
}

export default NavBar;

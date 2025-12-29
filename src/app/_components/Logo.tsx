export function Logo({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="330"
            height="42"
            viewBox="0 0 330 42"
            fill="none"
            className={className}
        >
            {/* P (0) */}
            <path d="M0 36V6H18V24H6V36H0Z" fill="var(--foreground)" />
            <path d="M12 18H6V12H12V18Z" fill="var(--background)" />

            {/* R (24) */}
            <path
                d="M24 36V6H42V24H30V36H24ZM36 24L42 36H36L30 24H36Z"
                fill="var(--foreground)"
            />
            <path d="M36 18H30V12H36V18Z" fill="var(--background)" />

            {/* A (48) */}
            <path d="M66 24H54V18H66V24Z" fill="var(--muted-foreground)" />
            <path
                d="M48 36V6H54V36H48ZM72 36V6H66V36H72ZM66 12H54V6H66V12Z"
                fill="var(--foreground)"
            />

            {/* B (78) */}
            <path d="M78 36V6H96V36H78Z" fill="var(--foreground)" />
            <path d="M90 18H84V12H90V18Z" fill="var(--background)" />
            <path d="M90 30H84V24H90V30Z" fill="var(--background)" />

            {/* H (102) */}
            <path d="M120 24H108V18H120V24Z" fill="var(--muted-foreground)" />
            <path
                d="M102 36V6H108V36H102ZM126 36V6H120V36H126Z"
                fill="var(--foreground)"
            />

            {/* A (132) */}
            <path d="M150 24H138V18H150V24Z" fill="var(--muted-foreground)" />
            <path
                d="M132 36V6H138V36H132ZM156 36V6H150V36H156ZM150 12H138V6H150V12Z"
                fill="var(--foreground)"
            />

            {/* T (162) */}
            <path d="M162 12V6H186V12H162Z" fill="var(--foreground)" />
            <path d="M171 36V12H177V36H171Z" fill="var(--foreground)" />

            {/* L (192) */}
            <path d="M210 36H198V30H210V36Z" fill="var(--muted-foreground)" />
            <path d="M192 36V6H198V36H192Z" fill="var(--foreground)" />

            {/* A (216) */}
            <path d="M234 24H222V18H234V24Z" fill="var(--muted-foreground)" />
            <path
                d="M216 36V6H222V36H216ZM240 36V6H234V36H240ZM234 12H222V6H234V12Z"
                fill="var(--foreground)"
            />

            {/* B (246) */}
            <path d="M246 36V6H264V36H246Z" fill="var(--foreground)" />
            <path d="M258 18H252V12H258V18Z" fill="var(--background)" />
            <path d="M258 30H252V24H258V30Z" fill="var(--background)" />

            {/* S (270) */}
            <path d="M270 36V6H288V36H270Z" fill="var(--foreground)" />
            <path d="M288 18H276V12H288V18Z" fill="var(--background)" />
            <path d="M282 30H270V24H282V30Z" fill="var(--background)" />
        </svg>
    );
}

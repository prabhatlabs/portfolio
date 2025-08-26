const SectionLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="relative max-w-7xl mx-auto w-full min-h-dvh">
            {children}
        </div>
    );
};

export default SectionLayout;

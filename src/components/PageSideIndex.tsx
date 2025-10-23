import type { PageContent } from "@/data/page.types";

type PageSideIndexProps = {
  page: PageContent[];
};

function PageSideIndex({ page }: PageSideIndexProps) {
  return (
    <div className="hidden xl:block fixed top-0 right-0 z-40 mt-16 px-4 xl:px-6 h-[calc(100dvh-200px)] overflow-y-auto max-w-64 xl:max-w-72 w-fit text-sm text-muted-foreground">
      <h5 className="my-2">{"On This Page"}</h5>
      <div className="flex flex-col gap-2 my-4">
        {page.map((c, i) => (
          <div key={i} className="flex flex-col gap-2">
            <a href={`#${c.title}_${i}`} className="hover:underline">{c.title}</a>
            {c.content && typeof c.content !== "string" && typeof c.content?.[0] !== "string" && c.content.map((content, j) => (
              <div key={j} className="pl-6">
                {typeof content !== "string" && content.title && (
                  <a href={`#${content.title}_${j}`} className="hover:underline">{content.title}</a>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageSideIndex;


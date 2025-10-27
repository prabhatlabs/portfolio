import type { LinkItem, PageData, PillItem } from "@/data/page.types";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import TextHighlighting5000 from "./TextHighlight5000";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const TextHighlight5000Options = {
  className: "text-sm text-foreground/60 leading-tight",
  highlightedTextClassName: "font-bold text-sm text-foreground/80",
  specialTextClassName: "italic font-bold text-sm text-foreground/80",
};

export const PageRenderer = ({ page }: { page: PageData }) => (
  <div className="space-y-8">
    <header className="flex flex-col lg:flex-row gap-2 lg:gap-4">
      {page.imageUrl && (
        <div className="w-fit h-full border border-border rounded-md">
          <Image
            src={page.imageUrl}
            alt={page.title}
            width={100}
            height={100}
            className="object-cover w-full h-full rounded-md"
          />
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold">{page.title}</h1>
        <p className="text-muted-foreground">{page.description}</p>
      </div>
    </header>

    {page.contents.map((section, i) => (
      <section key={i} className="space-y-4 relative" id={`${section.title}_${i}`}>
        <Separator />
        <div>
          <div className="flex gap-4 items-center">
            {section.iconUrl
              &&
              <div className="size-[35px] border border-border rounded">
                <Image
                  src={section.iconUrl}
                  alt={section.title}
                  width={35}
                  height={35}
                  className="object-cover w-full h-full rounded"
                />
              </div>
            }
            <div>
              <h2 className="text-2xl flex items-center gap-2">
                {section.icon && <section.icon className="size-5" />}
                {section.title}
              </h2>
              {section.subtitle && (
                <h3 className="text-foreground/80 text-lg">{section.subtitle}</h3>
              )}
            </div>
          </div>

          {section.description && (
            <p className="text-foreground/80 text-sm">
              {section.description}
            </p>
          )}

          {section.links && (
            <div className="flex flex-wrap gap-2 my-1">
              {section.links.map((link, j) => (
                <LinkItemRenderer key={j} props={link} />
              ))}
            </div>
          )}
        </div>

        {section.imageUrl && (
          <div className="">
            <div className="border border-border rounded-md">
              <Image
                src={section.imageUrl}
                alt={section.title}
                width={400}
                height={300}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          </div>
        )}

        {section.content && (
          <div className="">
            {typeof section.content === "string" ? (
              <TextHighlighting5000
                text={section.content}
                {...TextHighlight5000Options}
              />
            ) : (
              <ul
                className={
                  typeof section.content?.[0] === "string"
                    ? "pl-4 lg:pl-6 list-disc"
                    : "space-y-4"
                }
              >
                {section.content?.map((sub, j) => (
                  <Fragment key={j}>
                    {typeof sub === "string" ? (
                      <li>
                        <TextHighlighting5000
                          text={sub}
                          {...TextHighlight5000Options}
                        />
                      </li>
                    ) : (
                      <div id={`${sub.title}_${j}`} className="flex flex-col sm:flex-row sm:gap-4 flex-1 mb-8 sm:mb-4">
                        {sub.imageUrl &&
                          <div className="sm:w-fit sm:h-fit border border-border rounded-md shrink-0">
                            <Image
                              src={sub.imageUrl}
                              alt={sub.title}
                              width={200}
                              height={150}
                              className="object-cover w-full h-full rounded-md"
                            />
                          </div>
                        }
                        <div className="w-full">
                          <div className="flex gap-4 sm:gap-2 items-center">
                            {sub.iconUrl
                              &&
                              <div className="size-[35px] border border-border rounded shrink-0">
                                <Image
                                  src={sub.iconUrl}
                                  alt={sub.title}
                                  width={35}
                                  height={35}
                                  className="object-cover w-full h-full rounded"
                                />
                              </div>
                            }
                            <div className="w-full">
                              <h3 className="text-base text-foreground/80">
                                {sub.title}
                              </h3>
                              {typeof sub.content === "string" ? (
                                <>
                                  <div className="w-full">
                                    <TextHighlighting5000
                                      text={sub.content}
                                      {...TextHighlight5000Options}
                                      enableNewLine={false}
                                      className={"hidden sm:block " + TextHighlight5000Options.className}
                                    />
                                    <TextHighlighting5000
                                      text={sub.content}
                                      {...TextHighlight5000Options}
                                      className={"sm:hidden " + TextHighlight5000Options.className}
                                    />
                                  </div>
                                </>
                              ) : (
                                <ul
                                  className={
                                    typeof sub.content?.[0] === "string"
                                      ? "pl-4 lg:pl-6 list-disc"
                                      : ""
                                  }
                                >
                                  {sub.content.map((text, index) => (
                                    <li key={index}>
                                      <TextHighlighting5000
                                        text={text}
                                        {...TextHighlight5000Options}
                                      />
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          </div>
                          {sub.links && (
                            <div className="flex flex-wrap gap-2 my-1">
                              {sub.links.map((link, j) => (
                                <LinkItemRenderer key={j} props={link} />
                              ))}
                            </div>
                          )}
                          {sub.pills && (
                            <div className="flex flex-wrap gap-2">
                              {sub.pills.map((pill, j) => (
                                <PillRenderer key={j} props={pill} />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Fragment>
                ))}
              </ul>
            )}
          </div>
        )}

        {section.bottomLinks && (
          <div className="flex justify-end flex-wrap gap-2 my-1">
            {section.bottomLinks.map((link, j) => (
              <LinkItemRenderer key={j} props={link} bottomLink />
            ))}
          </div>
        )}

        {section.pills && (
          <div className="flex flex-wrap gap-2">
            {section.pills.map((pill, j) => (
              <PillRenderer key={j} props={pill} />
            ))}
          </div>
        )}
      </section>
    ))}
  </div>
);

function LinkItemRenderer({ props, bottomLink }: { props: LinkItem, bottomLink?: boolean }) {
  return (
    <Link href={props.url} target={props.target} className={bottomLink ? "absolute -bottom-2 right-0" : ""}>
      {
        bottomLink
          ? <span className="hover:underline">{props.name}</span>
          : <Button variant={"outlineBold"} size={"sm"}>
            {props.icon && <props.icon className="size-4" />}
            {props.name}
          </Button>
      }
    </Link>
  );
}

function PillRenderer({ props }: { props: PillItem }) {
  return (
    <div className="inline-flex items-center gap-1 border border-border rounded-sm px-2 py-1 text-xs">
      <props.icon className="size-4" />
      {props.name}
    </div>
  );
}

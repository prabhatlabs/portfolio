import { ads } from "@/data/ad";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

function MyAdsPageSide() {
  return (
    <div className="hidden xl:block fixed top-0 left-0 z-40 mt-16 px-4 xl:px-6 h-[calc(100dvh-200px)] overflow-y-auto max-w-60 w-fit">
      {ads.map((ad, i) => (
        <div
          key={i}
          className="flex flex-col gap-1 my-4 xl:my-6 bg-secondary/80 rounded-md pt-2 p-3"
        >
          <p className="text-sm text-muted-foreground">{ad.description}</p>
          {ad.imageUrl && (
            <div className="w-full h-20 border border-border rounded-md">
              <Image
                src={ad.imageUrl}
                alt={ad.title}
                width={200}
                height={100}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          )}
          <h5 className="text-lg text-foreground">{ad.title}</h5>

          <div className="flex flex-wrap gap-2">
            {ad.links.map((link, j) => (
              <Link key={j} href={link.url} title={link.name} target={link.target}>
                <Button size={"icon"} variant={"outline"}>
                  {link.icon && <link.icon className="size-4" />}
                  {/* {link.name} */}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyAdsPageSide;

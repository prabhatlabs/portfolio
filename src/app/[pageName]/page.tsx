import { PageRenderer } from "@/components/PageRenderer";
import PageSideIndex from "@/components/PageSideIndex";
import {
  blogsPage,
  experiencePage,
  myInfoPage,
  projectsPage,
  skillsPage,
} from "@/data/pages";

async function Page({ params }: { params: Promise<{ pageName: string }> }) {
  const { pageName } = await params;
  const pageData = (() => {
    switch (pageName) {
      case myInfoPage.tabName:
        return myInfoPage;
      case blogsPage.tabName:
        return blogsPage;
      case projectsPage.tabName:
        return projectsPage;
      case skillsPage.tabName:
        return skillsPage;
      case experiencePage.tabName:
        return experiencePage;
      default:
        return null;
    }
  })();

  if (!pageData) {
    return <div>{`No page found for '/${pageName}'`}</div>;
  }

  return (
    <>
      <PageRenderer page={pageData} />
      <PageSideIndex page={pageData.contents} />
    </>
  );
}

export default Page;

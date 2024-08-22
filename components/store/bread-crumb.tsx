import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const BreadcrumbComponent = ({
  crumbs,
  page,
}: {
  crumbs: string[];
  page: string;
}) => {
  return (
    <Breadcrumb className="mt-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {crumbs && crumbs.length > 0 && crumbs[0] !== "" && (
          <>
            <BreadcrumbSeparator />
            {crumbs.map((crumb, index) => (
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={"#"}>{crumb}</BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </>
        )}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-wrap truncate">{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

import { JobFilters } from "@/components/general/JobFilters";
import JobListings from "@/components/general/JobListings";
import JobListingsLoading from "@/components/general/JobListingsLoading";
import { Suspense } from "react";
import { FilterDrawer } from "@/components/general/FilterDrawer";

type SearchParamsProps = {
  searchParams: Promise<{
    page?: string;
    jobTypes?: string;
    location?: string;
  }>;
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const jobTypes = params.jobTypes?.split(",") || [];
  const location = params.location || "";

  const filterKey = `page=${currentPage};types=${jobTypes.join(",")};location=${location}`;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="hidden lg:block lg:col-span-1">
          <JobFilters />
        </div>
        <div className="lg:col-span-3">
          <div className="mb-4 lg:hidden">
            <FilterDrawer>
              <JobFilters />
            </FilterDrawer>
          </div>
          <Suspense key={filterKey} fallback={<JobListingsLoading />}>
            <JobListings
              currentPage={currentPage}
              jobTypes={jobTypes}
              location={location}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { Card, CardHeader } from "../ui/card";
import { MapPin, User2 } from 'lucide-react';
import { Badge } from "../ui/badge";
import { formatCurrency } from "@/app/utils/formatCurrency";
import Image from "next/image";
import { formatRelativeTime } from "@/app/utils/formatRelativeTime";

interface iAppProps {
  job: {
    id: string;
    jobTitle: string;
    salaryFrom: number;
    salaryTo: number;
    employmentType: string;
    location: string;
    createdAt: Date;
    company: {
      logo: string | null;
      name: string;
      about: string;
      location: string;
    };
  };
}

export function JobCard({ job }: iAppProps) {
  return (
    <Link href={`/job/${job.id}`}>
      <Card className="hover:shadow-lg transition-all duration-300 hover:border-emerald-500 relative">
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            {job.company.logo ? (
              <Image
                src={job.company.logo || "/placeholder.svg"}
                alt={job.company.name}
                width={48}
                height={48}
                className="size-12 rounded-lg"
              />
            ) : (
              <div className="bg-red-500 size-12 rounded-lg flex items-center justify-center">
                <User2 className="size-6 text-white" />
              </div>
            )}
            <div className="flex flex-col flex-grow">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold">{job.jobTitle}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {job.company.name}
                </p>
                <span className="hidden sm:inline text-muted-foreground">
                  •
                </span>
                <Badge className="rounded-full text-xs" variant="secondary">
                  {job.employmentType}
                </Badge>
                <span className="hidden sm:inline text-muted-foreground">
                  •
                </span>
                <Badge className="rounded-full text-xs">{job.location}</Badge>
                <span className="hidden sm:inline text-muted-foreground">
                  •
                </span>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {formatCurrency(job.salaryFrom)} -
                  {formatCurrency(job.salaryTo)}
                </p>
              </div>
            </div>

            <div className="sm:ml-auto mt-2 sm:mt-0">
              <div className="flex items-center gap-2">
                <MapPin className="size-4" />
                <h1 className="text-sm sm:text-base md:text-lg font-semibold whitespace-nowrap">
                  {job.location}
                </h1>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground sm:text-right">
                {formatRelativeTime(job.createdAt)}
              </p>
            </div>
          </div>
          <div className="!mt-3 sm:!mt-5">
            <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">
              {job.company.about}
            </p>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}
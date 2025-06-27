"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ApodResponseType } from "@/typings/types";

export const ApodDisplay: React.FC<{
  data: ApodResponseType;
}> = ({ data }) => {
  const { title, explanation, url, hdurl, date } = data;

  return (
    <Card className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <CardHeader>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {date && (
          <p className="text-sm text-muted-foreground">
            {new Date(date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}
      </CardHeader>

      <CardContent>
        <AspectRatio
          ratio={16 / 9}
          className="bg-muted rounded-lg overflow-hidden mb-4"
        >
          <img
            src={url}
            alt={title}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </AspectRatio>

        <p className="text-base leading-relaxed">{explanation}</p>
      </CardContent>

      <CardFooter className="flex justify-end">
        <a
          href={hdurl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-primary hover:underline"
        >
          View HD Version
        </a>
      </CardFooter>
    </Card>
  );
};

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchHero } from "@/lib/actions/home-actions";
import { HeroInterface } from "@/lib/types";
import { HeroAction } from "./hero-actions";

export const HeroTable = async () => {
  const hero = await fetchHero();
  return (
    <>
      <Card>
        <CardHeader className="flex justify-between">
          <CardTitle className="text-2xl">Hero Section</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            {hero && hero.length <= 0 && (
              <TableCaption>
                No Hero Section, To add Hero Section click on{" "}
                <span className="text-primary font-medium">Add Hero</span>
              </TableCaption>
            )}

            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead className="truncate">Heading</TableHead>
                <TableHead className="truncate">Link</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hero &&
                hero.map((item: HeroInterface) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <Image
                        src={item.image}
                        alt={item.brand}
                        width={40}
                        height={50}
                      />
                    </TableCell>
                    <TableCell className="truncate">{item.brand}</TableCell>
                    <TableCell className="truncate">{item.headline}</TableCell>
                    <TableCell className="truncate">{item.link}</TableCell>
                    <TableCell>
                      <HeroAction id={item.id} />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

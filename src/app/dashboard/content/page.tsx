import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const courses = [
  { id: 1, title: "Introduction to Algebra", subject: "Mathematics", chapters: 10, status: "Published" },
  { id: 2, title: "World History: Ancient Civilizations", subject: "History", chapters: 15, status: "Published" },
  { id: 3, title: "Fundamentals of Physics", subject: "Science", chapters: 12, status: "Draft" },
  { id: 4, title: "English Literature: The Classics", subject: "Literature", chapters: 8, status: "Published" },
  { id: 5, title: "Basics of Programming with Python", subject: "Computer Science", chapters: 20, status: "Draft" },
];

export default function ContentPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Content Management</h1>
        <Button asChild>
          <Link href="/dashboard/content/new">Add New Course</Link>
        </Button>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-center">Chapters</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell>{course.subject}</TableCell>
                  <TableCell className="text-center">{course.chapters}</TableCell>
                  <TableCell>
                    <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Preview</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

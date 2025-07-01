import Link from "next/link";
import { MoreHorizontal, PlusCircle, Upload, Video, ClipboardList, CalendarClock } from "lucide-react";
import { format } from "date-fns";
import clientPromise from "@/lib/mongodb";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QuickUploads } from "@/components/quick-uploads";


type Course = {
  _id: string;
  title: string;
  subject: string;
  status: string;
  createdAt: string;
};

async function getCourses(): Promise<Course[]> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const courses = await db
      .collection(process.env.COLLECTION_NAME!)
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();
    
    return JSON.parse(JSON.stringify(courses));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function ContentPage() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Content Management</h1>
        <Button asChild>
          <Link href="/dashboard/content/new"><PlusCircle/> Add New Course</Link>
        </Button>
      </div>

      <QuickUploads />

      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>Manage your existing courses here.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course Title</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">No courses found.</TableCell>
                </TableRow>
              )}
              {courses.map((course) => (
                <TableRow key={course._id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                   <TableCell>{course.subject || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={course.status === "Published" ? "default" : "secondary"}>
                      {course.status || "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {course.createdAt ? format(new Date(course.createdAt), "PPP") : 'N/A'}
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
                        <DropdownMenuItem>Publish</DropdownMenuItem>
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

import Link from "next/link";
import { MoreHorizontal } from "lucide-react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Note = {
  _id: string;
  title: string;
  status: string;
  createdAt: string;
};

async function getNotes(): Promise<Note[]> {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const notes = await db
      .collection(process.env.COLLECTION_NAME!)
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .toArray();
    
    return JSON.parse(JSON.stringify(notes));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function ContentPage() {
  const notes = await getNotes();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-4xl font-bold font-headline tracking-tight">Content Management</h1>
        <Button asChild>
          <Link href="/dashboard/content/new">Add New Note</Link>
        </Button>
      </div>
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>All Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Note Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {notes.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="text-center h-24">No notes found.</TableCell>
                </TableRow>
              )}
              {notes.map((note) => (
                <TableRow key={note._id}>
                  <TableCell className="font-medium">{note.title}</TableCell>
                  <TableCell>
                    <Badge variant={note.status === "Published" ? "default" : "secondary"}>
                      {note.status || "Draft"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {note.createdAt ? format(new Date(note.createdAt), "PPP") : 'N/A'}
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

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Upload, Video, ClipboardList, CalendarClock, StickyNote, BookCopy } from "lucide-react";

const uploadActions = [
  {
    title: "Upload Class Notes",
    description: "PDFs, Docs",
    icon: StickyNote,
    dialogTitle: "Upload Class Notes",
    dialogDescription: "Select a course and upload your notes file.",
  },
  {
    title: "Upload Video",
    description: "MP4, MOV",
    icon: Video,
    dialogTitle: "Upload Video",
    dialogDescription: "Select a course and upload your video file.",
  },
  {
    title: "Add Model Question",
    description: "Question papers",
    icon: BookCopy,
    dialogTitle: "Add Model Question",
    dialogDescription: "Select a course and year to add a model question paper.",
  },
  {
    title: "Add Assignment",
    description: "Set a deadline",
    icon: ClipboardList,
    dialogTitle: "Add Assignment",
    dialogDescription: "Select a course and create a new assignment.",
  },
  {
    title: "Schedule Live Class",
    description: "Google Meet, Zoom",
    icon: CalendarClock,
    dialogTitle: "Schedule Live Class",
    dialogDescription: "Select a course and schedule a new live session.",
  },
];

export function QuickUploads() {
  return (
    <Card className="shadow-md">
        <CardHeader>
            <CardTitle>Quick Uploads</CardTitle>
            <CardDescription>Quickly add new content to your courses.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {uploadActions.map((action) => (
          <Dialog key={action.title}>
            <DialogTrigger asChild>
              <button className="w-full text-left p-4 border rounded-lg hover:bg-muted/50 transition-colors flex flex-col items-start gap-2 h-full">
                  <action.icon className="h-6 w-6 text-primary" />
                  <p className="font-semibold">{action.title}</p>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{action.dialogTitle}</DialogTitle>
                <DialogDescription>{action.dialogDescription}</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="course" className="text-right">Course</Label>
                  <Input id="course" placeholder="e.g. Intro to Algebra" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">File</Label>
                  <Input id="file" type="file" className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">Description</Label>
                   <Textarea id="description" placeholder="A short description" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button>Upload</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))}
      </CardContent>
    </Card>
  );
}

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Wand2, Loader2 } from "lucide-react";
import { handleSuggestTags, handleCreateNote } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "./ui/card";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  tags: z.array(z.string()).optional(),
});

export function ContentForm() {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [suggestedTags, setSuggestedTags] = useState<string[]>([]);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
    },
  });

  const onSuggestTags = async () => {
    const description = form.getValues("description");
    if (!description || description.length < 10) {
      toast({
        variant: "destructive",
        title: "Description too short",
        description: "Please provide a more detailed description to get tag suggestions.",
      });
      return;
    }

    setIsSuggesting(true);
    try {
      const result = await handleSuggestTags({ contentDescription: description });
      if (result.success && result.tags) {
        const currentTags = form.getValues("tags") || [];
        const newTags = result.tags.filter(tag => !currentTags.includes(tag));
        setSuggestedTags(prev => [...prev, ...newTags]);
        form.setValue("tags", [...currentTags, ...newTags]);
      } else {
        toast({
          variant: "destructive",
          title: "Failed to get suggestions",
          description: result.error,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "An error occurred",
        description: "Could not fetch tag suggestions. Please try again.",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const result = await handleCreateNote(values);
    if (result.success) {
      toast({
        title: "Note Created!",
        description: "The new note has been saved successfully.",
      });
      router.push("/dashboard/content");
    } else {
      toast({
        variant: "destructive",
        title: "Failed to create note",
        description: result.error,
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., My Great Note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your note here..."
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
               <div className="flex items-center justify-between">
                <div>
                  <FormLabel>Content Tags</FormLabel>
                  <FormDescription>AI can suggest tags based on your content.</FormDescription>
                </div>
                 <Button type="button" onClick={onSuggestTags} disabled={isSuggesting} variant="outline">
                   {isSuggesting ? (
                     <Loader2 className="animate-spin" />
                   ) : (
                     <Wand2 />
                   )}
                   Suggest Tags
                 </Button>
               </div>
              {form.watch("tags") && form.watch("tags")!.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {form.watch("tags")!.map((tag, index) => (
                    <Badge key={index} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
            
            <div className="flex justify-end gap-2">
              <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="animate-spin" />}
                Save Note
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

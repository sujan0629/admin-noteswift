"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { suggestTags } from "@/ai/flows/content-tagging";
import type { ContentTaggingInput } from "@/ai/flows/content-tagging";
import clientPromise from "@/lib/mongodb";

export async function handleSuggestTags(data: ContentTaggingInput) {
  try {
    const result = await suggestTags(data);
    return { success: true, tags: result.tags };
  } catch (error) {
    console.error("Error suggesting tags:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

const courseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  subject: z.string().min(2, "Subject must be at least 2 characters long."),
  tags: z.array(z.string()).optional(),
});

export async function handleCreateCourse(data: z.infer<typeof courseSchema>) {
  try {
    const validation = courseSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, error: "Invalid data." };
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME!);

    const newCourse = {
      ...validation.data,
      status: "Draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newCourse);

    revalidatePath("/dashboard/content");
    return { success: true, message: "Course created successfully." };
  } catch (error) {
    console.error("Error creating course:", error);
    return { success: false, error: "An unexpected error occurred while creating the course." };
  }
}

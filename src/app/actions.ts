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

const noteSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long."),
  description: z.string().min(10, "Description must be at least 10 characters long."),
  tags: z.array(z.string()).optional(),
});

export async function handleCreateNote(data: z.infer<typeof noteSchema>) {
  try {
    const validation = noteSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, error: "Invalid data." };
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.COLLECTION_NAME!);

    const newNote = {
      ...validation.data,
      status: "Draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await collection.insertOne(newNote);

    revalidatePath("/dashboard/content");
    return { success: true, message: "Note created successfully." };
  } catch (error) {
    console.error("Error creating note:", error);
    return { success: false, error: "An unexpected error occurred while creating the note." };
  }
}

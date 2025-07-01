"use server";

import { suggestTags } from "@/ai/flows/content-tagging";
import type { ContentTaggingInput } from "@/ai/flows/content-tagging";

export async function handleSuggestTags(data: ContentTaggingInput) {
  try {
    const result = await suggestTags(data);
    return { success: true, tags: result.tags };
  } catch (error) {
    console.error("Error suggesting tags:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}

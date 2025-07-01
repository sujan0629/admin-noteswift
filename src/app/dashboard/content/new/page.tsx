import { ContentForm } from "@/components/content-form";

export default function NewContentPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold font-headline tracking-tight">Create New Note</h1>
      <ContentForm />
    </div>
  );
}

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { UsersRound, NotebookPen, StickyNote, UserCheck } from "lucide-react";

const metrics = [
  { title: "Total Users", value: "1,250", icon: UsersRound, change: "+15.2% from last month" },
  { title: "Courses Published", value: "48", icon: NotebookPen, change: "+5 from last month" },
  { title: "Notes Added", value: "520", icon: StickyNote, change: "+50 from last month" },
  { title: "Active Users (24h)", value: "350", icon: UserCheck, change: "+20.1% from last month" },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold font-headline tracking-tight">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.title} className="shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-md">
          <CardHeader>
            <CardTitle className="font-headline">Recent User Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">A feed of recent user sign-ups and content uploads will be displayed here.</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="font-headline">Course Engagement</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">A chart showing popular courses will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

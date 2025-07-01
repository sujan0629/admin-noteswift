import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, BookOpenCheck, FileVideo, UserCheck } from "lucide-react";

const metrics = [
  { title: "Total Students", value: "1,250", icon: Users, change: "+15.2% from last month" },
  { title: "Active Courses", value: "48", icon: BookOpenCheck, change: "+5 from last month" },
  { title: "Total Lessons", value: "520", icon: FileVideo, change: "+50 from last month" },
  { title: "Enrollments", value: "3,402", icon: UserCheck, change: "+20.1% from last month" },
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
            <CardTitle className="font-headline">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Activity feed will be displayed here.</p>
          </CardContent>
        </Card>
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="font-headline">Course Completion</CardTitle>
          </CardHeader>
          <CardContent>
             <p className="text-muted-foreground">Course completion chart will be displayed here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

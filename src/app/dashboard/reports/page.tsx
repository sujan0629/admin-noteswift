"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const enrollmentData = [
  { month: "Jan", newStudents: 186 },
  { month: "Feb", newStudents: 305 },
  { month: "Mar", newStudents: 237 },
  { month: "Apr", newStudents: 273 },
  { month: "May", newStudents: 209 },
  { month: "Jun", newStudents: 250 },
];

const performanceData = [
    { course: "Algebra", completion: 85 },
    { course: "History", completion: 72 },
    { course: "Physics", completion: 65 },
    { course: "Literature", completion: 91 },
    { course: "Python", completion: 78 },
];

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-bold font-headline tracking-tight">Reports</h1>
      <Tabs defaultValue="enrollment">
        <TabsList>
          <TabsTrigger value="enrollment">Student Enrollment</TabsTrigger>
          <TabsTrigger value="performance">Course Performance</TabsTrigger>
        </TabsList>
        <TabsContent value="enrollment" className="mt-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>New Student Enrollment (Last 6 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={enrollmentData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} />
                        <YAxis tickLine={false} axisLine={false} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="newStudents" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="mt-6">
           <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Course Completion Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={performanceData} layout="vertical" margin={{ top: 20, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                        <YAxis dataKey="course" type="category" tickLine={false} axisLine={false} width={100}/>
                        <XAxis type="number" tickLine={false} axisLine={false} />
                        <ChartTooltip cursor={{fill: 'hsl(var(--muted))'}} content={<ChartTooltipContent />} />
                        <Bar dataKey="completion" name="Completion Rate" unit="%" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                    </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

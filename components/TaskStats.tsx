"use client";

import { Card } from "@/components/ui/card";
import { Task } from "@/types/task";
import { CheckCircle2, Circle, AlertCircle } from "lucide-react";

interface TaskStatsProps {
  tasks: Task[];
}

export default function TaskStats({ tasks }: TaskStatsProps) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const highPriorityTasks = tasks.filter(task => task.priority === "high" && !task.completed).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="p-4 flex items-center space-x-4">
        <div className="p-2 bg-primary/10 rounded-full">
          <CheckCircle2 className="h-6 w-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Completed Tasks</p>
          <p className="text-2xl font-bold">{completedTasks}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center space-x-4">
        <div className="p-2 bg-secondary/10 rounded-full">
          <Circle className="h-6 w-6 text-secondary-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Pending Tasks</p>
          <p className="text-2xl font-bold">{pendingTasks}</p>
        </div>
      </Card>

      <Card className="p-4 flex items-center space-x-4">
        <div className="p-2 bg-destructive/10 rounded-full">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">High Priority</p>
          <p className="text-2xl font-bold">{highPriorityTasks}</p>
        </div>
      </Card>
    </div>
  );
}
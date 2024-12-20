"use client";

import { Task } from "@/types/task";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TaskListProps {
  tasks: Task[];
  onToggleStatus: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskList({ tasks, onToggleStatus, onDelete }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No tasks yet. Add some tasks to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
        >
          <div className="flex items-center space-x-4">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => onToggleStatus(task.id)}
            />
            <div>
              <p className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                {task.title}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {format(new Date(task.dueDate), "MMM d, yyyy")}
                </span>
                <Badge variant={getPriorityVariant(task.priority)}>
                  {task.priority}
                </Badge>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(task.id)}
            className="text-destructive hover:text-destructive/90"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function getPriorityVariant(priority: string) {
  switch (priority.toLowerCase()) {
    case "high":
      return "destructive";
    case "medium":
      return "warning";
    case "low":
      return "secondary";
    default:
      return "default";
  }
}
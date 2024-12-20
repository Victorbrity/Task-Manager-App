"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import TaskList from "@/components/TaskList";
import AddTaskDialog from "@/components/AddTaskDialog";
import TaskStats from "@/components/TaskStats";
import { Task } from "@/types/task";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);

  const addTask = (task: Task) => {
    setTasks([...tasks, { ...task, id: Date.now().toString() }]);
  };

  const toggleTaskStatus = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: !task.completed }
        : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Task Manager</h1>
            <p className="text-muted-foreground mt-2">Organize your tasks efficiently</p>
          </div>
          <Button onClick={() => setIsAddTaskOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>

        <TaskStats tasks={tasks} />

        <Card className="p-6">
          <TaskList
            tasks={tasks}
            onToggleStatus={toggleTaskStatus}
            onDelete={deleteTask}
          />
        </Card>

        <AddTaskDialog
          open={isAddTaskOpen}
          onOpenChange={setIsAddTaskOpen}
          onAddTask={addTask}
        />
      </div>
    </div>
  );
}
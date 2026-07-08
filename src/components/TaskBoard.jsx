import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

import { getTasks, updateTaskStatus, deleteTask } from "../services/tasks";

const PRIORITY_STYLES = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
};

export default function TaskBoard({ projectId }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    const data = await getTasks(projectId);

    setTasks(data);
  }

  const columns = [
    {
      id: "todo",
      title: "To Do",
    },

    {
      id: "in_progress",
      title: "In Progress",
    },

    {
      id: "done",
      title: "Done",
    },
  ];

  async function handleDrag(result) {
    if (!result.destination) return;

    const taskId = result.draggableId;

    const newStatus = result.destination.droppableId;

    await updateTaskStatus(taskId, newStatus);

    loadTasks();
  }

  async function removeTask(id) {
    const confirm = window.confirm("Delete task?");

    if (!confirm) return;

    await deleteTask(id);

    loadTasks();
  }

  return (
    <DragDropContext onDragEnd={handleDrag}>
      <div className="grid md:grid-cols-3 gap-5 mt-6">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column.id);

          return (
            <Droppable key={column.id} droppableId={column.id}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-teal-50/60 border border-teal-100 rounded-xl p-4 min-h-[300px]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-[14px] text-gray-900">
                      {column.title}
                    </h2>
                    <span className="text-[11px] font-medium text-teal-600 bg-white border border-teal-100 px-2 py-0.5 rounded-full">
                      {columnTasks.length}
                    </span>
                  </div>

                  {columnTasks.length === 0 && (
                    <p className="text-[12.5px] text-gray-400 text-center py-6">
                      No tasks
                    </p>
                  )}

                  {columnTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-white rounded-lg p-4 shadow-sm shadow-teal-300/30 mb-3"
                        >
                          <h3 className="font-semibold text-[13.5px] text-gray-900">
                            {task.title}
                          </h3>

                          <p className="text-[12.5px] text-gray-500 mt-1">
                            {task.assigned?.full_name}
                          </p>

                          <div className="mt-2">
                            <span
                              className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${
                                PRIORITY_STYLES[task.priority] ||
                                PRIORITY_STYLES.low
                              }`}
                            >
                              {task.priority}
                            </span>
                          </div>

                          <button
                            className="text-red-600 hover:text-red-700 text-[12.5px] font-medium mt-3"
                            onClick={() => removeTask(task.id)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
}

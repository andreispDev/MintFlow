import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import Layout from "../components/Layout";
import { supabase } from "../lib/supabase";

import EditProject from "../components/EditProject";
import TaskBoard from "../components/TaskBoard";
import AssignMembers from "../components/AssignMembers";
import CreateTask from "../components/CreateTask";
import { ChevronRight, FolderKanban } from "lucide-react";

export default function ProjectDetails() {
  const [members, setMembers] = useState([]);
  const [project, setProject] = useState(null);
  const [reloadTasks, setReloadTasks] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    loadProject();
    loadMembers();
  }, []);

  async function loadMembers() {
    const { data } = await supabase
      .from("project_members")
      .select(
        `
        profiles(
        full_name,
        email
        )
        `,
      )
      .eq("project_id", id);

    setMembers(data || []);
  }

  async function loadProject() {
    const { data, error } = await supabase
      .from("projects")
      .select(`*,profiles:created_by(full_name)`)
      .eq("id", id)
      .single();

    if (error) {
      console.log(error);

      return;
    }

    setProject(data);
  }

  if (!project) {
    return (
      <Layout>
        <div className="bg-white border border-teal-100 rounded-xl p-10 flex items-center justify-center text-gray-500 text-sm">
          Loading project...
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2">
          <span>AI Admin</span>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <Link to="/projects" className="hover:text-teal-600">
            Projects
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
          <span className="text-teal-600 font-medium">{project.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center">
            <FolderKanban className="w-[18px] h-[18px] text-teal-600" />
          </div>

          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {project.name}
          </h1>
        </div>
      </div>

      <EditProject
        project={project}
        onUpdated={() => {
          loadProject();
        }}
      />

      <div className="bg-white rounded-xl border border-teal-100 shadow-sm shadow-teal-300/40 p-6 mt-5">
        <p className="text-gray-600 text-[13.5px]">
          {project.description || "No description provided."}
        </p>

        <div className="mt-5 text-[13.5px]">
          <span className="font-medium text-gray-900">Status:</span>
          <span className="ml-2 bg-teal-50 text-teal-700 border border-teal-100 px-2.5 py-1 rounded-md text-[12px] font-medium capitalize">
            {project.status}
          </span>
        </div>

        <div className="mt-5 text-[13.5px]">
          <span className="font-medium text-gray-900">Priority:</span>{" "}
          <span className="text-gray-600 capitalize">{project.priority}</span>
        </div>

        <div className="mt-5 text-[13.5px]">
          <span className="font-medium text-gray-900">Created by:</span>{" "}
          <span className="text-gray-600">
            {project.profiles?.full_name || "Unknown"}
          </span>
        </div>
      </div>

      <AssignMembers projectId={id} />

      <div className="mt-5">
        <CreateTask
          projectId={id}
          onCreated={() => {
            setReloadTasks(!reloadTasks);
          }}
        />

        <div className="mt-4">
          <TaskBoard key={reloadTasks} projectId={id} />
        </div>
      </div>
    </Layout>
  );
}

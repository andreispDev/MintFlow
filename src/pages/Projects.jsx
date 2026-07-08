import { useEffect, useState } from "react";
import { getProjects, deleteProject } from "../services/projects";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import CreateProject from "../components/CreateProject";
import { ChevronRight, FolderKanban, Plus, Trash2 } from "lucide-react";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    const data = await getProjects();

    setProjects(data);

    setLoading(false);
  }

  async function removeProject(id) {
    const confirmDelete = window.confirm("Delete project?");

    if (!confirmDelete) return;

    await deleteProject(id);

    loadProjects();
  }

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-[13px] text-gray-500 mb-2">
            <span>AI Admin</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-teal-600 font-medium">Projects</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-50 border border-teal-100 rounded-lg flex items-center justify-center">
              <FolderKanban className="w-[18px] h-[18px] text-teal-600" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">
                Projects
              </h1>

              <p className="text-[13px] text-gray-500">
                Track progress and status across your projects.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-1.5 bg-teal-600 text-white px-4 py-2 rounded-lg text-[13.5px] font-medium hover:bg-teal-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Project
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <CreateProject
            onCreated={() => {
              loadProjects();
              setShowForm(false);
            }}
          />
        </div>
      )}

      {loading ? (
        <div className="bg-white border border-teal-100 rounded-xl p-10 flex items-center justify-center text-gray-500 text-sm">
          Loading projects...
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white border border-teal-100 rounded-xl p-10 flex items-center justify-center text-gray-500 text-sm">
          No projects yet. Create your first one to get started.
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white p-5 rounded-xl border border-teal-100 shadow-sm shadow-teal-300/40"
            >
              <Link
                to={`/projects/${project.id}`}
                className="text-lg font-semibold text-teal-600 hover:text-teal-700"
              >
                {project.name}
              </Link>

              <p className="text-gray-500 text-[13.5px] mt-2">
                {project.description}
              </p>

              <div className="mt-4">
                <span className="bg-teal-50 text-teal-700 border border-teal-100 px-2.5 py-1 rounded-md text-[12px] font-medium capitalize">
                  {project.status}
                </span>
              </div>

              <div className="mt-4">
                <div className="flex justify-between text-[12px] text-gray-500 mb-1.5">
                  <span>Progress</span>
                  <span>{project.progress ?? 0}%</span>
                </div>

                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-teal-500 h-2 rounded-full transition-all"
                    style={{
                      width: `${project.progress ?? 0}%`,
                    }}
                  ></div>
                </div>
              </div>

              <button
                className="inline-flex items-center gap-1.5 text-red-600 hover:text-red-700 mt-4 text-[13px] font-medium"
                onClick={() => removeProject(project.id)}
              >
                <Trash2 className="w-3.5 h-3.5" />
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

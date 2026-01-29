import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { Project } from '../../types/project';
import { Edit, Trash2, ExternalLink } from 'lucide-react';

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const columnHelper = createColumnHelper<Project>();

const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onEdit, onDelete }) => {
  const columns = [
    columnHelper.accessor('title', {
      header: 'Título',
      cell: info => <span className="font-medium">{info.getValue()}</span>,
    }),
    columnHelper.accessor('category', {
      header: 'Categoría',
      cell: info => (
        <div className={`badge badge-sm hidden md:flex ${info.getValue() === 'blockchain' ? 'badge-secondary' : 'badge-primary'}`}>
          {info.getValue()}
        </div>
      ),
    }),
    columnHelper.accessor('tags', {
      header: 'Tags',
      cell: info => (
        <div className="hidden lg:flex flex-wrap gap-1">
          {info.getValue().map(tag => (
            <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-base-200 rounded">
              {tag}
            </span>
          ))}
        </div>
      ),
    }),
    columnHelper.accessor('featured', {
      header: 'Destacado',
      cell: info => (
        <div className={`badge badge-sm hidden sm:flex ${info.getValue() ? 'badge-accent' : 'badge-ghost'}`}>
          {info.getValue() ? 'Sí' : 'No'}
        </div>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Acciones',
      cell: props => (
        <div className="flex gap-2">
          <button 
            onClick={() => onEdit(props.row.original)}
            className="btn btn-square btn-ghost btn-xs text-info"
          >
            <Edit size={14} />
          </button>
          <button 
            onClick={() => onDelete(props.row.original.id)}
            className="btn btn-square btn-ghost btn-xs text-error"
          >
            <Trash2 size={14} />
          </button>
          {props.row.original.projectUrl && (
            <a 
              href={props.row.original.projectUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn btn-square btn-ghost btn-xs"
            >
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: projects,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-base-100 rounded-xl border border-base-300">
      <table className="table w-full">
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className={`bg-base-200 ${
                  header.id === 'category' ? 'hidden md:table-cell' : 
                  header.id === 'tags' ? 'hidden lg:table-cell' : 
                  header.id === 'featured' ? 'hidden sm:table-cell' : ''
                }`}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="hover:bg-base-200/50 transition-colors">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className={`${
                  cell.column.id === 'category' ? 'hidden md:table-cell' : 
                  cell.column.id === 'tags' ? 'hidden lg:table-cell' : 
                  cell.column.id === 'featured' ? 'hidden sm:table-cell' : ''
                }`}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectTable;

"use client"

import { ICategory } from "@/interfaces/category.interface";
import { cn } from "@/lib/utils";


interface CategoriesTreeProps {
  data: ICategory[];
  search?: string;
  selected: ICategory | null;
  setSelected: (value: ICategory) => void
}

export default function CategoriesTree({ data, search, selected, setSelected }: CategoriesTreeProps) {
  const rootNodes = data.filter((c) => c.parent_id === null)

  const filteredTree = search
    ? data.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    : rootNodes;

  const renderTree = (node: ICategory) => {
    const children = data.filter((c) => c.parent_id === node._id)

    return (
      <div key={node._id} className="mb-1">
        <div
          className={cn("p-2 rounded cursor-pointer",
            node._id === selected?._id
              ? "bg-sidebar-hover text-white"
              : "hover:bg-accent"
          )}
          onClick={() => setSelected(node)}
        >
          {node.name}
        </div>

        {children.length > 0 && (
          <div className="ml-4 border-l pl-2">
            {children.map((child) => renderTree(child))}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {search
        ? filteredTree.map((c) => (
          <div
            key={c._id}
            className={cn("p-2 rounded cursor-pointer",
              c._id === selected?._id
                ? "bg-sidebar-hover text-white"
                : "hover:bg-accent"
            )}
            onClick={() => setSelected(c)}
          >
            {c.name}
          </div>
        ))
        : rootNodes.map((node) => renderTree(node))
      }
    </>
  );
}
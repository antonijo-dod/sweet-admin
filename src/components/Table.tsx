import React, { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";

import {
    ChevronDoubleLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export type TRecipe = {
    thumbnail: string;
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    isFeatured: boolean;
};

const data: TRecipe[] = [
    {
        thumbnail:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        id: 1,
        title: "Recipe 1",
        slug: "recipe-1",
        createdAt: new Date(),
        isFeatured: true,
    },
    {
        thumbnail:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
        id: 2,
        title: "Recipe 2",
        slug: "recipe-2",
        createdAt: new Date(),
        isFeatured: false,
    },
];

const AvatarCell = ({
    value,
    column,
    row,
}: {
    value: string;
    column: ColumnDef<TRecipe>;
    row: any;
}) => {
    return (
        <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10" src={row.original.thumbnail} alt="#" />
        </div>
    );
};

const Table = (): ReactElement => {
    const [sorting, setSorting] = React.useState([]);
    const navigate = useNavigate();

    const handleRowClick = (row: any) => {
        navigate(`/recipes/${row.id}/edit`);
    };

    const columns = React.useMemo<ColumnDef<TRecipe>[]>(
        () => [
            {
                accessorKey: "thumbnail",
                header: "Image",
                className: "bg-red-500",
                cell: AvatarCell,
            },
            {
                accessorKey: "id",
                header: "Id",
                className: "text-blue-500",
            },
            {
                accessorKey: "title",
                header: "Title",
                className: "bg-red-500",
            },
            {
                accessorKey: "isFeatured",
                header: "Is Featured",
            },
        ],
        []
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
    });

    return (
        <div>
            {" "}
            <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th
                                        key={header.id}
                                        colSpan={header.colSpan}
                                        scope="col"
                                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div
                                                {...{
                                                    className:
                                                        header.column.getCanSort()
                                                            ? "cursor-pointer select-none"
                                                            : "",
                                                    onClick:
                                                        header.column.getToggleSortingHandler(),
                                                }}
                                            >
                                                {flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                                {{
                                                    asc: " 🔼",
                                                    desc: " 🔽",
                                                }[
                                                    header.column.getIsSorted() as string
                                                ] ?? null}
                                            </div>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {table
                        .getRowModel()
                        .rows.slice(0, 10)
                        .map((row) => {
                            return (
                                <tr
                                    key={row.id}
                                    onClick={() => handleRowClick(row)}
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td
                                                key={cell.id}
                                                className="whitespace-nowrap px-4 py-4 text-sm text-gray-700"
                                                role="cell"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                </tbody>
            </table>
            <div>
                <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                >
                    <button
                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                        onClick={() => table.setPageIndex(0)}
                    >
                        <span className="sr-only">First</span>
                        <ChevronDoubleLeftIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span className="sr-only">Previous</span>
                        <ChevronLeftIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </button>
                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                    >
                        <span className="sr-only">Next</span>
                        <ChevronRightIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                        <span className="sr-only">Last</span>
                        <ChevronDoubleRightIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </button>
                </nav>
            </div>
        </div>
    );
};

export default Table;

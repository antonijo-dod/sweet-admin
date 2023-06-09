import React, { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRecipes } from "@/hooks/recipes";
import { Pagination } from "@/components/elements";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";

import {
    ChevronDoubleLeftIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

export type TRecipe = {
    thumbnail: string;
    id: number;
    title: string;
    slug: string;
    createdAt: Date;
    isFeatured: boolean;
};

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
    const [page, setPage] = useState<number>(1);
    const navigate = useNavigate();

    const recipes = useGetRecipes({ page });

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
                accessorKey: "name",
                header: "Name",
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
        data: recipes.data?.data || [],
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

    if (recipes.isLoading) return <>Loading</>;

    return (
        <div>
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
                <Pagination
                    onPageChange={(e) => setPage(e)}
                    pageCount={recipes.data.meta.totalPages}
                />
            </div>
        </div>
    );
};

export default Table;

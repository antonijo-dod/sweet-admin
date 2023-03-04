import React, { useState, ReactElement } from "react";
import { TableLayout } from "@/components";
import { Pagination } from "@/components/elements";
import { useGetRecipes } from "@/hooks/recipes";
import {
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";

const RecipeTableContainer = (): ReactElement => {
    const [page, setPage] = useState<number>(1);
    const [sorting, setSorting] = React.useState([]);

    const recipes = useGetRecipes({ page });

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
            <div className="flex items-center space-x-3">
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img
                            src={row.original.featuredImage.url}
                            alt="Avatar Tailwind CSS Component"
                        />
                    </div>
                </div>
                <div>
                    <div className="font-bold">{row.original.name}</div>
                </div>
            </div>
        );
    };

    const columns = React.useMemo<ColumnDef<TRecipe>[]>(
        () => [
            {
                accessorKey: "thumbnail",
                header: "Name",
                className: "bg-red-500",
                cell: AvatarCell,
            },
            {
                accessorKey: "id",
                header: "Id",
                className: "text-blue-500",
            },
            {
                accessorKey: "status",
                header: "Status",
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

    if (recipes.isLoading) return <div>Loading...</div>;

    return (
        <>
            <TableLayout table={table} />
            <div className="mt-4">
                <Pagination
                    onPageChange={(pageId) => setPage(pageId)}
                    pageCount={recipes.data.meta.totalPages}
                />
            </div>
        </>
    );
};

export default RecipeTableContainer;

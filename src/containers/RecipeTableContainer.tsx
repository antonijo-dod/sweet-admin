import React, { useState, ReactElement } from "react";
import { TableLayout } from "@/components";
import { Modal } from "@/components/ui";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@/components/elements";
import { useGetRecipes, useDeleteRecipe } from "@/hooks/recipes";
import {
    ColumnDef,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    getPaginationRowModel,
} from "@tanstack/react-table";

const RecipeTableContainer = (): ReactElement => {
    // TODO: When delete is clicked show a modal to confirm
    const [page, setPage] = useState<number>(1);
    const [sorting, setSorting] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [recipeId, setRecipeId] = useState<number | null>(null);
    console.log(
        "🚀 ~ file: RecipeTableContainer.tsx:21 ~ RecipeTableContainer ~ recipeId:",
        recipeId
    );

    const recipes = useGetRecipes({ page });
    const deleteRecipe = useDeleteRecipe();
    const navigate = useNavigate();

    const handleDeleteRecipe = async () => {
        await deleteRecipe.mutate(recipeId, {
            onSuccess: () => setIsModalOpen(false),
        });
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

    const ActionCell = ({
        value,
        column,
        row,
    }: {
        value: string;
        column: ColumnDef<TRecipe>;
        row: any;
    }) => {
        return (
            <div className="btn-group">
                <button
                    className="btn btn-sm"
                    onClick={() => navigate(`/recipes/${row.original.slug}/edit`)}
                >
                    View
                </button>
                <button
                    className="btn btn-sm"
                    onClick={() => {
                        setIsModalOpen(true);
                        setRecipeId(row.original.id);
                    }}
                >
                    Delete
                </button>
            </div>
        );
    };

    const columns = React.useMemo<ColumnDef<TRecipe>[]>(
        () => [
            {
                accessorKey: "id",
                header: "Id",
                size: 50,
            },
            {
                accessorKey: "thumbnail",
                header: "Name",
                className: "bg-red-500",
                cell: AvatarCell,
            },

            {
                accessorKey: "status",
                header: "Status",
            },
            {
                accessorKey: "isFeatured",
                header: "Is Featured",
            },
            {
                accessorKey: "actions",
                cell: ActionCell,
            },
        ],
        []
    );

    const table = useReactTable({
        data: recipes.data?.data || [],
        columns,
        enableRowSelection: true,
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
            <Modal
                title="Delete Recipe"
                closeModal={() => setIsModalOpen(false)}
                isModalOpen={isModalOpen}
            >
                <p className="py-4">
                    Do you want to delete this recipe? This action cannot be
                    undone.
                </p>
                <button className="btn" onClick={() => handleDeleteRecipe()}>
                    Yes, I'm sure
                </button>
            </Modal>
        </>
    );
};

export default RecipeTableContainer;

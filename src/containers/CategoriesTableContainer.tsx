import React, { useState, ReactElement } from 'react';
import { TableLayout } from '@/components';
import { Modal } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@/components/elements';
import { useGetCategories, useDeleteCategory } from '@/hooks/categories';
import { ColumnDef, getCoreRowModel, getSortedRowModel, useReactTable, getPaginationRowModel } from '@tanstack/react-table';
import { TCategories, TCategory } from '@/types/categories';

const CategoriesTableContainer = (): ReactElement => {
    // TODO: When delete is clicked show a modal to confirm
    const [page, setPage] = useState<number>(1);
    const [sorting, setSorting] = React.useState([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [categoryId, setCategoryId] = useState<number | null>(null);

    const categories = useGetCategories({ page });
    const deleteCategory = useDeleteCategory();
    const navigate = useNavigate();

    const handleDeleteCategory = async () => {
        await deleteCategory.mutate(categoryId, {
            onSuccess: () => setIsModalOpen(false),
        });
    };

    const AvatarCell = ({ value, column, row }: { value: string; column: ColumnDef<TRecipe>; row: any }) => {
        return (
            <div className="flex items-center space-x-3">
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={row.original.featuredImage.url} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
                <div>
                    <div className="font-bold">{row.original.name}</div>
                </div>
            </div>
        );
    };

    const ActionCell = ({ value, column, row }: { value: string; column: ColumnDef<TRecipe>; row: any }) => {
        return (
            <div className="btn-group">
                <button className="btn btn-sm" onClick={() => navigate(`/categories/${row.original.slug}/edit`)}>
                    View
                </button>
                <button
                    className="btn btn-sm"
                    onClick={() => {
                        setIsModalOpen(true);
                        setCategoryId(row.original.id);
                    }}
                >
                    Delete
                </button>
            </div>
        );
    };

    const columns = React.useMemo<ColumnDef<TCategory>[]>(
        () => [
            {
                accessorKey: 'id',
                header: 'Id',
                size: 50,
            },
            {
                accessorKey: 'name',
                header: 'Name',
            },
            {
                accessorKey: 'actions',
                cell: ActionCell,
            },
        ],
        [],
    );

    const table = useReactTable({
        data: categories.data?.data || [],
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

    if (categories.isLoading) return <div>Loading...</div>;

    return (
        <>
            <TableLayout table={table} />
            <div className="mt-4">
                <Pagination onPageChange={pageId => setPage(pageId)} pageCount={categories.data.meta.totalPages} />
            </div>
            <Modal title="Delete Recipe" closeModal={() => setIsModalOpen(false)} isModalOpen={isModalOpen}>
                <p className="py-4">Do you want to delete this recipe? This action cannot be undone.</p>
                <button className="btn" onClick={() => handleDeleteRecipe()}>
                    Yes, I'm sure
                </button>
            </Modal>
        </>
    );
};

export default CategoriesTableContainer;

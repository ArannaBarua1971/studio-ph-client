

import Link from "next/link";
import {
    Plus,
    Eye,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { StudioTypes } from "@/lib/types";
import Loading from "../components/common/Loading";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ConfirmDialog from "../components/common/ConfirmDialog";
import { UpdateStudio } from "../components/Studio/UpdateStudio";
import getTokenForServer from "@/lib/helper/getTokenForServer";



export default async function StudioListings() {
    const token = await getTokenForServer()
    const data = await auth.api.getSession({ headers: await headers() })
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mylistings/${data?.user.email}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    const d = await res.json();
    const studios = d.data



    if (!data?.session) {
        return <Loading />
    }

    return (
        <div className="min-h-screen bg-[#fafafa] p-4 sm:p-5 md:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-center">

                <div>
                    <p className="mb-2 text-xs font-semibold tracking-wider text-orange-600">
                        HOST MANAGEMENT
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                        My Studio Listings
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Manage your published workspaces in the studios collection
                        ({data?.user.email}).
                    </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">



                    {/* Add Studio */}
                    <Button
                        className="bg-amber-400 text-black hover:bg-amber-500"
                    >
                        <Link href="/add-studio" className="flex justify-center items-center">
                            <Plus size={17} />
                            Add New Studio
                        </Link>
                    </Button>

                </div>
            </div>

            {/* Table View */}

            <Card className="overflow-hidden rounded-2xl border-gray-200 py-0 shadow-sm">

                <div className="overflow-x-auto">

                    <Table className="min-w-[880px]">
                        <TableHeader>
                            <TableRow className="h-11 hover:bg-transparent">

                                <TableHead className="min-w-[300px] pl-4 text-xs font-semibold uppercase">
                                    Studio Workspace
                                </TableHead>

                                <TableHead className="text-xs font-semibold uppercase">
                                    Category
                                </TableHead>

                                <TableHead className="text-xs font-semibold uppercase">
                                    Hourly Rate
                                </TableHead>

                                <TableHead className="text-xs font-semibold uppercase">
                                    Deposit
                                </TableHead>

                                <TableHead className="text-xs font-semibold uppercase">
                                    Capacity
                                </TableHead>

                                <TableHead className="text-xs font-semibold uppercase">
                                    Location
                                </TableHead>

                                {/* <TableHead className="text-xs font-semibold uppercase">
                                        Rating
                                    </TableHead> */}

                                <TableHead className="pr-4 text-right text-xs font-semibold uppercase">
                                    Actions
                                </TableHead>

                            </TableRow>
                        </TableHeader>

                        <TableBody>

                            {studios.map((studio: StudioTypes) => (

                                <TableRow key={studio._id} className="h-16">

                                    {/* Studio Info */}
                                    <TableCell className="pl-4">
                                        <div className="flex items-center gap-3">

                                            <img
                                                src={studio.images[0][1]}
                                                alt={studio.title}
                                                className="h-10 w-12 rounded-lg object-cover"
                                            />

                                            <div className="min-w-0">
                                                <p className="text-xs font-semibold text-gray-900">
                                                    {studio.title}
                                                </p>

                                                <p className="mt-1 text-[10px] text-gray-400">
                                                    ID: {studio._id}
                                                </p>
                                            </div>

                                        </div>
                                    </TableCell>

                                    {/* Category */}
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className="whitespace-nowrap bg-gray-100 font-normal text-gray-700"
                                        >
                                            {studio.category}
                                        </Badge>
                                    </TableCell>

                                    {/* Rate */}
                                    <TableCell className="whitespace-nowrap text-xs font-medium">
                                        ${studio.hourtlyRate}/hr
                                    </TableCell>

                                    {/* Deposit */}
                                    <TableCell className="text-xs text-gray-600">
                                        ${studio.deposit}
                                    </TableCell>

                                    {/* Capacity */}
                                    <TableCell className="whitespace-nowrap text-xs">
                                        {studio.max_capacity} people
                                    </TableCell>

                                    {/* Location */}
                                    <TableCell className="whitespace-nowrap text-xs text-gray-600">
                                        {studio.location}
                                    </TableCell>

                                    {/* Rating */}
                                    {/* <TableCell>
                                            <div className="flex items-center gap-1.5 text-xs font-semibold">
                                                <Star
                                                    size={14}
                                                    className="fill-amber-400 text-amber-400"
                                                />
                                                {studio}
                                            </div>
                                        </TableCell> */}

                                    {/* Actions */}
                                    <TableCell>
                                        <div className="flex items-center justify-end gap-1.5">

                                            <Link href={`/studios/${studio._id}`}>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-gray-500"
                                                    aria-label="View studio"
                                                >
                                                    <Eye size={15} />
                                                </Button>
                                            </Link>


                                            <UpdateStudio studioData={studio} />

                                            <ConfirmDialog question="Delete studio space" description="
                                            Are you sure you want to delete .
                                            This will permanently remove the document from the studios collection.
                                             This action cannot be undone.
                                             "
                                                className="h-7 border-rose-200 px-2 text-xs text-rose-600 hover:bg-rose-50"
                                                icon={<Trash2 size={13} />}
                                                data={studio._id}
                                                url="mylistings"
                                                buttonName="Delete"
                                                toastMessage="studio space deleted successfully"
                                                token={token}
                                            />


                                        </div>
                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </div>
            </Card>


        </div>
    );
}

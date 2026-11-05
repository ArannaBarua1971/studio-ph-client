import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    MapPin,
    CircleX,
    Clock,
    CircleAlert,
    CalendarDays,
    Users,
} from "lucide-react";
import { BookingStudioTypes } from "@/lib/types";
import ConfirmDialog from "../common/ConfirmDialog";
import getTokenForServer from "@/lib/helper/getTokenForServer";

export default async function BookingCard({ data }: { data: BookingStudioTypes }) {
    const total = Number(data.hourtlyRate) + Number(data.deposit) + Number(data.cleaningFee);
    const token=await getTokenForServer()
    return (
        <Card className="w-full rounded-2xl border border-stone-200 shadow-sm">
            <CardContent className="p-5 sm:p-6">

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">

                    <div className="flex gap-4">
                        <div className="relative w-20 h-20 shrink-0 overflow-hidden rounded-xl">
                            <img
                                src={data.images[0][1]}
                                alt="Studio"
                                className="object-cover"
                            />
                        </div>

                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                                <Badge className="bg-orange-50 text-orange-600 hover:bg-orange-50 border-0 rounded-md">
                                    {data.category}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                    ID: <span className="font-mono">{data._id}</span>
                                </span>
                            </div>

                            <h3 className="text-base font-bold text-stone-900">
                                {data.title}
                            </h3>

                            <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                {data.address},{data.location}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between gap-2">
                        <Badge variant="outline" className="border-orange-300 bg-orange-50 text-orange-700 px-3 py-1">
                            <Clock className="w-3.5 h-3.5 mr-1" />
                            {data.status}
                        </Badge>

                        <p className="text-sm text-muted-foreground">
                            Total: <span className="text-lg font-bold text-stone-900">{total}</span>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 border-y border-stone-100 py-4 mt-5">

                    <div className="space-y-1">
                        <p className="text-xs uppercase tracking-wide text-stone-400">
                            Shoot Date
                        </p>
                        <p className="flex items-center gap-1.5 text-sm font-medium">
                            <CalendarDays className="w-4 h-4 text-stone-400" />
                            2026-11-20
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs uppercase tracking-wide text-stone-400">
                            Scheduled Hours
                        </p>
                        <p className="flex items-center gap-1.5 text-sm font-medium">
                            <Clock className="w-4 h-4 text-stone-400" />
                            10:00 AM (4 hrs)
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs uppercase tracking-wide text-stone-400">
                            Crew / Guests
                        </p>
                        <p className="flex items-center gap-1.5 text-sm font-medium">
                            <Users className="w-4 h-4 text-stone-400" />
                            {data.max_capacity} people
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs uppercase tracking-wide text-stone-400">
                            Security Deposit
                        </p>
                        <p className="text-sm font-medium">
                            ${data.deposit} (Held)
                        </p>
                    </div>
                </div>

                {
                    data.status == "Cancelled" ? <></> :
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3">
                            <p className="flex items-center gap-2 text-xs text-orange-600">
                                <CircleAlert className="w-4 h-4 shrink-0" />
                                Host review in progress. You can cancel free of charge.
                            </p>

                            <ConfirmDialog question="cancel your booking space" description="
                                            Are you sure you want to cncel .
                                            This will permanently cancel the document from the studios booking.
                                             This action cannot be undone.
                                             "
                                className="h-7 border-rose-200 px-2 text-xs text-rose-600 hover:bg-rose-50"
                                icon={<CircleX size={13} />}
                                data={data._id}
                                url="bookingStudio"
                                buttonName="Cancel"
                                toastMessage="studio space deleted successfully"
                                method="PATCH"
                                decisionBtnName="Cancel"
                                token={token}
                            />
                        </div>}

            </CardContent>
        </Card>
    );
}
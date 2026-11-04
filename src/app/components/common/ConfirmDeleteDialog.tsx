"use client"
import { Trash2Icon } from "lucide-react"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"
import showToast from "@/lib/helper/toaster"
import { useRouter } from "next/navigation"

interface ConfirmDeleteDialogProps {
    buttonName: string, icon: ReactNode, question: string, description: string, func: () => void, className: string,data:string,url:string,toastMessage:string
}
export default function ConfirmDeleteDialog({ buttonName, icon, question, description, func, className,data,url,toastMessage }: ConfirmDeleteDialogProps) {
    const route=useRouter()
    const deleteStudio = async () => {
        const res = await fetch(`http://localhost:5000/${url}/${data}`, {
            method: "DELETE"
        });
        if (res.ok) {
            showToast({ message: toastMessage })
            route.refresh()
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger
                render={<Button variant="destructive" className={className}>{icon}{buttonName}</Button>}
            />
            <AlertDialogContent size="sm">
                <AlertDialogHeader>
                    <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                    </AlertDialogMedia>
                    <AlertDialogTitle>{question}?</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
                    <AlertDialogCancel variant="destructive" onClick={deleteStudio} >
                        Delete</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

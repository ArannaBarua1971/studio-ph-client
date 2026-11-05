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

interface ConfirmDialogProps {
  question: string;
  description: string;
  className?: string;
  icon: ReactNode;
  data: string | undefined;
  url: string;
  buttonName: string;
  toastMessage: string;
  token: string;
  method?:string,
  decisionBtnName?:string,
}
export default function ConfirmDialog({ buttonName, icon, question, description, className, data, url, toastMessage, method = "DELETE", decisionBtnName = "Delete",token }: ConfirmDialogProps) {
    const route = useRouter()
    const deleteStudio = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${url}/${data}`, {
            method: method,
            headers: {
                Authorization: `Bearer ${token}`
            }

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
                        {decisionBtnName}</AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

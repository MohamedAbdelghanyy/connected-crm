import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface FormAddButtonProps {
    isLoading: boolean,
    callback: Function,
}
export default function FormAddButton({ isLoading, callback }: FormAddButtonProps) {
    return (<div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
        <button
            onClick={() => { callback(); }}
            style={{ width: "150px" }}
            className={cn(
                buttonVariants({}),
                {
                    "cursor-not-allowed opacity-60": isLoading,
                },
            ) + " mb-2"}
            disabled={isLoading}
        >
            {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (<></>)}
            Add
        </button>
    </div>);
}
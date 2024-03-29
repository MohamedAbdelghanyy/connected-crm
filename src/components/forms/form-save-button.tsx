import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../other/icons";

interface FormSaveButtonProps {
    isLoading: boolean,
    callback: Function,
}
export default function FormSaveButton({ isLoading, callback }: FormSaveButtonProps) {
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
            Save
        </button>
    </div>);
}
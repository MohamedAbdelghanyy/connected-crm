import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icons } from "../icons";

interface FormButtonProps {
    label: any
    isLoading: boolean,
    callback: Function,
    isEnabled: boolean,
}
export default function FormButton({ label, isLoading, callback, isEnabled }: FormButtonProps) {
    return (<div style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
        <button
            onClick={() => { callback(); }}
            style={{ width: "110px" }}
            className={cn(
                buttonVariants({}),
                {
                    "cursor-not-allowed opacity-60": isLoading,
                },
            ) + " mb-2"}
            disabled={isLoading || !isEnabled}
        >
            {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (<></>)}
            {label}
        </button>
    </div>);
}
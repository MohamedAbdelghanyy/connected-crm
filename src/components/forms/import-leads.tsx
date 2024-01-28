import { leadsTableColumns, leadsTableToolbarSearchList } from "@/app/(home)/leads/config"
import { Icons } from "@/components/other/icons"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import * as React from "react"
import * as xlsx from 'xlsx'
import { DataTable } from "../table/data-table"
import { Input } from "../ui/input"

export default function ImportLeads({
  variant,
}: ButtonProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showImportLeadsDialog, setShowImportLeadsDialog] = React.useState(false)
  const [leads, setLeads] = React.useState([]);

  const handleClose = () => {
    setLeads([]);
    setShowImportLeadsDialog(false);
  }

  const readUploadFile = (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result;
        const workbook = xlsx.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json: any = xlsx.utils.sheet_to_json(worksheet);
        setLeads(json);
        console.log(json);
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
    setIsLoading(false);
  }

  return (
    <>
      <button
        onClick={() => {
          setShowImportLeadsDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.uploadFile className="mr-2 h-4 w-4" />
        Import
      </button>
      <Dialog open={showImportLeadsDialog} onOpenChange={setShowImportLeadsDialog}>
        <DialogContent style={{ minWidth: leads.length > 0 ? '75%' : '0px' }}>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Import Leads</DialogTitle>
            <DialogDescription>
              Enter lead details
            </DialogDescription>
          </DialogHeader>
          <div style={{ maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px", }}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                {leads.length > 0 ? (
                  <DataTable data={leads} columns={leadsTableColumns.slice(0, -1)} toolbar={[]} toolbarSearchList={leadsTableToolbarSearchList} />
                ) : (<Input type="file" name="leadsList" id="leadsList" onChange={readUploadFile} />)}
              </div>
            </div>
          </div>
          <DialogFooter className="mr-4 ml-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={handleClose}>
              Cancel
            </Button>
            <button
              onClick={() => { }}
              className={cn(
                buttonVariants({ variant }),
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
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

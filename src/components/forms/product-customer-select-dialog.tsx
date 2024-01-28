
import { customersTableColumns, customersTableToolbarSearchList } from "@/app/(home)/customers/config"
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
import axios from "@/services/axios"
import { useEffect, useState } from "react"
import { errorHandler } from "../other/error-handler"
import { DynamicDataTable } from "../table/dynamic-data-table"
import { toast } from "../ui/use-toast"

export default function ProductCustomerSelectDialog({
  variant,
}: ButtonProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showSelectCustomerDialog, setShowSelectCustomerDialog] = useState(false)
  const [customers, setCustomers] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [numberOfItemsPerPage, setNumberOfItemsPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(1);

  const handleClose = () => {
    setCustomers([]);
    setShowSelectCustomerDialog(false);
  }


  useEffect(() => {
    axios.get('/app/customer', {
      params: {
        SkipCount: (currentPageNumber - 1) * numberOfItemsPerPage,
        MaxResultCount: numberOfItemsPerPage
      },
    })
      .then(function (response) {
        setNumberOfPages(Math.ceil(response.data.result.totalCount / numberOfItemsPerPage));
        setCustomers(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [currentPageNumber, numberOfItemsPerPage]);

  return (
    <>
      <button
        onClick={() => {
          setShowSelectCustomerDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Select Customer
      </button>
      <Dialog open={showSelectCustomerDialog} onOpenChange={setShowSelectCustomerDialog}>
        <DialogContent style={{ minWidth: customers.length > 0 ? '75%' : '0px' }}>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Select Customer</DialogTitle>
            <DialogDescription>
              Please select
            </DialogDescription>
          </DialogHeader>
          <div style={{ maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px", }}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                {customers.length > 0 ? (
                  <DynamicDataTable
                    data={customers}
                    columns={customersTableColumns.slice(0, -1)}
                    toolbar={[]}
                    toolbarSearchList={customersTableToolbarSearchList}
                    pagination={{
                      numberOfItemsPerPage,
                      currentPageNumber,
                      numberOfPages,
                      setNumberOfItemsPerPage,
                      setCurrentPageNumber,
                    }}
                  />
                ) : <></>}
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
              Select
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

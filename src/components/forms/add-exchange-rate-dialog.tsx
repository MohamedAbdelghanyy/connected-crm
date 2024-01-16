"use client"

import { CurrenciesProps } from "@/app/(home)/currencies/(list)/config"
import { Icons } from "@/components/icons"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import axios from "@/services/axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { errorHandler } from "../ui/custom/error-handler"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Skeleton } from "../ui/skeleton"
import { toast } from "../ui/use-toast"

export default function AddExchangeRateDialog({
  className,
  variant,
  ...props
}: ButtonProps & { currencyId: string } & { onSave: Function }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCurrencyID, setSelectedCurrencyID] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [allCurrencies, setAllCurrencies] = useState<CurrenciesProps[]>([]);

  async function loadAllCurrencies() {
    axios.get('/app/currency')
      .then(function (response) {
        setAllCurrencies(response.data.result.items);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }

  async function save() {
    console.log(props.currencyId);
    setIsLoading(true);
    axios.post(`/app/currency/${props.currencyId}/exchange`,
      {
        toCurrencyId: selectedCurrencyID,
        value: exchangeRate
      })
      .then(function (response) {
        toast({
          title: "Success",
          description: "Exchange rate was successfully added to this currency.",
          variant: "success",
        });
        setIsLoading(false);
        setShowDialog(false);
        setSelectedCurrencyID(0);
        props.onSave();
      })
      .catch(function (error) {
        console.log(error);
        errorHandler(toast, error);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (showDialog) {
      loadAllCurrencies();
    } else {
      setIsLoading(false);
      setSelectedCurrencyID(0);
    }
  }, [showDialog]);

  return (
    <>
      <button
        onClick={() => {
          setShowDialog(true);
        }}
        className={cn(
          buttonVariants({ variant }),
        )}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Add Exchange Rate
      </button>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader className="ml-4 mt-4">
            <DialogTitle>Add Exchange Rate</DialogTitle>
            <DialogDescription>
              Enter new exchange rate details
            </DialogDescription>
          </DialogHeader>
          <div style={{ maxHeight: "60vh", overflow: "hidden scroll", padding: "0px 10px 0px 20px", }}>
            <div className="space-y-4 py-2 pb-4">
              <div className="space-y-2">
                <Label htmlFor="toCurrency">Select To Currency</Label>
                {allCurrencies && allCurrencies.length != 0 ?
                  <Select onValueChange={(value) => {
                    setSelectedCurrencyID(parseInt(value));
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder='Select to currency' />
                    </SelectTrigger>
                    <SelectContent>
                      {allCurrencies.map((currency) => (<SelectItem key={currency.id} value={currency.id}>{currency.name}</SelectItem>))}
                    </SelectContent>
                  </Select> :
                  <Skeleton className="h-10" />}
              </div>
              <div className="space-y-2">
                <Input
                  aria-label="exchangeRate"
                  id="exchangeRate"
                  type="number"
                  onChange={(event) => setExchangeRate(parseInt(event.target.value))}
                  placeholder="Enter Exchange Rate"
                  required
                />
              </div>
            </div>
          </div>
          <DialogFooter className="mr-4 ml-4 mb-2">
            <Button variant="outline" className="mb-2" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <button
              onClick={save}
              className={cn(
                buttonVariants({ variant }),
                {
                  "cursor-not-allowed opacity-60": isLoading,
                },
              ) + " mb-2"}
              disabled={isLoading || exchangeRate <= 0 || isNaN(exchangeRate) || selectedCurrencyID == 0}
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

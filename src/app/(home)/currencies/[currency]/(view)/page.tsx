import AddExchangeRateDialog from "@/components/forms/add-exchange-rate-dialog";
import FormButton from "@/components/forms/form-button";
import DashboardLayout from "@/components/layouts/dashboard-layout";
import { EmptyPlaceholder } from "@/components/other/empty-placeholder";
import { errorHandler } from "@/components/other/error-handler";
import { DashboardHeader } from "@/components/other/header";
import { DashboardShell } from "@/components/other/shell";
import { DataTable } from "@/components/table/data-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CurrenciesProps } from "../../(list)/config";
import { ExchangeRatesProps, exchangeRatesTableToolbar, exchangeRatesTableToolbarSearchList, exchangeratesTableColumns } from "./exchange-rates-config";
import CurrencyLoading from "./loading";

export default function CurrencyPage() {
  const { currencyID } = useParams();
  const [currency, setCurrency] = useState<CurrenciesProps>();
  const [exchangeRates, setExchangeRates] = useState<ExchangeRatesProps[]>([]);
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  const getCurrencyData = useCallback(() => {
    axios.get('/app/currency/' + currencyID)
      .then(function (response) {
        setCurrency(response.data.result);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [currencyID, setCurrency]);

  useEffect(() => {
    if (currency) {
      setExchangeRates(currency.exchangeRates);
    }
  }, [currency]);

  useEffect(() => {
    getCurrencyData();
  }, [getCurrencyData]);

  return currency ? (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={currency.name} text={currency.id.toString()}>
          <div style={{ display: 'flex', flexDirection: 'row' }} className="space-x-2">
            <FormButton
              label="Edit"
              isLoading={false}
              callback={() => {
                navigate("/currencies/" + currency.id + "/edit");
              }}
              isEnabled={true}
            />
          </div>
        </DashboardHeader>
      </DashboardShell>
      <div className="space-y-4 pb-4 px-2">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} orientation="vertical">
          <div>
            <TabsList className="w-full h-full">
              <Grid container spacing={1}>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="info" className="w-full">Info</TabsTrigger>
                </Grid>
                <Grid item sm={6} xs={6}>
                  <TabsTrigger value="exchangeRates" className="w-full">Exchange Rates</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="info" forceMount={true} hidden={activeTab !== "info"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Currency Name</Label>
                  <Input
                    aria-label="name"
                    id="name"
                    placeholder="No Currency Name"
                    value={currency.name}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="isoCode">ISO Code</Label>
                  <Input
                    aria-label="isoCode"
                    id="isoCode"
                    placeholder="No ISO Code"
                    value={currency.isoCode}
                    readOnly
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="exchangeRates" forceMount={true} hidden={activeTab !== "exchangeRates"}>
              <div className="space-y-4 py-2 pb-4">
                <DashboardShell className="mb-1">
                  <DashboardHeader heading="" text="Manage this currency exchange rates">
                    <AddExchangeRateDialog
                      currencyId={currency.id}
                      onSave={getCurrencyData}
                    />
                  </DashboardHeader>
                </DashboardShell>
                <div className="m-2">
                  {exchangeRates.length > 0 ? (
                    <DataTable
                      data={exchangeRates}
                      columns={exchangeratesTableColumns}
                      toolbar={exchangeRatesTableToolbar}
                      toolbarSearchList={exchangeRatesTableToolbarSearchList}
                    />
                  ) : (<CustomEmptyPlaceHolder title={'Exchange Rates'} currencyName={currency.name} />)}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  ) : <CurrencyLoading />
}

function CustomEmptyPlaceHolder({ title, currencyName }: any) {
  return (<EmptyPlaceholder>
    <EmptyPlaceholder.Icon name="post" />
    <EmptyPlaceholder.Title>No {title}</EmptyPlaceholder.Title>
    <EmptyPlaceholder.Description>
      {currencyName} doesn&apos;t have any {title} yet.
    </EmptyPlaceholder.Description>
  </EmptyPlaceholder>);
}
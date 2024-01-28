import AddTopicQueryDialog from "@/components/forms/add-topic-query-dialog";
import AddTopicTagDialog from "@/components/forms/add-topic-tag-dialog";
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
import { TopicsProps } from "../../(list)/config";
import TopicsLoading from "../../(list)/loading";
import { TopicQueriesProps, topicQueriesTableColumns, topicQueriesTableToolbar, topicQueriesTableToolbarSearchList } from "./topic-queries-config";
import { TopicTagsProps, topicTagsTableColumns, topicTagsTableToolbar, topicTagsTableToolbarSearchList } from "./topic-tags-config";

export default function TopicPage() {
  const { topicID } = useParams();
  const [topic, setTopic] = useState<TopicsProps>();
  const [tags, setTags] = useState<TopicTagsProps[]>([]);
  const [queries, setQueries] = useState<TopicQueriesProps[]>([]);
  const [activeTab, setActiveTab] = useState("info");
  const navigate = useNavigate();

  const getTopicData = useCallback(() => {
    axios.get('/app/topic/' + topicID)
      .then(function (response) {
        setTopic(response.data.result);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }, [topicID, setTopic]);

  useEffect(() => {
    if (topic) {
      setTags(topic.tags);
      setQueries(topic.queries);
    }
  }, [topic]);

  useEffect(() => {
    getTopicData();
  }, [getTopicData]);

  return topic ? (
    <DashboardLayout>
      <DashboardShell className="mb-1">
        <DashboardHeader heading={topic.name} text={topic.id}>
          <div style={{ display: 'flex', flexDirection: 'row' }} className="space-x-2">
            <FormButton
              label="Edit"
              isLoading={false}
              callback={() => {
                navigate("/topics/" + topic.id + "/edit");
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
                <Grid item sm={4} xs={12}>
                  <TabsTrigger value="info" className="w-full">Info</TabsTrigger>
                </Grid>
                <Grid item sm={4} xs={6}>
                  <TabsTrigger value="tags" className="w-full">Tags</TabsTrigger>
                </Grid>
                <Grid item sm={4} xs={6}>
                  <TabsTrigger value="queries" className="w-full">Queries</TabsTrigger>
                </Grid>
              </Grid>
            </TabsList>
          </div>
          <div className="w-full">
            <TabsContent value="info" forceMount={true} hidden={activeTab !== "info"}>
              <div className="space-y-4 py-2 pb-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Topic Name</Label>
                  <Input
                    aria-label="name"
                    id="name"
                    placeholder="No Topic Name"
                    value={topic.name}
                    readOnly
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subscribersCount">Subscribers Count</Label>
                  <Input
                    aria-label="subscribersCount"
                    id="subscribersCount"
                    placeholder="None"
                    value={topic.subscribersCount}
                    readOnly
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="tags" forceMount={true} hidden={activeTab !== "tags"}>
              <div className="space-y-4 py-2 pb-4">
                <DashboardShell className="mb-1">
                  <DashboardHeader heading="" text="Manage this topic tags">
                    <AddTopicTagDialog
                      topicId={topic.id}
                      onSave={getTopicData}
                    />
                  </DashboardHeader>
                </DashboardShell>
                <div className="m-2">
                  {tags.length > 0 ? (
                    <DataTable data={tags} columns={topicTagsTableColumns} toolbar={topicTagsTableToolbar} toolbarSearchList={topicTagsTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Tags'} topicName={topic.name} />)}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="queries" forceMount={true} hidden={activeTab !== "queries"}>
              <div className="space-y-4 py-2 pb-4">
                <DashboardShell className="mb-1">
                  <DashboardHeader heading="" text="Manage this topic queries">
                    <AddTopicQueryDialog
                      topicId={topic.id}
                      onSave={getTopicData}
                    />
                  </DashboardHeader>
                </DashboardShell>
                <div className="m-2">
                  {queries.length > 0 ? (
                    <DataTable data={queries} columns={topicQueriesTableColumns} toolbar={topicQueriesTableToolbar} toolbarSearchList={topicQueriesTableToolbarSearchList} />
                  ) : (<CustomEmptyPlaceHolder title={'Queries'} topicName={topic.name} />)}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  ) : <TopicsLoading />
}

function CustomEmptyPlaceHolder({ title, topicName }: any) {
  return (<EmptyPlaceholder>
    <EmptyPlaceholder.Icon name="post" />
    <EmptyPlaceholder.Title>No {title}</EmptyPlaceholder.Title>
    <EmptyPlaceholder.Description>
      {topicName} doesn&apos;t have any {title} yet.
    </EmptyPlaceholder.Description>
  </EmptyPlaceholder>);
}
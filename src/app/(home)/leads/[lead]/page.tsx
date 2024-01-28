import { promises as fs } from "fs";
import path from "path";

import LeadTabs from "./lead-tabs";

async function getLead(leadID: string) {

  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/leads_data.json")
  )
  const leads = JSON.parse(data.toString())

  for (let i = 0; i < leads.length; i++) {
    if (leads[i].id == leadID) {
      return leads[i]
    }
  }
}

async function getRequests(leadID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/requests_data.json")
  )
  const requests = JSON.parse(data.toString())
  let userRequests = [];
  for (let i = 0; i < requests.length; i++) {
    if (requests[i].customerID == leadID) {
      userRequests.push(requests[i]);
    }
  }
  return userRequests
}

export default async function LeadPage({ params }: { params: { lead: string } }) {
  let leadID = params.lead
  const lead = await getLead(leadID)
  const requests = await getRequests(leadID)

  return (
    <>
      <LeadTabs
        lead={lead}
        requests={requests} />
    </>
  )
}
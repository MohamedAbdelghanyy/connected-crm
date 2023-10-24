import { promises as fs } from "fs";
import path from "path";
import RequestTabs from "./request-tabs";

export const metadata = {
  title: "Request",
}

async function getRequest(requestID: string) {

  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/requests_data.json")
  )
  const requests = JSON.parse(data.toString())
  let request = null;

  for (let i = 0; i < requests.length; i++) {
    if (requests[i].id == requestID) {
      return requests[i]
    }
  }
}

export default async function RequestPage({ params }: { params: { request: string } }) {
  let requestID = params.request
  const request = await getRequest(requestID)

  return (
    <>
      <RequestTabs
        request={request}
      />
    </>
  )
}
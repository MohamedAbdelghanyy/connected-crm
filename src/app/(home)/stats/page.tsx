import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { EyeIcon, HeartIcon, PhoneCallIcon, ThumbsUpIcon } from "lucide-react"
import { StatisticsCharts } from "./components/charts/stats-charts"

export default function StatisticsPage() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              No. of Wishlists
            </CardTitle>
            <HeartIcon width={18} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12529</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">No. of Views</CardTitle>
            <EyeIcon width={18} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8764</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              No. of Interactions
            </CardTitle>
            <ThumbsUpIcon width={18} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5273</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              No. of Contact Owner
            </CardTitle>
            <PhoneCallIcon width={18} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2350</div>
          </CardContent>
        </Card>
      </div>
      <div className="pt-2">
        <StatisticsCharts />
      </div>
    </>
  )
}
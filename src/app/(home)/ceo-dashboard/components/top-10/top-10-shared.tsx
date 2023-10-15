import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const top10SharedItems = [
  {
    id: "ITM-1",
    name: "BMW X7",
    image: "https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/069b7415-505a-44b2-ac2d-fb9cd9002b4a.jpg",
    owner: "Mohamed Abdelghany",
    shares: 928
  },
  {
    id: "ITM-2",
    name: "Villa",
    image: "https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/dbe4eb7e-545c-4384-96f6-20940f796bc3.jpg",
    owner: "Soha El Hadary",
    shares: 826
  },
  {
    id: "ITM-3",
    name: "Rolex",
    image: "https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/09f440fa-2d50-43c7-bb5e-03ad9607413e.jpg",
    owner: "Mohamed Abdelghany",
    shares: 725
  },
  {
    id: "ITM-1",
    name: "Rolex",
    image: "https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/dbe4eb7e-545c-4384-96f6-20940f796bc3.jpg",
    owner: "Mohamed Abdelghany",
    shares: 659
  },
  {
    id: "ITM-1",
    name: "BMW X7",
    image: "https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/dbe4eb7e-545c-4384-96f6-20940f796bc3.jpg",
    owner: "Mohamed Abdelghany",
    shares: 538
  },
  {
    id: "ITM-1",
    name: "BMW X7",
    image: "https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/dbe4eb7e-545c-4384-96f6-20940f796bc3.jpg",
    owner: "Mohamed Abdelghany",
    shares: 492
  },
  {
    id: "ITM-1",
    name: "BMW X7",
    image: "https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/dbe4eb7e-545c-4384-96f6-20940f796bc3.jpg",
    owner: "Mohamed Abdelghany",
    shares: 372
  },
  {
    id: "ITM-1",
    name: "BMW X7",
    image: "https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/dbe4eb7e-545c-4384-96f6-20940f796bc3.jpg",
    owner: "Mohamed Abdelghany",
    shares: 293
  },
  {
    id: "ITM-1",
    name: "BMW X7",
    image: "https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/dbe4eb7e-545c-4384-96f6-20940f796bc3.jpg",
    owner: "Mohamed Abdelghany",
    shares: 192
  },
  {
    id: "ITM-1",
    name: "BMW X7",
    image: "https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/dbe4eb7e-545c-4384-96f6-20940f796bc3.jpg",
    owner: "Mohamed Abdelghany",
    shares: 64
  },
]

export function Top10Shared() {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Top 10 Shared Items</CardTitle>
        <CardDescription>
          These are the top 10 shared items.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ maxHeight: "60vh", overflow: "hidden scroll" }}>
          <div className="space-y-4">
            {top10SharedItems.map((product) => {
              return <div className="flex items-center">
                <Avatar className="h-9 w-9" style={{ width: "150px", height: "100px", borderRadius: "5px" }}>
                  <AvatarImage src={product.image} alt="avatar" style={{ objectFit: "cover" }} />
                  <AvatarFallback>{product.name}</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    <Link href={'/products/' + product.id}>{product.name}</Link>
                  </p>
                  <p className="text-sm text-muted-foreground">
                    By Mohamed Abdelghany
                  </p>
                </div>
                <div className="ml-auto p-5 text-sm font-medium">{product.shares} shares</div>
              </div>
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

import AddImage from "@/components/forms/add-image"
import { EmptyPlaceholder } from "@/components/other/empty-placeholder"
import { DashboardHeader } from "@/components/other/header"
import { DashboardShell } from "@/components/other/shell"
import { DataTable } from "@/components/table/data-table"
import { imagesTableColumns, imagesTableToolbar, imagesTableToolbarSearchList } from "./config"

function getImages() {
  const data: any = [
    {
      id: 'IMG-1',
      displayOrder: '1',
      low: 'https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/dbe4eb7e-545c-4384-96f6-20940f796bc3.jpg',
      medium: 'https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/dbe4eb7e-545c-4384-96f6-20940f796bc3.jpg',
      high: 'https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/dbe4eb7e-545c-4384-96f6-20940f796bc3.jpg',
      isThumbnail: false,
    },
    {
      id: 'IMG-2',
      displayOrder: '2',
      low: 'https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/e5b5ca50-fb6e-414d-88fb-1198ed605211.jpg',
      medium: 'https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/e5b5ca50-fb6e-414d-88fb-1198ed605211.jpg',
      high: 'https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/e5b5ca50-fb6e-414d-88fb-1198ed605211.jpg',
      isThumbnail: true,
    },
    {
      id: 'IMG-3',
      displayOrder: '3',
      low: 'https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/e390d7cb-e9e4-4a55-94e6-866b63547653.jpg',
      medium: 'https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/e390d7cb-e9e4-4a55-94e6-866b63547653.jpg',
      high: 'https://connectedapp20200512063146.azurewebsites.net/api/connectedadmin/GetImage/e390d7cb-e9e4-4a55-94e6-866b63547653.jpg',
      isThumbnail: false,
    }
  ];
  return data
}

export default function ImagesTable({ showAddButton }: any) {
  const images = getImages()
  return (
    <>
      {showAddButton ?
        (<DashboardShell className="mb-1 mt-4">
          <DashboardHeader heading="" text="Manage this product images">
            <AddImage />
          </DashboardHeader>
        </DashboardShell>)
        : (<></>)}
      <div className="mt-4 mb-2">
        {images.length > 0 ? (
          <DataTable data={images} columns={imagesTableColumns} toolbar={imagesTableToolbar} toolbarSearchList={imagesTableToolbarSearchList} />
        ) : (<EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No Images</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any image yet.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>)}
      </div>
    </>
  )
}
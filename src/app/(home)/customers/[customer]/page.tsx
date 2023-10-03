import { promises as fs } from "fs";
import path from "path";

//import { useRouter } from "next/navigation";
import CustomerTabs from "./customer-tabs";

export const metadata = {
  title: "Customer",
}

async function getCustomer(customerID: string) {

  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/customers_data.json")
  )
  const customers = JSON.parse(data.toString())
  let customer = null;

  for (let i = 0; i < customers.length; i++) {
    if (customers[i].id == customerID) {
      return customers[i]
    }
  }
}

async function getProducts(customerID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/products_data.json")
  )
  const products = JSON.parse(data.toString())
  let userProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].ownerID == customerID) {
      userProducts.push(products[i]);
    }
  }
  return userProducts
}

async function getWishlist() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/wishlists_data.json")
  )
  const wishlist = JSON.parse(data.toString())
  return wishlist
}

async function getInterests() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/interests_data.json")
  )
  const interests = JSON.parse(data.toString())
  return interests
}

async function getCalls() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/calls_data.json")
  )
  const calls = JSON.parse(data.toString())
  return calls
}

async function getSubscriptions(customerID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/subscriptions_data.json")
  )
  const subscriptions = JSON.parse(data.toString())
  let userSubscriptions = [];
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].customerID == customerID) {
      userSubscriptions.push(subscriptions[i]);
    }
  }
  return userSubscriptions
}

async function getNotifications(customerID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/notifications_data.json")
  )
  const notifications = JSON.parse(data.toString())
  let userNotifications = [];
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].receiverID == customerID) {
      userNotifications.push(notifications[i]);
    }
  }
  return userNotifications
}

async function getAppointments() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/appointments_data.json")
  )
  const appointments = JSON.parse(data.toString())
  return appointments
}

async function getInternalNotes() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/internal_notes_data.json")
  )
  const internalNotes = JSON.parse(data.toString())
  return internalNotes
}

async function getStats() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/stats_data.json")
  )
  const stats = JSON.parse(data.toString())
  return stats
}

async function getHistory() {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/history_data.json")
  )
  const history = JSON.parse(data.toString())
  return history
}

export default async function CustomerPage({ params }: { params: { customer: string } }) {
  const customer = await getCustomer(params.customer)
  const products = await getProducts(params.customer)
  const wishlist = await getWishlist()
  const interests = await getInterests()
  const calls = await getCalls()
  const subscriptions = await getSubscriptions(params.customer)
  const notifications = await getNotifications(params.customer)
  const appointments = await getAppointments()
  const internalNotes = await getInternalNotes()
  const stats = await getStats()
  const history = await getHistory()

  return (
    <>
      <CustomerTabs
        customer={customer}
        products={products}
        wishlist={wishlist}
        interests={interests}
        calls={calls}
        subscriptions={subscriptions}
        notifications={notifications}
        appointments={appointments}
        internalNotes={internalNotes}
        stats={stats}
        history={history} />
    </>
  )
}

import { promises as fs } from "fs";
import path from "path";

import CustomerTabs from "./customer-tabs";

async function getCustomer(customerID: string) {

  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/customers_data.json")
  )
  const customers = JSON.parse(data.toString())
 
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

async function getWishlist(customerID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/wishlists_data.json")
  )
  const wishlist = JSON.parse(data.toString())
  let userWishlist = [];
  for (let i = 0; i < wishlist.length; i++) {
    if (wishlist[i].customerID == customerID) {
      userWishlist.push(wishlist[i]);
    }
  }
  return userWishlist
}

async function getCalls(customerID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/calls_data.json")
  )
  const calls = JSON.parse(data.toString())
  let userCalls = [];
  for (let i = 0; i < calls.length; i++) {
    if (calls[i].customerID == customerID) {
      userCalls.push(calls[i]);
    }
  }
  return userCalls
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

async function getAppointments(customerID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/appointments_data.json")
  )
  const appointments = JSON.parse(data.toString())
  let userAppointments = [];
  for (let i = 0; i < appointments.length; i++) {
    if (appointments[i].customerID == customerID) {
      userAppointments.push(appointments[i]);
    }
  }
  return userAppointments
}

async function getRequests(customerID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/requests_data.json")
  )
  const requests = JSON.parse(data.toString())
  let userRequests = [];
  for (let i = 0; i < requests.length; i++) {
    if (requests[i].customerID == customerID) {
      userRequests.push(requests[i]);
    }
  }
  return userRequests
}

async function getInternalNotes(customerID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/internal_notes_data.json")
  )
  const internalNotes = JSON.parse(data.toString())
  let userInternalNotes = [];
  for (let i = 0; i < internalNotes.length; i++) {
    if (internalNotes[i].customerID == customerID) {
      userInternalNotes.push(internalNotes[i]);
    }
  }
  return userInternalNotes
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
  let customerID = params.customer
  const customer = await getCustomer(customerID)
  const products = await getProducts(customerID)
  const wishlist = await getWishlist(customerID)
  const calls = await getCalls(customerID)
  const subscriptions = await getSubscriptions(customerID)
  const notifications = await getNotifications(customerID)
  const requests = await getRequests(customerID)
  const appointments = await getAppointments(customerID)
  const internalNotes = await getInternalNotes(customerID)
  const stats = await getStats()
  const history = await getHistory()

  return (
    <>
      <CustomerTabs
        customer={customer}
        products={products}
        wishlist={wishlist}
        calls={calls}
        subscriptions={subscriptions}
        notifications={notifications}
        requests={requests}
        appointments={appointments}
        internalNotes={internalNotes}
        stats={stats}
        history={history} />
    </>
  )
}
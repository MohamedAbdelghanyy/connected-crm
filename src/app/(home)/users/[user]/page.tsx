import { promises as fs } from "fs";
import path from "path";

import UserTabs from "./user-tabs";

export const metadata = {
  title: "User",
}

async function getUser(userID: string) {

  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/users_data.json")
  )
  const users = JSON.parse(data.toString())
  let user = null;

  for (let i = 0; i < users.length; i++) {
    if (users[i].id == userID) {
      return users[i]
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

export default async function UserPage({ params }: { params: { user: string } }) {
  let userID = params.user
  const user = await getUser(userID)
  const products = await getProducts(userID)
  const wishlist = await getWishlist(userID)
  const calls = await getCalls(userID)
  const subscriptions = await getSubscriptions(userID)
  const notifications = await getNotifications(userID)
  const appointments = await getAppointments(userID)
  const internalNotes = await getInternalNotes(userID)
  const stats = await getStats()
  const history = await getHistory()

  return (
    <>
      <UserTabs
        user={user}
        products={products}
        wishlist={wishlist}
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
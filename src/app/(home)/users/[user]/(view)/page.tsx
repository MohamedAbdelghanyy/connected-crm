import { promises as fs } from "fs";
import path from "path";

import { errorHandler } from "@/components/ui/custom/error-handler";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import UserTabs from "./user-tabs";

export const metadata = {
  title: "User",
}

async function getUser(userID: string) {
  return await axios.get('/identity/users/' + userID)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      errorHandler(toast, error);
      return null;
    });
}

async function getProducts(userID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/products_data.json")
  )
  const products = JSON.parse(data.toString())
  let userProducts = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].ownerID == userID) {
      userProducts.push(products[i]);
    }
  }
  return userProducts
}

async function getWishlist(userID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/wishlists_data.json")
  )
  const wishlist = JSON.parse(data.toString())
  let userWishlist = [];
  for (let i = 0; i < wishlist.length; i++) {
    if (wishlist[i].userID == userID) {
      userWishlist.push(wishlist[i]);
    }
  }
  return userWishlist
}

async function getCalls(userID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/calls_data.json")
  )
  const calls = JSON.parse(data.toString())
  let userCalls = [];
  for (let i = 0; i < calls.length; i++) {
    if (calls[i].userID == userID) {
      userCalls.push(calls[i]);
    }
  }
  return userCalls
}

async function getSubscriptions(userID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/subscriptions_data.json")
  )
  const subscriptions = JSON.parse(data.toString())
  let userSubscriptions = [];
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].userID == userID) {
      userSubscriptions.push(subscriptions[i]);
    }
  }
  return userSubscriptions
}

async function getNotifications(userID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/notifications_data.json")
  )
  const notifications = JSON.parse(data.toString())
  let userNotifications = [];
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].receiverID == userID) {
      userNotifications.push(notifications[i]);
    }
  }
  return userNotifications
}

async function getAppointments(userID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/appointments_data.json")
  )
  const appointments = JSON.parse(data.toString())
  let userAppointments = [];
  for (let i = 0; i < appointments.length; i++) {
    if (appointments[i].userID == userID) {
      userAppointments.push(appointments[i]);
    }
  }
  return userAppointments
}

async function getRequests(userID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/requests_data.json")
  )
  const requests = JSON.parse(data.toString())
  let userRequests = [];
  for (let i = 0; i < requests.length; i++) {
    if (requests[i].userID == userID) {
      userRequests.push(requests[i]);
    }
  }
  return userRequests
}

async function getInternalNotes(userID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/internal_notes_data.json")
  )
  const internalNotes = JSON.parse(data.toString())
  let userInternalNotes = [];
  for (let i = 0; i < internalNotes.length; i++) {
    if (internalNotes[i].userID == userID) {
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
  const requests = await getRequests(userID)
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
        requests={requests}
        appointments={appointments}
        internalNotes={internalNotes}
        stats={stats}
        history={history} />
    </>
  )
}
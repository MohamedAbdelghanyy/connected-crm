import { promises as fs } from "fs";
import path from "path";

import ProductTabs from "./product-tabs";

async function getProduct(productID: string) {

  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/products_data.json")
  )
  const products = JSON.parse(data.toString())

  for (let i = 0; i < products.length; i++) {
    if (products[i].id == productID) {
      return products[i]
    }
  }
}

async function getAttributes(productID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/attributes_data.json")
  )
  const attributes = JSON.parse(data.toString())
  let productAttributes = [];
  for (let i = 0; i < attributes.length; i++) {
    if (attributes[i].itemID == productID) {
      productAttributes.push(attributes[i]);
    }
  }
  return productAttributes
}

async function getWishlist(productID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/wishlists_data.json")
  )
  const wishlist = JSON.parse(data.toString())
  let productWishlist = [];
  for (let i = 0; i < wishlist.length; i++) {
    if (wishlist[i].itemID == productID) {
      productWishlist.push(wishlist[i]);
    }
  }
  return productWishlist
}

async function getCalls(productID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/calls_data.json")
  )
  const calls = JSON.parse(data.toString())
  let productCalls = [];
  for (let i = 0; i < calls.length; i++) {
    if (calls[i].itemID == productID) {
      productCalls.push(calls[i]);
    }
  }
  return productCalls
}

async function getSubscriptions(productID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/subscriptions_data.json")
  )
  const subscriptions = JSON.parse(data.toString())
  let productSubscriptions = [];
  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].itemID == productID) {
      productSubscriptions.push(subscriptions[i]);
    }
  }
  return productSubscriptions
}

async function getNotifications(productID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/notifications_data.json")
  )
  const notifications = JSON.parse(data.toString())
  let productNotifications = [];
  for (let i = 0; i < notifications.length; i++) {
    if (notifications[i].itemID == productID) {
      productNotifications.push(notifications[i]);
    }
  }
  return productNotifications
}

async function getAppointments(productID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/appointments_data.json")
  )
  const appointments = JSON.parse(data.toString())
  let productAppointments = [];
  for (let i = 0; i < appointments.length; i++) {
    if (appointments[i].itemID == productID) {
      productAppointments.push(appointments[i]);
    }
  }
  return productAppointments
}

async function getInternalNotes(productID: string) {
  const data = await fs.readFile(
    path.join(process.cwd(), "src/data/internal_notes_data.json")
  )
  const internalNotes = JSON.parse(data.toString())
  let productInternalNotes = [];
  for (let i = 0; i < internalNotes.length; i++) {
    if (internalNotes[i].itemID == productID) {
      productInternalNotes.push(internalNotes[i]);
    }
  }
  return productInternalNotes
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

export default async function ProductPage({ params }: { params: { product: string } }) {
  let productID = params.product
  const product = await getProduct(productID)
  const attributes = await getAttributes(productID)
  const wishlist = await getWishlist(productID)
  const calls = await getCalls(productID)
  const subscriptions = await getSubscriptions(productID)
  const notifications = await getNotifications(productID)
  const appointments = await getAppointments(productID)
  const internalNotes = await getInternalNotes(productID)
  const stats = await getStats()
  const history = await getHistory()

  return (
    <>
      <ProductTabs
        product={product}
        attributes={attributes}
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
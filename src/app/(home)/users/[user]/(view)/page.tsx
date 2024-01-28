
import { errorHandler } from "@/components/other/error-handler";
import { toast } from "@/components/ui/use-toast";
import axios from "@/services/axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserTabs from "./user-tabs";

export default function UserPage() {
  const { userID } = useParams();
  const [user, setUser] = useState();
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [calls, setCalls] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [requests, setRequests] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [internalNotes, setInternalNotes] = useState([]);

  async function getUser() {
    await axios.get('/identity/users/' + userID)
      .then(function (response) {
        setUser(response.data);
      })
      .catch(function (error) {
        errorHandler(toast, error);
      });
  }

  useEffect(() => {
    getUser();
  }, [userID]);

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
      />
    </>
  )
}
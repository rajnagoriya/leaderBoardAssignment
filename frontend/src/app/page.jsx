"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './context/AuthContext/useAuth';
import { useRouter } from 'next/navigation';
import Loading from './components/loading/loading';
import LeaderBoardCard from './components/leaderboard/LeaderBoardCard';
import toast from 'react-hot-toast';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the initial data of friends from the API
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/v1/get-users`)
      .then(response => {
        setFriends(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error("Error fetching friends:", error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  // Function to handle the point increment
  const incrementPoints = async (username) => {
    try {
    const response = await axios.patch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/v1/claim-points`, { username });

      setFriends(prevFriends =>
        prevFriends.map(friend =>
          friend.username === username ?  response.data.data  : friend
        ).sort((a, b) => b.points - a.points) // Sort by points in descending order
      );
      toast.success( response?.data?.message ||`${username} point increase `);
    } catch (error) {
      console.error("Error updating points:", error);
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(true);
      router.push("/login");
      return;
    }
  }, [user]);

  

  return (
    (
      loading ? <Loading/>  :
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Friends</h1>
      <ul>
        {friends.map((friend) => (
          <LeaderBoardCard key={friend._id} data={friend} clickHandle={incrementPoints}/>
        ))}
      </ul>
    </div>
    )
  );
}

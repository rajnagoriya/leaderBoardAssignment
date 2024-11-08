"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext/useAuth';
import Loading from '../components/loading/loading';
import LeaderBoardCard from '../components/leaderboard/LeaderBoardCard';
import HistoryModal from '../components/leaderboard/HistoryModal';


export default function Leaderboard() {
  const router = useRouter();
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false); // Modal visibility state
  const [historyData, setHistoryData] = useState([]); // State for history data

  // Fetch the initial data of friends from the API
  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/v1/get-users`)
      .then(response => {
        setFriends(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching friends:", error);
        setLoading(false);
      });
  }, []);

  // Function to handle fetching and displaying user history
  const yourHistory = async (username) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/v1/your-history`, { username });
      setHistoryData(response.data.data); // Set the history data
      setModalVisible(true); // Show the modal
      toast.success(response?.data?.message || "User history loaded.");
    } catch (error) {
      console.error("Error fetching user history:", error);
      toast.error("Failed to fetch user history.");
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
    <>
      {loading ? <Loading/>  :
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4"> Leaderboard</h1>
          <ul>
            {friends.map((friend) => (
              <LeaderBoardCard key={friend._id} data={friend} clickHandle={() => yourHistory(friend.username)} />
            ))}
          </ul>
        </div>
      }

      {/* Modal for displaying user history */}
      <HistoryModal
        isVisible={modalVisible}
        data={historyData}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}




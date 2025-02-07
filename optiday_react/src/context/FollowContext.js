// import { createContext, useContext, useEffect, useState } from "react";
// import { AccountSearchApi, followApi, getFollowersApi, getFollowingsApi } from "../api/FollowApiService";
// import { useAuth } from "./AuthContext";


// export const FollowContext = createContext();

// export const useFollow = () => useContext(FollowContext);

// function FollowProvider({ children }) {
//     const [followings, setFollowings] = useState([]);
//     const [followers, setFollowers] = useState([]);
//     const [searchmembers, setSearchMembers] = useState([]);
//     const { memberId } = useAuth();

//     async function fetchFollow(memberId){
//         if(!memberId) return;
//         try {
//             const responseFollowers = await getFollowersApi(memberId);
//             const responseFollowings = await getFollowingsApi(memberId);
//             setFollowers(responseFollowers.data);
//             setFollowings(responseFollowings.data);
//         } catch (error) {
//             console.error('Error fetching followings:', error);
//         }
//     }

//     const follow = async (memberId, followId) => {

//         try {
//             const response = await followApi(memberId, followId);
//             setFollowings((prevFollowings) => [...prevFollowings, response.data]);
//         } catch (error) {
//             console.error('Error following:', error);
//         }
//     }

//     const fetchAllMembers = async (memberId) => {
//         try{
//             const response = await AccountSearchApi(memberId);
//             setSearchMembers(response.data);
//         } catch (error) {
//             console.error("Error SearchAccount: error");
//         }
//     }
    
//     useEffect(() => {
//         fetchFollow(memberId);
//         fetchAllMembers(memberId);
//     },[])
        
//     return (
//         <FollowContext.Provider value={{ followings, setFollowings, followers, setFollowers, fetchFollow, follow,searchmembers}}>
//             {children}
//         </FollowContext.Provider>
//     );
// }

// export default FollowProvider;
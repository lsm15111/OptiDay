import React, { useState, useEffect } from 'react';
import '../styles/Follow.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFollow, fetchFollow, selectFollowers, selectFollowings, unFollow } from '../redux/slices/followSlice';
import { AccountSearchApi, followApi, unfollowApi } from '../api/FollowApiService';
import { ChevronLeft, ChevronRight } from 'lucide-react';


function Follow(){
    const [selectedTab, setSelectedTab] = useState('follower');
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchFollow());
    }, [dispatch]);


    const [followerCount, setFollowerCount] = useState(0);
    const [followingCount, setFollowingCount] = useState(0);

    const handlefollowerCount = (count) => {
        setFollowerCount(count);
    };

    const handlefollowingCount = (count) => {
        setFollowingCount(count);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case 'follower':
                return <FollowerComponent followerCount={handlefollowerCount} onMemberClick={handleMemberClick}/>;
            case 'following':
                return <FollowingComponent followingCount={handlefollowingCount} onMemberClick={handleMemberClick}/>;
            case 'search':
                return <AccountSearchComponent/>;
            default:
                return <FollowerComponent followerCount={handlefollowerCount} onMemberClick={handleMemberClick}/>;
        }
    };
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const [selectedMemberProfile, setSelectedMemberProfile] = useState(null);

    const handleMemberClick = async (targetId) => {
        if(isProfileModalOpen) return;
        try{
            const response = await fetchMemberProfile(targetId);
            if (response.status === 200) {
                setSelectedMemberProfile(response.data);
                setProfileModalOpen(true);
            }
        }catch(error){
            alert(error.response.data);
            console.log(error);
        }
        
    };
    return (
        <div className='contents'>
            <ProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} 
                    memberProfile={selectedMemberProfile} />
            <div className="container-fluid px-4">
                <div className="row justify-content-center">
                    <div className="bg-white p-4 rounded">
                        <div className="button-container">
                            <button 
                                onClick={() => setSelectedTab('follower')} 
                                className={selectedTab === 'follower' ? 'active' : ''}
                            >
                                팔로워 {followerCount}
                            </button>
                            <button 
                                onClick={() => setSelectedTab('following')} 
                                className={selectedTab === 'following' ? 'active' : ''}
                            >
                                팔로잉 {followingCount}
                            </button>
                            <button 
                                onClick={() => setSelectedTab('search')} 
                                className={selectedTab === 'search' ? 'active' : ''}
                            >
                                계정 검색
                            </button>
                        </div>
                        <div className="content">
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



// 페이징화 컴포넌트
// const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
//     return (
//         <div className='pagination'>
//             {Array.from({ length: totalPages }, (_, index) => (
//                 <button key={index} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
//                     {index + 1}
//                 </button>
//             ))}
//         </div>
//     );
// };
// 검색 컴포넌트
const SearchInput = ({ searchTerm, setSearchTerm }) => {
    return (
        <input 
            type='text' 
            placeholder='Search by username or email' 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            style={{ marginBottom: '10px', padding: '5px', width: '100%' }}
        ></input>
    );
};
// Follow 페이지화 훅
const usePagination = (items, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(items.length / itemsPerPage);
    return { currentItems, totalPages, currentPage, setCurrentPage };
};

// Follow 검색 훅
const useSearch = (items, searchTerm) => {
    return items.filter(item => 
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
        
    );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className='d-flex justify-content-center align-items-center'>
            <button 
                disabled={currentPage === 0} 
                onClick={() => onPageChange(currentPage - 1)}
                className='account-search-pagination-button'
            >
                <ChevronLeft size={30} />
            </button>
            <span>{currentPage + 1} / {totalPages}</span>
            <button 
                disabled={currentPage === totalPages - 1} 
                onClick={() => onPageChange(currentPage + 1)}
                className='account-search-pagination-button'
            >
                <ChevronRight size={30} />
            </button>
        </div>
    );
};

const FollowerComponent = ({followerCount}) => {

    const dispatch = useDispatch();
    const followers = useSelector(selectFollowers);
    followerCount(followers.length);

    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10; // 한 페이지당 보여줄 팔로우 수

    

    const handlefollow = async (targetId) => {
        try{
            const response = await followApi(targetId)
            if(response.status == 200){
                dispatch(addFollow(targetId));
                dispatch(fetchFollow());
            }
        }catch(error){
            alert(error.response.data);
        }
    }
    const paginatedFollowers = followers.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    const totalPages = Math.ceil(followers.length / pageSize);
    return (
        <div>
            {/* <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
            {followers.length > 1 && (
                <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
            )}
            {paginatedFollowers.map(follower => (
                <div className='follow-item' key={follower.id}>
                    <div className='profile-image bg-secondary'></div>
                    <div className='username-email'>
                        <div>{follower.username}</div>
                        <div>{follower.message}</div>
                    </div>
                    {follower.status === 'FOLLOWER' && (
                        <button className='follow-button bg-primary-subtle' onClick={() => handlefollow(follower.id)}>팔로우</button>
                    )}
                </div>
            ))}
        </div>
    );
};

const FollowingComponent = ({followingCount}) => {
    const dispatch = useDispatch();
    const followings = useSelector(selectFollowings);
    followingCount(followings.length);

    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10; // 한 페이지당 보여줄 팔로우 수

    const handleFollow = async (targetId) => {
        try {
            const response = await unfollowApi(targetId);
            if (response.status === 200) {
                dispatch(unFollow(targetId));
                dispatch(fetchFollow());
                
            }
        } catch (error) {
            alert(error.response.data);
        }
    };

    // 현재 페이지에 해당하는 followings 데이터
    const paginatedFollowings = followings.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    const totalPages = Math.ceil(followings.length / pageSize);

    return (
        <div>
            {followings.length > 1 && (
                <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
            )}
            {paginatedFollowings.map(following => (
                <div className='follow-item' key={following.id}>
                    <div className='profile-image bg-secondary'></div>
                    <div className='username-email'>
                        <div>{following.username}</div>
                        <div>{following.message}</div>
                    </div>
                    <button className='follow-button bg-primary-subtle' onClick={() => handleFollow(following.id)}>언팔로우</button>
                </div>
            ))}
            
        </div>
    );
};

const AccountSearchComponent = () => {
    const [members, setMembers] = useState([]); // 멤버 데이터
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");
    const pageSize = 10; // 한 페이지당 아이템 개수
    const fetchMembers = async (newPage = page) => {
        try {
            const response = await AccountSearchApi(newPage,pageSize,search);
            if(response.status === 200){
                const data = response.data;
                console.log("response Data",data)
                setMembers(data.content); // 멤버 데이터 저장
                setTotalPages(data.totalPages);
                setPage(newPage);
                // console.log(data.content,data.totalPages)
            }else {
                console.log("데이터 가져오기 실패");
            }
        } catch (error) {
            console.error("데이터 가져오기 실패", error);
        } finally {
        }
    };
    

    useEffect(() => {
        fetchMembers();
    }, [page]);


    const handleMemberClick = (memberId) => {
        console.log(memberId);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            fetchMembers();
            setPage(0);
        }
    };
    return(
        <div>
            <div>
            <input 
                type="text" 
                placeholder="이름을 입력해주세요." 
                value={search} 
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                className='account-search-input'
            />
            </div>
            {totalPages > 1 && (
                <Pagination 
                currentPage={page} 
                totalPages={totalPages} 
                onPageChange={setPage} 
            />
            )}
            {members.length > 0 ? members.map(member => (
                <div className='follow-item' key={member.id} onClick={handleMemberClick(member.id)}>
                <div className='profile-image bg-secondary'></div>
                <div className='username-email'>
                    <div>{member.username}</div>
                    <div>{member.message}</div>
                </div>
                </div>
            )):(<div className=' text-center p-2 justify-content-center align-items-center'>검색 결과가 없습니다.</div>)}
            
            {/* {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />} */}
        </div>);
}

export default Follow;
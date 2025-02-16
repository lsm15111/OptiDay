import React, { useState, useEffect } from 'react';
import '../styles/Follow.css';
import { useDispatch, useSelector } from 'react-redux';
import { addFollow, fetchFollow, selectFollowers, selectFollowings } from '../redux/slices/followSlice';
import { followApi } from '../api/FollowApi';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AccountSearchApi } from '../api/MemberApi';
import ProfileModal from '../components/modals/ProfileModal';


function Follow(){
    const [selectedTab, setSelectedTab] = useState('follower');
    const dispatch = useDispatch();
    const followers = useSelector(selectFollowers);
    const followings = useSelector(selectFollowings);
    useEffect(() => {
        dispatch(fetchFollow());
    }, [dispatch]);


    const renderContent = () => {
        switch (selectedTab) {
            case 'follower':
                return <FollowerComponent followers={followers} onMemberClick={handleMemberClick}/>;
            case 'following':
                return <FollowingComponent followings={followings} onMemberClick={handleMemberClick}/>;
            case 'search':
                return <AccountSearchComponent onMemberClick={handleMemberClick}/>;
            default:
                return <FollowerComponent followers={followers} onMemberClick={handleMemberClick}/>;
        }
    };
    const [isProfileModalOpen, setProfileModalOpen] = useState(false);

    const [targetId, setTargetId] = useState(null);
    const handleMemberClick = (targetId) => {
        setTargetId(targetId);
        setProfileModalOpen(true);
    };
    return (
        <div className='contents'>
            <ProfileModal isOpen={isProfileModalOpen} onClose={() => setProfileModalOpen(false)} 
                    memberId={targetId} />
            <div className="container-fluid px-4">
                <div className="row justify-content-center">
                    <div className="bg-white p-4 rounded">
                        <div className="button-container">
                            <button 
                                onClick={() => setSelectedTab('follower')} 
                                className={selectedTab === 'follower' ? 'active' : ''}
                            >
                                팔로워 {followers.length}
                            </button>
                            <button 
                                onClick={() => setSelectedTab('following')} 
                                className={selectedTab === 'following' ? 'active' : ''}
                            >
                                팔로잉 {followings.length}
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

const FollowerComponent = ({followers, onMemberClick}) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10; // 한 페이지당 보여줄 팔로우 수
    const handlefollow = async (targetId) => {
        try{
            const response = await followApi(targetId)
            if(response.status === 200){
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
            {totalPages > 1 && (
                <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
            )}
            {paginatedFollowers.map(follower => (
                <div className='follow-item' key={follower.id} onClick={()=> onMemberClick(follower.id)}>
                    <div className='profile-image bg-secondary'></div>
                    <div className='username-email'>
                        <div>{follower.username}</div>
                        <div>{follower.message}</div>
                    </div>
                    {follower.status === 'FOLLOWER' && (
                        <button className='follow-button' onClick={(e) =>{ 
                            e.stopPropagation(); // 이벤트 버블링 방지
                            handlefollow(follower.id)}}>팔로우</button>
                    )}
                </div>
            ))}
        </div>
    );
};

const FollowingComponent = ({followings, onMemberClick}) => {
    // const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(0);
    const pageSize = 10; // 한 페이지당 보여줄 팔로우 수
/*     const handleFollow = async (targetId) => {
        try {
            const response = await unfollowApi(targetId);
            if (response.status === 200) {
                dispatch(unFollow(targetId));
                dispatch(fetchFollow());
                
            }
        } catch (error) {
            console.error("데이터 가져오기 실패",error);
            // alert(error.response.data);
        }
    }; */

    const paginatedFollowings = followings.slice(currentPage * pageSize, (currentPage + 1) * pageSize);
    const totalPages = Math.ceil(followings.length / pageSize);

    return (
        <div>
            {totalPages > 1 && (
                <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={setCurrentPage} 
            />
            )}
            {paginatedFollowings.map(following => (
                <div className='follow-item' key={following.id} onClick={()=> onMemberClick(following.id)}>
                    <div className='profile-image bg-secondary'></div>
                    <div className='username-email'>
                        <div>{following.username}</div>
                        <div>{following.message}</div>
                    </div>
                    {/* <button className='unfollow-button' onClick={(e) => {
                        e.stopPropagation(); // 이벤트 버블링 방지
                        handleFollow(following.id)
                    }}>언팔로우</button> */}
                </div>
            ))}
            
        </div>
    );
};

const AccountSearchComponent = ({onMemberClick}) => {
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
                setMembers(data.content); // 멤버 데이터 저장
                setTotalPages(data.totalPages);
                setPage(newPage);
                // console.log(data.content,data.totalPages)
            }else {
                console.log("데이터 가져오기 실패");
            }
        } catch (error) {
            console.error("데이터 가져오기 실패", error);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, [page]);

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
            <div className='account-list-container'>
            {members.length > 0 ? members.map(member => (
                <div className='follow-item' key={member.id} onClick={() => onMemberClick(member.id)}>
                <div className='profile-image bg-secondary'></div>
                <div className='username-email'>
                    <div>{member.username}</div>
                    <div>{member.message}</div>
                </div>
                </div>
            )):(<div className=' text-center p-2 justify-content-center align-items-center'>검색 결과가 없습니다.</div>)}
            </div>
            {/* {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />} */}
        </div>);
}

export default Follow;
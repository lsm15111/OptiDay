import React, { useState, useEffect } from 'react';
import { getFollowersApi, getFollowingsApi } from '../api/FollowApiService';
import '../styles/Follow.css';
import { useAuth } from '../context/AuthContext';

function Follow(){
    const [selectedTab, setSelectedTab] = useState('followers');
    const { memberId } = useAuth();
    const [followers, setFollowers] = useState([]);
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const responseFollowers = await getFollowersApi(memberId);
            const responseFollowings = await getFollowingsApi(memberId);
            setFollowers(responseFollowers.data);
            setFollowings(responseFollowings.data);
        };

        if(memberId){
            fetchData();
        }
    }, [memberId]);

    const renderContent = () => {
        switch (selectedTab) {
            case 'followers':
                return <FollowersComponent followers={followers} followings={followings} />;
            case 'following':
                return <FollowingComponent followings={followings} />;
            case 'search':
                return <AccountSearchComponent />;
            default:
                return <FollowersComponent followers={followers} followings={followings} />;
        }
    };

    return (
        <div className='contents'>
            <div className="container-fluid px-4">
                <div className="row justify-content-center">
                    <div className="bg-white p-4 rounded">
                        <div className="button-container">
                            <button 
                                onClick={() => setSelectedTab('followers')} 
                                className={selectedTab === 'followers' ? 'active' : ''}
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



// 페이징화 컴포넌트
const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
    return (
        <div className='pagination'>
            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index} onClick={() => setCurrentPage(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
                    {index + 1}
                </button>
            ))}
        </div>
    );
};
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
    console.log('search');
    return items.filter(item => 
        item.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.email.toLowerCase().includes(searchTerm.toLowerCase())
        
    );
};

const FollowersComponent = ({ followers, followings }) => {
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');

    const { currentItems, totalPages, currentPage, setCurrentPage } = usePagination(followers, itemsPerPage);
    const filteredFollowers = useSearch(currentItems, searchTerm);

    return (
        <div>
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <h3>나를 팔로우 한사람</h3>
            {filteredFollowers.map(follower => (
                <div className='follower-item' key={follower.id}>
                    <div className='profile-image bg-secondary'></div>
                    <div className='username-email'>
                        <div>{follower.username}</div>
                        <div>{follower.email}</div>
                    </div>
                    {!followings.some(following => following.username === follower.username) && (
                        <button className='follow-button bg-primary-subtle'>맞팔로우</button>
                    )}
                </div>
            ))}
            {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        </div>
    );
};

const FollowingComponent = ({ followings }) => {
    const itemsPerPage = 10;
    const [searchTerm, setSearchTerm] = useState('');

    const { currentItems, totalPages, currentPage, setCurrentPage } = usePagination(followings, itemsPerPage);
    const filteredFollowings = useSearch(currentItems, searchTerm);

    return (
        <div>
            <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <h3>내가 팔로우 한사람</h3>
            {filteredFollowings.map(following => (
                <div className='follower-item' key={following.id}>
                    <div className='profile-image bg-secondary'></div>
                    <div className='username-email'>
                        <div>{following.username}</div>
                        <div>{following.email}</div>
                    </div>
                    <button className='follow-button bg-primary-subtle'>언팔로우</button>
                </div>
            ))}
            {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />}
        </div>
    );
};

const AccountSearchComponent = () => <div>Account Search</div>;

export default Follow;
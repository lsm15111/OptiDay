import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { X } from 'lucide-react';

import '../../styles/ProfileModal.css';
import { followApi, unfollowApi } from '../../api/FollowApi';
import { addFollow, fetchFollow, unFollow } from '../../redux/slices/followSlice';
import { useDispatch } from 'react-redux';
import { retrieveProfileForMemberIdApi } from '../../api/MemberApi';

const ProfileModal = ({ isOpen, onClose, memberId }) => {
    const dispatch = useDispatch();
    const [memberProfile, setMemberProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMemberProfile = async () => {
            if (isOpen && memberId) {
                setLoading(true);
                setError(null); // 이전 에러 초기화
                try {
                    const response = await retrieveProfileForMemberIdApi(memberId);
                    if (response.status === 200) {
                        setMemberProfile(response.data); // 데이터 설정
                        // console.log("Profile modal data:",response.data);
                    } else {
                        throw new Error('Failed to fetch member profile');
                    }
                } catch (err) {
                    setError(err.message); // 에러 메시지 설정
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchMemberProfile();
    }, [isOpen, memberId]);


    const handlefollow = async (targetId) => {
        try{
            const response = await followApi(targetId)
            // console.log(response)
            if(response.status === 200){
                dispatch(addFollow(response.data));
                dispatch(fetchFollow());
                setMemberProfile(prev => ({
                    ...prev,
                    followState: prev.followState === 'FOLLOWER' ? 'MUTUAL' : 'FOLLOWING'
                }));
                // console.log("Follow : ",memberProfile);
            }
        }catch(error){
            console.error(error);
            alert(error.response.data);
        }
    }

    const handleunfollow = async (targetId) => {
        try{
            const response = await unfollowApi(targetId);
            if(response.status === 200){
                // console.log(response)
                dispatch(unFollow(targetId))
                dispatch(fetchFollow());
                setMemberProfile(prev => ({
                    ...prev,
                    followState: prev.followState === 'MUTUAL' ? 'FOLLOWER' : 'NONE'
                }));
            }
        } catch(error){
            console.error(error);
        }
    }
    
    const renderFollowButton = () => {
        switch (memberProfile.followState) {
            case 'MUTUAL':
                return <button className='unfollow-button' onClick={()=>handleunfollow(memberProfile.id)}>언팔로우</button>;
            case 'FOLLOWER':
                return <button className='follow-button' onClick={()=>handlefollow(memberProfile.id)}>팔로우</button>;
            case 'FOLLOWING':
                return <button className='unfollow-button' onClick={()=>handleunfollow(memberProfile.id)}>언팔로우</button>;
            case 'NONE':
                return <button className='follow-button' onClick={()=>handlefollow(memberProfile.id)}>팔로우</button>;
            default:
                return null;
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="회원 프로필"
            ariaHideApp={false}
            className="modal-dialog-centered profile-modal"
            overlayClassName="modal-overlay"
        >
            <div className="modal-content" >
                <div className="modal-header">
                    <h4>프로필</h4>
                    <X size={30} onClick={onClose} className='btn-x' />
                </div>
            {loading && <ProfileModalLoading/>}
            {error && <div>{error}</div>}
            {memberProfile && 
                <div className='d-flex'>
                    <div className='profile-modal-img m-2'></div>
                    <div className="profile-modal-body m-2">
                        <p className='profile-modal-username m-2'>{memberProfile.username}</p>
                        <p className='profile-modal-message m-2'>{memberProfile.message}</p>
                        <div className='d-flex'>
                        <p className='profile-modal-count m-1'>팔로워 {memberProfile.followersCount}</p>
                        <p className='profile-modal-count m-1'>팔로잉 {memberProfile.followingsCount}</p>
                        </div>
                        <div className='profile-modal-button'>
                        {renderFollowButton()}
                        </div>
                    </div>
                </div>
            }
            </div>

        </Modal>
    );
};

const ProfileModalLoading = () => {
    return (
            <div className='d-flex'>
                <div className='profile-modal-img m-2'></div>
                <div className="profile-modal-body m-2">
                    <p className='profile-modal-username m-2'></p>
                    <p className='profile-modal-message m-2'></p>
                    <div className='d-flex'>
                        <p className='profile-modal-count m-1'>팔로워 </p>
                        <p className='profile-modal-count m-1'>팔로잉 </p>
                    </div>
                    <div className='profile-modal-button'>
                        <button className='follow-button bg-gray-300'>팔로우</button>
                    </div>
                </div>
            </div>
    )
}

export default ProfileModal;
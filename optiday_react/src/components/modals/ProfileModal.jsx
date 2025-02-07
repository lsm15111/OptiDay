// src/components/modals/ProfileModal.jsx
import React from 'react';
import Modal from 'react-modal';
import { Check, X } from 'lucide-react';

const ProfileModal = ({ isOpen, onClose, memberProfile }) => {
    const renderFollowButton = () => {
        switch (memberProfile.followState) {
            case 'MUTUAL':
                return <button className='follow-button'>언팔로우</button>;
            case 'FOLLOWER':
                return <button className='follow-button'>팔로우</button>;
            case 'FOLLOWING':
                return <button className='follow-button'>팔로우 취소</button>;
            case 'NONE':
                return <button className='follow-button'>팔로우</button>;
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
            className="modal-dialog-centered todo-modal"
            overlayClassName="modal-overlay"
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{memberProfile.username}의 프로필</h2>
                    <X size={30} onClick={onClose} className='btn-x' />
                </div>
                <div className="modal-body">
                    <p>이메일: {memberProfile.email}</p>
                    <p>메시지: {memberProfile.message}</p>
                    <p>팔로워 수: {memberProfile.followersCount}</p>
                    <p>팔로잉 수: {memberProfile.followingsCount}</p>
                    {renderFollowButton()}
                </div>
            </div>
        </Modal>
    );
};

export default ProfileModal;
import React, { useState } from "react";
import { deleteAccountApi } from "../../api/MemberApi";
import { useAuth } from "../../context/AuthContext";

const DeleteAccountModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

  const {logout} = useAuth();

    if (!isOpen) return null;

    const handleAccountDelete = async () => {
        const requestBody = {
            email: email,
            password: password
        };
        try{
            const response = await deleteAccountApi(requestBody);
            alert("계정 삭제 성공")
            onClose()
            logout()
        }catch(err){
            alert("계정 삭제 실패. email과 password를 확인하세요.");
        }


    }

    return (
        <div style={styles.modalOverlay}>
        <div style={styles.modalContent}>
            <h2>계정 삭제 확인</h2>
            <p>계정을 삭제하려면 이메일과 비밀번호를 입력하세요.</p>
            <div style={styles.formGroup}>
                <input
                type="email"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={styles.input}
                />
            </div>
            <div style={styles.formGroup}>
                <input
                type="password"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={styles.input}
                />
            </div>
            <div style={styles.buttonGroup}>
                <button type="button" onClick={onClose} style={styles.cancelButton}>
                취소
                </button>
                <button type="submit" style={styles.deleteButton} onClick={()=>{handleAccountDelete()}}>
                계정 삭제
                </button>
            </div>
        </div>
        </div>
    );
};

const styles = {
    modalOverlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    formGroup: {
        marginBottom: "15px",
    },
    input: {
        width: "100%",
        padding: "8px",
        fontSize: "1em",
        border: "1px solid #ccc",
        borderRadius: "4px",
    },
    buttonGroup: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
    },
    cancelButton: {
        padding: "8px 16px",
        backgroundColor: "#ccc",
        color: "#000",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    deleteButton: {
        padding: "8px 16px",
        backgroundColor: "#ff4d4d",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default DeleteAccountModal;
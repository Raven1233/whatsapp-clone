import styled from 'styled-components';
import {Avatar} from "@material-ui/core";
import { auth, db } from '../firebase';
import {useAuthState} from 'react-firebase-hooks/auth';
import {useCollection} from 'react-firebase-hooks/firestore';
import getRecipientEmail from "../utils/getRecipientEmail";
import { useRouter } from 'next/dist/client/router';
function Chat({ id, users }) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const recipientEmail = getRecipientEmail(users, user);
    const [recipientSnapshot] = useCollection(
        db.collection('users').where('email','==',getRecipientEmail(users,user))
    );
    const enterChat=()=>{
        router.push(`/chat/${id}`);
    };
    const recipient = recipientSnapshot?.docs?.[0]?.data();

    return (
        <Container onClick={enterChat}>
            {recipient ? (
                <UserAvatar src={recipient?.photoURL} />
            ) : (
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )}
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat

const Container = styled.div`
   display: flex;
   align-items: center;
   cursor: pointer;
   padding: 15px;
   word-break: break-word;
   :hover{
       background-color: #e9eaeb;
   }
`;
  

const UserAvatar = styled(Avatar)`
    margin: 5px;
    margin-right: 15px;
`;
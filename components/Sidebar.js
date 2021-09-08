import styled from 'styled-components';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Avatar, Button, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import {auth,db} from '../firebase';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import Chat from '../components/Chat';
function Sidebar() {
    const [user]=useAuthState(auth);
    
    const userChats=db.collection('chats').where('users', 'array-contains', user.email);

    const [chatSnapshots] = useCollection(userChats);


    const createChat = ()=>{
        const input=prompt(
            "Please enter the email address of the user to chat with"
        );

        if (!input) return null;
        
        if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            //add chats to db if it doesn't already exist and it is not the user's mail
            db.collection('chats').add({
                users: [user.email, input],
            })
        }
        
    };

    const chatAlreadyExists = (recipientEmail)=>{
         !!chatSnapshots?.docs.find(
             (chat) => 
                chat.data().users.find(user => user===recipientEmail)?.length>0)
    };

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()}/>
                <IconsContainer>
                    <IconButton >
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search for friends" />
            </Search>
            <SidebarButton onClick={createChat}>
                Start a new chat
            </SidebarButton>

            {chatSnapshots?.docs.map((chat)=>(
                <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
            ))}

        </Container>
    )
} 

export default Sidebar;

const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;

    ::-webkit-scollbar {
        display: none;
    }

    -ms-oerflow-style: none;
    scrollbar-width: none;

`;

const Header = styled.div`
    display:flex;
    postion:sticky;
    top:0;
    background-color:white;
    z-index:1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
    cursor: pointer;
    :hover{
        opacity: 0.8;
    }
`;

const IconsContainer = styled.div`
    
`;

const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

const SearchInput=styled.input`
    outline-width:0;
    border: none;
    flex:1;
`;

const SidebarButton = styled(Button)`
    width: 100%;
    &&&{
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }

`;
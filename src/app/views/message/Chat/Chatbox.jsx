import { Avatar, Box, Divider, Icon, IconButton, styled, TextField, useTheme } from '@mui/material';
import { ChatAvatar } from 'app/components';
import { convertHexToRGB } from 'app/utils/utils';
import { useEffect, useState } from 'react';
import ScrollBar from 'react-perfect-scrollbar';
import { H5 } from './Typography';
import DateDifferenceComponent from './DateDifferenceComponent';
import * as Util from 'app/functions/Util';
import Api from 'app/functions/Api';

const ChatContainer = styled('div')({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: '#fff'
});

const StyledScrollBar = styled(ScrollBar)({
  flexGrow: 1
});

const ProfileBox = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 12px 12px 20px',
  color: theme.palette.primary.main,
  background: '#fafafa'
}));

const ChatStatus = styled('div')(({ theme }) => ({
  marginLeft: '12px',
  color: theme.palette.primary.main,
  '& h5': {
    marginTop: 0,
    fontSize: '14px',
    marginBottom: '3px'
  },
  '& span': { fontWeight: '500' }
}));

const ChatMessage = styled('div')(({ theme }) => ({
  padding: '8px',
  maxWidth: 240,
  fontSize: '14px',
  borderRadius: '4px',
  marginBottom: '8px',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  color: 'black',
  background: '#fafafa'
}));

const MessageTime = styled('span')(({ theme }) => ({
  fontSize: '13px',
  fontWeight: '500',
  color: theme.palette.primary.main
}));

const Chatbox = ({ togglePopup, auteur_id }) => {
  if (sessionStorage.getItem('token') === null) {
    alert(
      "Pour accéder à cette fonctionnalité, veuillez vous connecter à votre compte. Si vous n'avez pas de compte, veuillez en créer un pour bénéficier de toutes les fonctionnalités disponibles."
    );
    window.location.href = '/';
  }
  const [donnee, setDonnee] = useState(null);
  const [isAlive, setIsAlive] = useState(true);
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const chatBottomRef = document.querySelector('#chat-scroll');
  const [recepteur, setRecepteur] = useState('');

  const sendMessage = async (event) => {
    const envoyer = async (value) => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
      const response = await fetch(
        `https://wscloudfinal-production.up.railway.app/api/v1/discussions/message/envoye?participant2=${auteur_id}`,
        {
          method: 'POST',
          headers: headers,
          body: value
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    };
    const scrollToBottom =
      (() => {
        if (chatBottomRef) {
          chatBottomRef.scrollTo({
            top: chatBottomRef.scrollHeight,
            behavior: 'smooth'
          });
        }
      },
      [chatBottomRef]);
    let tempMessage = message.trim();
    if (tempMessage !== '') {
      const newMessage = {
        emetteur: 'YourUserId',
        contenu: tempMessage,
        date: new Date().toISOString()
      };
      setMessageList((prevMessages) => [...prevMessages, newMessage]);
      const value = JSON.stringify({
        contenu: tempMessage
      });
      setMessage('');
      envoyer(value);
      scrollToBottom();
    }
    setMessage('');
  };

  const sendMessageOnEnter = async (event) => {
    const envoyer = async (value) => {
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
      const response = await fetch(
        `https://wscloudfinal-production.up.railway.app/api/v1/discussions/message/envoye?participant2=${auteur_id}`,
        {
          method: 'POST',
          headers: headers,
          body: value
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    };
    const scrollToBottom =
      (() => {
        if (chatBottomRef) {
          chatBottomRef.scrollTo({
            top: chatBottomRef.scrollHeight,
            behavior: 'smooth'
          });
        }
      },
      [chatBottomRef]);
    if (event.key === 'Enter' && !event.shiftKey) {
      let tempMessage = message.trim();
      if (tempMessage !== '') {
        const newMessage = {
          emetteur: 'YourUserId',
          contenu: tempMessage,
          date: new Date().toISOString()
        };
        setMessageList((prevMessages) => [...prevMessages, newMessage]);
        const value = JSON.stringify({
          contenu: tempMessage
        });
        setMessage('');
        envoyer(value);
        scrollToBottom();
      }
      setMessage('');
    }
  };

  useEffect(() => {
    const fetcDiscussions = async () => {
      const envoyer = async (value) => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Bearer ' + sessionStorage.getItem('token'));
        const response = await fetch(
          `https://wscloudfinal-production.up.railway.app/api/v1/discussions/message/envoye?participant2=${auteur_id}`,
          {
            method: 'POST',
            headers: headers,
            body: value
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      };
      const response = await Api.fetch(
        `https://wscloudfinal-production.up.railway.app/api/v1/discussions/prive?participant2=${auteur_id}`,
        'GET',
        {
          'Content-Type': 'application/json'
        }
      );
      const scrollToBottom =
        (() => {
          if (chatBottomRef) {
            chatBottomRef.scrollTo({
              top: chatBottomRef.scrollHeight,
              behavior: 'smooth'
            });
          }
        },
        [chatBottomRef]);
      if (response.data.length === 0) {
        const newMessage = {
          emetteur: 'YourUserId',
          contenu: 'je suis intéressée par votre voiture',
          date: new Date().toISOString()
        };
        setMessageList((prevMessages) => [...prevMessages, newMessage]);
        const value = JSON.stringify({
          contenu: 'je suis intéressée par votre voiture'
        });
        envoyer(value);
        scrollToBottom();
      } else {
        setDonnee(response.data[0]);
      }
    };

    fetcDiscussions();
    if (donnee !== null) {
      const rep = Util.getNameRecepteur(auteur_id, donnee);
      setRecepteur(rep);
      if (isAlive) {
        setMessageList(donnee.messages);
      }
    }
  }, [isAlive, donnee, auteur_id, chatBottomRef]);

  useEffect(() => {
    if (donnee !== null) {
      return () => setIsAlive(false);
    }
  }, [messageList, donnee]);

  const { palette } = useTheme();
  const primary = palette.primary.main;
  const textPrimary = palette.text.primary;

  return (
    <ChatContainer>
      <ProfileBox>
        <Box display="flex" alignItems="center">
          <ChatAvatar src="/assets/images/illustrations/icon-admin.svg" />
          <ChatStatus>
            <H5>{recepteur}</H5>
          </ChatStatus>
        </Box>
        <IconButton onClick={togglePopup}>
          <Icon fontSize="small">clear</Icon>
        </IconButton>
      </ProfileBox>
      <StyledScrollBar id="chat-scroll">
        {messageList?.map((item, ind) => (
          <Box
            key={ind}
            p="20px"
            display="flex"
            sx={{
              justifyContent: auteur_id !== item.idemetteur && 'flex-end'
            }}
          >
            {auteur_id === item.idemetteur && <Avatar src={item.avatar} />}
            <Box ml="12px">
              {auteur_id === item.idemetteur && (
                <H5
                  sx={{
                    mb: '4px',
                    fontSize: '14px',
                    color: primary
                  }}
                >
                  {item.emetteur}
                </H5>
              )}
              <ChatMessage>{item.contenu}</ChatMessage>
              <MessageTime>
                <DateDifferenceComponent targetDate={item.date} />
              </MessageTime>
            </Box>
          </Box>
        ))}

        {/* example of image sent by current user*/}
      </StyledScrollBar>
      <div>
        <Divider
          sx={{
            background: `rgba(${convertHexToRGB(textPrimary)}, 0.15)`
          }}
        />
        <TextField
          placeholder="Type here ..."
          multiline
          rowsMax={4}
          fullWidth
          sx={{ '& textarea': { color: primary } }}
          InputProps={{
            endAdornment: (
              <Box display="flex">
                <IconButton size="small" onClick={sendMessage}>
                  <Icon>send</Icon>
                </IconButton>
              </Box>
            ),
            classes: { root: 'pl-5 pr-3 py-3 text-body' }
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={sendMessageOnEnter}
        />
      </div>
    </ChatContainer>
  );
};

export default Chatbox;

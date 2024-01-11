// next
import Router, { useRouter } from 'next/router';
//
import { useEffect } from 'react';
// @mui
import { Box, Divider } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
//
import ChatRoom from './ChatRoom';
import ChatMessageList from './ChatMessageList';
import ChatHeaderDetail from './ChatHeaderDetail';
import ChatMessageInput from './ChatMessageInput';
import ChatHeaderCompose from './ChatHeaderCompose';

// ----------------------------------------------------------------------

const conversationSelector = (state) => {
  const { conversations, activeConversationId } = state.chat;
  const conversation = activeConversationId ? conversations.byId[activeConversationId] : null;
  if (conversation) {
    return conversation;
  }
  const initState = {
    id: '',
    messages: [],
    participants: [],
    unreadCount: 0,
    type: '',
  };
  return initState;
};

export default function ChatWindow() {
  const { pathname, query } = useRouter();

  const { conversationKey } = query;

  // const { contacts, recipients, participants, activeConversationId } = useSelector((state) => state.chat);

  // const conversation = useSelector((state) => conversationSelector(state));

  const mode = conversationKey ? 'DETAIL' : 'COMPOSE';

  // const displayParticipants = participants.filter((item) => item.id !== '8864c717-587d-472a-929a-8e5f298024da-0');

  // useEffect(() => {
  //   const getDetails = async () => {
  //     dispatch(getParticipants(`${conversationKey}`));
  //     try {
  //       await dispatch(getConversation(`${conversationKey}`));
  //     } catch (error) {
  //       console.error(error);
  //       Router.push(PATH_DASHBOARD.chat.new);
  //     }
  //   };
  //   if (conversationKey) {
  //     getDetails();
  //   } else if (activeConversationId) {
  //     dispatch(resetActiveConversation());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [conversationKey]);
  //
  // useEffect(() => {
  //   if (activeConversationId) {
  //     dispatch(markConversationAsRead(activeConversationId));
  //   }
  // }, [dispatch, activeConversationId]);

  const handleAddRecipients = (recipients) => {
    console.log(recipients);
    // dispatch(addRecipients(recipients));
  };

  const handleSendMessage = async (value) => {
    try {
      console.log(value);
      // dispatch(onSendMessage(value));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      {mode === 'DETAIL' ? (
        <ChatHeaderDetail participants={[]} />
      ) : (
        <ChatHeaderCompose recipients={[]} contacts={[]} onAddRecipients={handleAddRecipients} />
      )}

      <Divider />

      <Box sx={{ flexGrow: 1, display: 'flex', overflow: 'hidden' }}>
        <Box sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column' }}>
          <ChatMessageList conversation={{}} />

          <Divider />

          <ChatMessageInput
            conversationId={'1'}
            onSend={handleSendMessage}
            disabled={pathname === PATH_DASHBOARD.chat.new}
          />
        </Box>

        {mode === 'DETAIL' && <ChatRoom conversation={{}} participants={[]} />}
      </Box>
    </Box>
  );
}

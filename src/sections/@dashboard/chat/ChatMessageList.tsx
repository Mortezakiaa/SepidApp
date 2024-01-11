import { useEffect, useState, useRef } from 'react';
//
import Scrollbar from '../../../components/Scrollbar';
import LightboxModal from '../../../components/LightboxModal';
import ChatMessageItem from './ChatMessageItem';

// ----------------------------------------------------------------------

type propTypes = {
  conversation: any;
};

export default function ChatMessageList({ conversation }: propTypes) {
  const scrollRef = useRef(null);

  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [conversation.messages]);

  const imagesLightbox = conversation.messages
    ? conversation.messages.filter((messages) => messages.contentType === 'image').map((messages) => messages.body)
    : [];

  const handleOpenLightbox = (url: string) => {
    const selectedImage = imagesLightbox.findIndex((index: string) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3, height: 1 }}>
        {conversation &&
          conversation.messages &&
          conversation.messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              conversation={conversation}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
      </Scrollbar>

      <LightboxModal
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onCloseRequest={() => setOpenLightbox(false)}
      />
    </>
  );
}

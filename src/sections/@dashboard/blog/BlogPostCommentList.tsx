// @mui
import { Box, List } from '@mui/material';
//
import BlogPostCommentItem from './BlogPostCommentItem';

// ----------------------------------------------------------------------
type propTypes = {
  post: {
    comments: {
      id: number;
      replyComment: {
        id: number;
        tagUser: string;
        postedAt: string;
        message: string;
        name: string;
        avatarUrl: string;
        userId: number;
      }[];
      users: { id: number; userId: number; name: string; avatarUrl: string }[];
      name: string;
      avatarUrl: string;
      postedAt: string;
      message: string;
    }[];
  };
};

export default function BlogPostCommentList({ post }: propTypes) {
  const { comments } = post;

  return (
    <List disablePadding>
      {comments.map((comment) => {
        const { id, replyComment, users } = comment;
        const hasReply = replyComment.length > 0;

        return (
          <Box key={id} sx={{}}>
            <BlogPostCommentItem
              name={comment.name}
              avatarUrl={comment.avatarUrl}
              postedAt={comment.postedAt}
              message={comment.message}
            />
            {hasReply &&
              replyComment.map((reply) => {
                const user = users.find((_user) => _user.id === reply.userId);
                return (
                  <BlogPostCommentItem
                    key={reply.id}
                    tagUser={reply.tagUser}
                    postedAt={reply.postedAt}
                    message={reply.message}
                    name={user?.name || ''}
                    avatarUrl={user?.avatarUrl}
                    hasReply
                  />
                );
              })}
          </Box>
        );
      })}
    </List>
  );
}

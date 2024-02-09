import { Avatar, Box, styled } from '@mui/material';

// styled components
const StyledAvatar = styled(Avatar)({
  height: 40,
  width: 40
});

const StatusCircle = styled('div')(({ theme, status }) => ({
  height: 14,
  width: 14,
  bottom: 0,
  right: '-3px',
  borderRadius: '7px',
  position: 'absolute',
  border: '2px solid white',
  background: status === 'online' ? theme.palette.primary.main : theme.palette.error.main,
  color: status !== 'online' && 'white !important'
}));

const ChatAvatar = ({ src, status }) => {
  return (
    <Box position="relative">
      <StyledAvatar src={'/assets/images/illustrations/icon-admin.svg'} />
    </Box>
  );
};

export default ChatAvatar;

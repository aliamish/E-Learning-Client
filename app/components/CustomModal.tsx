import { useTheme } from 'next-themes';
import React from 'react';
import { Modal, Box,  } from '@mui/material';

type ComponentProps = {
  setOpen: (open: boolean) => void;
  setRoute?: (route: string) => void;
};

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: unknown;
  component: React.ComponentType<ComponentProps>;
  setRoute?: (route: string) => void;
};

const CustomModal = ({ open, setOpen, setRoute, component: Component }: Props) => {
  const {theme} = useTheme()
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-describedby="modal-modal-description"
    >
      <Box className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] ${theme === "dark" ? " dark:bg-slate-900" : "text-white"} rounded-[8px] shadow p-4 outline-none`}>
        <Component setOpen={setOpen} setRoute={setRoute} />
      </Box>
    </Modal>
  );
};

export default CustomModal;

import React, { useEffect, useState } from "react";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from "react-redux";

export default function LoadingBackdrop({backdropState}) {
    const [open, setOpen] = useState(false);
    const loadingState = useSelector((state) => state.global.globalLoading);
    useEffect(() => {
        setOpen(loadingState)
    }, [backdropState, loadingState])
    return (
      <div>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
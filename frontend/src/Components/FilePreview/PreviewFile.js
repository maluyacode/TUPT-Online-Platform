import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { closeDoc } from '../../actions/uiActions';
import { Box, DialogContent } from '@mui/material';

import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const PreviewFile = () => {

    const { openPreview, attachment } = useSelector(state => state.ui)
    const dispatch = useDispatch()
    const [docs, setDocs] = useState([])


    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        dispatch(closeDoc());
    };

    useEffect(() => {
        if (attachment && attachment.preview_url) {
            const mimetype = attachment.mimetype
            console.log(mimetype)
            const dataUrl = `data:${mimetype};base64,${attachment?.preview_url}`;
            const docs = [
                { uri: dataUrl },
                // { uri: require("./example-files/pdf.pdf") }, // Local File
            ];
            setDocs(docs);
        } else {
            // Handle the case where attachment or attachment.preview_url is null
        }

    }, [attachment]);

    return (
        <React.Fragment>
            <Dialog
                fullScreen
                open={openPreview}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            {attachment?.original_name}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        {/* <Button autoFocus color="inherit" onClick={handleClose}>
                            Close
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <DialogContent>
                    <DocViewer documents={docs} />
                </DialogContent>
            </Dialog>
        </React.Fragment>
    )
}

export default PreviewFile
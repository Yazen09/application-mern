import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { deleteContact } from "../../JS/Actions/contact";

const ContactCard = ({ contact }) => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.userReducer.user);
    console.warn(user);
    const isAdmin = user?.isAdmin;

    return (
        <div>
            <Card sx={{ maxWidth: 400, width: 300, mb: "6%" }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={contact.profile_img}
                    title={contact.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {contact.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {contact.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {contact.phone}
                    </Typography>
                </CardContent>
                {isAdmin && (
                    <CardActions>
                        <Button size="small" variant="contained" color="success" onClick={() => navigate(`/EditContact/${contact._id}`)}>Edit</Button>
                        <Button size="small" color="error" variant="contained" onClick={() => dispatch(deleteContact(contact._id))}>Delete <DeleteOutlineIcon sx={{ color: "white" }} /></Button>
                    </CardActions>
                )}
            </Card>
        </div>
    );
};

export default ContactCard;

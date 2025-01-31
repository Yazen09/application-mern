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
import { deleteProduct } from "../../JS/Actions/product";

const ProductCard = ({ product }) => { 
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.userReducer.user);
    const isAdmin = user?.isAdmin;

    return (
        <div>
            <Card sx={{ maxWidth: 400, width: 300, mb: "6%" }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={product.product_img}
                    title={product.reference} 
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {product.reference} 
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Catégorie : {product.categorie}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Numéro de série : {product.numserie} 
                    </Typography>
                </CardContent>
                {isAdmin && (
                    <CardActions>
                        <Button size="small" variant="contained" color="success" onClick={() => navigate(`/EditProduct/${product._id}`)}>Edit</Button>
                        <Button size="small" color="error" variant="contained" onClick={() => dispatch(deleteProduct(product._id))}>
                            Delete <DeleteOutlineIcon sx={{ color: "white" }} />
                        </Button>
                    </CardActions>
                )}
            </Card>
        </div>
    );
};

export default ProductCard;

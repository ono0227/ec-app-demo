import React, { useCallback } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/styles";
import { PrimaryButton } from "../UIkit";
import { useDispatch } from "react-redux";
import {push} from "connected-react-router";

const useStyles = makeStyles({
    list: {
        background: '#fff',
        height: 'auto'
    },
    image: {
        objectFit: 'cover',
        margin: '8px 16@x 8px 0',
        height: 96,
        width: 96
    },
    text: {
        width: '100%'
    }
})

const OrderedProducts = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const products = props.products;

    const goToProductDetail = useCallback((id) => {
        dispatch(push('/product/'+id))
    }, [])

    return (
        <list>
            {products.map(product => (
                <>
                    <ListItem className={classes.list} key={product.id}>
                        <ListItemAvatar>
                            <img className={classes.image}
                                src={product.images[0].path}
                                alt={"Ordered Product"}
                            />
                        </ListItemAvatar>
                        <div className={classes.text}>
                            <ListItemText
                                primary={product.name}
                                secondary={"サイズ" + product.size}
                            />
                            <ListItemText
                                primary={"¥" + product.price.toLocaleString()}
                            />
                        </div>
                        <PrimaryButton
                            label={"商品詳細を見る"}
                            onClick={() => goToProductDetail(product.id)}
                        />
                    </ListItem>
                    <Divider />
                </>
            ))}
        </list>
    )

}

export default OrderedProducts;

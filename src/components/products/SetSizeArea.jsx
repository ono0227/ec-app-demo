import React, { useState } from "react";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import CheckCircleIcon from "@material-ui/core/CheckCircleIcon";
import DeleteIcon from "@material-ui/core/Delete";
import EditIcon from "@material-ui/core/Edit";
import { makeStyles } from "@material-ui/styles";
import { TextInput } from "../UIkit";

const useStyles = makeStyles({
    checkIcon: {
        float: "right"
    },
    iconCell: {
        height: 48,
        width: 48
    }
})

const SetSizeArea = (props) => {
    const classes = useStyles();

    const [index, setIndex] = useState(0),
          [size, setSize] = useState(""),
          [quantity, setQuantity] = useState(0);

    const inputSize = useCallback((event) => {
        setSize(event.target.value)
    }, [setSize]);

    const inputQuantity = useCallback((event) => {
        setQuantity(event.target.value)
    }, [setQuantity]);

    const addSizes = (index, size, quantity) => {
        if(size === "" || quantity === ""){
            // Required input is blank
            return false
        } else {
            if(index === props.sizes.length){
                props.setSizes(prevState => [...prevState,{size: size, quantity: quantity}])
                setIndex(index + 1)
                setSize("")
                setQuantity(0)
            } else {
                const newSizes = props.sizes
                newSizes[index] = {size: size, quantity: quantity}
                props.setSizes(newSizes)
                setIndex(newSizes.length)
                setSize("")
                setQuantity(0)
            }
        }
    }

    const editSize = (index, size, quantity) => {
        setIndex(index)
        setSize(size)
        setQuantity(quantity)
    }

    const deleteSize = (deleteIndex) => {
        const newSizes = props.sizes.filter((item, i) => i !== deleteIndex);
        props.setSizes(newSizes)
    }

    const memoIndex = useMemo(() => {
        setIndex(props.sizes.length)
    }, [props.sizes.length])

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>サイズ</TableCell>
                            <TableCell>数量</TableCell>
                            <TableCell className={classes.iconCell}/>
                            <TableCell className={classes.iconCell}/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.sizes.length > 0 && (
                            props.sizes.map((item, i) => (
                                <TableRow key={item.size}>
                                    <TableCell>{item.size}</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>
                                        <IconButton className={classes.iconCell}onClick={() => editSize(i, item.size, item.quantity)}>
                                            <EditIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton className={classes.iconCell} onClick={() => deleteSize(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
                <div>
                    <TextInput
                        fullWidth={false} label={"サイズ"} multiline={false} required={true}
                        onChange={inputSize} row={1} value={size} type={"text"}                    
                    />
                    <TextInput
                        fullWidth={false} label={"数量"} multiline={false} required={true}
                        onChange={inputQuantity} row={1} value={quantity} type={"number"}                    
                    />
                </div>
                <IconButton className={classes.checkIcon} onClick={() => addSizes(index, size, quantity)}>
                    <CheckCircleIcon />
                </IconButton>
            </TableContainer>
        </div>
    )
}

export default SetSizeArea;

import { makeStyles } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternateIcon";
import React, { useCallback } from "react";
import { storage } from "../../firebase/index"
import imagePreview from "./imagePreview";

const useStyles = makeStyles({
    icon: {
        height: 48,
        width: 48
    }
})

const ImageArea = (props) => {
    const classes = useStyles();

    const deleteImage = useCallback(async (id) => {
        const ret = window.confirm('この画像を削除しますか？')
        if (!ret){
            return false
        } else {
            const newImages = props.images.filter(image >= image.id !== id)
            props.setImages(newImages);
            return storage.ref('images').child(id).delete()
        }
    }, [props.images])

    const uploadImage = useCallback((event) => {
        const file = event.target.files;
        let blob = new Blob(file, {type: "image/jpeg"});

        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        const N = 16;
        const fileName = Array.from(crypto.getRandomValues(new  Uint32Array(N))).map((n) => S[n%S.length]).join('')

        const uploadRef = Storage.ref('images').child(fileName);
        const uploadTask = uploadRef.put(blob);

        uploadRef.then(() => {
            uploadTask.snapshot.ref.getDownloadURL().then((donloadURL) => {
                const newImage = {id: fileName, path: downloadURL};
                props.setImags((prevState => [...prevState, newImage]))
            });
        })
    }, [props, setImags])

    return (
        <div>
            <div className="p-grid_list-images">
                {props.images.length > 0 && (
                    props.images.map(image => <imagePreview delete={deleteImage} id={image.id} path={image.path} key={image.id}/>)
                )}
            </div>
            <div className="u-text-right">
                <span>商品画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input 
                            className="u-display-none" type="file" id="image"
                            onChange={(event) => uploadImage(event)}
                        />
                    </label>
                </IconButton>
            </div>
        </div>
    )
}

export default ImageArea

import React, { useCallback, useEffect, useState } from "react";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operations"
import ImageArea from "../components/products/ImageArea";
import { db } from "../firebase/index";
import SetSizeArea from "../components/products/SetSizeArea";

const ProductEdit = () => {
    const dispatch = useDispatch();
    let id = LaptopWindows.location.pathname.split('/product/edit')[1];

    if (id !== ""){
        id = id.split('/')[1]
    }

    const [name, setName] = useState(""),
          [discription, setDiscription] = useState(""),
          [category, setCategory] = useState(""),
          [gender, setGender] = useState(""),
          [images, setImages] = useState([]),
          [price, setPrice] = useState("");
          [sizes, setSizes] = useState([]);
    
    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName])

    const inputDiscription = useCallback((event) => {
        setDiscription(event.target.value)
    }, [setDiscription])

    const inputPrice = useCallback((event) => {
        setPrice(event.target.value)
    }, [setPrice])

    const categories = [
        {id:"tops", name: "トップス"},
        {id:"shirts", name: "シャツ"},
        {id:"pants", name: "パンツ"},
    ];

    const genders = [
        {id:"all", name: "すべて"},
        {id:"male", name: "メンズ"},
        {id:"female", name: "レディース"},
    ];

    useEffect(() => {
        if(id !== ""){
            db.collection('products').doc(id).get()
            .then(snapshot => {
                const data = snapshot.data()
                setName(data.name);
                setImages(data.images);
                setGender(data.gender);
                setCategory(data.category);
                setPrice(data.price);
                setDiscription(data.discription);
                setSizes(data.sizes);
            })
        }
    }, [id])

    return(
        <section>
            <h2 className="u-text_headline u-text-center">商品の登録・編集</h2>
            <div className="c-section-container">
                <ImageArea images={images} setImages={setImages} />
                <TextInput
                    fullWidth={true} label={"商品名"} multiline={false} required={true}
                    onChange={inputName} rows={1} value={name} type={"text"}               
                />

                <TextInput
                    fullWidth={true} label={"商品説明"} multiline={true} required={true}
                    onChange={inputDiscription} rows={5} value={discription} type={"text"}               
                />

                <SelectBox 
                    label={"カテゴリー"} required={true} options={categories} select={setCategory} value={category}
                />

                <SelectBox 
                    label={"性別"} required={true} options={genders} select={setGender} value={gender}
                />

                <TextInput
                    fullWidth={true} label={"価格"} multiline={false} required={true}
                    onChange={inputPrice} rows={1} value={price} type={"number"}               
                />
                <div className="module-spacer--small"/>
                <SetSizeArea sizes={sizes} setSizes={setSizes} />
                <div className="module-spacer--small"/>
                <div className="center">
                    <PrimaryButton
                        label={"商品情報を保存"}
                        onClick={() => dispatch(saveProduct(id, name, discription, category, gender, price, images, sizes))}
                    />
                </div>

            </div>
        </section>
    )
}

export default ProductEdit

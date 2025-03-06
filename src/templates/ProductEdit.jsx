import React, { useCallback, useState } from "react";
import { PrimaryButton, SelectBox, TextInput } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operations"

const ProductEdit = () => {
    const dispatch = useDispatch();

    const [name, setName] = useState(""),
          [discription, setDiscription] = useState(""),
          [category, setCategory] = useState(""),
          [gender, setGender] = useState(""),
          [price, setPrice] = useState("");
    
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

    return(
        <section>
            <h2 className="u-text_headline u-text-center">商品の登録・編集</h2>
            <div className="c-section-container">
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
                <div className="module-spacer--medium"/>
                <div className="center">
                    <PrimaryButton
                        label={"商品情報を保存"}
                        onClick={() => dispatch(saveProduct(name, discription, category, gender, price))}
                    />
                </div>

            </div>
        </section>
    )
}

export default ProductEdit

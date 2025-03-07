import React from "react";

const imagePreview = (props) => {
    return (
        <div className="p-media__thumb" onClick={() => props.delete(props.id)}>
            <img alt="プレビュー画像" srcs={props.path}/>
        </div>
    )
}

export default imagePreview

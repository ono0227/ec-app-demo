import {db, FirebaseTimestamp} from "../../firebase";
import { push } from "connected-react-router"

const productsRef = db.collection('products')

export default saveProduct = (name, discription, category, gender, price, images) => {
    return async(dispatch) => {
        const timestamp = FirebaseTimestamp.now()

        const data = {
            category: category,
            description: discription,
            gender: gender,
            images: images,
            name: name,
            price: parseInt(price, 10),
            updated_at: timestamp
        }

        const ref = productsRef.doc();
        const id = ref.id
        data.id = id
        data.created_at = timestamp

        return productsRef.doc(id).set(id)
            .then(() => {
                dispatch(push('/'))
            }).catch((error) => {
                throw new Error(error)
            })
    }
}

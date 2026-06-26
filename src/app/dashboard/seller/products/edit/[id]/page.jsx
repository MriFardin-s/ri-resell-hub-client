import { getProduct } from "@/lib/api/seller/getProductById";
import EditProductForm from "../EditProductForm";


export default async function EditPage({ params }) {

    const { id } = await params;

  
    const product = await getProduct(id);
    

    return (
        <EditProductForm
            product={product}
        />
    );
}
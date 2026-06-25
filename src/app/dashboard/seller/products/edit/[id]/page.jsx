import EditProductForm from "./EditProductForm";

async function getProduct(id) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`,
        {
            cache: 'no-store',
        }
    );

    return res.json();
}

export default async function EditPage({ params }) {

    const { id } = await params;

  
    const product = await getProduct(id);

    return (
        <EditProductForm
            product={product}
        />
    );
}
import { ProductForm } from '@/components/ProductForm';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

const editProduct = () => {
  const router = useRouter();

  const[subLoading, setSubLoading] = useState(false);
  const[formSubError, setFormSubError] = useState("");

  const { productItem, productPrice } = useLocalSearchParams();

  const[newItemValue, setNewItemValue] = useState(productItem);
  const[newPriceValue, setNewPriceValue] = useState(productPrice);
  
  const handleReturn = () => {
    router.back();
  }

  const submitForm = () => {
    console.log("Form submitted");
  }

  return (
    <ProductForm
      formTitle="Modify Product"
      subLoading={subLoading}
      submitForm={submitForm}
      toAct="Edit Product"
      currentAct="Editing..."
      formError={formSubError}
      setFormError={setFormSubError}
      handleReturn={handleReturn}
      itemVal={newItemValue}
      setItemVal={setNewItemValue}
      priceVal={newPriceValue}
      setPriceVal={setNewPriceValue}
      itemHolder="Enter modified product item"
      priceHolder="Enter modified product base price"
    />
  );
}

export default editProduct
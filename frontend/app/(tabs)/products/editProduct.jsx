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
    const price = Number(newPriceValue); // for isNaN checker

    if(!newItemValue && !newPriceValue) {
        setFormSubError("Fill at least one field");
    } else {
      if(!newItemValue) {
        if(isNaN(price) || price <= 0) setFormSubError("Positive numeric values only");
      }
      
      setSubLoading(true);
      try {
        // hook here
        console.log("hello")
      } catch(error) {
        console.error("Error updating product: ", error);
        Alert.alert("An error occurred", error.message);
      } finally {
        // setSubLoading(false);
        // handleReturn();
        console.log("Updating success");
      }
    }
  }

  return (
    <ProductForm
      formTitle="Modify Product"
      subLoading={subLoading}
      submitForm={submitForm}
      toAct="Update Product"
      currentAct="Updating..."
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
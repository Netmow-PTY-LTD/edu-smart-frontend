import { bgPrimary } from '@/components/constants/utils/themeUtils';
import React from 'react';
import { useSelector } from 'react-redux';

const ShoppingCartCount = ({ data }) => {
  const {
    data: themeData,
    isLoading: themeIsLoading,
    error: themeError,
  } = useSelector((state) => state.Home.theme);

  return (
    <span className="cart-number" style={bgPrimary(themeData)}>
      {parseInt(
        data?.length > 0
          ? data.reduce((acc, item) => acc + (item.quantity || 0), 0)
          : 0
      )}
    </span>
  );
};

export default ShoppingCartCount;

import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const fetchCartAPI = async userId => {
  const config = {
    method: 'get',
    url: `/cart?userId=${userId}`,
  };

  const response = await client(config);
  return response.data;
};

export const addToCartAPI = async (product, quantity, userId) => {
  const config = {
    method: 'post',
    url: '/cart',
    data: {
      product,
      quantity,
      userId,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
};

export const removeFromCartAPI = async id => {
  const config = {
    method: 'delete',
    url: `/cart/${id}`,
  };

  await client(config);
  return id;
};

export const updateQuantityAPI = async (id, quantity) => {
  const config = {
    method: 'patch',
    url: `/cart/${id}`,
    data: {
      quantity,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await client(config);
  return response.data;
};

export const clearCartAPI = async ids => {
  const response = await Promise.all(
    ids.map(async id => {
      const config = {
        method: 'delete',
        url: `/cart/${id}`,
      };

      return await client(config);
    })
  );

  return response.data;
};

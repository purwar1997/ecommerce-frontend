import { useState, useRef, memo } from 'react';
import { useDispatch } from 'react-redux';
import { BsTrash3Fill } from 'react-icons/bs';
import { removeItemFromCart, updateItemQuantity } from '../app/slices/cartSlice';
import { classNames } from '../utils/helpers';

const OrderItem = memo(({ id, product, quantity }) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);
  const [removeItemStatus, setRemoveItemStatus] = useState('idle');
  const quantityRef = useRef(quantity);

  const dispatch = useDispatch();

  const handleRemoveItem = async () => {
    try {
      setRemoveItemStatus('pending');
      await dispatch(removeItemFromCart(id)).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      setRemoveItemStatus('idle');
    }
  };

  const handleUpdateQuantity = async e => {
    setItemQuantity(e.target.value);

    try {
      await dispatch(updateItemQuantity({ id, quantity: Number(e.target.value) })).unwrap();
    } catch (error) {
      setItemQuantity(quantityRef.current);
      console.log(error);
    }
  };

  return (
    <li className='p-6 flex gap-5'>
      <div className='w-28 h-28 border border-gray-200 rounded-lg overflow-hidden'>
        <img
          className='w-full h-full object-cover object-center'
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div className='flex-1 flex flex-col justify-between'>
        <div className='flex justify-between items-start'>
          <div>
            <h3>{product.title}</h3>
            <p className='mt-0.5 text-sm text-gray-500'>{product.brand}</p>
          </div>

          <button
            className={classNames(
              'text-lg text-gray-400 hover:text-gray-500',
              removeItemStatus === 'pending' ? 'cursor-wait' : ''
            )}
            title='Remove item'
            onClick={handleRemoveItem}
            disabled={removeItemStatus === 'pending'}
          >
            <BsTrash3Fill />
          </button>
        </div>

        <div className='flex justify-between items-end'>
          <p>₹{product.price * quantity}</p>

          <select
            className='pl-2.5 pr-8 py-1 ring-1 ring-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer'
            id='quantity'
            value={itemQuantity}
            onChange={handleUpdateQuantity}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <option key={index} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </li>
  );
});

export default OrderItem;

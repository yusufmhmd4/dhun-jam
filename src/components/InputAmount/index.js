import React, { useState, useEffect,memo } from 'react';

function InputAmount({ amount, chargeCustomer, updateActiveSaveButton }) {
    const [dataAmount, updateDataAmount] = useState(amount);

    useEffect(() => {
        const isDecreasingOrder = Object.values(dataAmount).slice(1).every(
            (value, index) => index === 0 || value <= Object.values(dataAmount).slice(1)[index - 1]
        );
        console.log(isDecreasingOrder)
        updateActiveSaveButton(isDecreasingOrder);
    }, [dataAmount]);

    const onChangeAmount = (category, value) => {
        if (!isNaN(value) && value!=='') {
          updateDataAmount((prevDataAmount) => {
            const updatedDataAmount = { ...prevDataAmount };
            updatedDataAmount[category] = parseInt(value);
            return updatedDataAmount;
          });
        }
      };


    console.log(dataAmount)

    return (
        <div className='request-container'>
            <h3 className='dashboard-question'>
                Regular songs request amount from high to low
            </h3>
            <div className='input-amount-container'>
                {Object.keys(dataAmount).slice(1).map((category) => (
                    <input
                        key={category}
                        type='text'
                        value={dataAmount[category]}
                        disabled={!chargeCustomer}
                        style={!chargeCustomer ? { borderColor: '#C2C2C2', color: '#C2C2C2' } : {}}
                        className='custom-amount'
                        onChange={(e) => {
                            onChangeAmount(category, e.target.value);
                        }}
                    />
                ))}

            </div>
        </div>
    );
}

export default memo(InputAmount);

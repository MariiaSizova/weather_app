import React from 'react';

const Input = ({ value, error, onChange, name }) => {
    return ( 
        <div className="col-auto">
            <input 
                value={value}
                onChange={onChange}
                id={name}
                type="text" 
                className="form-control btn-border-radius: 15px" 
                placeholder="Enter location..." 
                pattern="^[a-zA-Z ]+$"
            />
            {error && <div className="alert alert-primary" role="alert">{error}</div>}          
        </div>
    );
}
 
export default Input;
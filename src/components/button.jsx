import React from 'react';

const Button = ({type, label}) => {
    return ( 
        <div className="col-auto">
            <button 
                type={type}
                className="btn btn-outline-primary my-2 my-sm-0">
                { label }
            </button>
        </div>
    );
}
 
export default Button;
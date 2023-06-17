import Login from "./Login";
import Register from "./Register";
import React, {useState} from "react";

const Guest = () => {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <>
            <section className="account">
                {isLogin ? <Login/> : <Register/>}
                <p> --------------- or -------------- </p>
            </section>
            <button className="button form__button switchLoginRegister"
                    onClick={() => setIsLogin(prevState => !prevState)}>{isLogin ? 'Create an account' :
                'Already have an account? Sing In'}</button>
        </>
    );
};

export default Guest;
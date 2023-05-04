const SignInForm = ()=>{

    return(<div className="loginFormContainer">
        <span className="loginFormTitle">Log in</span>
        <form className="loginForm">
            <input className="formInput" placeholder="Login"></input>
            <input className="formInput" placeholder="Password" type="password"></input>
            <button className="formSubmit" type="submit">Log in</button>
        </form>
    </div>)

}   
export default SignInForm
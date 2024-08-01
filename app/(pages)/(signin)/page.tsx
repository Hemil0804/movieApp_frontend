import SigninForm from './_components/SigninForm'

export default function signin() {
  return (
    <>
    <div className="signin-wrapper center-content ">
        <div className="form-card ">
            <h1 className="mb-40">Sign in</h1>
           <SigninForm />
        </div>
    </div>
    </>
  );
}
